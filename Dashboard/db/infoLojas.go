package db

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"sort"
	"strings"
	"time"
)

type InfoLojas struct {
	Nome             string
	Luc              string
	Segmento         string
	Sinistro         string
	Seguro           string
	VigenciaContrato string
	DiaDeRenovacao   string
}

type InfoLoja struct {
	Nome             string
	Segmento         string
	Luc              string
	Sinistro         string
	Seguro           string
	VigenciaContrato string
	DiaDeRenovacao   string
}

type DadosLojas struct {
	ListaLojas []InfoLojas
	Segmentos  []string
	InfoLoja   []InfoLoja
	LojasJSON  template.JS
}

type ComparePageData struct {
	DadosLojas
	Selecionadas []InfoLojas
	Mensagem     string
}

type ReportItem struct {
	Nome  string
	Total int
}

type ReportPageData struct {
	TotalLojas       int
	TotalSegmentos   int
	LojasComSinistro []InfoLojas
	Segmentos        []ReportItem
	GeradoEm         string
	Titulo           string
	Subtitulo        string
}

var Loja string
var DadosLoja DadosLojas
var Tmpl *template.Template

func BuscarLojas() (Dados DadosLojas) {
	rows, err := DB.Query(`SELECT luc, nome, segmento, sinistro, seguro, vigencia_de_contrato, dia_de_renovacao FROM lojas ORDER BY REPLACE(REPLACE(nome, 'Á', 'A'), 'Ó', 'O') ASC`)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var item InfoLojas
	var acumulado DadosLojas
	for rows.Next() {
		rows.Scan(&item.Luc, &item.Nome, &item.Segmento, &item.Sinistro, &item.Seguro, &item.VigenciaContrato, &item.DiaDeRenovacao)
		adicionar := true
		for i := 0; i < len(acumulado.Segmentos); i++ {
			if len(acumulado.Segmentos) == 0 {
				acumulado.Segmentos = append(acumulado.Segmentos, item.Segmento)
			} else if item.Segmento == acumulado.Segmentos[i] {
				adicionar = false
			}
		}
		if adicionar {
			acumulado.Segmentos = append(acumulado.Segmentos, item.Segmento)
		}
		acumulado.ListaLojas = append(acumulado.ListaLojas, item)
	}

	sort.Strings(acumulado.Segmentos)

	lojasJSON, err := json.Marshal(acumulado.ListaLojas)
	if err != nil {
		panic(err)
	}

	Dados = DadosLojas{
		ListaLojas: acumulado.ListaLojas,
		Segmentos:  acumulado.Segmentos,
		InfoLoja:   DadosLoja.InfoLoja,
		LojasJSON:  template.JS(lojasJSON),
	}

	return Dados
}

func BuscarLojasSelecionadas(nomes []string) []InfoLojas {
	if len(nomes) == 0 {
		return nil
	}

	selecionadas := make([]InfoLojas, 0, len(nomes))
	storeMap := make(map[string]InfoLojas)
	for _, loja := range BuscarLojas().ListaLojas {
		storeMap[loja.Nome] = loja
	}

	for _, nome := range nomes {
		nome = strings.TrimSpace(nome)
		if nome == "" {
			continue
		}
		if loja, ok := storeMap[nome]; ok {
			selecionadas = append(selecionadas, loja)
		}
	}

	return selecionadas
}

func contarSegmentos(lojas []InfoLojas) []ReportItem {
	contagem := make(map[string]int)
	for _, loja := range lojas {
		if strings.TrimSpace(loja.Segmento) == "" {
			continue
		}
		contagem[loja.Segmento]++
	}

	segmentos := make([]ReportItem, 0, len(contagem))
	for nome, total := range contagem {
		segmentos = append(segmentos, ReportItem{Nome: nome, Total: total})
	}

	sort.Slice(segmentos, func(i, j int) bool {
		if segmentos[i].Total == segmentos[j].Total {
			return segmentos[i].Nome < segmentos[j].Nome
		}
		return segmentos[i].Total > segmentos[j].Total
	})

	return segmentos
}

func filtrarSinistros(lojas []InfoLojas) []InfoLojas {
	comSinistro := make([]InfoLojas, 0)
	for _, loja := range lojas {
		if strings.TrimSpace(loja.Sinistro) == "" {
			continue
		}
		comSinistro = append(comSinistro, loja)
	}

	if len(comSinistro) > 8 {
		return comSinistro[:8]
	}

	return comSinistro
}

func FormularioLojasHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Erro ao processar formulário", http.StatusBadRequest)
		return
	}

	Loja = r.FormValue("loja")

	rows, err := DB.Query(`SELECT nome, segmento, luc, sinistro, seguro, vigencia_de_contrato, dia_de_renovacao FROM lojas WHERE nome = $1`, Loja)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var d DadosLojas
	for rows.Next() {
		var i InfoLoja
		rows.Scan(&i.Nome, &i.Segmento, &i.Luc, &i.Sinistro, &i.Seguro, &i.VigenciaContrato, &i.DiaDeRenovacao)
		d.InfoLoja = append(d.InfoLoja, i)
	}

	DadosLoja = d
	BuscarLojas()
	fmt.Print(BuscarLojas().InfoLoja)

	Tmpl, err := template.ParseGlob("templates/*.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(BuscarLojas().InfoLoja) > 0 {
		Tmpl.ExecuteTemplate(w, "infoLoja.html", BuscarLojas())
	} else if len(BuscarLojas().InfoLoja) == 0 {
		Tmpl.ExecuteTemplate(w, "index.html", BuscarLojas())
	}
}

func HandlerSelect(w http.ResponseWriter, r *http.Request) {
	Tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Tmpl.ExecuteTemplate(w, "index.html", BuscarLojas())
}

func ComparativoHandler(w http.ResponseWriter, r *http.Request) {
	var nomesSelecionados []string
	nomesSelecionados = r.URL.Query()["lojas"]
	if len(nomesSelecionados) == 0 {
		if nomeUnico := strings.TrimSpace(r.URL.Query().Get("loja")); nomeUnico != "" {
			nomesSelecionados = []string{nomeUnico}
		}
	}

	compareData := ComparePageData{
		DadosLojas:   BuscarLojas(),
		Selecionadas: BuscarLojasSelecionadas(nomesSelecionados),
	}

	if len(compareData.Selecionadas) < 2 {
		compareData.Mensagem = "Selecione duas ou mais lojas no comparador para visualizar o comparativo completo."
	}

	Tmpl, err := template.ParseFiles("templates/compare.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Tmpl.ExecuteTemplate(w, "compare.html", compareData)
}

func RelatorioHandler(w http.ResponseWriter, r *http.Request) {
	base := BuscarLojas()
	relatorio := ReportPageData{
		TotalLojas:       len(base.ListaLojas),
		TotalSegmentos:   len(base.Segmentos),
		LojasComSinistro: filtrarSinistros(base.ListaLojas),
		Segmentos:        contarSegmentos(base.ListaLojas),
		GeradoEm:         time.Now().Format("02/01/2006 15:04"),
		Titulo:           "Shopping Flamboyant",
		Subtitulo:        "Relatório executivo do dashboard",
	}

	Tmpl, err := template.ParseFiles("templates/relatorio.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Tmpl.ExecuteTemplate(w, "relatorio.html", relatorio)
}

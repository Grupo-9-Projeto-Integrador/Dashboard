package db

import (
	"fmt"
	"net/http"
	"sort"
	"html/template"
)

type InfoLojas struct {
	Nome     string
	Luc      string
	Segmento string
	Sinistro string
}

type InfoLoja struct {
	Seguro string
	VigenciaContrato string
	DiaDeRenovacao string
}

type DadosLojas struct {
	ListaLojas []InfoLojas
	Segmentos  []string
	InfoLoja []InfoLoja
}

var Loja string
var DadosLoja DadosLojas
var Tmpl *template.Template

func BuscarLojas() (Dados DadosLojas){
	rows, err := DB.Query(`SELECT luc, nome, segmento, sinistro FROM lojas ORDER BY REPLACE(REPLACE(nome, 'Á', 'A'), 'Ó', 'O') ASC`)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var I InfoLojas
	// var In InfoLoja
	var D DadosLojas
	for rows.Next() {
		rows.Scan(&I.Luc, &I.Nome, &I.Segmento, &I.Sinistro)
		adicionar := true
		for i := 0; i < len(D.Segmentos); i++ {
			if len(D.Segmentos) == 0 {
				D.Segmentos = append(D.Segmentos, I.Segmento)
			} else if I.Segmento == D.Segmentos[i] {
				adicionar = false
			}
		}
		if adicionar == true {
			D.Segmentos = append(D.Segmentos, I.Segmento)
		}
		D.ListaLojas = append(D.ListaLojas, I)
	}

	sort.Strings(D.Segmentos)



	Dados = DadosLojas{
		ListaLojas: D.ListaLojas,
		Segmentos:  D.Segmentos,
		InfoLoja: DadosLoja.InfoLoja,
	}

	return Dados
}

func FormularioLojasHandler(w http.ResponseWriter, r *http.Request)  {

	if err := r.ParseForm(); err != nil {
		http.Error(w, "Erro ao processar formulário", http.StatusBadRequest)
		return
	}

	Loja = r.FormValue("loja")

	rows, err := DB.Query(`SELECT seguro, vigencia_de_contrato, dia_de_renovacao FROM lojas WHERE nome = $1`, Loja)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var d DadosLojas
	for rows.Next() {
		var i InfoLoja
		rows.Scan(&i.Seguro, &i.VigenciaContrato, &i.DiaDeRenovacao)
		d.InfoLoja = append(d.InfoLoja, i)
	}

	DadosLoja = d
	HandlerSelect(w,r)
	BuscarLojas()
	fmt.Print(BuscarLojas().InfoLoja)
	fmt.Fprintf(w, "A opção selecionada foi: %s\n", Loja)
	// fmt.Printf("Ação recebida: %s\n", DadosLoja.InfoLoja)
}

func HandlerSelect(w http.ResponseWriter, r *http.Request) {
	Tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Passa a lista de estados para o template
	Tmpl.ExecuteTemplate(w,"index.html", BuscarLojas())
}





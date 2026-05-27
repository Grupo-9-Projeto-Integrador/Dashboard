package db

import "sort"

type InfoLojas struct {
	Nome     string
	Luc      string
	Segmento string
	Sinistro string
}

type DadosLojas struct {
	ListaLojas []InfoLojas
	Segmentos  []string
}


func BuscarLojas() (Dados DadosLojas){
	rows, err := DB.Query(`SELECT luc, nome, segmento, sinistro FROM lojas ORDER BY REPLACE(REPLACE(nome, 'Á', 'A'), 'Ó', 'O') ASC`)
	if err != nil {
		panic(err)
	}
	var I InfoLojas
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
	}

	return Dados
}



package db


type DadosLojas struct {
	Nome     string
	Luc      string
	Segmento string
	Sinistro string
	Segmentos []string
}

var Dados []DadosLojas


func BuscarLojas() {
	rows, err := DB.Query(`SELECT luc, nome, segmento, sinistro FROM lojas`)
	if err != nil {
		panic(err)
	}
	var l DadosLojas

	for rows.Next() {
		rows.Scan(&l.Luc, &l.Nome, &l.Segmento, &l.Sinistro)
		adicionar := true
		for i := 0; i < len(l.Segmentos); i++ {
			if len(l.Segmentos) == 0 {
				l.Segmentos = append(l.Segmentos, l.Segmento)
			} else if l.Segmento == l.Segmentos[i] {
				adicionar = false
			}
		}
		if adicionar == true {
			l.Segmentos = append(l.Segmentos, l.Segmento)
		}
		Dados = append(Dados, l)
	}

}



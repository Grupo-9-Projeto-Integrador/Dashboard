package main

import (
	"DASHBOARD/db"
	"fmt"
	"log"
	"net/http"
)

func main() {
	db.ConnectToDb()
	fileserver := http.FileServer(http.Dir("static/"))

	http.Handle("/static/", http.StripPrefix("/static/", fileserver))

	http.HandleFunc("/", db.HandlerSelect)

	http.HandleFunc("/infoLoja", db.FormularioLojasHandler)
	http.HandleFunc("/comparativo", db.ComparativoHandler)
	http.HandleFunc("/relatorio", db.RelatorioHandler)

	fmt.Printf("port running on http://localhost:8081/\n")

	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}

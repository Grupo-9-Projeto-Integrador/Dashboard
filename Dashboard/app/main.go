package main

import (
	"DASHBOARD/db"
	"fmt"
	"log"
	"net/http"
	"html/template"
)

func handlerSelect(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Passa a lista de estados para o template
	tmpl.ExecuteTemplate(w,"index.html", db.Dados)
}

func main() {
	db.ConnectToDb()
	db.BuscarLojas()
	fileserver := http.FileServer(http.Dir("static/"))

	http.Handle("/static/", http.StripPrefix("/static/", fileserver))

	http.HandleFunc("/", handlerSelect)

	fmt.Printf("port running on http://localhost:8081/\n")

	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}


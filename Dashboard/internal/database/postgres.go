package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func main() {

	connStr := "postgresql://neondb_owner:npg_axdFA5T3iPzY@ep-old-rain-acx47pbv-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Conectado com sucesso!")

	rows, err := db.Query("SELECT luc ,nome, segmento FROM lojas")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var luc, nome, segmento string
		rows.Scan(&luc, &nome, &segmento)
		fmt.Println(luc, "-", nome, "-", segmento)
	}
}

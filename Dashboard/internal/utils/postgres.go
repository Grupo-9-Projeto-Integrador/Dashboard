package utils

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)


func ConnectToDb() {
	connStr := "postgresql://neondb_owner:npg_axdFA5T3iPzY@ep-old-rain-acx47pbv-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

	DB, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	defer DB.Close()

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Conectado com sucesso ao banco de dados!")
}

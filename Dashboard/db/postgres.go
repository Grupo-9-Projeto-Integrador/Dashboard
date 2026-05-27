package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectToDb() {
	connStr := "postgresql://neondb_owner:npg_axdFA5T3iPzY@ep-old-rain-acx47pbv-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

	var err error

	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Conectado com sucesso ao banco de dados!")
}

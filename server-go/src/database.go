package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	DBHost     = "47.89.245.144"
	DBPort     = "3306"
	DBUser     = "arqui"
	DBPassword = "iN)7rA2/-drq4JB["
	DBName     = "Arquisoft"
)

var (
	DB *sql.DB
)

func InitDB() {
	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", DBUser, DBPassword, DBHost, DBPort, DBName)
	var err error
	DB, err = sql.Open("mysql", dataSourceName)
	if err != nil {
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Database connected")
}
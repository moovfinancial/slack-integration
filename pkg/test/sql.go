// generated-from:d9ac9aab2af2bc0c909006230a70f6f10c132feffeb516eaced477beb852761f DO NOT REMOVE, DO UPDATE

package test

import (
	"context"
	"database/sql"
	"fmt"
	"testing"
	"time"

	"github.com/moov-io/base"
	"github.com/moov-io/base/database"
	"github.com/moov-io/base/log"
)

func TestDatabaseConfig() database.DatabaseConfig {
	return database.DatabaseConfig{
		DatabaseName: "slack-integration",
		MySQL: &database.MySQLConfig{
			Address:  "tcp(localhost:3106)",
			User:     "root",
			Password: "root",
		},
	}
}

func CreateTestDatabase(t *testing.T, config database.DatabaseConfig) database.DatabaseConfig {

	open := func() (*sql.DB, error) {
		db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/", config.MySQL.User, config.MySQL.Password, config.MySQL.Address))
		if err != nil {
			return nil, err
		}

		if err := db.Ping(); err != nil {
			return nil, err
		}

		return db, nil
	}

	rootDb, err := open()
	for i := 0; err != nil && i < 22; i++ {
		time.Sleep(time.Second * 1)
		rootDb, err = open()
	}
	if err != nil {
		t.Fatal(err)
	}

	dbName := "test" + base.ID()
	_, err = rootDb.Exec(fmt.Sprintf("CREATE DATABASE %s", dbName))
	if err != nil {
		t.Fatal(err)
	}

	t.Cleanup(func() {
		rootDb.Exec(fmt.Sprintf("DROP DATABASE %s", dbName))
		rootDb.Close()
	})

	config.DatabaseName = dbName

	return config
}

func LoadDatabase(t *testing.T, config database.DatabaseConfig) *sql.DB {
	l := log.NewNopLogger()
	db, err := database.New(context.Background(), l, config)
	if err != nil {
		panic(err)
	}

	t.Cleanup(func() {
		db.Close()
	})

	err = database.RunMigrations(l, config)
	if err != nil {
		t.Error(err)
	}

	return db
}

// generated-from:e2c8feafb64f386099dd19856d12281058eed28f74c2fb7b7f770ef0e82017cf DO NOT REMOVE, DO UPDATE

package service

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/moov-io/base/admin"
	"github.com/moov-io/base/log"

	"github.com/moovfinancial/go-observability/pkg/observe"
	_ "github.com/moovfinancial/slack-integration"
)

// RunServers - Boots up all the servers and awaits till they are stopped.
func (env *Environment) RunServers(terminationListener chan error) func() {

	adminServer := bootAdminServer(terminationListener, env.Logger, env.Config.Servers.Admin)

	_, shutdownPublicServer := bootHTTPServer("public", env.PublicRouter, terminationListener, env.Logger, env.Config.Servers.Public)

	return func() {
		adminServer.Shutdown()
		shutdownPublicServer()
	}
}

func bootHTTPServer(name string, routes *mux.Router, errs chan<- error, logger log.Logger, config HTTPConfig) (*http.Server, func()) {
	observedHandler := observe.Server(routes, logger, "http")

	// Create main HTTP server
	serve := &http.Server{
		Addr:    config.Bind.Address,
		Handler: observedHandler,

		TLSConfig: &tls.Config{
			InsecureSkipVerify:       false,
			PreferServerCipherSuites: true,
			MinVersion:               tls.VersionTLS12,
		},
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start main HTTP server
	go func() {
		logger.Info().Log(fmt.Sprintf("%s listening on %s", name, config.Bind.Address))
		if err := serve.ListenAndServe(); err != nil {
			errs <- logger.Fatal().LogErrorf("problem starting http: %w", err).Err()
		}
	}()

	shutdownServer := func() {
		if err := serve.Shutdown(context.Background()); err != nil {
			logger.Fatal().LogErrorf("shutting down: %v", err)
		}
	}

	return serve, shutdownServer
}

func bootAdminServer(errs chan<- error, logger log.Logger, config HTTPConfig) *admin.Server {
	adminServer := admin.NewServer(config.Bind.Address)

	go func() {
		logger.Info().Log(fmt.Sprintf("listening on %s", adminServer.BindAddr()))
		if err := adminServer.Listen(); err != nil {
			errs <- logger.Fatal().LogErrorf("problem starting admin http: %w", err).Err()
		}
	}()

	return adminServer
}

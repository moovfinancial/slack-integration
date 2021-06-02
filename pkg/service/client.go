// generated-from:457eb2c7ec66fd92b3d1687dc85f8716ee813cac11c158ea820142457e8da704 DO NOT REMOVE, DO UPDATE

package service

import (
	"net/http"
	"time"

	"github.com/moov-io/base/log"

	"github.com/moovfinancial/go-observability/pkg/observe"
	"github.com/moovfinancial/go-zero-trust/v2/pkg/middleware"
)

type ClientConfig struct {
	Timeout             time.Duration
	MaxIdleConns        int
	MaxIdleConnsPerHost int
	MaxConnsPerHost     int
}

func NewInternalClient(logger log.Logger, config *ClientConfig, name string) *http.Client {
	if config == nil {
		config = &ClientConfig{
			Timeout:             60 * time.Second,
			MaxIdleConns:        20,
			MaxIdleConnsPerHost: 20,
			MaxConnsPerHost:     20,
		}
	}

	// Default settings we approve of
	internalClient := &http.Client{
		Timeout: config.Timeout,
		Transport: &http.Transport{
			ForceAttemptHTTP2:   true,
			MaxIdleConns:        config.MaxIdleConns,
			MaxIdleConnsPerHost: config.MaxIdleConnsPerHost,
			MaxConnsPerHost:     config.MaxConnsPerHost,
		},
	}

	if name == "" {
		name = "internal-client"
	}

	// Add observability to the client calls
	internalClient = observe.Client(internalClient, logger, name)

	// Add auth to the client calls
	internalClient = middleware.UseClient(internalClient)

	return internalClient
}

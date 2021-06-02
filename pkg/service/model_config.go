// generated-from:10313ac43343342aeec09de5a7fe0dc6e1bf9035e4b454d8fa18c5ed774ddf86 DO NOT REMOVE, DO UPDATE

package service

import (
	"github.com/moov-io/base/database"
	"github.com/moovfinancial/go-zero-trust/v2/pkg/middleware"
)

type GlobalConfig struct {
	Slack Config
}

// Config defines all the configuration for the app
type Config struct {
	Servers  ServerConfig
	Clients  *ClientConfig
	Database database.DatabaseConfig
	Gateway  middleware.ZeroTrustConfig

	Producers ProducerConfig
	Consumer  ConsumerConfig
}

// ServerConfig - Groups all the http configs for the servers and ports that get opened.
type ServerConfig struct {
	Public HTTPConfig
	Admin  HTTPConfig
}

// HTTPConfig configuration for running an http server
type HTTPConfig struct {
	Bind BindAddress
}

// BindAddress specifies where the http server should bind to.
type BindAddress struct {
	Address string
}

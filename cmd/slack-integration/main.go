// generated-from:73804742b096bf4427f7375fe58ca1b8db43bbdd1cd381625f78cadc7e3b938e DO NOT REMOVE, DO UPDATE

package main

import (
	"os"

	"github.com/moov-io/base/log"

	"github.com/moovfinancial/slack-integration"
	"github.com/moovfinancial/slack-integration/pkg/service"
)

func main() {
	env := &service.Environment{
		Logger: log.NewDefaultLogger().Set("app", log.String("slack-integration")).Set("version", log.String(slackintegration.Version)),
	}

	env, err := service.NewEnvironment(env)
	if err != nil {
		env.Logger.Fatal().LogErrorf("Error loading up environment: %v", err)
		os.Exit(1)
	}
	defer env.Shutdown()

	termListener := service.NewTerminationListener()

	stopServers := env.RunServers(termListener)
	defer stopServers()

	stopConsumer := env.RunConsumer(termListener)
	defer stopConsumer()

	service.AwaitTermination(env.Logger, termListener)
}

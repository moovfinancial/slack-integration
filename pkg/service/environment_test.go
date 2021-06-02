// generated-from:126ffd63f3e8de4517ae5b40c1aa78c414e27cbf91a1f914c0ca29102d07b2e6 DO NOT REMOVE, DO UPDATE

package service_test

import (
	"testing"

	"github.com/moov-io/base/log"
	"github.com/stretchr/testify/assert"

	"github.com/moovfinancial/slack-integration/pkg/service"
)

func Test_Environment_Startup(t *testing.T) {
	a := assert.New(t)

	env := &service.Environment{
		Logger: log.NewDefaultLogger(),
	}

	env, err := service.NewEnvironment(env)
	a.Nil(err)

	t.Cleanup(env.Shutdown)
}

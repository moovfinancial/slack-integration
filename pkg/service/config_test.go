// generated-from:27e0333874e5a9cbe14398aadaaf07848968237bfeada841f51e8a6816e00471 DO NOT REMOVE, DO UPDATE

package service_test

import (
	"testing"

	"github.com/moov-io/base/config"
	"github.com/moov-io/base/log"
	"github.com/stretchr/testify/require"

	"github.com/moovfinancial/slack-integration/pkg/service"
)

func Test_ConfigLoading(t *testing.T) {
	logger := log.NewNopLogger()

	ConfigService := config.NewService(logger)

	gc := &service.GlobalConfig{}
	err := ConfigService.Load(gc)
	require.Nil(t, err)
}

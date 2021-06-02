// generated-from:c72750ccfafcb33f8f4b07c31bdceb1d79091aee4b56a43ac204bced85e2cd74 DO NOT REMOVE, DO UPDATE

package test

import (
	"testing"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/moov-io/base/log"
	"github.com/moov-io/base/stime"
	"github.com/moovfinancial/go-zero-trust/v2/pkg/middleware"
	"github.com/moovfinancial/go-zero-trust/v2/pkg/middleware/middlewaretest"
	"github.com/stretchr/testify/require"

	"github.com/moovfinancial/slack-integration/pkg/service"
)

type TestEnvironment struct {
	T          *testing.T
	Assert     *require.Assertions
	StaticTime stime.StaticTimeService
	Claims     middleware.TrustedClaims

	AccountID string

	service.Environment
}

func NewEnvironment(t *testing.T, router *mux.Router) *TestEnvironment {
	testEnv := &TestEnvironment{}

	testEnv.T = t
	testEnv.PublicRouter = router
	testEnv.Assert = require.New(t)
	testEnv.Logger = log.NewDefaultLogger()
	testEnv.StaticTime = stime.NewStaticTimeService()
	testEnv.TimeService = testEnv.StaticTime
	testEnv.Claims = middlewaretest.NewRandomClaims()

	testEnv.AccountID = uuid.NewString()

	cfg, err := service.LoadConfig(testEnv.Logger)
	if err != nil {
		t.Fatal(err)
	}
	testEnv.Config = cfg

	cfg.Database = CreateTestDatabase(t, TestDatabaseConfig())
	claimsFunc := func() middleware.TrustedClaims { return testEnv.Claims }
	mw := middlewaretest.NewTestMiddlewareLazy(testEnv.StaticTime, claimsFunc, "slack-integration")
	testEnv.ZeroTrustMiddleware = mw.Handler

	_, err = service.NewEnvironment(&testEnv.Environment)
	if err != nil {
		t.Fatal(err)
	}

	t.Cleanup(testEnv.Shutdown)

	return testEnv
}

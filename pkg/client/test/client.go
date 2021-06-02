// generated-from:6ccfdd706425fef62abb949a1c73657409d25ac55d34c0f1d3c51f541541ae3a DO NOT REMOVE, DO UPDATE

package test

import (
	"context"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"

	client "github.com/moovfinancial/slack-integration/pkg/client"
)

func NewTestClient(handler http.Handler) *client.APIClient {
	mockHandler := MockClientHandler{
		handler: handler,
	}

	cookieJar, err := cookiejar.New(nil)
	if err != nil {
		panic(err)
	}

	mockClient := &http.Client{
		Jar: cookieJar,

		// Mock handler that sends the request to the handler passed in and returns the response without a server
		// middleman.
		Transport: &mockHandler,

		// Disables following redirects for testing.
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	config := client.NewConfiguration()
	config.HTTPClient = mockClient
	apiClient := client.NewAPIClient(config)

	return apiClient
}

type MockClientHandler struct {
	handler http.Handler
	ctx     *context.Context
}

func (h *MockClientHandler) RoundTrip(request *http.Request) (*http.Response, error) {
	writer := httptest.NewRecorder()

	h.handler.ServeHTTP(writer, request)
	return writer.Result(), nil
}

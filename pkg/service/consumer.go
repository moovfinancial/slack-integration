// generated-from:6ffa42fca29b5c642bc750a8fce581be239cd5a9a341bd1c8e3be33810b59ad7 DO NOT REMOVE, DO UPDATE

package service

import (
	"context"
	"sync"

	"github.com/moov-io/base/log"
	"github.com/moovfinancial/events/go/consumer"
)

type ConsumerConfig struct {
	Brokers []string
	TLS     bool

	Key    string
	Secret string

	Topics []string
}

type Consumer interface {
	Run(ctx context.Context) error
}

func NewConsumer(logger log.Logger, config ConsumerConfig) (consumer.Consumer, error) {

	configurable := []consumer.ConfigModifier{
		consumer.Logger(logger),
	}

	saslProtocol := consumer.PlainText()
	if config.TLS {
		saslProtocol = consumer.SSL()
	}

	if config.Key != "" {
		configurable = append(configurable, consumer.SASL(config.Key, config.Secret, saslProtocol))
	}

	c, err := consumer.New(
		consumer.Brokers(config.Brokers),
		consumer.Topics(config.Topics),
		consumer.Group("slack-integration"),
		consumer.LowLatency(),
		configurable...,
	)
	if err != nil {
		return nil, err
	}

	return c, nil
}

func (env *Environment) RunConsumer(terminationListener chan error) func() {
	ctx, stopConsumer := context.WithCancel(context.Background())
	wg := sync.WaitGroup{}

	wg.Add(1)
	go func() {
		env.Logger.Info().Log("running consumer")
		err := env.Consumer.Run(ctx)
		env.Logger.Info().Log("finishing running consumer")
		wg.Done()
		if err != nil {
			terminationListener <- env.Logger.LogErrorf("error consuming - %w", err).Err()
		}
	}()

	return func() {
		env.Logger.Info().Log("shutting down kafka consumers")
		stopConsumer()
		wg.Wait()
		env.Logger.Info().Log("stopped kafka consumers")
	}
}

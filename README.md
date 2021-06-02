<!--generated-from:0b928d1de4e8b057456931b14ab199e0d9f3509d024366c5205cff7526495a7d DO NOT REMOVE, DO UPDATE -->
moovfinancial/slack-integration
===

[![GoDoc](https://godoc.org/github.com/moovfinancial/slack-integration?status.svg)](https://godoc.org/github.com/moovfinancial/slack-integration)
[![Build Status](https://github.com/moovfinancial/slack-integration/workflows/Go/badge.svg)](https://github.com/moovfinancial/slack-integration/actions)
[![Coverage Status](https://codecov.io/gh/moovfinancial/slack-integration/branch/master/graph/badge.svg)](https://codecov.io/gh/moovfinancial/slack-integration)
[![Go Report Card](https://goreportcard.com/badge/github.com/moovfinancial/slack-integration)](https://goreportcard.com/report/github.com/moovfinancial/slack-integration)
[![Apache 2 licensed](https://img.shields.io/badge/license-Apache2-blue.svg)](https://raw.githubusercontent.com/moovfinancial/slack-integration/master/LICENSE)

Handles Slack's integration into Moov. This allows Slack organizations to load up Moov off the Slack marketplace and connect to get Moov notifications into Slack channels


Docs: [docs](https://moovfinancial.github.io/slack-integration/) | [open api specification](api/api.yml)

## Architecture

![](./SlackIntegration.png)

## Project Status

This project is currently under development and could introduce breaking changes to reach a stable status. We are looking for community feedback so please try out our code or give us feedback!

## Getting Started

Read through the [project docs](docs/README.md) over here to get an understanding of the purpose of this project and how to run it.

## Getting Help

 channel | info
 ------- | -------
 [Project Documentation](docs/README.md) | Our project documentation available online.
Twitter [@moov_io](https://twitter.com/moov_io)	| You can follow Moov.IO's Twitter feed to get updates on our project(s). You can also tweet us questions or just share blogs or stories.
[GitHub Issue](https://github.com/moovfinancial/slack-integration/issues) | If you are able to reproduce a problem please open a GitHub Issue under the specific project that caused the error.
[moov-io slack](https://slack.moov.io/) | Join our slack channel (`#slack-integration`) to have an interactive discussion about the development of the project.

## Supported and Tested Platforms

- 64-bit Linux (Ubuntu, Debian), macOS, and Windows

## Contributing

Yes please! Please review our [Contributing guide](CONTRIBUTING.md) and [Code of Conduct](https://github.com/moov-io/ach/blob/master/CODE_OF_CONDUCT.md) to get started! Checkout our [issues for first time contributors](https://github.com/moovfinancial/slack-integration/contribute) for something to help out with.

This project uses [Go Modules](https://github.com/golang/go/wiki/Modules) and uses Go 1.14 or higher. See [Golang's install instructions](https://golang.org/doc/install) for help setting up Go. You can download the source code and we offer [tagged and released versions](https://github.com/moovfinancial/slack-integration/releases/latest) as well. We highly recommend you use a tagged release for production.

### Test Coverage

Improving test coverage is a good candidate for new contributors while also allowing the project to move more quickly by reducing regressions issues that might not be caught before a release is pushed out to our users. One great way to improve coverage is by adding edge cases and different inputs to functions (or [contributing and running fuzzers](https://github.com/dvyukov/go-fuzz)).

Tests can run processes (like sqlite databases), but should only do so locally.

## License

Apache License 2.0 See [LICENSE](LICENSE) for details.

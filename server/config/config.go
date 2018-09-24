package config

import (
	"fmt"

	"github.com/kelseyhightower/envconfig"
	"github.com/pkg/errors"
)

// ServiceName pass to other service.
const ServiceName = "mtc2018"

const (
	envDevelopment = "development"
	envProduction  = "production"
)

// Env stores configuration settings extract from environmental variables
// by using https://github.com/kelseyhightower/envconfig
//
// The practice getting from environmental variables comes from https://12factor.net.
type Env struct {
	// LogLevel is INFO or DEBUG. Default is "INFO".
	LogLevel string `envconfig:"LOG_LEVEL" default:"INFO"`

	// Env is environment where application is running. This value is used to
	// annotate datadog metrics or sentry error reporting. The value must be
	// "development" or "production".
	Env string `envconfig:"ENV" required:"true"`

	// DDAgentHostname is hostname where datadog agent working.
	DDAgentHostname string `envconfig:"DD_AGENT_HOSTNAME" default:"localhost"`

	// Port is port to listen.
	Port int `envconfig:"HTTP_PORT" default:"8080"`

	// UseSpanner enables spanner to persistent for like model
	UseSpanner        bool   `envconfig:"USE_SPANNER" default:"false"`
	SpannerProjectID  string `envconfig:"SPANNER_PROJECT_ID" default:""`
	SpannerInstanceID string `envconfig:"SPANNER_INSTANCE_ID" default:""`
	SpannerDatabaseID string `envconfig:"SPANNER_DATABASE_ID" default:""`
}

// validate validates
func (e *Env) validate() error {
	checks := []struct {
		bad    bool
		errMsg string
	}{
		{
			e.Env != envDevelopment && e.Env != envProduction,
			fmt.Sprintf("invalid env is specifed: %q", e.Env),
		},
	}

	for _, check := range checks {
		if check.bad {
			return errors.Errorf(check.errMsg)
		}
	}

	return nil
}

// ReadFromEnv reads configuration from environmental variables
// defined by Env struct.
func ReadFromEnv() (*Env, error) {
	var env Env
	if err := envconfig.Process("", &env); err != nil {
		return nil, errors.Wrap(err, "failed to process envconfig")
	}

	if err := env.validate(); err != nil {
		return nil, errors.Wrap(err, "validation failed")
	}

	return &env, nil
}

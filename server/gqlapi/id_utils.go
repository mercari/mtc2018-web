package gqlapi

import (
	"context"
	"fmt"
	"strconv"
	"strings"
)

func extractIntID(ctx context.Context, id string) (string, int, error) {
	ss := strings.SplitN(id, ":", 2)
	if len(ss) != 2 {
		return "", 0, fmt.Errorf("invalid id format: %s", id)
	}
	intID, err := strconv.Atoi(ss[1])
	if err != nil {
		return "", 0, err
	}

	return ss[0], intID, nil
}

func extractStringID(ctx context.Context, id string) (string, string, error) {
	ss := strings.SplitN(id, ":", 2)
	if len(ss) != 2 {
		return "", "", fmt.Errorf("invalid id format: %s", id)
	}

	return ss[0], ss[1], nil
}

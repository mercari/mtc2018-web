package gqlapi_test

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/99designs/gqlgen/handler"
	"github.com/gorilla/websocket"
	_ "github.com/mercari/mtc2018-web/server/config/statik"
	"github.com/mercari/mtc2018-web/server/gqlapi"
	"github.com/pmezard/go-difflib/difflib"
	"go.uber.org/zap"
)

func TestGraphQLEndpoint_ByTestData(t *testing.T) {
	const testFileDir = "./testdata/queries"
	const expectFileDir = "./testdata/expected"

	files, err := ioutil.ReadDir(testFileDir)
	if err != nil {
		t.Fatal(err)
	}

	resolver, err := gqlapi.NewResolver(zap.NewNop(), nil)
	if err != nil {
		t.Fatal(err)
	}

	ts := httptest.NewServer(handler.GraphQL(
		gqlapi.NewExecutableSchema(
			gqlapi.Config{
				Resolvers: resolver,
			},
		),
	))
	defer ts.Close()

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		b, err := ioutil.ReadFile(path.Join(testFileDir, file.Name()))
		if err != nil {
			t.Fatal(err)
		}
		queryString := string(b)

		t.Run(file.Name(), func(t *testing.T) {

			jsonReq := struct {
				Query string `json:"query"`
			}{
				Query: queryString,
			}
			b, err := json.Marshal(jsonReq)
			if err != nil {
				t.Fatal(err)
			}

			r, err := http.NewRequest("POST", ts.URL, bytes.NewReader(b))
			if err != nil {
				t.Fatal(err)
			}
			resp, err := http.DefaultClient.Do(r)
			if err != nil {
				t.Fatal(err)
			}
			if resp.StatusCode != 200 {
				t.Logf("status code %d, body=%s", resp.StatusCode, string(b))
			}

			actual := bytes.NewBufferString("")

			actual.WriteString("--- ")
			actual.WriteString(file.Name())
			actual.WriteString("\n")
			actual.WriteString(queryString)
			actual.WriteString("\n\n")

			b, err = ioutil.ReadAll(resp.Body)
			if err != nil {
				t.Fatal(err)
			}

			actual.WriteString("--- Result\n")
			actual.WriteString(string(b))
			actual.WriteString("\n\n")

			result := make(map[string]interface{})
			err = json.Unmarshal(b, &result)
			if err != nil {
				t.Fatal(err)
			}
			b, err = json.MarshalIndent(result, "", "  ")
			if err != nil {
				t.Fatal(err)
			}
			actual.WriteString("--- Result (formatted)\n")
			actual.WriteString(string(b))
			actual.WriteString("\n\n")

			expectFilePath := path.Join(expectFileDir, file.Name()+".txt")
			expect, err := ioutil.ReadFile(expectFilePath)
			if os.IsNotExist(err) {
				err = os.MkdirAll(path.Join(expectFileDir), 0755)
				if err != nil {
					t.Fatal(err)
				}
				err = ioutil.WriteFile(expectFilePath, actual.Bytes(), 0444)
				if err != nil {
					t.Fatal(err)
				}
				return
			} else if err != nil {
				t.Fatal(err)
			}

			if string(expect) == actual.String() {
				return
			}

			diff := difflib.UnifiedDiff{
				A:       difflib.SplitLines(string(expect)),
				B:       difflib.SplitLines(actual.String()),
				Context: 5,
			}
			d, err := difflib.GetUnifiedDiffString(diff)
			if err != nil {
				t.Fatal(err)
			}
			t.Logf("If you get an error unexpectedly, You should re-run tests with `rm gqlapi/testdata/expected`")
			t.Error(d)
		})
	}
}

type operationMessage struct {
	Payload json.RawMessage `json:"payload,omitempty"`
	ID      string          `json:"id,omitempty"`
	Type    string          `json:"type"`
}

func TestGraphQLEndpoint_Subscription(t *testing.T) {
	resolver, err := gqlapi.NewResolver(zap.NewNop(), nil)
	if err != nil {
		t.Fatal(err)
	}

	ts := httptest.NewServer(handler.GraphQL(
		gqlapi.NewExecutableSchema(
			gqlapi.Config{
				Resolvers: resolver,
			},
		),
	))
	defer ts.Close()

	createLike := func(t *testing.T, id int) {
		t.Helper()
		query := fmt.Sprintf(`
mutation {
  createLike (input: {uuid: "aaaa", sessionId: %d}) {
    clientMutationId
    like {
      id
      session {
        id
        title
      }
    }
  }
}
`, id)

		jsonReq := struct {
			Query string `json:"query"`
		}{
			Query: query,
		}
		b, err := json.Marshal(jsonReq)
		if err != nil {
			t.Fatal(err)
		}

		r, err := http.NewRequest("POST", ts.URL, bytes.NewReader(b))
		if err != nil {
			t.Fatal(err)
		}
		resp, err := http.DefaultClient.Do(r)
		if err != nil {
			t.Fatal(err)
		}
		if resp.StatusCode != 200 {
			t.Logf("status code %d, body=%s", resp.StatusCode, string(b))
		}
	}

	t.Run("Single", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		c, _, err := websocket.DefaultDialer.DialContext(ctx, strings.Replace(ts.URL, "http://", "ws://", -1), nil)
		if err != nil {
			t.Fatal(err)
		}

		go func() {
			select {
			case <-ctx.Done():
				c.Close()
			}
		}()

		err = c.WriteJSON(&operationMessage{Type: "connection_init"})
		if err != nil {
			t.Fatal(err)
		}

		var msg operationMessage
		if err := c.ReadJSON(&msg); err != nil {
			t.Fatal(err)
		}
		if want, got := "connection_ack", msg.Type; want != got {
			t.Fatalf("want %v, but got %v", want, got)
		}

		err = c.WriteJSON(&operationMessage{
			Type:    "start",
			ID:      "xxx1",
			Payload: json.RawMessage(`{"query": "subscription { likeAdded(sessionId: 12) { sessionId likes } }"}`),
		})
		if err != nil {
			t.Fatal(err)
		}

		createLike(t, 12)

		if err := c.ReadJSON(&msg); err != nil {
			t.Fatal(err)
		}
		want := `{"data":{"likeAdded":{"sessionId":12,"likes":1}}}`
		if got := string(msg.Payload); want != got {
			t.Fatalf("want %v, but %v", want, got)
		}

		createLike(t, 12)
		createLike(t, 12)
		createLike(t, 13)

		if err := c.ReadJSON(&msg); err != nil {
			t.Fatal(err)
		}
		want = `{"data":{"likeAdded":{"sessionId":12,"likes":2}}}`
		if got := string(msg.Payload); want != got {
			t.Fatalf("want %v, but %v", want, got)
		}

		err = c.WriteJSON(&operationMessage{Type: "stop", ID: "xxx1"})
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("Complex", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
		defer cancel()

		c, _, err := websocket.DefaultDialer.DialContext(ctx, strings.Replace(ts.URL, "http://", "ws://", -1), nil)
		if err != nil {
			t.Fatal(err)
		}

		go func() {
			select {
			case <-ctx.Done():
				c.Close()
			}
		}()

		err = c.WriteJSON(&operationMessage{Type: "connection_init"})
		if err != nil {
			t.Fatal(err)
		}

		var msg operationMessage
		if err := c.ReadJSON(&msg); err != nil {
			t.Fatal(err)
		}
		if want, got := "connection_ack", msg.Type; want != got {
			t.Fatalf("want %v, but got %v", want, got)
		}

		err = c.WriteJSON(&operationMessage{
			Type:    "start",
			ID:      "xxx1",
			Payload: json.RawMessage(`{"query": "subscription { likeAdded(sessionId: 13) { likes } }"}`),
		})
		if err != nil {
			t.Fatal(err)
		}

		go func() {
			for i := 0; i < 25; i++ {
				createLike(t, 13)
				time.Sleep(100 * time.Millisecond)
			}
			time.Sleep(2500 * time.Millisecond)
			c.Close()
		}()
		go func() {
			for i := 0; i < 40; i++ {
				createLike(t, 14)
				createLike(t, 11)
				time.Sleep(50 * time.Millisecond)
			}
		}()

		var sum int
		r := regexp.MustCompile(`{"data":{"likeAdded":{"likes":(\d+)}}}`)
		for {
			err := c.ReadJSON(&msg)
			if err != nil {
				break
			}
			match := r.FindStringSubmatch(string(msg.Payload))
			if len(match) != 2 {
				t.Fatalf("not match: %q", string(msg.Payload))
			}
			n, err := strconv.Atoi(match[1])
			if err != nil {
				t.Fatalf("not match: %q", string(msg.Payload))
			}
			sum += n
		}

		if sum != 25 {
			// flushのタイミングのせいか不安定かも
			t.Fatalf("matched likes should be 25, but got %v", sum)
		}
	})
}

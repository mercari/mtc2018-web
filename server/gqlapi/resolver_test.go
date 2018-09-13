package gqlapi_test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"path"
	"testing"

	"github.com/99designs/gqlgen/handler"
	"github.com/mercari/mtc2018-web/server/gqlapi"
	"github.com/pmezard/go-difflib/difflib"
)

func TestGraphQLEndpoint_ByTestData(t *testing.T) {
	const testFileDir = "./testdata/queries"
	const expectFileDir = "./testdata/expected"

	files, err := ioutil.ReadDir(testFileDir)
	if err != nil {
		t.Fatal(err)
	}

	resolver, err := gqlapi.NewResolver()
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

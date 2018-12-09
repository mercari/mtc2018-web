# MTC 2018 - server side

## ざっくりした構成

* `domains/` 適当にdomain的なコードを置く
    * `hoge_model.go` 適当にHogeモデルに関するコードを置く
    * `hoge_repo.go` 適当にHogeに関するDB周りのコードを置く
    * `hoge_service.go` 適当にHogeに関するビジネスロジックを置く
        * 基本Mutation関連 Query系はなるべくRepoを使う
* `graphqlapi/` 適当にGraphQLエンドポイント関係のコードを置く
    * `graph/` 適当にgqlgenに生成させたコードを置く
* `cmd/mtcserver/` 適当に `package main` する

## ざっくりした技術

* GraphQLでRPC全部片付ける
* 適当にSpanner
* 適当にDocker image作っておけばgusuriさんが後はなんとかしてくれる
* 適当にCircle CIとGoogle Container Registryにグッてする
* 適当にSNSログインできるようにする


## 動かし方

```
$ go version
go version go1.11 darwin/amd64
$ export GO111MODULE=on
$ export ENV=development
$ go run cmd/mtcserver/main.go
$ open http://localhost:8080/
```

```
$ docker build -t mtcserver .
$ docker run -it --env ENV=development -p 8080:8080 mtcserver
$ open http://localhost:8080/
```

### Yo

yoはメルカリ社内で試行錯誤中のSpanner用ライブラリです。
OSSになるといいなと思っていますが今のところクローズドです。
yoは実行時には必要がないのと、生成されるソースコードはリポジトリにコミットするのでコマンドのバイナリが手に入らなくても短期的には問題ありません。
```
# yoを実行して権限がないエラーが出る時
$ yo $PROJECT_NAME $INSTANCE_NAME $DATABASE_NAME -o models
error: spanner: code = "Unknown", desc = "dialing fails for channel[0], google: could not find default credentials. See https://developers.google.com/accounts/docs/application-default-credentials for more information."
# SpannerのあるGCPプロジェクトに権限を持っていればこれでごまかせる
#   or https://cloud.google.com/docs/authentication/production
$ gcloud auth application-default login
```

## クエリの叩き方

stg環境のパスは内緒なので社のSlackで聞いてください。

ローカルで動かして試すには次のパスから
http://localhost:8080/2018/api/playground

受け付けてくれるクエリの例は次の通り

```
query {
  sessionList(first: 100) {
    nodes {
      id
      title
      speakers {
        id
        name
      }
    }
  }
}
```

```
subscription {
  likeAdded {
    id
    sessionID
  }
}
```

```
mutation {
  createLike(input: {
    clientMutationId: "qawesrdftgyhujiko" # 適当なUUIDとかでよい
    sessionID: "U2Vzc2lvbjox"             # queryで得られたsessionのID
  }) {
    clientMutationId
    like {
      id
      sessionID
    }
  }
}
```

curlで叩く

```
$ curl http://localhost:8080/2018/api/query -X POST -H "Content-Type: application/json" -d '{"query":"{sessionList(first: 100) { nodes { id title } } }"}'
...
```

## GraphQL Schemaを変更したときのテストのやり方

1. `gqlapi/testdata/queries` にスキーマ変更を反映したクエリを置く
2. `gqlapi/testdata/expected` フォルダを削除する
3. `test.sh` を実行する
4. `gqlapi/testdata/expected` にクエリの実行結果が保存される
5. 4.の差分を確認してOKなら `git commit` する

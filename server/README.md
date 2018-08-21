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
# before go 1.11 release
$ go get golang.org/dl/go1.11rc1
$ go1.11rc1 download
$ alias go=go1.11rc1

$ go run cmd/mtcserver/main.go
$ open http://localhost:8080/
```

```
$ docker build -t mtcserver .
$ docker run -it -p 8080:8080 mtcserver
$ open http://localhost:8080/
```

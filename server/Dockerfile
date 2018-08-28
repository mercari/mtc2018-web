FROM golang:1.11rc1-alpine AS build-env

WORKDIR /go/src/github.com/mercari/mtc2018-web/server
COPY . .
# ENV GO111MODULE on

RUN apk --update add make git gcc
RUN go get github.com/golang/dep/cmd/dep
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure -v -vendor-only

COPY . ./

# なんかビルドコケる https://github.com/golang/go/issues/26722 これ？
RUN go build -o mtcserver -a -tags netgo -installsuffix netgo ./cmd/mtcserver/main.go
# RUN go build -o mtcserver -a -tags netgo -installsuffix netgo github.com/mercari/mtc2018-web/server/cmd/mtcserver


FROM alpine

COPY --from=build-env /go/src/github.com/mercari/mtc2018-web/server/mtcserver /usr/local/bin/mtcserver
RUN apk add --no-cache --update ca-certificates

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/mtcserver"]

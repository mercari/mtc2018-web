FROM golang:1.11beta3-alpine AS build-env

WORKDIR /go/src/app
COPY . .
ENV GO111MODULE on

# なんかビルドコケる https://github.com/golang/go/issues/26722 これ？
# RUN go build -o mtcserver -a -tags netgo -installsuffix netgo cmd/mtcserver/main.go
RUN go build -o mtcserver -a -tags netgo -installsuffix netgo github.com/mercari/mtc2018-web/server/cmd/mtcserver


FROM alpine

COPY --from=build-env /go/src/app/mtcserver /usr/local/bin/mtcserver
RUN apk add --no-cache --update ca-certificates

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/mtcserver"]

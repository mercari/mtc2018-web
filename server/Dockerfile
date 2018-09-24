FROM golang:1.11-alpine AS build-env

WORKDIR /go/src/app
COPY . .
ENV GO111MODULE on

RUN apk --update add git gcc g++
RUN go build -o mtcserver -a -tags netgo -installsuffix netgo github.com/mercari/mtc2018-web/server/cmd/mtcserver


FROM alpine

COPY --from=build-env /go/src/app/mtcserver /usr/local/bin/mtcserver
RUN apk add --no-cache --update ca-certificates

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/mtcserver"]

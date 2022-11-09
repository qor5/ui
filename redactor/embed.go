package redactor

import (
	"bytes"
	"embed"

	"github.com/qor5/web"
)

//go:embed assets
var box embed.FS

func JSComponentsPack() web.ComponentsPack {
	var js [][]byte
	j1, err := box.ReadFile("assets/redactor.min.js")
	if err != nil {
		panic(err)
	}
	v3, err := box.ReadFile("assets/vue-redactor.js")
	if err != nil {
		panic(err)
	}
	js = append(js, j1, v3)
	return web.ComponentsPack(bytes.Join(js, []byte("\n\n")))
}

func CSSComponentsPack() web.ComponentsPack {
	c, err := box.ReadFile("assets/redactor.min.css")
	if err != nil {
		panic(err)
	}
	return web.ComponentsPack(c)
}

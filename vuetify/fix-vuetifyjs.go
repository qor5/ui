package vuetify

import (
	"embed"
	"strings"

	"github.com/qor5/web"
)

//go:embed dist
var assetsbox embed.FS

func JSComponentsPack() web.ComponentsPack {
	v, err := assetsbox.ReadFile("dist/vuetify.min.js")
	if err != nil {
		panic(err)
	}

	return web.ComponentsPack(v)
}

func CSSComponentsPack() web.ComponentsPack {
	v, err := assetsbox.ReadFile("dist/vuetify.min.css")
	if err != nil {
		panic(err)
	}

	return web.ComponentsPack(v)
}

const initVuetify = `
(window.__goplaidVueComponentRegisters =
	window.__goplaidVueComponentRegisters || []).push(function(app, vueOptions) {
		app.use(Vuetify.createVuetify({{vuetifyOpts}}));
	});
`

const defaultVuetifyOpts = `{
	icons: {
		// defaultSet: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
	},
}`

func Vuetify(opts string) web.ComponentsPack {
	if opts == "" {
		opts = defaultVuetifyOpts
	}
	return web.ComponentsPack(
		strings.NewReplacer("{{vuetifyOpts}}", opts).
			Replace(initVuetify),
	)
}

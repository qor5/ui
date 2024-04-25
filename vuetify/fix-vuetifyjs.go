package vuetify

import (
	"embed"
	"os"
	"strings"

	"github.com/qor5/web/v3"
)

//go:embed dist
var assetsbox embed.FS

//go:embed vuetifyjs/dist
var vuetifyjs embed.FS

var customizeVuetifyCSS = os.Getenv("CUSTOMIZE_VUETIFY_CSS") != ""

func JSComponentsPack() web.ComponentsPack {
	v, err := assetsbox.ReadFile("dist/vuetify.min.js")
	if err != nil {
		panic(err)
	}
	return web.ComponentsPack(v)
}

func CSSComponentsPack() web.ComponentsPack {
	var v []byte
	var err error
	if customizeVuetifyCSS {
		v, err = vuetifyjs.ReadFile("vuetifyjs/dist/index.css")
	} else {
		v, err = assetsbox.ReadFile("dist/vuetify.min.css")
	}
	if err != nil {
		panic(err)
	}
	return web.ComponentsPack(v)
}

const initVuetify = `
window.__goplaidVueComponentRegisters = window.__goplaidVueComponentRegisters || [];
window.__goplaidVueComponentRegisters.push(function(app, vueOptions) {
		app.use(Vuetify.createVuetify({{vuetifyOpts}}));
	});
`

const defaultVuetifyOpts = `{
	icons: {
		// defaultSet: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
	},
	  theme: {
		themes: {
		  qor5: {
			dark: false,
			colors: {
			  primary:   "#3E63DD",
			  secondary: "#5B6471",
			  accent:    "#82B1FF",
			  error:     "#82B1FF",
			  info:      "#0091FF",
			  success:   "#30A46C",
			  warning:   "#F76808",
			}
		  },
		},
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

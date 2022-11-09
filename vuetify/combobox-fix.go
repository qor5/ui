package vuetify

import (
	"github.com/qor5/web"
)

func (b *VComboboxBuilder) FieldName(v string) (r *VComboboxBuilder) {
	b.tag.Attr(web.VFieldName(v)...)
	return b
}

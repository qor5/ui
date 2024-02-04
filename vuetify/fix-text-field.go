package vuetify

import (
	"github.com/qor5/web"
)

func (b *VTextFieldBuilder) FieldName(v string) (r *VTextFieldBuilder) {
	b.tag.Attr(web.VFieldName(v)...)
	return b
}

func (b *VTextFieldBuilder) ErrorMessages(v ...string) (r *VTextFieldBuilder) {
	SetErrorMessages(b.tag, v)
	return b
}

func (b *VTextFieldBuilder) Value(v interface{}) (r *VTextFieldBuilder) {
	b.ModelValue(v)
	return b
}

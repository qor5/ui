package vuetify

import (
	"github.com/qor5/web"
)

func (b *VTextareaBuilder) FieldName(v string) (r *VTextareaBuilder) {
	b.tag.Attr(web.VFieldName(v)...)
	return b
}

func (b *VTextareaBuilder) ErrorMessages(v ...string) (r *VTextareaBuilder) {
	SetErrorMessages(b.tag, v)
	return b
}

func (b *VTextareaBuilder) Value(v interface{}) (r *VTextareaBuilder) {
	b.ModelValue(v)
	return b
}

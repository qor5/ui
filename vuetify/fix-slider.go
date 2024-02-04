package vuetify

import (
	"github.com/qor5/web"
)

func (b *VSliderBuilder) ErrorMessages(v ...string) (r *VSliderBuilder) {
	SetErrorMessages(b.tag, v)
	return b
}

func (b *VSliderBuilder) FieldName(v string) (r *VSliderBuilder) {
	b.tag.Attr(web.VFieldName(v)...)
	return b
}

func (b *VSliderBuilder) Value(v interface{}) (r *VSliderBuilder) {
	b.ModelValue(v)
	return b
}

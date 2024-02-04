package vuetify

import (
	"github.com/qor5/web"
)

func (b *VChipGroupBuilder) FieldName(v string) (r *VChipGroupBuilder) {
	b.tag.Attr(web.VFieldName(v)...)
	return b
}

func (b *VChipGroupBuilder) Value(v interface{}) (r *VChipGroupBuilder) {
	b.ModelValue(v)
	return b
}

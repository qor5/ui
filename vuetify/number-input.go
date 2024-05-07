package vuetify

import (
	"context"
	"fmt"

	h "github.com/theplant/htmlgo"
)

type VNumberInputBuilder struct {
	tag *h.HTMLTagBuilder
}

func VNumberInput(children ...h.HTMLComponent) (r *VNumberInputBuilder) {
	r = &VNumberInputBuilder{
		tag: h.Tag("v-number-input").Children(children...),
	}
	return
}

func (b *VNumberInputBuilder) Label(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("label", v)
	return b
}

func (b *VNumberInputBuilder) ControlVariant(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":control-variant", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) Inset(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":inset", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) HideInput(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":hide-input", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Min(v int) (r *VNumberInputBuilder) {
	b.tag.Attr(":min", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Max(v int) (r *VNumberInputBuilder) {
	b.tag.Attr(":max", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Step(v int) (r *VNumberInputBuilder) {
	b.tag.Attr(":step", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Hint(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("hint", v)
	return b
}

func (b *VNumberInputBuilder) PersistentHint(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":persistent-hint", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Reverse(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":reverse", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Density(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":density", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) Theme(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("theme", v)
	return b
}

func (b *VNumberInputBuilder) Disabled(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":disabled", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Error(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":error", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Readonly(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":readonly", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) ModelValue(v int) (r *VNumberInputBuilder) {
	b.tag.Attr(":model-value", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) Focused(v bool) (r *VNumberInputBuilder) {
	b.tag.Attr(":focused", fmt.Sprint(v))
	return b
}

func (b *VNumberInputBuilder) HideDetails(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":hide-details", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) BgColor(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("bg-color", v)
	return b
}

func (b *VNumberInputBuilder) Color(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("color", v)
	return b
}

func (b *VNumberInputBuilder) BaseColor(v string) (r *VNumberInputBuilder) {
	b.tag.Attr("base-color", v)
	return b
}

func (b *VNumberInputBuilder) Variant(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":variant", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) Loading(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":loading", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) Rounded(v interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(":rounded", h.JSONString(v))
	return b
}

func (b *VNumberInputBuilder) SetAttr(k string, v interface{}) {
	b.tag.SetAttr(k, v)
}

func (b *VNumberInputBuilder) Attr(vs ...interface{}) (r *VNumberInputBuilder) {
	b.tag.Attr(vs...)
	return b
}

func (b *VNumberInputBuilder) Children(children ...h.HTMLComponent) (r *VNumberInputBuilder) {
	b.tag.Children(children...)
	return b
}

func (b *VNumberInputBuilder) AppendChildren(children ...h.HTMLComponent) (r *VNumberInputBuilder) {
	b.tag.AppendChildren(children...)
	return b
}

func (b *VNumberInputBuilder) PrependChildren(children ...h.HTMLComponent) (r *VNumberInputBuilder) {
	b.tag.PrependChildren(children...)
	return b
}

func (b *VNumberInputBuilder) Class(names ...string) (r *VNumberInputBuilder) {
	b.tag.Class(names...)
	return b
}

func (b *VNumberInputBuilder) ClassIf(name string, add bool) (r *VNumberInputBuilder) {
	b.tag.ClassIf(name, add)
	return b
}

func (b *VNumberInputBuilder) On(name string, value string) (r *VNumberInputBuilder) {
	b.tag.Attr(fmt.Sprintf("v-on:%s", name), value)
	return b
}

func (b *VNumberInputBuilder) Bind(name string, value string) (r *VNumberInputBuilder) {
	b.tag.Attr(fmt.Sprintf("v-bind:%s", name), value)
	return b
}

func (b *VNumberInputBuilder) MarshalHTML(ctx context.Context) (r []byte, err error) {
	return b.tag.MarshalHTML(ctx)
}

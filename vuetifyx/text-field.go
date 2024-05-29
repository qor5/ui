package vuetifyx

import (
	"context"

	v "github.com/qor5/ui/v3/vuetify"
	"github.com/qor5/web/v3"

	h "github.com/theplant/htmlgo"
)

type VXTextFieldBuilder struct {
	label    string
	readOnly bool
	dense    string
	formKey  string
	value    string
	class    string
}

func VXTextField() *VXTextFieldBuilder {
	return &VXTextFieldBuilder{}
}

func (b *VXTextFieldBuilder) Label(label string) *VXTextFieldBuilder {
	b.label = label
	return b
}

func (b *VXTextFieldBuilder) ReadOnly(readOnly bool) *VXTextFieldBuilder {
	b.readOnly = readOnly
	return b
}

func (b *VXTextFieldBuilder) Dense(dense string) *VXTextFieldBuilder {
	b.dense = dense
	return b
}

func (b *VXTextFieldBuilder) Value(value string) *VXTextFieldBuilder {
	b.value = value
	return b
}

func (b *VXTextFieldBuilder) VField(formKey, value string) *VXTextFieldBuilder {
	b.formKey = formKey
	b.value = value
	return b
}

func (b *VXTextFieldBuilder) Class(class string) *VXTextFieldBuilder {
	b.class = class
	return b
}

func (b *VXTextFieldBuilder) MarshalHTML(ctx context.Context) (r []byte, err error) {
	var labelStyle string = "font-size:16px; font-weight:500;"
	var label h.HTMLComponent
	if b.label != "" {
		label = h.Div(h.Span(b.label).Style(labelStyle)).Class("mb-2")
	}
	if b.readOnly {
		div := h.Div().Class(b.class)
		if b.label != "" {
			div.AppendChildren(label)
		}
		div.AppendChildren(
			h.Div(h.Span(b.value)),
		)
		return div.MarshalHTML(ctx)
	}

	content := v.VTextField().HideDetails(true).
		Variant(v.VariantOutlined).Density(v.DensityCompact).
		Attr(web.VField(b.formKey, b.value)...)
	return h.Div(
		label,
		content,
	).Class(b.class).MarshalHTML(ctx)
}

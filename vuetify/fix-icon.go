package vuetify

func VIcon(name string) (r *VIconBuilder) {
	r = &VIconBuilder{}
	r.Icon(name)
	return
}

API=/opt/homebrew/lib/node_modules/vuetify/dist/json/web-types.json
if [ -f "$API" ]; then
  echo ""
else
  npm -g install vuetify@latest
fi
find *.go | grep -v "fix-" | xargs rm
cat $API | vuetifyapi2go -comp=all
curl https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.min.js > dist/vuetify.min.js
curl https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.min.css > dist/vuetify.min.css

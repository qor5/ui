mkdir -p dist
curl https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.min.js > dist/vuetify.min.js
cd vuetifyjs && pnpm build

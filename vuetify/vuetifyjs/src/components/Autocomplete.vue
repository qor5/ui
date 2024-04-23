<template>
  <v-autocomplete label="Autocomplete" :items="items"></v-autocomplete>
</template>
<script>
export default {
  data() {
    return {
      items: ["foo", "bar", "baz"],
    };
  },
};
</script>

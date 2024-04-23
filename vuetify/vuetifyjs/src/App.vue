<template>
  <v-app>
    <v-main>
      <h3>Button</h3>
      <Button></Button>

      <h3>Table</h3>
      <Table></Table>

      <h3>Autocomplete</h3>
      <Autocomplete></Autocomplete>
    </v-main>
  </v-app>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Table from "@/components/Table.vue";
import Autocomplete from "@/components/Autocomplete.vue";
</script>

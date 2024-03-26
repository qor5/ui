<template>
  <v-navigation-drawer> </v-navigation-drawer>
  <v-card class="mx-auto my-12" max-width="344" elevation="16">
    <v-toolbar extended prominen color="white" dark>
      <v-toolbar-title>Q O R </v-toolbar-title>

      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-col cols="auto">
            <v-btn variant="plain" icon>
              <v-icon>mdi-information</v-icon>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <v-app-bar-nav-icon icon="mdi-menu" class="text-grey-darken-1"></v-app-bar-nav-icon>
      </div>
    </v-toolbar>

    <v-card rounded="0" variant="text">
      <v-list lines="two" class="overflow-auto">
        <v-list-item v-for="(item, i) in leftMenuItems" :key="i" :value="item" color="primary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title" class="text-grey-darken-1"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <v-divider></v-divider>
    <v-row class="mx-2 my-2" align="center">
      <v-col cols="auto">
        <v-avatar color="blue" size="48" class="rounded-lg">
          <span class="text-h5">{{ userProfile.initials }}</span>
        </v-avatar>
      </v-col>
      <v-col cols="auto">
        <span class="text-sm-body-2 text-grey-darken-1">{{ userProfile.nickname }}</span>
      </v-col>
      <v-col cols="auto" class="d-flex justify-center align-center">
        <v-btn
          density="compact"
          variant="text"
          icon="mdi-chevron-right"
          class="text-grey-darken-1"
        ></v-btn>
      </v-col>
      <v-divider vertical class="my-2"></v-divider>
      <v-col cols="auto" class="d-flex justify-center align-center">
        <v-btn variant="text" icon="mdi-bell-outline" class="text-grey-darken-1"></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const userProfile = ref({
  initials: 'VJ',
  nickname: 'Peterson Lee',
  age: 25
})
const order = ref(0)
const leftMenuItems = ref([
  {
    icon: 'mdi-information-outline',
    title: 'Dashboard'
  },
  {
    icon: 'mdi-information-outline',
    title: 'Identities'
  },
  {
    icon: 'mdi-information-outline',
    title: 'Authentication'
  },
  {
    icon: 'mdi-information-outline',
    title: 'Account Experience'
  }
])
</script>

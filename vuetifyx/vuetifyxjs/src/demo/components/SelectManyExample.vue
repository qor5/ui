<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const items = ref([{
  label: 'test1',
  shared: true
},
  {
    label: 'test2',
    shared: true
  }
])
</script>
<template>

  <!--  <v-sheet class='pa-4 pt-2'>-->
  <v-card :variant='"outlined"'>
    <v-list>
      <draggable item-key='model_id' v-model='items' handle='.handle' animation='300'>
        <template #item=' { element } '>
          <div>
            <v-list-item class='pl-0'>
              <template v-slot:prepend>
                <v-btn :icon='"mdi-drag"' class='handle my-2 ml-1 mr-1'></v-btn>

                <v-list-item-title v-text="element.label"></v-list-item-title>
              </template>

              <template v-slot:append>
                <v-btn :icon='"mdi-pencil"' :size='"small"' class='my-2'></v-btn>

                <v-btn :icon='"mdi-eye"' :size='"small"' class='my-2'></v-btn>

                <v-menu transition='fab-transition'>
                  <template v-slot:activator='{ props }'>
                    <v-btn :icon='"mdi-dots-horizontal"' v-bind='props' :variant='"text"' :size='"small"'></v-btn>
                  </template>

                  <v-list :density='"compact"'>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon :icon='"mdi-pencil"'></v-icon>
                      </template>

                      <v-list-item-title>Rename</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon :icon='"mdi-delete"'></v-icon>
                      </template>

                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon :icon='"mdi-share"'></v-icon>
                      </template>

                      <v-list-item-title>Mark As Shared Container</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </div>

        </template>

      </draggable>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon :icon='"mdi-plus"' color='primary'></v-icon>
        </template>

        <v-list-item-title>
          <v-btn color='primary' :variant='"text"'>Add Containers</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  <!--  </v-sheet>-->


</template>

<style scoped></style>

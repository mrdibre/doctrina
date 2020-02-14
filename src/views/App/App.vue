<template>
  <v-content>
    <Menu/>
    <v-row class="d-flex justify-center ma-0 fill-height">
      <v-col cols="12" sm="12" md="10" lg="8">
        <v-container class="fill-height d-flex justify-center align-start pa-2 py-10" fluid>
          <v-slide-y-reverse-transition mode="out-in">
            <router-view/>
          </v-slide-y-reverse-transition>
        </v-container>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>

  import Menu from "../../components/Menu/Menu"

  export default {
    name: "App",
    components: {
      Menu
    }
  }

</script>

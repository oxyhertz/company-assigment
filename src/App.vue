<template>
  <main class="app-wrapper">
    <AppHeader />
    <Notification />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/main/AppHeader.vue';
import Notification from './components/base/Notification.vue';
export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    Notification
  },
  created() {
    this.loadCompanies();
  },
  methods: {
    loadCompanies() {
      this.$store.dispatch('loadCompanies');
    }
  }
});
</script>

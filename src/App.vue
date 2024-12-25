<template>
  <div class="app">
    <AppHeader />
    <Notification />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AppHeader from './components/main/AppHeader.vue';
import Notification from './components/base/Notification.vue';
export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    Notification
  }
});
</script>

<style scoped></style>
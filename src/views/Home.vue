<template>
    <main class="home">
        <h1>Welcome To My home</h1>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { showSuccessMsg } from "@/services/event-bus.service";
export default defineComponent({
    name: "Home",
    mounted() {
        showSuccessMsg("Welcome to my home");
    },
});
</script>

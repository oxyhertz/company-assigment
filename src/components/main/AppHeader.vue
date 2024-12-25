<template>
    <header class="app-header">
        <router-link class="main-logo" to="/">
            <img height="42"
                src="https://cdn.prod.website-files.com/61e95e54543a7c0a5967ffd1/635a79ad72a1555286e378b9_RunAi_Logo_Digital_2C_BP.svg"
                alt="Main Logo" />
        </router-link>
        <template v-if="companies">
            <router-link class="header-link" v-for="company in companies" :key="company._id"
                :to="'/company/' + company._id">
                {{ company.name }}
            </router-link>
        </template>

    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App Header',
    computed: {
        companies() {
            console.log("🚀 ~ companies ~ this.$store.getters.companies;:", this.$store.getters.companies)
            return this.$store.getters.companies;
        }
    }
});
</script>

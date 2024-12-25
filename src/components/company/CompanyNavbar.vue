<template>
    <nav class="company-navbar">
        <router-link :to="`/company/${currCompanyId}`">Departments</router-link>
        <router-link :to="`/company/${currCompanyId}/employee`">Employees</router-link>
    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Company Navbar',
    props: {
        currCompanyId: {
            type: String,
            required: true
        }
    },
    created() {
        this.currCompanyId
        console.log("🚀 ~ created ~   this.currCompanyId:", this.currCompanyId)

    },

});
</script>

<style scoped></style>
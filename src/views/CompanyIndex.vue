<template>
    <section class="company-index">
        <CompanyNavbarVue />
        <div v-if="company" class="company-details-container">
            <div class="company-details">
                <h1>{{ company?.name }}</h1>
            </div>
        </div>
    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { Company } from '@/types/company/company';
import CompanyNavbarVue from '@/components/company/CompanyNavbar.vue';
export default defineComponent({
    name: 'Company Index',
    methods: {
        async loadCompany() {
            try {
                await this.$store.dispatch({ type: 'loadCompany', companyId: this.currCompanyId });
            } catch (error) {

            }
        }
    },
    computed: {
        currCompanyId(): string {
            return this.$route.params.companyId as string;
        },
        company(): Company | null {
            return this.$store.getters.currentCompany;
        }
    },
    watch: {
        currCompanyId: {
            async handler() {
                this.loadCompany();
            },
            immediate: true,
        },
    },
    components: {
        CompanyNavbarVue,
    },
});
</script>

<style scoped></style>
<template>
    <section class="company-index">
        <CompanyNavbarVue />
        <div v-if="company" class="company-details-container">
            <div class="company-details">
                <h1>{{ company?.name }}</h1>
            </div>
            <router-view @add-department="onAddDepartment" @remove-department="onRemoveDepartment" />
        </div>
        <div v-else>
            <h2>Loading...</h2>
        </div>
        <Modal :isOpen="isRemoveDepartmentModalOpen" @close="isRemoveDepartmentModalOpen = false">
            <div class="modal-content">
                <h2>Are you sure you want to remove this department?</h2>
                <div class="modal-buttons">
                    <button @click="isRemoveDepartmentModalOpen = false">Cancel</button>
                    <button @click="onRemoveDepartment(departmentId)">Remove</button>
                </div>
            </div>
        </Modal>
    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { Company } from '@/types/company/company';
import CompanyNavbarVue from '@/components/company/CompanyNavbar.vue';
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service';
import { DepartmentToSave } from '@/types/company/department';
import Modal from '@/components/base/Modal.vue';
export default defineComponent({
    name: 'Company Index',
    data() {
        return {
            isRemoveDepartmentModalOpen: false,
            departmentId: null as null | string,
        }
    },
    methods: {
        async loadCompany() {
            try {
                await this.$store.dispatch({ type: 'loadCompany', companyId: this.currCompanyId });
            } catch (error) {

            }
        },
        openRemoveDepartmentModal(departmentId: string) {
            this.departmentId = departmentId;
            this.isRemoveDepartmentModalOpen = true;
        },
        async onRemoveDepartment() {
            try {
                await this.$store.dispatch({ type: 'removeDepartment', departmentId: this.departmentId });
                showSuccessMsg('Department removed successfully');
            } catch (error) {
                showErrorMsg('Failed to remove department');
            }
        },
        async onAddDepartment(department: DepartmentToSave) {
            try {
                await this.$store.dispatch({ type: 'addDepartment', department });
                showSuccessMsg('Department added successfully');
            } catch (error) {
                showErrorMsg('Failed to add department');
            }
        },
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
        CompanyNavbarVue, Modal

    },
});
</script>

<style scoped></style>
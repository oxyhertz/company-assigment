<template>
    <section class="department-table">
        <div class="header">
            <h2>Departments</h2>
            <button @click="openEditDepartmentModal">Add Department</button>
        </div>
        <div class="row header-row">
            <div class="cell" v-for="header in headers" :key="header.text">
                <span>{{ header.text }}</span>
            </div>
        </div>
        <DepartmentPreview v-for="department in departments" :key="department._id" :department="department"
            @remove-department="removeDepartment" />
        <Modal :isOpen="isAddDepartmentModalOpen" @close="closeAddDepartmentModal">
            <DepartmentEdit @save="addDepartment" @cancel="closeAddDepartmentModal" />
        </Modal>
    </section>
</template>

<script lang="ts">
import { Department, DepartmentToSave } from '@/types/company/department';
import { defineComponent, PropType } from 'vue';
import DepartmentPreview from '@/components/company/DepartmentPreview.vue';
import Modal from '../base/Modal.vue';
import DepartmentEdit from './DepartmentEdit.vue';
export default defineComponent({
    name: 'Department Table',
    emits: ['remove-department', 'add-department'],
    data() {
        return {
            isAddDepartmentModalOpen: false,
            headers: [
                { text: 'Name' },
                { text: 'Description' },
                { text: 'Actions' },
            ],
        }
    },
    methods: {
        removeDepartment(departmentId: string) {
            this.$emit('remove-department', departmentId);
        },
        addDepartment(department: DepartmentToSave) {
            this.$emit('add-department', department);
            this.closeAddDepartmentModal()
        },
        closeAddDepartmentModal() {
            this.isAddDepartmentModalOpen = false;
        },
        openEditDepartmentModal() {
            this.isAddDepartmentModalOpen = true;
        }
    },
    computed: {
        departments(): Department[] {
            return this.$store.getters.currentCompany?.departments || [];
        }
    },
    components: {
        DepartmentPreview,
        DepartmentEdit,
        Modal
    },
});
</script>

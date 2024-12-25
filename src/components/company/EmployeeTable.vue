<template>
    <section class="employee-table">
        <div class="header">
            <h2>Employees</h2>
            <button @click="openEditEmployeeModal">Add Employee</button>
        </div>
        <div class="row header-row">
            <div class="cell" v-for="header in headers" :key="header.text">
                <span>{{ header.text }}</span>
            </div>
        </div>
        <EmployeePreview v-for="employee in employees" :key="employee._id" :employee="employee"
            @remove-employee="removeEmployee" />
        <Modal :isOpen="isAddEmployeeModalOpen" @close="closeAddEmployeeModal">
            <EmployeeEdit @save="addEmployee" @cancel="closeAddEmployeeModal" />
        </Modal>
    </section>
</template>

<script lang="ts">
import { Employee, EmployeeToSave } from '@/types/company/employee';
import { defineComponent } from 'vue';
import EmployeePreview from '@/components/company/EmployeePreview.vue';
import Modal from '../base/Modal.vue';
import EmployeeEdit from './EmployeeEdit.vue';
export default defineComponent({
    name: 'Employee Table',
    emits: ['remove-employee', 'add-employee'],
    data() {
        return {
            isAddEmployeeModalOpen: false,
            headers: [
                { text: 'Name' },
                { text: 'Role' },
                { text: 'Department' },
                { text: 'Actions' },
            ],
        }
    },
    methods: {
        removeEmployee(employeeId: string) {
            this.$emit('remove-employee', employeeId);
        },
        addEmployee(employee: EmployeeToSave) {
            this.$emit('add-employee', employee);
            this.closeAddEmployeeModal()
        },
        closeAddEmployeeModal() {
            this.isAddEmployeeModalOpen = false;
        },
        openEditEmployeeModal() {
            this.isAddEmployeeModalOpen = true;
        }
    },
    computed: {
        employees(): Employee[] {
            return this.$store.getters.currentCompany?.employees || [];
        }
    },
    components: {
        EmployeePreview,
        EmployeeEdit,
        Modal
    },
});
</script>

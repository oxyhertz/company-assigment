<template>
    <section class="employee-table">
        <div class="header">
            <h2>Employees</h2>
            <button @click="openEditEmployeeModal">Add Employee</button>
            <select v-model="filterBy.departmentId">
                <option value="">Select Department</option>
                <option v-for="department in departmentsOptionsToDisplay" :key="department._id" :value="department._id">
                    {{ department.name }}
                </option>
            </select>
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
import { defineComponent, PropType } from 'vue';
import EmployeePreview from '@/components/company/EmployeePreview.vue';
import Modal from '../base/Modal.vue';
import EmployeeEdit from './EmployeeEdit.vue';
import { Department } from '@/types/company/department';
export default defineComponent({
    name: 'Employee Table',
    emits: ['remove-employee', 'add-employee'],
    props: {
        departmentsOptionsToDisplay: Array as PropType<Department[]>,
    },
    data() {
        return {
            isAddEmployeeModalOpen: false,
            headers: [
                { text: 'Name' },
                { text: 'Role' },
                { text: 'Department' },
                { text: 'Actions' },
            ],
            filterBy: {
                departmentId: '',
            },
        }
    },
    created() {
        console.log('departmentsOptionsToDisplay', this.departmentsOptionsToDisplay);
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
        },
        employeesToDisplay(): Employee[] {
            return this.employees.filter(employee => {
                if (!this.filterBy.departmentId) return true;
                return employee.depId === this.filterBy.departmentId;
            });
        }

    },
    components: {
        EmployeePreview,
        EmployeeEdit,
        Modal
    },
});
</script>

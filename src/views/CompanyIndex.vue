<template>
    <section class="company-index">
        <CompanyNavbarVue :currCompanyId="currCompanyId" />
        <div v-if="company" class="company-details-container">
            <div class="company-details">
                <h1>{{ company?.name }}</h1>
            </div>
            <router-view :departmentsOptionsToDisplay="departmentsOptionsToDisplay" @add-employee="onAddEmployee"
                @remove-employee="onRemoveEmployee" @add-department="onAddDepartment"
                @remove-department="openRemoveDepartmentModal" />
        </div>
        <div v-else>
            <h2>Loading...</h2>
        </div>



        <Modal :isOpen="isRemoveDepartmentModalOpen" @close="closeRemoveDepartmentModalOpen">
            <div class="modal-content">
                <h2>Are you sure you want to remove this department?</h2>
                <div class="modal-buttons">
                    <button @click="closeRemoveDepartmentModalOpen">Cancel</button>
                    <button @click="onRemoveDepartment()">Remove</button>
                </div>
            </div>
        </Modal>


        <Modal :isOpen="isDepartmentEmployeeModalOpen" @close="isDepartmentEmployeeModalOpen = false">
            <div class="modal-content">
                <h2>This Department have employees</h2>
                <h2>Do you want to move them to another department?</h2>
                <div class="modal-buttons" v-if="!isSelcetDepartments">
                    <button @click="handleDontMoveToDepartment">No</button>
                    <button @click="isSelcetDepartments = true">Yes</button>
                </div>
                <div v-if="isSelcetDepartments" class="select-department">
                    <select v-model="moveEmployeesToDepartmentId">
                        <option value="">Select Department</option>
                        <option v-for="department in departmentsOptionsToDisplay" :key="department._id"
                            :value="department._id">
                            {{ department.name }}
                        </option>
                    </select>
                    <button @click="onMoveEmployeesToDepartment">Move</button>
                </div>
            </div>
        </Modal>


    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { Company } from '@/types/company/company';
import type { Department } from '@/types/company/department';
import type { Employee } from '@/types/company/employee';
import CompanyNavbarVue from '@/components/company/CompanyNavbar.vue';
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service';
import { DepartmentToSave } from '@/types/company/department';
import Modal from '@/components/base/Modal.vue';
export default defineComponent({
    name: 'Company Index',
    data() {
        return {
            isRemoveDepartmentModalOpen: false,
            isDepartmentEmployeeModalOpen: false,
            departmentId: null as null | string,
            moveEmployeesToDepartmentId: null as null | string,
            isSelcetDepartments: null as null | boolean,
            isMoveToDepartment: null as null | boolean
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
            if (this.isDepartmentHaveEmployees) {
                this.isDepartmentEmployeeModalOpen = true;
            } else {
                this.openIsRemoveDepartmentModal();
            }
        },
        async onRemoveDepartment() {
            try {
                await this.$store.dispatch({ type: 'removeDepartment', departmentId: this.departmentId, moveToDepartmentId: this.isMoveToDepartment ? this.moveEmployeesToDepartmentId : null });
                this.resetState();
                showSuccessMsg('Department removed successfully');
            } catch (error) {
                showErrorMsg('Failed to remove department');
            }
        },
        resetState() {
            this.isRemoveDepartmentModalOpen = false;
            this.isDepartmentEmployeeModalOpen = false;
            this.departmentId = null;
            this.moveEmployeesToDepartmentId = null;
            this.isSelcetDepartments = null;
            this.isMoveToDepartment = null;
        },
        async onAddDepartment(department: DepartmentToSave) {
            try {
                await this.$store.dispatch({ type: 'addDepartment', department });
                showSuccessMsg('Department added successfully');
            } catch (error) {
                showErrorMsg('Failed to add department');
            }
        },
        async onAddEmployee(employee: Employee) {
            try {
                await this.$store.dispatch({ type: 'addEmployee', employee });
                showSuccessMsg('Employee added successfully');
            } catch (error) {
                showErrorMsg('Failed to add employee');
            }
        },
        async onRemoveEmployee(employeeId: string) {
            try {
                await this.$store.dispatch({ type: 'removeEmployee', employeeId });
                showSuccessMsg('Employee removed successfully');
            } catch (error) {
                showErrorMsg('Failed to remove employee');
            }
        },
        onMoveEmployeesToDepartment() {
            this.isMoveToDepartment = true
            this.isDepartmentEmployeeModalOpen = false

            this.openIsRemoveDepartmentModal()

        },
        openIsRemoveDepartmentModal() {
            this.isRemoveDepartmentModalOpen = true
        },
        handleDontMoveToDepartment() {
            this.isDepartmentEmployeeModalOpen = false

            this.openIsRemoveDepartmentModal()
        },
        closeRemoveDepartmentModalOpen() {
            this.isRemoveDepartmentModalOpen = false
        }

    },

    computed: {
        currCompanyId(): string {
            return this.$route.params.companyId as string;
        },
        company(): Company | null {
            return this.$store.getters.currentCompany;
        },
        isDepartmentHaveEmployees(): boolean {
            if (this.company) {
                return this.company.employees.some((emp: Employee) => emp.depId === this.departmentId);
            }
            return false;
        },
        departmentsOptionsToDisplay() {
            return this.company?.departments.filter((department: Department) => department._id !== this.departmentId)
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
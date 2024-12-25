<template>
    <section class="employee-edit">
        <form @submit.prevent class="edit-form">
            <div v-for="field in fieldToDisplay" :key="field.key">
                <label>
                    {{ field.label }}<span class="required-txt" v-if="field.isRequired">* Required field</span>
                    <input v-if="field.type === 'text'" :type="field.type" v-model.trim="employeeToEdit[field.key]" />
                    <select v-else-if="field.type === 'select'" v-model.trim="employeeToEdit[field.key]">
                        <option v-for="department in departments" :key="department._id" :value="department._id">{{
                            department.name }}</option>
                    </select>
                </label>
            </div>
            <button :disabled="isSaveDisabled" @click="saveEmployee">Save</button>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { companyService } from '@/services/company/company.service.local';
import type { EmployeeFormField, EmployeeToSave } from '@/types/company/employee';
export default defineComponent({
    name: 'Employee Edit',
    data() {
        return {
            fieldToDisplay: [
                { label: 'Name', key: 'name', type: 'text', isRequired: true },
                { label: 'Role', key: 'role', type: 'text', isRequired: true },
                { label: 'Department', key: 'depId', type: 'select', isRequired: true }
            ] as EmployeeFormField[],
            employeeToEdit: companyService.getEmptyEmployee() as EmployeeToSave
        }
    },
    methods: {
        saveEmployee() {
            console.log("🚀 ~ saveCar ~ this.employeeToEdit:", this.employeeToEdit)
            this.$emit('save', this.employeeToEdit)
        },
    },
    computed: {
        isSaveDisabled() {
            return this.fieldToDisplay.some((field: EmployeeFormField) => field.isRequired && !this.employeeToEdit[field.key]);
        },
        departments() {
            return this.$store.getters.currentCompany?.departments || [];
        }
    }
});
</script>

<style scoped></style>
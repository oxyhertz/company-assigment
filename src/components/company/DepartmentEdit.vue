<template>
    <section class="department-edit">
        <form @submit.prevent class="edit-form">
            <div v-for="field in fieldToDisplay" :key="field.key">
                <label>
                    {{ field.label }}<span class="required-txt" v-if="field.isRequired">* Required field</span>
                    <input :type="field.type" v-model.trim="departmentToEdit[field.key]" />
                </label>
            </div>
            <button :disabled="isSaveDisabled" @click="saveDepartment">Save</button>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { companyService } from '@/services/company/company.service.local';
import type { DepartmentFormField, DepartmentToSave } from '@/types/company/department';
export default defineComponent({
    name: 'Department Edit',
    data() {
        return {
            fieldToDisplay: [
                { label: 'Name', key: 'name', type: 'text', isRequired: true },
                { label: 'Description', key: 'description', type: 'text', isRequired: true }
            ] as DepartmentFormField[],
            departmentToEdit: companyService.getEmptyDepartment() as DepartmentToSave
        }
    },
    methods: {
        saveDepartment() {
            this.$emit('save', this.departmentToEdit)
        },
    },
    computed: {
        isSaveDisabled() {
            return this.fieldToDisplay.some((field: DepartmentFormField) => field.isRequired && !this.departmentToEdit[field.key]);
        }
    }
});
</script>

<style scoped></style>
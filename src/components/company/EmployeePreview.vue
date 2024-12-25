<template>
    <div class="row table-preview">
        <div class="cell">{{ employee.name }}</div>
        <div class="cell">{{ employee.role }}</div>
        <div class="cell">{{ employeeDepartment?.name }}</div>
        <div class="cell">
            <button class="remove-btn" @click="deleteEmployee">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import type { Employee } from '@/types/company/employee';
import type { Department } from '@/types/company/department';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'Employee Preview',
    emits: ['remove-employee'],
    props: {
        employee: {
            type: Object as PropType<Employee>,
            required: true,
        }
    },
    methods: {
        deleteEmployee() {
            this.$emit('remove-employee', this.employee._id);
        }
    },
    computed: {
        employeeDepartment() {
            return this.$store.getters.currentCompany?.departments.find((department: Department) => department._id === this.employee.depId);
        }
    },

});
</script>

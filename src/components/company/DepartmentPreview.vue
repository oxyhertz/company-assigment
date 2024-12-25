<template>
    <div class="row table-preview">
        <div class="cell">{{ department.name }}</div>
        <div class="cell">{{ department.description }}</div>
        <div class="cell">
            <button class="remove-btn" @click="deleteDepartment">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Department } from '@/types/company/department';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Department Preview',
    emits: ['remove-department'],
    props: {
        department: {
            type: Object as PropType<Department>,
            required: true,
        }
    },
    methods: {
        deleteDepartment() {
            this.$emit('remove-department', this.department._id);
        }
    }

});
</script>

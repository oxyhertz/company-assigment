<template>
    <transition name="modal-fade">
        <div class="modal-overlay" v-if="isOpen" @click="close">
            <transition name="modal-content-slide">
                <div class="modal" @click.stop>
                    <span @click="$emit('close')" class="close-icon mdi mdi-window-close"></span>
                    <slot />
                    <slot name="actions">
                        <section class="actions" v-if="isShowDefaultActions">
                            <button class="close-btn" @click="cancel">Cancel</button>
                            <button class="save-btn" @click="save">Save</button>
                        </section>
                    </slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Modal',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        isShowDefaultActions: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['save', 'cancel', 'close'],
    methods: {
        save() {
            this.$emit('save');
        },
        cancel() {
            this.$emit('cancel');
        },
        close() {
            this.$emit('close');
        },
    },
});
</script>

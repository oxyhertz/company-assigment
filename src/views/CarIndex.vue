<template>
    <section class="car-index">
        <button @click="openAddCarModal">Add Car</button>
        <div v-if="!cars.length" class="empty-placeholder">there is no cars</div>
        <CarList @remove-car="removeCar" v-else />
        <Modal :isOpen="isAddCarModalOpen" @close="closeAddCarModal">
            <CarEdit @save="addCar" @cancel="closeAddCarModal" />
        </Modal>
    </section>
</template>
<script lang="ts">
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service';

import CarList from '@/components/car/CarList.vue';
import Modal from '@/components/base/Modal.vue';
import CarEdit from '@/components/car/CarEdit.vue';
import type { Car } from '@/types/car/car.model';
export default {
    name: 'car index',
    components: {
        CarList,
        CarEdit,
        Modal
    },
    data() {
        return {
            isAddCarModalOpen: false as boolean
        }
    },
    created() {
        this.loadCars()
    },
    methods: {
        async loadCars() {
            try {
                await this.$store.dispatch({ type: 'loadCars' })
            } catch (error) {
                //Todo add notifcation
            }
        },
        async addCar(car: Car) {
            try {
                await this.$store.dispatch({ type: 'addCar', car })
                showSuccessMsg('Car added successfully')
            } catch (error) {
                showErrorMsg('Something went wrong')
                //Todo add notifcation
            }
        },
        async updateCar(car: Car) {
            try {
                await this.$store.dispatch({ type: 'updateCar', car })
            } catch (error) {
                //Todo add notifcation
            }
        },
        async removeCar(carId: string) {
            try {
                await this.$store.dispatch({ type: 'removeCar', carId })
            } catch (error) {
                //Todo add notifcation
            }
        },
        openAddCarModal() {
            this.isAddCarModalOpen = true
        },
        closeAddCarModal() {
            this.isAddCarModalOpen = false
        }
    },
    computed: {
        cars() {
            return this.$store.getters.cars
        }
    }
}
</script>

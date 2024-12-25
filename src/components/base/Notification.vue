<template>
  <div class="notification" :class="notificationClasses">
    {{ msg?.txt }}
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { eventBus, SHOW_MSG } from "@/services/event-bus.service"
import type { MsgPayload } from "@/types/notification/msg"
export default defineComponent({
  name: 'Notification',
  created() {
    eventBus.on(SHOW_MSG, (msg: MsgPayload) => {
      this.msg = msg
      var delay = msg.delay || 1200
      setTimeout(() => {
        this.msg = null
      }, delay)
    })
  },
  data() {
    return {
      alive: false as boolean,
      msg: null as null | MsgPayload,
    }
  },
  computed: {
    notificationClasses(): Record<string, boolean> {
      return {
        [this.msg?.type || '']: !!this.msg,
        'visible': !!this.msg,
      };
    },
  },
})
</script>
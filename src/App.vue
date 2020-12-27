<template>
  <router-view/>
  <CreateLog v-if='loginState'/>
  <Dialog/>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Dialog from '/@/components/Dialog/index.vue'
import CreateLog from '/@/components/CreateLog.vue'

export default {
  name: 'App',
  components: { Dialog, CreateLog },
  setup (props, context) {
    const route = useRoute()
    const router = useRouter()
    const loginState = ref(Number(localStorage.loginFlag))
    return { loginState }
  }
}
</script>

<style>
</style>

<template>
  <router-view/>
  <CreateLog/>
  <Dialog/>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Dialog from '/@/components/Dialog/index.vue'
import CreateLog from '/@/components/CreateLog.vue'

export default {
  name: 'App',
  components: { Dialog, CreateLog },
  setup (props, context) {
    onMounted(() => {
    })

    document.cookie = 'name=devlovas'
    const route = useRoute()
    const router = useRouter()

    // router.push('/login')

    return {}
  }
}
</script>

<style>
</style>

<template>
  <router-view/>
  <Dialog/>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Dialog from '/@/components/Dialog/index.vue'

export default {
  name: 'App',
  components: { Dialog },
  setup (props, context) {
    onMounted(() => {
    })

    const route = useRoute()
    const router = useRouter()

    // router.push('/login')

    return {}
  }
}
</script>

<style>
</style>

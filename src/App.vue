<template>
  <router-view/>
  <notification/>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Notification from './components/Notification/index.vue'

export default {
  name: 'App',
  components: { Notification },
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

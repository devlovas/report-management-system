<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  setup (props, context) {
    onMounted(() => {
      console.log(context)
    })

    const route = useRoute();
    const router = useRouter();

    router.push('/login')

    return {}
  }
}
</script>

<style>
body  
</style>

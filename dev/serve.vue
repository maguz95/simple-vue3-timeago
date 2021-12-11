<script lang="ts">
import { defineComponent } from 'vue';
import Vue3Timeago from '@/vue3-timeago.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3Timeago
  }
});
</script>

<template>
  <div id="app">
    <vue3-timeago datetime="2021-12-11"/>
  </div>
</template>

<template>
  <div class="vue3-timeago">
    <p>The date is: {{difference}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default /*#__PURE__*/defineComponent({
  name: 'Vue3Timeago', // vue component name
  props: {
    datetime: {
      type: String,
      required: true,
    },
    live: {
      type: Boolean,
      required: false,
      default: true,
    },
    relativeDate: {
      type: String,
      required: false,
      default: null,
    },
    locale: {
      type: String,
      required: false,
      default: 'it-IT',
    },
    updateInterval: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  setup(props) {
    console.log('Vue3Timeago setup');
    dayjs.extend(relativeTime)
    console.log(props.datetime);
    const difference = dayjs(props.datetime).fromNow();

    console.log(difference)

    return {difference}
  },
});
</script>

<style scoped>
  .vue3-timeago {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .vue3-timeago p {
    margin: 0 0 1em;
  }
</style>

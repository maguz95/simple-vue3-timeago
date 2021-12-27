<template>
  <div class="vue3-timeago">
    <p>The date was: {{difference}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {timezones} from './data/timezones';

export default /*#__PURE__*/defineComponent({
  name: 'Vue3Timeago', // vue component name
  props: {
    datetime: {
      type: String as () => string | Date,
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
    timezone: {
      type: String,
      required: false,
      default: 'Europe/Rome',
    },
    updateInterval: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  setup(props) {
    require(`dayjs/locale/${props.locale.split('-')[0]}`);
    console.log('Vue3Timeago setup')
    dayjs.extend(relativeTime)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    dayjs.locale(props.locale.split('-')[0])

    let difference;
    if(props.relativeDate){
      difference = timezones.some(tz => tz === props.timezone)
        ? dayjs(props.datetime).tz(props.timezone).from(dayjs(props.relativeDate).tz(props.timezone))
        : dayjs(props.datetime).tz('Europe/Rome').from(dayjs(props.relativeDate).tz('Europe/Rome'))
    } else {
      difference = timezones.some(tz => tz === props.timezone)
        ? dayjs(props.datetime).tz(props.timezone).fromNow()
        : dayjs(props.datetime).tz('Europe/Rome').fromNow()
    }

    return { difference }
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

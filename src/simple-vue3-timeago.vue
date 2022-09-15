<template>
  <span>{{result}}</span>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, Ref } from 'vue';
import { createDate, getDiffIdx, getDiffSec, getLocaleDiff } from './utils/date';

export default /*#__PURE__*/defineComponent({
  name: 'Vue3Timeago', // vue component name
  props: {
    datetime: {
      type: String as () => Date | string,
      required: true,
    },
    locale: {
      type: String,
      required: false,
      default: 'en_US',
    },
    relativeDate: {
      type: String,
      required: false,
      default: null,
    },
    live: {
      type: Boolean,
      required: false,
      default: false,
    },
    liveInterval: {
      type: Number,
      required: false,
      default: 10000,
    },
  },
  setup(props) {
    const { datetime, locale, live, liveInterval } = props;

    const calculateDifference = () => {
      const date = createDate(datetime)
      const relativeDate = props.relativeDate ? createDate(props.relativeDate) : new Date()

      const dateDifference = getDiffSec(date, relativeDate);

      const [computedDiff, timeIndex, agoIndex] = getDiffIdx(dateDifference)

      return getLocaleDiff(computedDiff, timeIndex, agoIndex, locale)
    }

    let result:Ref<string> = ref('');
    let relativeDateTimer:number;

    result.value = calculateDifference();

    if(live) {
      relativeDateTimer = window.setInterval(() => {
        result.value = calculateDifference()
      }, liveInterval);
    }

    onBeforeUnmount(() => {
      clearInterval(relativeDateTimer);
    });

    return { result }
  },
});
</script>

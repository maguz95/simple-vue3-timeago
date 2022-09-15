# simple-vue3-timeago


> simple-vue3-timeago is a simple react component used to format date with `*** time ago` or `in *** time` statement. eg: '3 hours ago' or 'in 3 hours'.
**This is zero dependency component but it's based on [timeago.js](https://github.com/hustcc/timeago.js)** which is a simple javascript module.

 - Realtime render.
 - Efficient. When the time is `3 hour ago`, the interval will update after an hour (3600 * 1000 ms).
 - Locales supported (I plan to release more locales in the future).

## Install

```bash
npm install simple-vue3-timeago
```
or
```bash
yarn add simple-vue3-timeago
```


## Usage

```html
<script>
  import Vue3Timeago from 'simple-vue3-timeago';
  export default {
    ...
    components: {
      Vue3Timeago
    }
  }
</script>

<template>
  <div id="app">
    <vue3-timeago
      datetime="2022-02-20 11:32:00"
      locale="en_US" />
  </div>
</template>
```


## Component props

| Prop name      | Description    | Type           | Required | Default   |
| -------------- |--------------- | -------------- | -------- | --------- |
| `datetime`     | | `String\|Date` | `true`   | –         |
| `locale`       | | `String`       | `false`  | `"en_US"` |
| `relativeDate` | The datetime to be calculated interval relative to | `String\|Date` | `false`  | `null`    |
| `live`         | Update the component live using the minLiveInterval| `Boolean`      | `false`  | `false`   |
| `minLiveInterval` | The min interval in milliseconds to update the component | `Number`       | `false`  | `10000`   |
---

You can apply any style or CSS class to the component it will be applied to the root element.

Props not documented above are applied to the root element.


## LICENSE

MIT
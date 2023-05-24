<template>
  <div class="data-view">
    <TextDisplay></TextDisplay>
    <ChartDisplay></ChartDisplay>
  </div>
</template>
<script lang="ts">
import TextDisplay from "@/components/TextDisplay.vue"
import ChartDisplay from "@/components/ChartDisplay.vue"
export default {
  name: "DataView",
  components: {
    TextDisplay,
    ChartDisplay
  }
}

</script>
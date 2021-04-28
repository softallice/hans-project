<template>
  <q-page>
  <!-- <q-page class="q-pa-sm"> -->
    <weight-card />
  </q-page>
</template>

<script>
  export default {
    name: 'Weight',
    components: {
        WeightCard: () =>  import('components/weight/WeightCard')
    },
    data() {
      return {
      
    }
  },
}
</script>

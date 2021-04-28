<template>
  <q-page>
    <card-goal />
  </q-page>
</template>

<script>
  export default {
    name: 'Goal',
    components: {
        CardGoal: () =>  import('components/cards/CardGoal')
    },
    data() {
      return {
      
    }
  },
}
</script>

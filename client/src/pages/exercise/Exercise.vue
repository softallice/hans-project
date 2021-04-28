<template>
  <q-page>
    <exercise-card />
  </q-page>
</template>

<script>
  export default {
    name: 'Exercise',
    components: {
        ExerciseCard: () =>  import('components/exercise/ExerciseCard')
    },
    data() {
      return {
      
    }
  },
}
</script>

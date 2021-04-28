<template>
  <q-page>
    <meal-card />
  </q-page>
</template>

<script>
  export default {
    name: 'Meal',
    components: {
        MealCard: () =>  import('components/meal/MealCard')
    },
    data() {
      return {
      
    }
  },
}
</script>

<template>
  <q-footer>
    <q-tabs>
      <q-route-tab
        v-for="route in tabRoutes"
        :key="route.name"
        :to="{ name: route.name }"
        :name="route.name"
        :icon="route.icon"
        :label="$q.screen.sm || $q.screen.md || $q.screen.lg || $q.screen.xl ? route.name : null"
        exact
        replace
      />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    tabRoutes () {
      return this.$router.options.routes[0].children.filter(
        route => route.name !== 'Dashboard' 
              && route.name !== 'BpChart'
              && route.name !== 'WeightChart' 
              && route.name !== 'Login'
              && route.name !== 'Account' 
              && route.name !== 'BasicInfo'
              && route.name !== 'Blog' 
              && route.name !== 'BlogEntry'
              && route.name !== 'BlogView'
              && route.name !== 'Exercise' 
              && route.name !== 'Goal' 
              && route.name !== 'Meal' 
              && route.name !== 'Social' 
              && route.name !== 'WriteMeal' 
              && route.name !== 'ExerciseChart' 
              && route.name !== 'Weight' 
              && route.name !== 'WriteBp' 
              && route.name !== 'ForgotPassword' 
              && route.name !== 'ResetPassword' 
              && route.name !== 'Register' 
              && route.name !== 'About' 
              && route.name !== 'Home' 
              
        )
    }
  }
}
</script>

<style>

</style>

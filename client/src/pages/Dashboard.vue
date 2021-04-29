<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />

    <!-- <chart-weight :weightProps="weightObject"/> -->

    <!-- <div class="row q-col-gutter-sm  q-py-sm">
      <tab-social />
      <card-with-image />
    </div>

    <div class="row q-col-gutter-sm  q-py-sm">
      <todo-list />

      <card-time-line />
    </div> -->
  </q-page>
</template>

<script>
  export default {
    name: 'Dashboard',
    components: {
        CardSocial: () =>  import('components/cards/CardSocial'),
    },
    data() {
      return {
          
    }
  }
}
</script>

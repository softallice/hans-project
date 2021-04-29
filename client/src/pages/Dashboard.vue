<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />

    <div class="row q-col-gutter-sm  q-py-sm">
      <card-write/>
    </div>

  </q-page>
</template>

<script>
  export default {
    name: 'Dashboard',
    components: {
        CardSocial: () =>  import('components/cards/CardSocial'),
        CardWrite: () =>  import('components/cards/CardWrite'),
    },
    data() {
      return {
          
    }
  }
}
</script>

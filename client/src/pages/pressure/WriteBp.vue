<template>
  <q-page>
    <bp-card />
  </q-page>
</template>

<script>
  export default {
    name: 'WriteBp',
    components: {
        BpCard: () =>  import('components/pressure/BpCard')
    },
    data() {
      return {
      
    }
  },
}
</script>

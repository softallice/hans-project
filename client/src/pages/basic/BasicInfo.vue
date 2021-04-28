<template>
  <q-page>
    <card-basic-info />
  </q-page>
</template>

<script>
export default {
    name: 'Exercise',
    components: {
        CardBasicInfo: () =>  import('components/cards/CardBasicInfo')
    },
    data() {
        return {
        
    }
    },
}
</script>

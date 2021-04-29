<template>
  <q-page class="q-pa-sm">

    <!-- <card-social icon_position="left" /> -->

    <chart-bp :bpProps="bpObject"/>

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
    name: 'BpChart',
    components: {
        ChartBp: () =>  import('components/charts/ChartBp')
    },
    data() {
      return {
          bpObject : {
            maxBp: [],
            minBp: [],
            writeDate: [], 
            name: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname
          }
    }
  },
  async activated(){
      this.initBp()
      this.getBp()
      
  },
  methods: {
    initBp () {
        this.bpObject.maxBp = []
        this.bpObject.minBp = []
        this.bpObject.writeDate = []
    },
    async getBp () {
      try {
        const resFind = await this.$feathersClient.service('pressure').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                $sort: { writeDate: 1 } 
            }
        })
        // 가져온 데이터를 배열로 
        this.convertArray(resFind.data)
      } catch (err) {
          console.log(err)
      }
    },
    convertArray( object ) {
        for (const index in object) {
            
            this.bpObject.maxBp.push(object[index].maxBp)
            this.bpObject.minBp.push(object[index].minBp)
            this.bpObject.writeDate.push(object[index].writeDate)
        }
    }
  }
}
</script>

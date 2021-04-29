<template>
  <q-page class="q-pa-sm">

    <!-- <card-social icon_position="left" /> -->

    <chart-weight :weightProps="weightObject"/>

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
    name: 'WeightChart',
    components: {
        ChartWeight: () =>  import('components/charts/ChartWeight')
    },
    data() {
      return {
          weightObject : {
            weight: [],
            writeDate: [], 
            name: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname
          }
    }
  },
  async activated(){
      this.initWeight()
      this.getWeight()
      
  },
  methods: {
    initWeight () {
        this.weightObject.weight = []
        this.weightObject.writeDate = []
    },
    async getWeight () {
      try {
        const resFind = await this.$feathersClient.service('weight').find({
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
            
            this.weightObject.weight.push(object[index].wt)
            this.weightObject.writeDate.push(object[index].writeDate)
        }
    }
  }
}
</script>

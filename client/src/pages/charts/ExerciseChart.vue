<template>
  <q-page class="q-pa-sm">
    <chart-exercise :exProps="exObject"/>
  </q-page>
</template>

<script>
  export default {
    name: 'ExerciseChart',
    components: {
        ChartExercise: () =>  import('components/charts/ChartExercise')
    },
    data() {
      return {
          exObject : {
            walking: [],
            running: [],
            gym: [],
            bike: [],
            riding: [],
            hiking: [],
            yoga: [],
            etc: [],
            writeDate: [], 
            name: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname
          }
    }
  },
  async activated(){
      this.initExercise()
      this.getExercise()
      
  },
  methods: {
    initExercise () {
        this.exObject.walking= []
        this.exObject.running= []
        this.exObject.gym= []
        this.exObject.bike= []
        this.exObject.riding= []
        this.exObject.hiking= []
        this.exObject.yoga= []
        this.exObject.etc= []
        this.exObject.writeDate = []
    },
    async getExercise () {
      try {
        const resFind = await this.$feathersClient.service('exercise').find({
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
            this.exObject.walking.push(object[index].walking)
            this.exObject.running.push(object[index].running)
            this.exObject.gym.push(object[index].maxgymBp)
            this.exObject.bike.push(object[index].bike)
            this.exObject.riding.push(object[index].riding)
            this.exObject.hiking.push(object[index].hiking)
            this.exObject.yoga.push(object[index].yoga)
            this.exObject.etc.push(object[index].etc)
            this.exObject.writeDate.push(object[index].writeDate)
        }
    }
  }
}
</script>

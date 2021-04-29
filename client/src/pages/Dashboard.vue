<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" :socialProps="status" />

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
      status: {
        weight: 50,
        lastWeight: '2021-04-01',
        exercise: 5,
        lastExercise: '2021-04-01',
        presure: '120/80',
        lastPresure: '2021-04-01',
        blog: 3
      }
    }
  },
  activated(){
    this.getProssure();
    this.getBlog();
    this.getWeight();
    this.getExercise();
  },
  methods: {
    // 혈압
    async getProssure () {
      try {
        const resFind = await this.$feathersClient.service('pressure').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                $sort: { writeDate: -1 },
                $limit: 1, 
            }
        })
        this.status.presure = resFind.data[0].maxBp + '/' + resFind.data[0].minBp
        this.status.lastPresure = resFind.data[0].writeDate
      } catch (err) {
          this.presure='120/80'
          console.log(err)
      }
    },
    // 블로그
    async getBlog () {
      try {
        const resFind = await this.$feathersClient.service('blog').find({
            query: {
                'author._id': this.$store.state.auth.user._id,
            }
        })
        this.status.blog = resFind.total
      } catch (err) {
          this.blog = 0
          console.log(err)
      }
    },
    // 체중
    async getWeight () {
      try {
        const resFind = await this.$feathersClient.service('weight').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                $sort: { writeDate: -1 },
                $limit: 1, 
            }
        })
        this.status.weight = resFind.data[0].wt
        this.status.lastWeight = resFind.data[0].writeDate
        
      } catch (err) {
          this.weight= 50
          console.log(err)
      }
    },
    // 체중
    async getExercise () {
      try {
        const resFind = await this.$feathersClient.service('exercise').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                $sort: { writeDate: -1 },
                $limit: 1, 
            }
        })
        this.status.lastExercise = resFind.data[0].writeDate
        this.status.exercise = resFind.data[0].walking + 
                      resFind.data[0].running + 
                      resFind.data[0].gym + 
                      resFind.data[0].bike + 
                      resFind.data[0].riding + 
                      resFind.data[0].hiking + 
                      resFind.data[0].yoga + 
                      resFind.data[0].etc
      } catch (err) {
          this.exercise= 0
          console.log(err)
      }
    },
  }
}
</script>

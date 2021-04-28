<template>
  <div class="q-pa-md">
      <!-- 시작일자 -->
    <div class="col-12">
        <q-input label="시작일자" v-model="userData.startDate" mask="date" :rules="['date']">
            <template v-slot:prepend>
                <q-icon name="flight_takeoff" />
            </template>
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="userData.startDate">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
      <!-- 목표일자 -->
    <div class="col-12">
        <q-input label="목표일자" v-model="userData.endDate" mask="date" :rules="['date']">
            <template v-slot:prepend>
                <q-icon name="flight_land" />
            </template>
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="userData.endDate">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>

    <div class="col-12">
        <q-input color="purple-12" v-model="userData.wt" label="목표체중">
            <template v-slot:prepend>
            <q-icon name="av_timer" />
            </template>
        </q-input>
    </div>
    <div class="col-12">
        <q-input color="purple-12" v-model="userData.ht" label="목표키(현재키)">
            <template v-slot:prepend>
            <q-icon name="auto_graph" />
            </template>
        </q-input>
    </div>
    <div class="col-12">
        <q-input color="purple-12" v-model="userData.bs" label="목표혈당">
            <template v-slot:prepend>
            <q-icon name="insert_chart_outlined" />
            </template>
        </q-input>
    </div>
    <div class="col-12">
        <q-input color="purple-12" v-model="userData.maxBp" label="최대(수축기)">
            <template v-slot:prepend>
            <q-icon name="maximize" />
            </template>
        </q-input>
    </div>
    <div class="col-12">
        <q-input color="purple-12" v-model="userData.minBp" label="최소(이완기)">
            <template v-slot:prepend>
            <q-icon name="minimize" />
            </template>
        </q-input>
    </div>
    
    <div class="col-12">
        <q-input color="purple-12" v-model="userData.text" label="한줄 다짐">
            <template v-slot:prepend>
            <q-icon name="grading" />
            </template>
        </q-input>
    </div>
    <q-btn class="full-width absolute-bottom" label="저장하기" style="max-width: 800px; width: 100%;" @click="saveGoal" type="button" color="primary"/>
  </div>
  
</template>

<script>
import { date } from 'quasar'

export default {
  name: "CardGoal",
  data () {
    return {
      date: date.formatDate(new Date(), 'YYYY/MM/DD'),
      proxydate: date.formatDate(new Date(), 'YYYY/MM/DD') ,
      userData: {
        user: {
            email: this.$store.state.auth.user.email,
            username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
        },
        startDate: "2021-04-28",
        endDate: "2021-12-31",
        wt: 50, //weight
        ht: 160, //height
        maxBp: 120,
        minBp: 80,
        bs: 10,
        text: ''
      }
    }  
  },
  mounted() {
      this.getGoal()
  },
  activated(){
      this.getGoal()
  },
  methods: {
    async saveGoalGo () {
        try {
            const resFind = await this.saveBasic()
            this.$router.push('/blog')
        } catch (err) {
            console.log(err)
        }
        
    },
    // 목표 조회
    async getGoal () {
      try {
        const resFind = await this.$feathersClient.service('goal').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
            }
        })
        console.log('goal', resFind)
        if (resFind.total > 0 ) {
          this.userData = resFind.data[0]
        }
        
      } catch (err) {
          console.log(err)
      }
    },
    // 목표정보 저장
    async saveGoal() {
      let data = {
            user: {
            _id: this.$store.state.auth.user._id,
            username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
            email: this.$store.state.auth.user.email,
            avatar: this.$store.state.auth.user.avatar
            },
            wt: this.userData.wt,
            ht: this.userData.ht,
            startDate: this.userData.startDate,
            endDate: this.userData.endDate,
            maxBp: this.userData.maxBp,
            minBp: this.userData.minBp,
            bs: this.userData.bs,
            text: this.userData.text
        }
      if (this.userData._id) {
        console.log('data id' , data)
        try {
            const updateData = await this.$feathersClient.service('goal').patch(this.userData._id,
                data
            )
        } catch (err) {
            console.log('weight update error', err)
        }
      } else {
        console.log('not id' , data)
        try {
          // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
          const resFind = await this.$feathersClient.service('goal').create(
              data
          )
        } catch (err) {
            console.log(err)
        }
      }
    },
  }
}
</script>
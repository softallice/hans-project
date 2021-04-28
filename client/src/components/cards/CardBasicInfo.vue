<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      :contracted="$q.screen.lt.md"
    >
      <q-step
        :name="1"
        title="기본정보"
        icon="settings"
        :done="step > 1"
      >
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.user.email" label="이메일">
                <template v-slot:prepend>
                <q-icon name="mail" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-input color="purple-12" v-model="userData.user.username" label="이름">
                <template v-slot:prepend>
                <q-icon name="person" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-input label="생년월일" v-model="userData.birth" mask="date" :rules="['date']">
                <template v-slot:prepend>
                    <q-icon name="cake" />
                </template>
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="userData.birth">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>
        <div class="q-gutter-sm col-12 ">
            <q-radio dense v-model="userData.sex" val="W" label="여성" />
            <q-radio dense v-model="userData.sex" val="M" label="남성" />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="신장"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <!-- 신장 입력 -->
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">신장 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.ht" 
                    label="신장" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center">    
                    <template v-slot:prepend>
                        <q-btn round dense flat icon="remove" @click="htMinus"  />
                    </template>
                    <template v-slot:append>
                        <q-btn round dense flat icon="add" @click="htAdd" />
                    </template>                
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="3"
        title="체중"
        icon="assignment"
        :done="step > 3"
      >
        <!-- 체중 입력 -->
        <q-card style="min-width: 100x">
            <q-card-section>
                <div class="text-h6">체중 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.wt" 
                    label="체중" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center"
                    >                    
                    <template v-slot:prepend>
                        <q-btn round dense flat icon="remove" @click="wtMinus"  />
                    </template>
                    <template v-slot:append>
                        <q-btn round dense flat icon="add" @click="wtAdd" />
                    </template>
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <!-- <q-step
        :name="4"
        title="목표체중"
        icon="add_comment"
        :done="step > 4"
      >
        
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">목표 체중 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.aimWeight" 
                    label="목표 체중" 
                    type="number"
                    counter 
                    maxlength="3"
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="5"
        title="목표부위"
        icon="add_comment"
        :done="step > 5"
      >
        
        <q-card style="min-width: 100px">
            <q-card-section>
                <div class="text-h6">목표 부위 입력</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
            <q-input 
                    filled 
                    bottom-slots 
                    v-model="userData.targetBody" 
                    label="목표 부위" 
                    type="text"
                    counter 
                    input-class="text-center">                    
                </q-input>
            </q-card-section>
        </q-card>
      </q-step> -->

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="이전" class="q-ml-sm" />
          <q-btn  @click="step === 3 ? saveBasicGo() : $refs.stepper.next()" color="primary" :label="step === 5 ? '완료' : '다음'" />          
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "CardBasicInfo",
  data () {
    return {
      step: 1,
      date: date.formatDate(new Date(), 'YYYY/MM/DD'),
      proxydate: date.formatDate(new Date(), 'YYYY/MM/DD') ,
      userData: {
        user: {
            email: this.$store.state.auth.user.email,
            username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
        },
        wt: 50, //weight
        ht: 160, //height
        birth: '1995-01-01', 
        sex: 'W', 
        text: ''
      },
      basicId: ''      
    }
  },
  activated(){
      this.getBasic()
  },
  methods: {
    async saveBasicGo () {
        try {
            const resFind = await this.saveBasic()
            this.$router.push('/blog')
        } catch (err) {
            console.log(err)
        }
        
    },
    // 기본정보 조회
    async getBasic () {
      try {
        const resFind = await this.$feathersClient.service('basic').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
            }
        })
        console.log('getBasic', resFind)
        if (resFind.total > 0 ) {
          this.basicId = resFind.data[0]._id
        }
        
      } catch (err) {
          console.log(err)
      }
    },
    // 기본정보 저장
    async saveBasic() {
      let data = {
            user: {
            _id: this.$store.state.auth.user._id,
            username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
            email: this.$store.state.auth.user.email,
            avatar: this.$store.state.auth.user.avatar
            },
            wt: this.userData.wt,
            ht: this.userData.ht,
            birth: this.userData.birth,
            sex: this.userData.sex,
            text: this.userData.text
        }
      if (this.basicId._id) {
        console.log('data id' , data)
        try {
            const updateData = await this.$feathersClient.service('basic').patch(this.basicId._id,
                data
            )
        } catch (err) {
            console.log('weight update error', err)
        }
      } else {
        console.log('not id' , data)
        try {
          // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
          const resFind = await this.$feathersClient.service('basic').create(
              data
          )
        } catch (err) {
            console.log(err)
        }
      }
    },
    // 체중 선택
    wtAdd () {
      this.userData.wt = this.userData.wt + 1
    },

    wtMinus () {
      this.userData.wt = this.userData.wt - 1
    },

    // 신장 선택
    htAdd () {
      this.userData.ht = this.userData.ht + 1
    },

    htMinus () {
      this.userData.ht = this.userData.ht - 1
    },
  }
}
</script>

<template>
  <div style="max-width: 800px; width: 100%;">
    <div class="title-bar row items-center overflow-hidden">
      <q-btn flat icon="arrow_back_ios" class="direction-button" style="height: 100%" @click="onPrev" />
      <transition :name="transition" appear>
        <div :key="parsedStart.date" class="row justify-between items-center overflow-hidden" style="width: calc(100% - 112px)">
          <div v-for="day in days" :key="day.date" class="col-auto" :style="dayStyle">
            <q-btn flat :class="dayClass(day)" style="line-height: unset;" @click="selectedDate = day.date; transition = ''">
              <!-- <div class="text-center" style="width: 100%;">{{ monthFormatter(day, true) }}</div> -->
              <div class="text-center text-bold" style="width: 100%;  font-size: 16px;">{{ dayFormatter(day, false).replace('일','') }}</div>
              <div class="text-center" style="width: 100%; font-size: 8px;">{{ weekdayFormatter(day, true) }}</div>
            </q-btn>
          </div>
        </div>
      </transition>
      <q-btn flat icon="arrow_forward_ios" class="direction-button" style="height: 100%" @click="onNext" />
    </div>
  <!-- 운동 기록 -->
  <div class="q-pa-md" style="max-width: 800px; width: 100%;">
      <q-list bordered class="rounded-borders">
        <!-- 걷기 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="directions_walk" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              걷기
            </q-item-section>

            <q-item-section v-if="exercise_data.walking">
              {{exercise_data.walking}} 시간
            </q-item-section>

          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.walking"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.walking + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- 러닝 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="directions_run" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              러닝
            </q-item-section>
            
            <q-item-section v-if="exercise_data.running">
              {{exercise_data.running}} 시간
            </q-item-section>
            
            
          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.running"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.running + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- 라이딩 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="directions_bike" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              라이딩
            </q-item-section>

            <q-item-section v-if="exercise_data.riding">
              {{exercise_data.riding}} 시간
            </q-item-section>

            
          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.riding"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.riding + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- 헬스 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="transfer_within_a_station" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              헬스
            </q-item-section>

            <q-item-section v-if="exercise_data.gym">
              {{exercise_data.gym}} 시간
            </q-item-section>

            
          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.gym"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.gym + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
        <!-- 등산 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="hiking" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              등산
            </q-item-section>

            <q-item-section v-if="exercise_data.hiking">
              {{exercise_data.hiking}} 시간
            </q-item-section>

            
          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.hiking"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.hiking + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
        <!-- 요가 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="self_improvement" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              요가
            </q-item-section>

            <q-item-section v-if="exercise_data.yoga">
              {{exercise_data.yoga}} 시간
            </q-item-section>


          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.yoga"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.yoga + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
        <!-- 기타 운동 -->
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="sports_kabaddi" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              기타 운동
            </q-item-section>

            <q-item-section v-if="exercise_data.etc">
              {{exercise_data.etc}} 시간
            </q-item-section>
            
          </template>

          <q-card>
            <q-card-section>
              <q-slider
                v-model="exercise_data.etc"
                :min="0"
                :max="5"
                :step="0.5"
                label
                :label-value="exercise_data.etc + '시간'"
                label-always
                color="purple"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

      </q-list>
  </div>
    <q-btn class="full-width absolute-bottom" label="저장하기" style="max-width: 800px; width: 100%;" @click="saveEcercise" type="button" color="primary"/>
  </div>
</template>
<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'

const CURRENT_DAY = new Date()

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

export default {
  name: 'ExerciseCard',
  components: {
      
  },
  data () {
    return {
      currentBlogEntry: undefined,
      //달력
      selectedDate: getCurrentDay(CURRENT_DAY.getDate()),
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      locale: 'en-us',
      monthFormatter: this.monthFormatterFunc(),
      dayFormatter: this.dayFormatterFunc(),
      weekdayFormatter: this.weekdayFormatterFunc(),
      transitionPrev: 'slide-right',
      transitionNext: 'slide-left',
      transition: '',
      message: {},
      exercise_data: {
        writeDate: '',
        walking: 0,
        running: 0,
        gym:0,
        bike:0,
        riding:0,
        hiking:0,
        yoga:0,
        etc:0
      }
    }
  },

  watch: {
    message: function (data) {
      this.getExerciseHistory()
    },
    selectedDate: function (data) {
      this.getExerciseHistory()
    },
  },

  mounted () {
    this.getExerciseHistory()
    this.$feathersClient.service('exercise')
      .on('created', message => this.message = message);
  },

  beforeMounted () {
  },

  computed: {
    weekdaySkips () {
      return QCalendar.getWeekdaySkips(this.weekdays)
    },

    parsedStart () {
      if (this.selectedDate) {
        return QCalendar.getStartOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return undefined
    },

    parsedEnd () {
      if (this.selectedDate) {
        return QCalendar.getEndOfWeek(QCalendar.parseTimestamp(this.selectedDate), this.weekdays, this.today)
      }
      return undefined
    },

    today () {
      const newDay = new Date(CURRENT_DAY)
      const tm = QCalendar.parseDate(newDay)
      return tm
    },

    days () {
      if (this.parsedStart && this.parsedEnd) {
        return QCalendar.createDayList(
          this.parsedStart,
          this.parsedEnd,
          this.today,
          this.weekdaySkips
        )
      }
      return []
    },

    dayStyle () {
      return {
        width: 100 / this.weekdays.length + '%'
      }
    }
  },

  methods: {
    onPrev () {
      const ts = QCalendar.addToDate(this.parsedStart, { day: -7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionPrev
    },

    onNext () {
      const ts = QCalendar.addToDate(this.parsedStart, { day: 7 })
      this.selectedDate = ts.date
      this.transition = 'q-transition--' + this.transitionNext
    },

    dayClass (day) {
      return {
        row: true,
        'justify-center': true,
        'selected-date': this.selectedDate === day.date
      }
    },

    monthFormatterFunc () {
      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    weekdayFormatterFunc () {
      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },

    dayFormatterFunc () {
      console.log('day------')
      const longOptions = { timeZone: 'UTC', day: '2-digit' }
      const shortOptions = { timeZone: 'UTC', day: 'numeric' }

      return QCalendar.createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },
    // 운동 저장
    async saveEcercise() {
      console.log('this.selectedDate' , this.selectedDate)

      let data = {
        user: {
          _id: this.$store.state.auth.user._id,
          username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
          email: this.$store.state.auth.user.email,
          avatar: this.$store.state.auth.user.avatar
        },
        writeDate: this.selectedDate,
        walking: this.exercise_data.walking,
        running: this.exercise_data.running,
        gym: this.exercise_data.gym,
        bike: this.exercise_data.bike,
        riding: this.exercise_data.riding,
        hiking: this.exercise_data.hiking,
        yoga: this.exercise_data.yoga,
        etc: this.exercise_data.etc,
      }
      if (this.exercise_data._id) {
        console.log('data id' , data)
        try {
            const updateData = await this.$feathersClient.service('exercise').patch(this.exercise_data._id,
                data
            )
        } catch (err) {
            console.log('exercise update error', err)
        }
      } else {
        console.log('not id' , data)
        try {
          // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
          const resFind = await this.$feathersClient.service('exercise').create(
              data
          )
        } catch (err) {
            console.log(err)
        }
      }
    },
    // 운동 조회
    async getExerciseHistory () {
    //   const resFind = await this.$feathersClient.service('notifications').find({ query: { $sort: { createdAt: 1 } } })
      try {
        // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
        const resFind = await this.$feathersClient.service('exercise').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                writeDate: this.selectedDate,
                $sort: { sort: 1 } 
            }
        })
        // const resFind = await this.$axiosInstance.get("/blog-entry?writeDate[$in][]='2021-04-21'$sort[createdAt]=-1")
        console.log('resFind.', resFind)
        if (resFind.total > 0 ) {
          this.exercise_data = resFind.data[0]
        } else {
          this.exercise_data = {
            writeDate: '',
            walking: 0,
            running: 0,
            gym:0,
            bike:0,
            riding:0,
            hiking:0,
            yoga:0,
            etc:0
          }
        }
        
      } catch (err) {
          console.log(err)
      }
    },
  }
}
</script>
<style lang="sass" scoped>
.title-bar
  width: 100%
  height: 70px
  background: #F7C7CB
  display: flex
  flex-direction: row
  flex: 1

.direction-button
  background: #F7C7CB
  color: white
  z-index: 20

.selected-date
  color: #9c27b0
  background: white
</style>
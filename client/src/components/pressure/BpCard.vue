
<template>
  <div style="max-width: 800px; width: 100%;">
    <div class="title-bar row items-center overflow-hidden">
      <q-btn flat  icon="fas fa-chevron-left" class="direction-button" style="height: 100%" @click="onPrev" />
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
      <q-btn flat  icon="fas fa-chevron-right" class="direction-button" style="height: 100%" @click="onNext" />
    </div>
    <!-- 혈압 기록 (수축기)-->
    <q-card class="q-pa-md" style="min-width: 350px">
        <q-card-section class="q-pt-none">
          <q-input 
            filled 
            bottom-slots 
            v-model="bpData.maxBp" 
            label="수축기(Max)" 
            type="number"
            counter 
            maxlength="3"
            input-class="text-center">
            <template v-slot:prepend>
              <q-btn round dense flat icon="remove" @click="bpData.maxBp=minusNumber(bpData.maxBp)"  />
            </template>
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="bpData.maxBp=addNumber(bpData.maxBp)"  />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="bpData.maxBp"
            :min="60"
            :max="220"
            :step="1"
            label
            :label-value="bpData.maxBp + 'mmHg'"
            label-always
            color="purple"
          />
        </q-card-section>
        <!-- 혈압 기록 (이완기)-->
        <q-card-section>
          <q-input 
              filled 
              bottom-slots 
              v-model="bpData.minBp" 
              label="이완기(Min)" 
              type="number"
              counter 
              maxlength="3"
              input-class="text-center">
              <template v-slot:prepend>
                <q-btn round dense flat icon="remove" @click="bpData.minBp=minusNumber(bpData.minBp)"  />
              </template>
              <template v-slot:append>
                <q-btn round dense flat icon="add" @click="bpData.minBp=addNumber(bpData.minBp)"  />
              </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-slider
            v-model="bpData.minBp"
            :min="40"
            :max="140"
            :step="1"
            label
            :label-value="bpData.minBp + 'mmHg'"
            label-always
            color="purple"
          />
        </q-card-section>
    </q-card>

  
    <q-btn class="full-width absolute-bottom" label="저장하기" style="max-width: 800px; width: 100%;" @click="saveBp" type="button" color="primary"/>
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
  name: 'BpCard',
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
      bpData: {
        writeDate: '',
        maxBp: 120,
        minBp: 80,
        text: '테스트'
      }
    }
  },

  watch: {
    message: function (data) {
      this.getBp()
    },
    selectedDate: function (data) {
      this.getBp()
    },
  },

  mounted () {
    this.getBp()
    this.$feathersClient.service('pressure')
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
    // 혈압 저장
    async saveBp() {
      console.log('this.selectedDate' , this.selectedDate)

      let data = {
        user: {
          _id: this.$store.state.auth.user._id,
          username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
          email: this.$store.state.auth.user.email,
          avatar: this.$store.state.auth.user.avatar
        },
        writeDate: this.selectedDate,
        maxBp: this.bpData.maxBp,
        minBp: this.bpData.minBp,
        text: this.bpData.text
      }
      if (this.bpData._id) {
        console.log('data id' , data)
        try {
            const updateData = await this.$feathersClient.service('pressure').patch(this.bpData._id,
                data
            )
        } catch (err) {
            console.log('BP update error', err)
        }
      } else {
        console.log('not id' , data)
        try {
          // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
          const resFind = await this.$feathersClient.service('pressure').create(
              data
          )
        } catch (err) {
            console.log(err)
        }
      }
    },
    // 혈압 조회
    async getBp () {
      try {
        const resFind = await this.$feathersClient.service('pressure').find({
            query: {
                'user._id': this.$store.state.auth.user._id,
                writeDate: this.selectedDate,
                $sort: { sort: 1 } 
            }
        })
        console.log('resFind.', resFind)
        if (resFind.total > 0 ) {
          this.bpData = resFind.data[0]
        } else {
          this.bpData = {
            writeDate: '',
            maxBp: 120,
            minBp: 80,
            text: ''
          }
        }
        
      } catch (err) {
          console.log(err)
      }
    },

    // 증감
    addNumber ( value ) {
      return   value + 1
    },

    minusNumber ( value ) {
      return value - 1
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
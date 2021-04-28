<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit">
      <!-- {{value}} -->
      <q-card-section class="">
          <q-timeline  :side="value.side" color="secondary">

          <q-timeline-entry
            v-for="(timeline, index) in value"
            :key="index"
            :title="timeline.type"
            :subtitle="timeline.eatType" :color="timeline.color" :icon="timeline.icon"
            :side="timeline.side"
          >
          <q-list bordered padding>
            <q-item clickable v-ripple  @click="goWriteMeal(index)">
              <q-item-section top thumbnail class="q-pl-sm">
                <!-- 배열 이미지 보여주기 -->
                <div v-if="timeline.images.length > 0" class="q-gutter-sm row items-start">
                  <div class="card" v-for="(image, idx) of timeline.images" :key="idx" style="width: 150px; display: inline-block">
                      <q-img
                        :src="'http://localhost:3030/blobs/' + image"
                        spinner-color="red"
                        style="height: 140px; max-width: 150px"
                        class="rounded-borders"
                    />
                  </div> 
                </div>
                <div v-else class="text-center" @click="goWriteMeal(index)">
                  <q-icon name="add_a_photo" style="font-size: 4.4em;"></q-icon>
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{timeline.text ? timeline.text : "음식 사진을 등록해 주세요"}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>            
            <!-- <q-btn align="around" class="btn-fixed-width" color="primary" label="사진업로드" icon="folder_shared" @click="goWriteMeal(index)" /> -->
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardTimeLine',
  props: {
      value: {
          type: Array,
          required: true
      }
    },
  data () {
    return {
    }
  }, 
  methods: {
    goWriteMeal ( sort ) {
      console.log('sort' , this.value[sort])
        this.$router.push({name: 'WriteMeal', params: {valueProp : this.value[sort]}})
      //   this.$router.push({
      //   path: `/blogView/${post._id}`
      // })
        // this.$router.push({name: 'WriteMeal', params: { id: this.value[sort]._id}})
    }
  }
}
</script>
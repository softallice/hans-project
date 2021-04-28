<template>
  <div class="q-pa-md" style="max-width: 800px">
    <!-- <h6 class="subtitle">{{isNew ? 'Create new ' : 'Edit existing'}} Blog Entry</h6> -->
    <q-form
      @submit="saveEntry"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="mealData.type"
        label="제목"
        required
      />
      <q-input
        filled
        v-model="mealData.type"
        label="식사유형"
      />
      <!-- <q-input
        filled
        v-model="valueProp.eatType"
        label="식사유형"
      /> -->
      <div class="q-gutter-sm">
        <q-radio v-model="mealData.eatType" val="소식" label="소식" />
        <q-radio v-model="mealData.eatType" val="적당" label="적당" />
        <q-radio v-model="mealData.eatType" val="과식" label="과식" />
        <q-radio v-model="mealData.eatType" val="폭식" label="폭식" />
      </div>
      <q-input filled label="등록일자" v-model="mealData.writeDate">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="mealData.writeDate" mask="YYYY-MM-DD" >
                <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
                </q-date>
            </q-popup-proxy>
            </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        type="textarea"
        v-model="mealData.text"
        label="메모"
      />
      <!-- <q-input
        filled
        v-model="mealData.color"
        label="아이콘컬러"
      />
      <q-input
        filled
        v-model="mealData.icon"
        label="아이콘모양"
      />
      <q-input
        filled
        v-model="mealData.side"
        label="아이콘위치"
      />
      <q-input
        filled
        v-model="mealData.sort"
        label="정렬"
      /> -->


      <div v-if="mealData.images" class="q-pl-md q-gutter-sm row">
          <div class="q-pa-md" v-for="(image, idx) of mealData.images" :key="image" style="width: 200px; display: inline-block">
              <q-img
                :src="'http://localhost:3030/blobs/' + image"
                spinner-color="red"
                style="height: 140px; max-width: 150px"
            />
            <div class="text-left text-body2">
                <q-btn
                  size="10px"
                  style="width: 150px"
                  color="primary"
                  icon="delete"
                  label="지우기"
                  @click.prevent="deleteImage(idx)"
                />
            </div>
          </div>
          
      </div>
       
      <q-file
          accept="image/*" @input="imageAdded"
          v-model="files"
          label="Pick files"
          filled
          counter
          multiple
          class="full-width"
      > 
        <template v-slot:prepend>
          <q-icon name="add_a_photo" />
        </template>
      </q-file>
      
    </q-form>

    <q-btn class="absolute-bottom full-width" label="저장" type="submit" color="primary" @click="saveEntry"  />

  </div>
</template>
<script>
export default {
    name: 'WriteMeal',
    props: {
      valueProp: {
          type: Object,
          required: true
      }
    },
    data: () => ({
        uploadingImage: false,
        uploadingAttachment: false,
        files: null,
        valueParams: {},
        mealData: {
          user: {
          },
          type: "아침",
          writeDate: '2021-04-28',
          text: "적당히 먹음",
          eatType: "소식",
          images: [],
          color: "red",
          icon: "brunch_dining",
          side: "left",
          sort: "1"
        }
    }),
    computed: {
        
        isNew () {
          console.log('this.valueProp', this.valueProp)
            return !this.valueProp._id;
        }
    },
    activated(){
      this.getMeal()
    },
    watch: {
    mealData: function (data) {
      console.log('data', data)
    }
  },
    methods: {
      /**
       * save the entry to db
       */
      async saveEntry () {
        console.log('this.valueProp._id', this.valueProp._id)
          try {
              const updateData = await this.$feathersClient.service('meal').patch(this.valueProp._id,
                  {
                      user: this.mealData.user,
                      type: this.mealData.type,
                      writeDate: this.mealData.writeDate,
                      text: this.mealData.text,
                      eatType: this.mealData.eatType,
                      images: this.mealData.images,
                      color: this.mealData.color,
                      icon: this.mealData.icon,
                      side: this.mealData.side,
                      sort: this.mealData.sort
                  }
              )
              // this.$router.go(-1)
          } catch (err) {
              console.log('meal Register error', err)
          }
      },
      /**
       * event - image added
       */
      imageAdded (file) {
          console.log('image add', file)
          const reader = new FileReader();
          
          reader.readAsDataURL(file[0]);
          console.log('reader', reader)
          const me = this;
          me.uploadingImage = true;

          // upload finished...
          reader.onload = () => {
              // upload file to service
              this.$store.dispatch('uploads/create', { uri: reader.result }).then((response) => {
                  console.log('response.id',response.id)
                  this.mealData.images.push(response.id);
                  console.log('this.valueParams', this.mealData)
              }).catch((err) => {
                  console.log(err);
                  // this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });

              });

              me.uploadingImage = false;
          };
      },
      /**
       * delete image by index
       */
      deleteImage (idx) {
          this.mealData.images.splice(idx, 1);
          this.$emit('change', this.mealData);
      },
      
      async getMeal () {
      //   const resFind = await this.$feathersClient.service('notifications').find({ query: { $sort: { createdAt: 1 } } })
        try {
          // const resFind = await this.$axiosInstance.get("/notifications?$limit=10&$sort[createdAt]=-1")
          const resFind = await this.$feathersClient.service('meal').find({
              query: {
                  _id: this.valueProp._id
              }
          })
          // const resFind = await this.$axiosInstance.get("/blog-entry?writeDate[$in][]='2021-04-21'$sort[createdAt]=-1")
          console.log('meal resFind.', resFind)
          if (resFind.total > 0 ) {
            this.mealData = resFind.data[0]
            this.files = null
            console.log('this.mealData', this.mealData)
          } else {
            this.exercise_data = {
              user: {
              },
              type: "아침",
              writeDate: '20210428',
              text: "적당히 먹음",
              eatType: "소식",
              images: [],
              color: "red",
              icon: "brunch_dining",
              side: "left",
              sort: "1"
            }
          }
          
        } catch (err) {
            console.log(err)
        }
      },
    }
};
</script>
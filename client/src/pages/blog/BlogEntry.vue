<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        class="full-width"
        autoplay
        ref="video"
        v-show="!isCapturedImage"
      />
      <canvas
        ref="canvas"
        class="full-width"
        height="240"
        v-show="isCapturedImage"
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        round
        color="grey-10"
        size="lg"
        icon="eva-camera"
        :disable="isCapturedImage"
        @click="captureImage"
      />

      <q-file
        v-model="isImageUpload"
        outlined
        v-else
        label="Choose an Image"
        accept="image/*"
        @input="captureImageCallback"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>

      <div class="row justify-center q-ma-md">
        <q-input class="col" label="제목 *" v-model="post.title" dense />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input class="col" label="내용 *" v-model="post.body" dense />
      </div>

      <div class="row justify-center q-ma-md">
        <q-input
          class="col"
          :loading="locationLoading"
          v-model="post.location"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && locationSupported"
              round
              dense
              flat
              icon="my_location"
              @click="getLocation"
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-center q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Post Image"
          @click="postImage"
          :disable="!post.title || !post.location"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { QSpinnerFacebook } from "quasar";
require("md-gum-polyfill");
export default {
  name: "CameraPage",
  data() {
    return {
      post: {
        title: "",
        body: "",
        location: "",
        author: {
          _id: this.$store.state.auth.user._id,
          username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
          email: this.$store.state.auth.user.email,
          avatar: this.$store.state.auth.user.avatar
        },
        category: "",
        images: [],
      },
      imgURL: null,
      isCapturedImage: false,
      isImageUpload: [],
      hasCameraSupport: true,
      locationLoading: false
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) return true;
      return false;
    },
  },
  methods: {
    initCamera() {
      //ask permission for access cam
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((err) => {
          //user rejected to access camera
          this.hasCameraSupport = false;
        });
    },
    captureImageCallback(file) {
      //store img to state
      this.post.imgURL = file;

      //write canvas from upload image
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");
      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          //show canvas
          this.isCapturedImage = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    captureImage() {
      //get dom
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      // set canvas height and width
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      // stream video to canvas
      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.isCapturedImage = true;
      //convert file to blob
      // this.post.imgURL = this.dataURItoBlob(canvas.toDataURL());
      // 
      this.post.imgURL = canvas.toDataURL();
      this.disableCamera();
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (err) => {
          this.locationError();
        },
        { timeout: 7000 }
      );
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      this.$axios
        .get(apiUrl)
        .then((res) => {
          this.locationSuccess(res);
        })
        .catch((err) => {
          this.locationError();
        });
    },
    locationSuccess(res) {
      this.post.location = res.data.city;
      if (res.data.country) {
        this.post.location += `, ${res.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Sorry something wrong, cannot find your location",
      });
      this.locationLoading = false;
    },
    async saveImage() {
      try {
        const res = await this.$store.dispatch('uploads/create', { uri: this.post.imgURL })
        this.post.images.push(res.id);
      } catch (err) {
        console.log(err);
      }
    },
    postImage: async function () {
      let formData = {
          title: this.post.title,
          body: this.post.body,
          author: {
            _id: this.$store.state.auth.user._id,
            username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
            email: this.$store.state.auth.user.email,
            avatar: this.$store.state.auth.user.avatar
          },
          location: this.post.location,
          category: this.post.category,
          images: this.post.images

      }
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
      });

      await this.saveImage()
  
      try {
        const res = await this.$feathersClient.service('blog').create(
            formData            
        );
        this.$q.loading.hide();
        // this.$router.push("/");
        this.$q.notify({
          message: "Upload Successfully.",
          color: "primary",
          actions: [
            {
              label: "Dismiss",
              color: "white",
              handler: () => {
                /* ... */
              },
            },
          ],
        });
        //성공완료 후 초기화
        this.postInit()
      } catch (err) {
        this.$q.loading.hide();
        if (!navigator.onLine && this.isSupportedBackgroundSycn) {
          this.$q.notify('Post Created offline')
          this.$router.push('/')
        } else {
          this.$q.dialog({
            title: "Error",
            message: "Sorry something wrong, Upload Failed",
          });
        }
      }
    },
    postInit() {
      this.post.title= ""
      this.post.body= ""
      this.post.location= ""
      this.post.author= {}
      this.post.category= ""
      this.post.images= []
      this.post.imgURL= null
      this.post.isCapturedImage= false
      this.post.isImageUpload= []
      this.post.hasCameraSupport= true
      this.post.locationLoading= false
    }
  },
  //mounted() {
  activated() {
    this.initCamera();
  },
  beforeDestroy() {
    console.log('this.hasCameraSupport',this.hasCameraSupport)
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
  // 화면 전환시 카메라 핸들링
  beforeRouteLeave (to, from, next) {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
    next()
  }
};
</script>

<style lang="sass" scoped>
.camera-frame
    border : 2px solid $green-10
    border-radius : 10px
</style>

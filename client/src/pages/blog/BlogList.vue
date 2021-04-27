<template>
  <q-page class="constrain q-pa-md">
    <div class="row row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!isLoading && posts.length">
          <div v-for="post in posts" :key="post._id" @click="goClick(post)">
            <PostCard :post="post"/>
          </div>
        </template>
        <template v-else-if="!isLoading && !posts.length">
          <h5 class="text-center text-grey">등록된 글이 없습니다.</h5>
        </template>
        <template v-else>
          <SkeletonPostCard />
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{$store.state.auth.user.lastname + this.$store.state.auth.user.firstname}}</q-item-label>
            <q-item-label caption> {{$store.state.auth.user.lastname}} </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostCard from "../../components/blog/PostCard";
import SkeletonPostCard from "../../components/blog/SkeletonPostCard";
export default {
  name: "HomePage",
  components: {
    PostCard,
    SkeletonPostCard,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  methods: {
    getPosts: async function () {
      this.isLoading = true;
      try {
        const response = await this.$feathersClient.service('blog').find({
            query: {
               $sort: { createdAt: -1 } 
            }
        })
        this.posts = response.data;
        console.log(response.data)
        this.isLoading = false;
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed fetch data",
        });
        this.isLoading = false;
      }
    },
    async goClick(post) {
      console.log('post >>> ', post)
      try {
        // const res = await this.$axiosInstance.put("blog/" + post._id,{
        //   cnt: {
        //     view: post.cnt.view + 1
        //   }
        // })
        const res =  await this.$feathersClient.service('blog').patch(post._id, {
            view: post.view + 1
        })
      } catch (err) {
        console.log(err);
      }
      this.$router.push({
        path: `/blogView/${post._id}`
      })
    },
  },
  activated(){
    this.getPosts();
  },
};
</script>

<style lang="sass">
.post-card
  .badge-offline
    border-top-left-radius: 0
  .q-img
    min-height: 200px
</style>

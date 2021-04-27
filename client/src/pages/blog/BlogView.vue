<template>
  <q-page class="constrain q-pa-md">
    <div class="row row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!isLoading && posts.length">
          <div v-for="post in posts" :key="post._id">
            <PostCard :post="post" />
          </div>
        </template>
        <template v-else-if="!isLoading && !posts.length">
          <h5 class="text-center text-grey">No Posts yet.</h5>
        </template>
        <template v-else>
          <SkeletonPostCard />
        </template>
        <!-- 댓글 자리 -->
        <CommentCard :blogId="$route.params.blogId ? $route.params.blogId : 'aaaaaa'"/>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">han-js</q-item-label>
            <q-item-label caption> han-js </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostCard from "../../components/blog/PostCard";
import SkeletonPostCard from "../../components/blog/SkeletonPostCard";
import CommentCard from "../../components/comments/CommentCard";
export default {
  name: "BlogView",
  components: {
    PostCard,
    SkeletonPostCard,
    CommentCard,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  
  // props ID 받아서 한건만 보기
  // this.$route.params.blogId
  methods: {
    getPosts: async function () {
      this.isLoading = true;
      try {
        const response = await this.$feathersClient.service('blog').find({
            query: {
              _id: this.$route.params.blogId
            }
        })
        this.posts = response.data;
        this.isLoading = false;
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed fetch data",
        });
        this.isLoading = false;
      }
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

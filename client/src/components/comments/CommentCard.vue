<template>
  <div>
    <template v-if="posts.length">
      <q-list bordered padding>
        <q-item v-for="post in posts" :key="post._id">
          <q-item-section top avatar>
            <!-- <q-avatar color="primary" text-color="white" icon="bluetooth" /> -->
            <q-avatar>
              <!-- <img :src="post.author.avatar ? post.author.avatar : `https://cdn.quasar.dev/img/avatar.png`"> -->
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption>{{post.text}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ post.createdAt | formatedDate }}</q-item-label>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn 
                v-if="$store.state.auth.user.email === post.author.email" 
                size="12px" 
                flat 
                dense 
                round 
                icon="delete" 
                @click="delComments(post._id)" 
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
    <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="comment" placeholder="댓글 등록" @keyup.enter="postComments" />
          <q-btn round flat label="등록" @click="postComments" />
        </q-toolbar>
    </q-footer>
  </div>
</template>
<script>
import { date } from "quasar";
export default {
    name: "CommentCard",
    props: { 
        blogId: { 
            type: String, 
            required: true 
        } 
    },
    data() {
        return {
        posts: [],
        comment: "",
        };
    },
    filters: {
    formatedDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    },
  },
    methods: {
    getComments: async function () {
      this.isLoading = true;
      try {
        const response = await this.$feathersClient.service('comment').find({
            query: {
              blog: this.blogId,
              $sort: { createdAt: -1 } 
            }
        })
        this.posts = response.data;
        console.log('response.data', response.data)
        this.isLoading = false;
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed fetch data",
        });
        this.isLoading = false;
      }
    },
    postComments: async function () {
      const data = {
            blog: this.blogId,
            text: this.comment,
            author: {
                _id: this.$store.state.auth.user._id,
                username: this.$store.state.auth.user.lastname + this.$store.state.auth.user.firstname,
                email: this.$store.state.auth.user.email,
                avatar: this.$store.state.auth.user.avatar
            },
            isDeleted: false,
            parentComment: {}
      }

      console.log('data', data)
      this.isLoading = true;
      try {
        const response = await this.$feathersClient.service('comment').create(
          data
        )
        await this.getComments();
        this.comment = ""
        this.isLoading = false;
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed fetch data",
        });
        this.isLoading = false;
      }
    },
    delComments: async function (commentId) {
      this.isLoading = true;
      try {
        const response = await this.$feathersClient.service('comment').remove(commentId)
        this.isLoading = false;
        await this.getComments();
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed delete data",
        });
        this.isLoading = false;
      }
    },
    deleteImage (idx) {
      this.posts.images.splice(idx, 1);
      this.$emit('change', this.posts);
    },
  },
  activated(){
    this.getComments();
  },
}
</script>

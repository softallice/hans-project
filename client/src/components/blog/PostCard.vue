<template>
  <q-card
    class="post-card q-mb-md"
    :class="{ 'bg-red-1': post.offline }"
    flat
    bordered
  >
    <q-badge v-if="post.offline" color="red" class="badge-offline absolute-top-right">
      Stored offline
    </q-badge>

    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold">{{$store.state.auth.user.lastname + this.$store.state.auth.user.firstname}}</q-item-label>
        <q-item-label caption> {{ post.location }} </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <q-btn-dropdown size="12px" flat dense round dropdown-icon="more_vert">
          <q-list>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>수정</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="delPost(post._id)">
              <q-item-section>
                <q-item-label>삭제</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img :src="'http://localhost:3030/blobs/' + post.images[0]"/>
    <!-- <div v-if="post.images" class="q-gutter-sm row items-start">
      <div class="card" v-for="(image, idx) of post.images" :key="idx" style="width: 200px; display: inline-block">
          <q-img
            :src="'http://localhost:3030/blobs/' + image"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
        />
      </div> 
    </div> -->

    <q-card-section>
      <div>{{ post.title }}</div>
      <div>{{ post.body }}</div>
      <div class="row">
        <div class="col text-caption text-grey">
          {{ post.createdAt | formatedDate }}
        </div>
        <div class="col text-right">
          {{post.like}}
          <q-btn flat round color="pink" size="sm" icon="favorite" @click="onLikeClick(post._id, post.like)"/>
        </div>
        <div class="col text-right">
          {{post.view}}
          <q-btn flat round color="grey" size="sm" icon="visibility" />
        </div>
        <div class="col text-right">
          <q-btn flat round color="grey" size="sm" :label="commentCnt" icon="receipt" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from "quasar";
export default {
  name: "PostCard",
  data() {
    return {
      commentCnt: 0
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatedDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    },
  },
  mounted() {
    this.getCommentCnt()
  },
  methods: {
    async getCommentCnt () {
      
      try {
        const response = await this.$feathersClient.service('comment').find({
            query: {
              blog: this.post._id
            }
        })
        this.commentCnt = response.total
        
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed fetch data",
        });
        
      }
    },
    onItemClick () {
      // console.log('Clicked on an Item')
    },
    async delPost (postId) {
      try {
        const response = await this.$feathersClient.service('blog').remove(postId)
        this.$router.push("/blog")
      } catch (err) {
        this.$q.dialog({
          title: "Error",
          message: "Sorry something wrong, failed delete data",
        });
      }
    },
    async onLikeClick(postId, like) {
      console.log('postId', postId)
      console.log('like', like)
      try {
        const res =  await this.$feathersClient.service('blog').patch(postId, {
            like: like + 1
        })
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="sass">
  .badge-offline
    border-top-left-radius : 0 !important
  
</style>
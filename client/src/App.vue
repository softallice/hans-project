<template>
  <div id="q-app">
    <q-img
      :placeholder-src="activeTheme.bgImage"
      :src="activeTheme.bgImage"
      :ratio="16/9"
      no-default-spinner
      img-class="filter"
      class="fixed-full bg-image"
    />
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <!-- <router-view v-if="!!position" :content="position" /> -->
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { onMounted, watch } from "@vue/composition-api";
import { mapGetters } from 'vuex'

export default {
  name: "App",
  watch: {
    currentUser(newUser, oldUser) {
      if (newUser === null) {
        this.$router.push("/");
      } else {
        if (this.$route.path === "/login") {
          // this.$router.push("/account");
          this.$router.push("/");
        }
      }
    }
  },
  setup(props, context) {
    const { $store } = context.root;
    // Attempt jwt auth when the app mounts.
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch(error => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      });
    });
    return {};
  },
  created () {
    if (localStorage.getItem('dark') === true) {
      this.$q.dark.set(true)
    } else {
      this.$q.dark.set(false)
    }
    
  },
  beforeMount () {
  },
  mounted () {
    // this.checkAccessDevicePosition()
  },
  data: () => ({
    position: null
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapGetters('theme', ['activeTheme'])
  },
  methods: {
    
  }
};
</script>


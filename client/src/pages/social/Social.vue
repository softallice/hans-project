<template>
  <q-page class="q-pa-sm">
      <card-tab-social :socialProp="social"/>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'Social',
    components: {
        CardTabSocial: () =>  import('components/cards/CardTabSocial'),
    },
    data() {
        return {
            mode: 'list',
            social: 
            {
                contacts: [
                    {
                        name: 'Pratik Patel',
                        position: 'Developer',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4'
                    },
                    {
                        name: 'Razvan Stoenescu',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'
                    },
                    {
                        name: 'Jeff Galbraith',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg'
                    },
                    {
                        name: 'Brunhilde Panswick',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
                    },
                    {
                        name: 'Winfield Stapforth',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
                    },
                ],
                rcvMessages: [
                    {
                        id: 5,
                        name: 'Pratik Patel',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
                        time: '10:42 PM'
                    }, {
                        id: 6,
                        name: 'Winfield Stapforth',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
                        time: '11:17 AM'
                    }, {
                        id: 1,
                        name: 'Boy',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
                        time: '5:17 AM'
                    }, {
                        id: 2,
                        name: 'Jeff Galbraith',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
                        time: '5:17 AM'
                    }, {
                        id: 3,
                        name: 'Razvan Stoenescu',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
                        time: '5:17 AM'
                    }
                ],
            }
        }
    },
    computed: {
        ...mapGetters('messages', {
            findMessagesInStore: 'find'
        }),
        messages () {
            return  this.findMessagesInStore({ 
                    query: { 
                        'rcvUser._id': this.$store.state.auth.user._id,
                        $sort: { createdAt: 1 } 
                    } 
                })
        }
    },
    created () {
        // Query messages from Feathers
        this.findMessages({
            query: {
                $sort: { createdAt: -1 },
                $limit: 5
            }
        })
    },
    async activated(){
        // console.log('this.messages.data' , messages.data)
    //   this.social.rcvMessages = messages.data
        const msg = await this.findMessages({
            query: {
                'rcvUser._id': this.$store.state.auth.user._id,
                $sort: { createdAt: -1 },
                $limit: 10
            }
        })
        this.social.rcvMessages = msg.data
    },
    methods: {
        ...mapActions('messages', {
            findMessages: 'find',
            createMessage: 'create'
        })
    },
}
</script>

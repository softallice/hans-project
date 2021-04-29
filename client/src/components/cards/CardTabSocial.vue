<template>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card class="fit">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="contact" :class="tab=='contact'?'text-blue':''" icon="contacts" label="Contact"/>
          <q-tab name="message" :class="tab=='message'?'text-blue':''" icon="comment" label="Message">
            <q-badge color="red" floating>{{socialProp.rcvMessages.length}}</q-badge>
          </q-tab>
          <q-tab name="notification" :class="tab=='notification'?'text-blue':''" icon="notifications"
                  label="Notification">
            <q-badge color="red" floating>4</q-badge>
          </q-tab>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contact" class="q-pa-sm">
            <q-list class="rounded-borders" separator>

              <q-item
                v-for="(contact, index) in socialProp.contacts"
                :key="index"
                clickable
                v-ripple 
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="contact.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{contact.name}}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{contact.position}}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="md" flat color="blue" dense round icon="comment"/>
                    <q-btn class="gt-xs" size="md" flat color="red" dense round icon="email"/>
                    <q-btn size="md" flat dense round color="green" icon="phone"/>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

          </q-tab-panel>

          <q-tab-panel name="message" class="q-pa-sm">
            <q-item v-for="(msg, index) in socialProp.rcvMessages" :key="index" clickable v-ripple @click="popupMassage(index)">
              <q-item-section avatar>
                <!-- avatar undefined 처리 필요 -->
                <q-avatar>
                  <img :src="msg.user.avatar ? msg.user.avatar : 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ msg.user.firstname }}</q-item-label>
                <q-item-label caption lines="1">{{ msg.text }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption> {{msg.createdAt | formatedDate}} </q-item-label>
              </q-item-section>
            </q-item>
          </q-tab-panel>

          <q-tab-panel name="notification" class="q-pa-sm">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="info"/>
                </q-item-section>

                <q-item-section>Avatar-type icon</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="report"/>
                </q-item-section>

                <q-item-section>Avatar-type icon</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="remove"/>
                </q-item-section>

                <q-item-section>Avatar-type icon</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="remove_circle_outline"/>
                </q-item-section>

                <q-item-section>Avatar-type icon</q-item-section>
              </q-item>

          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!-- 메시지 상세 다이얼로그 -->
    <q-dialog v-model="messageCard">
      <q-card style="min-width: 300px">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{socialProp.rcvMessages[this.messageIndex].user.firstname}}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="timer" />
              {{socialProp.rcvMessages[this.messageIndex].createdAt | formatedDate}}
            </div>
          </div>

          <div class="text-caption text-grey">
              {{socialProp.rcvMessages[this.messageIndex].text}}
          </div>
        </q-card-section>

        

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="닫기" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";

export default {
  name: 'CardTabSocial',
  props: {
    socialProp: {
        type: Object,
        required: true
    }
  },
  data () {
    return {
      tab: 'message',
      messageCard: false,
      messageIndex: 0
    }
  },
  filters: {
    formatedDate(value) {
      return date.formatDate(value, "MM D h:mmA");
    },
  },
  methods: {
    popupMassage ( index ) {
      this.messageCard = true
      this.messageIndex = index
    }
  }
}
</script>
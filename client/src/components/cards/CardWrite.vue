<template>
  <div class="q-pa-md row items-start q-gutter-md">
      <!-- 01. 다이어트 -->
      <q-card class="my-card" @click="$router.push('/weight')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/diet.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">체중 등록</div>
                <div class="text-grey">체중 기록을 통한 건강관리를 해보세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" to="/diet" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- 02. 운동 -->
      <q-card class="my-card" @click="$router.push('/exercise')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/exercise.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">운동</div>
                <div class="text-grey">운동 기록을 통한 건강관리를 해보세쇼</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- 03. 식단 -->
      <q-card class="my-card" @click="$router.push('/meal')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/food-pyramid.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">식단관리</div>
                <div class="text-grey">식단 기록을 통한 영양과 건강을 챙겨 주세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" to="/stature" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- 04. 혈당 및 혈압 -->
      <q-card class="my-card" @click="$router.push('/writeBp')">
        <q-card-section >
          <q-card-section horizontal class="col-6 flex flex-center">
            <q-img
              class="rounded-border"
              style="height: 55px; max-width: 55px"
              src="../../assets/images/menus/sugar-blood-level.png"
            />
            <q-card-actions vertical>
              <div>
                <div class="text-weight-bold">혈당 및 혈압</div>
                <div class="text-grey">지속적인 만성 질환 관리를 시작하세요.</div>
              </div>
            </q-card-actions>

            <q-card-actions vertical>
              <q-btn flat round color="primary"  icon="chevron_right" />
            </q-card-actions>
          </q-card-section>
        </q-card-section>
      </q-card>
  </div>
</template>

<script>
export default {
  name: "CardWrite",
  data() {
    return {
    }
  }
}
</script>

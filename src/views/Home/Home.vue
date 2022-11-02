<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- v-for 也可以在自定义组件中使用 -->
    <Floor v-for="floor in floorlist" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import Recommend from '@/views/Home/Recommend/Recommend.vue'
import Rank from '@/views/Home/Rank/Rank.vue'
import Like from '@/views/Home/Like/Like.vue'
import Floor from '@/views/Home/Floor/Floor.vue'
import Brand from '@/views/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorlist: (state) => state.home.floorlist
    })
  },
  mounted() {
    // 派发actions 获取floor组件数据
    this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less" scoped></style>

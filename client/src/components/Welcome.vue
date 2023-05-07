<template>
  <div>
    <el-card>
      <el-carousel type="card" height="500px" :interval="5000">
        <el-carousel-item><img src="../assets/img/welcome1.jpeg" alt=""></el-carousel-item>
        <el-carousel-item><img src="../assets/img/shop1.jpeg" alt=""></el-carousel-item>
        <el-carousel-item><img src="../assets/img/shop2.jpeg" alt=""></el-carousel-item>
        <el-carousel-item><img src="../assets/img/shop3.jpeg" alt=""></el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.el-carousel{
  width: 100%;
}
img{
  width: 100%;
  height: 100%;
}
</style>
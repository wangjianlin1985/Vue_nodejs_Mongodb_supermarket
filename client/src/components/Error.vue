<template>
  <div class="err404_container">
    <div class="dag"></div>
    <div class="logo" id="a" @click="aud" title="点击我有惊喜！">
      <img src="../assets/img/20171216094159_QaLXP.jpeg">
			</div>
			<br /><br />
			<div class="container">
      <p id="roloadText">404！网页君找不到这个网页了哦...</p>
    </div>

    <div class="box bg-1">
      <button class="button button--antiman button--round-l button--text-medium" @click="toHome"><span>返回首页</span></button>
	  </div>

    <audio autoplay loop id="music">
      <source src="../assets/music/music.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import '../assets/js/jquery.min'
import '../assets/js/jquery.beattext'
import '../assets/js/easying'
  $(document).ready(function() {
    $('p#roloadText').beatText({isAuth:true,beatHeight:"1em",isRotate:false,upTime:100,downTime:100});
  })
export default {
  methods: {
    toHome() {
      this.$router.push('/home')
    },
    aud(){
      var audio = document.getElementById('music'); 
      if(audio.paused){                 
        audio.play();//audio.play();// 播放  
      }
      else{
        audio.pause();// 暂停
      } 
   }
  }
}
</script>

<style lang="less" scoped>
.err404_container{
  height: 100%;
  background: url(../assets/img/yourname.jpg) no-repeat left top;
  background-size: 100% 100%;
  .dag{
    height: 100px;
  }
  .button--antiman{
    cursor: pointer;
  }
}
</style>

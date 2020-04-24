<template>
  <div class="home">


<!--    <router-link to="/register">注册</router-link>-->
    <HomeHeader></HomeHeader>
      <transition name="slide-fade">
          <router-view></router-view>
      </transition>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
  import HomeHeader from "./home/HomeHeader";
  import HomeMain from "./home/HomeMain";
  import HomeFooter from "./home/HomeFooter";
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeMain,
    HomeFooter
  }
}
</script>
<style  scoped>
    template{
        background: #e3e3e3;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-leave-to {
        /*transform: translateX(10px);*/
        opacity: 0;
    }
</style>

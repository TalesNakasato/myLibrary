<template>
  <navBar/>
  <homePage />
</template>

<script>
//components
import navBar from "../components/navBar.vue";
import homePage from "../components/homePage.vue";
import registerBook from "../components/registerBook.vue"

export default {
  name: "HomeView",
  components: { navBar, homePage, registerBook },
  data(){
    return {
      showHomePage: true,
      showRegisterBook: false,
    }
  },
};
</script>

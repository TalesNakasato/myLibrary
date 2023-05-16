<template>
  <v-app-bar :elevation="4" id="navBar">
    <div class="container">
      <div class="title">
        <h2 class="bar-font" @click="$router.push('/')"> <v-icon class="mdi mdi-library"/> My Library</h2>
      </div>
      <div class="bar-itens">
        <h4 class="bar-font" @click="$router.push('/myBooks')"> <v-icon class="mdi mdi-book-open-page-variant"/> My Books</h4>
        <h4 class="bar-font" @click="$router.push('/registerBook')"> <v-icon class="mdi mdi-book-plus"/>
          Register New Book
        </h4>
        <h4 class="bar-font" @click="$router.push('/editBooks')"> <v-icon class="mdi mdi-book-edit"/> Edit</h4>
        <h4 class="bar-font" @click="$router.push('/removeBooks')"> <v-icon class="mdi mdi-book-cancel"/> Remove</h4>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bar-font {
  color: #fff;
}

.bar-font:hover {
  cursor: pointer;
}

.bar-itens {
  width: 40vw;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.title {
  margin-left: 1%;
}
</style>
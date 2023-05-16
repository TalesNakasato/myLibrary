<template>
  <router-view />
</template>

<script setup>
//
</script>

<style>
.v-toolbar__content, .v-main{
    background-image: linear-gradient(
      150deg,
      #1a255f 0,
      #28225c 25%,
      #321f59 50%,
      #3a1c55 75%,
      #411851 100%
    );
}

.v-btn .v-btn__content {
  pointer-events: none;
}

.v-list-item-title .v-list-item-titlecontent {
  pointer-events: none;
}
</style>

<template>
  <div class="card">
    <v-card :title="cardTitle" :text="cardText" style="width: 600px;
              height: 220px;
              background-color: #0c162d;
              border: 2px solid #202637;
              color: white;
            "></v-card>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      cardTitle: "My Library",
      cardText:
        "Here's your new library, where you will be able to organize and register all your read books together. Please Enjoy it!\n",
      instructions: "",
    };
  },
  created() {
    this.instructions = `\n      - Register a new book by clicking in the 'Register New Book' in the top menu  
      - View all your registered books in 'My books'
      - Edit any book in 'Edit'
      - Remove any book in 'Remove'`; 

   this.cardText += this.instructions;
  }
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  margin-top: 3%;
  white-space: pre-wrap;
}
</style>
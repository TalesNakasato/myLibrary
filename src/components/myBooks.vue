<template>
    <v-app class="my-books">
        <navBar />
        <v-table class="books">
      <thead>
        <tr id="header-text">
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Author
          </th>
          <th class="text-left">
            Publisher
          </th>
          <th class="text-left">
            Observation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="book in books"
          :key="book.id"
        >
          <td>{{ book.bookName }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.observation }}</td>
        </tr>
      </tbody>
    </v-table>
    </v-app>
</template>

<script>
//components
import navBar from '../components/navBar.vue'

//axios
import axios from 'axios'

export default {
    name: 'myBooks',
    components: { navBar },
    data(){
        return {
            books: []
        }
    },
    methods: {
    },
    created(){
        const books = {
                    method: "GET",
                    url: "http://localhost:9000/myBooks",
                };

                axios(books)
                    .then((res) => {

                    console.log(res)
                    this.books = res.data
                    })
                    .catch((error) => {
                        console.error(error);
                    });
    }
}
</script>

<style scoped>
.my-books {
    background-image: linear-gradient(150deg,
            #1a255f 0,
            #28225c 25%,
            #321f59 50%,
            #3a1c55 75%,
            #411851 100%);
    display: flex;
    justify-content: center;
}
.books {
    width: 90%;
    margin-top: 7%;
    margin-left: 5%;
    color: white;
    background-color: rgba(12, 22, 45, 0.5);
    border: 2px solid #202637;
}
#header-text th {
    color: white;
}
</style>
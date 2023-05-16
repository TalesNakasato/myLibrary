<template>
    <v-app class="editBook">
        <navBar />
        <v-table v-if="!onEdit" class="books">
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
                    <th class="text-left">
                        Edit Book
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.bookName }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ book.observation }}</td>
                    <td><v-btn class="btn-edit" @click="onEditClick" :id="book.id">EDIT</v-btn></td>
                </tr>
            </tbody>
        </v-table>
        <div class="form" v-if="onEdit">
            <div class="bookForm">
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="id" label="ID" readonly></v-text-field>
                    <v-text-field v-model="bookName" label="Book's name"></v-text-field>
                    <v-text-field v-model="author" label="Author"></v-text-field>
                    <v-text-field v-model="publisher" label="Publisher"></v-text-field>
                    <v-text-field v-model="observation" label="Observation"></v-text-field>
                    <v-btn @click="saveEdit" type="submit" block class="btn-register mt-2">Save</v-btn>
                    <v-btn @click="onCancelClick" type="submit" block class="btn-register mt-2">Cancel</v-btn>
                </v-form>
            </div>
        </div>
        <div class="alert-modal">
            <v-alert class="alert" v-if="showAlert" :color="alertColor" :icon="alertIcon" :title="alertTitle"
                :text="alertText"></v-alert>
        </div>
    </v-app>
</template>

<script>
//components
import navBar from '../components/navBar.vue'

//axios
import axios from 'axios';

export default {
    name: 'editBooks',
    components: { navBar },
    data() {
        return {
            onEdit: false,
            books: [],
            selectedBook: "",
            book: [],
            id: "",
            bookName: "",
            author: "",
            publisher: "",
            observation: "",
            showAlert: false,
        }
    },
    created() {
        this.getBooks();
    },
    methods: {
        getBooks() {
            const books = {
                method: "GET",
                url: "http://localhost:9000/myBooks",
            };

            axios(books)
                .then((res) => {
                    this.books = res.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onEditClick(e) {
            this.selectedBook = (e.target.id);
            this.getSelectedBook();
        },
        getSelectedBook() {

            if (this.selectedBook == '' || this.selectedBook == null) {
                alert('empty id')
            } else {
                const book = {
                    method: "POST",
                    url: "http://localhost:9000/selectedBook",
                    data: { id: this.selectedBook },
                }

                axios(book)
                    .then((res) => {
                        this.book = res.data
                        this.id = this.book.id
                        this.bookName = this.book.bookName
                        this.author = this.book.author
                        this.publisher = this.book.publisher
                        this.observation = this.book.observation
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                this.onEdit = true;
            }
        },
        onCancelClick() {
            this.onEdit = false;
        },
        saveEdit() {
            const editedBook = {
                method: "PUT",
                url: "http://localhost:9000/editBooks",
                data: {
                    id: this.id,
                    bookName: this.bookName,
                    author: this.author,
                    publisher: this.publisher,
                    observation: this.observation,
                }
            }
            axios(editedBook)
                .then(() => {
                    this.alertColor = "success";
                    this.alertIcon = "$success";
                    this.alertTitle = "Success!!"
                    this.alertText = "Your book has been successfuly Edited!"
                    this.showAlert = true;
                    setTimeout(this.exitAlert, 1500)
                    this.onEdit = false;
                    this.getBooks();
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        exitAlert() {
            this.showAlert = false;
        },
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
}

#header-text th {
    color: white;
}

.books {
    margin-top: 7%;
    color: white;
}

.editBook {
    justify-content: center;
    display: flex;
    background-image: linear-gradient(150deg,
            #1a255f 0,
            #28225c 25%,
            #321f59 50%,
            #3a1c55 75%,
            #411851 100%);
}

.bookForm {
    width: 40%;
    color: white;
}

.form {
    justify-content: center;
    display: flex;
    width: 100vw;
    margin-top: 7%;
    overflow: hidden;
}

.books {
    width: 90%;
    margin-top: 7%;
    margin-left: 5%;
    color: white;
    background-color: rgba(12, 22, 45, 0.5);
    border: 2px solid #202637;
}

.btn-edit {
    color: white;
    background: #202637;
}

.alert-modal {
    margin-left: 40%;
    margin-top: 3%;
}

.alert {
    display: flex;
    justify-content: center;
    width: 40%;
}
</style>
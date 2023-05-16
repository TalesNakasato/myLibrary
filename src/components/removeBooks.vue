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
                    <th class="text-left">
                        Remove Book
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.bookName }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ book.observation }}</td>
                    <td><v-btn class="btn-remove" @click="openRemoveDialog" :id="book.id">REMOVE</v-btn></td>
                </tr>
            </tbody>
        </v-table>
        <v-row justify="center">
            <v-dialog v-model="showRemoveDialog" persistent width="auto">
                <v-card class="remove-dialog">
                    <v-card-title class="text-h5">
                        Remove Book
                    </v-card-title>
                    <v-card-text>By clicking on remove you will permanently delete this book from your
                        library. Are you sure? </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" variant="text" @click="onCancelClick">
                            Cancel
                        </v-btn>
                        <v-btn color="green-darken-1" variant="text" @click="onRemoveClick">
                            Remove
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <div class="alert-modal">
            <v-alert class="alert" v-if="showAlert" :color="alertColor" :icon="alertIcon" :title="alertTitle"
                :text="alertText"></v-alert>
        </div>
    </v-app>
</template>

<script>
//components
import navBar from '../components/navBar.vue';

//axios
import axios from 'axios';

export default {
    name: 'removeBooks',
    components: { navBar },
    data() {
        return {
            books: [],
            selectedBook: '',
            showRemoveDialog: false,
            showAlert: false,
            alertColor: '',
            alertIcon: '',
            alertTitle: '',
            alertText: '',
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
                    console.error(error);
                });
        },
        openRemoveDialog(e) {
            this.selectedBook = (e.target.id);

            console.log(this.selectedBook)
            this.showRemoveDialog = true;
        },
        onCancelClick() {
            this.showRemoveDialog = false;

        },
        onRemoveClick() {
            const removedBook = {
                method: "DELETE",
                url: "http://localhost:9000/removeBooks",
                data: { id: this.selectedBook },
            }

            axios(removedBook)
                .then(() => {
                    this.onRemoveSuccess()
                })
                .catch((error) => {
                    this.onError(error);
                });
        },
        onRemoveSuccess() {
            if (this.selectedBook === '' || this.selectedBook === null) {
                this.onEmptyBook();
            } else {
                this.showRemoveDialog = false
                this.alertColor = 'success';
                this.alertIcon = '$success';
                this.alertTitle = 'Success!!';
                this.alertText = 'The book has been successfully removed from your library';
                this.showAlert = true;

                this.getBooks();
                setTimeout(this.exitAlert, 1500);
            }
        },
        onError(error) {
            this.showRemoveDialog = false;
            this.alertColor = 'error';
            this.alertIcon = '$error';
            this.alertTitle = 'Error';
            this.alertText = `There was an error during the removing operation ${error}`
            this.showAlert = true
        },
        exitAlert() {
            this.showAlert = false;
        },
        onEmptyBook() {
            this.alertColor = 'error';
            this.alertIcon = '$error';
            this.alertTitle = 'Error';
            this.alertText = `There was an error removing the book`
            this.showRemoveDialog = false;
            this.showAlert = true
            setTimeout(this.exitAlert, 1500);
        }
    },
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

.btn-remove {
    color: white;
    background: #202637;
}

.remove-dialog {
    background: #0c162d;
    color: white;
}

.alert-modal {
    margin-left: 35%;
    position: absolute;
    margin-top: 35%;
}

.alert {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
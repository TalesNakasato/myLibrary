<template>
    <v-app class="registerBook">
        <navBar />
        <div class="form">
            <div class="bookForm">
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="bookName" label="Book's name"></v-text-field>

                    <v-text-field v-model="author" label="Author"></v-text-field>
                    <v-text-field v-model="publisher" label="Publisher"></v-text-field>
                    <v-text-field v-model="observation" label="Observation"></v-text-field>
                    <v-btn @click="registerBook" type="submit" block class="btn-register mt-2">Register Book</v-btn>
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
import navBar from "../components/navBar.vue";

import axios from "axios";

export default {
    name: "registerBook",
    components: { navBar },
    data() {
        return {
            bookName: "",
            author: "",
            publisher: "",
            observation: "",
            alertColor: "success",
            alertIcon: "",
            alertTitle: "",
            alertText: "",
            showAlert: false,
        };
    },
    methods: {
        registerBook() {

            if (this.bookName === "" || null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error!!"
                this.alertText = "Your book must have a name."
                this.showAlert = true;

                setTimeout(this.exitAlert, 1500)

            } else if (this.author == "" || null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error!!"
                this.alertText = "Your book must have an author."
                this.showAlert = true;

                setTimeout(this.exitAlert, 1500)

            } else if (this.publisher === "" || null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error!!"
                this.alertText = "Your book must have a publisher."
                this.showAlert = true;

                setTimeout(this.exitAlert, 1500)
            } else {
                const newBook = {
                    method: "POST",
                    url: "http://localhost:9000/registerBook",
                    data: {
                        bookName: this.bookName,
                        author: this.author,
                        publisher: this.publisher,
                        observation: this.observation,
                    },
                };

                axios(newBook)
                    .then(() => {

                        this.alertColor = "success";
                        this.alertIcon = "$success";
                        this.alertTitle = "Success!!"
                        this.alertText = "Your book has been successfuly registered!"
                        this.showAlert = true;

                        this.cleanFormFields();

                        setTimeout(this.exitAlert, 1500)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            
        },
        cleanFormFields() {
            this.bookName = '';
            this.author = '';
            this.publisher = '';
            this.observation = '';
        },
        exitAlert() {
            this.showAlert = false;
        }
    }
};
</script>

<style scoped>
.form {
    justify-content: center;
    display: flex;
    width: 100vw;
    margin-top: 7%;
    overflow: hidden;
}

.registerBook {
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
.alert-modal{
    margin-left: 40%;
    margin-top: 10%;
}
.alert {
    display: flex;
    justify-content: center;
    width: 40%;
}
</style>
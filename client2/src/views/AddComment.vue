<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add New Comment</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Name" v-model="po1.name" prepend-icon="mdi-note" :rules="rules">
                        </v-text-field>

                        <v-text-field label="Comment" v-model="po1.comment" prepend-icon="mdi-view-list" :rules="rules">
                        </v-text-field>
                
                        <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image">                            
                        </v-file-input>

                        <v-btn type="submit" class="mt-3" color="primary">ADD Comment</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api.po1';

    export default{
        data(){
            return{
                rules: [(value) => !!value || "This field is required !!!"],
                po1:{
                    name: "",
                    comment: "",
                    video: "",
                },
                video: "",
            };
        },
        methods:{
            selectFile(file){
                this.video =file[0];
            },
            async submitForm(){
                const formData = new FormData();
                formData.append('video', this.video);
                formData.append('name', this.po1.name);
                formData.append('comment', this.po1.comment);
                if(this.$refs.form.validate()){
                    const response = await API.addPo1(formData);
                    this.$router.push({name: 'comment', parmas: {message: response.message}});
                }
            }
        }
    };
</script>
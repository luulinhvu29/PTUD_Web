<template>
    <v-container>
      <v-alert border="left" close-text="Close Alert" color="green accent-4" dark
      dismissible v-if="this.$route.params.message">
      
      {{this.$route.params.message}}
    </v-alert>
      <v-row no-gutters>
        <v-col sm="10" class="pa-1" v-for="po1 in po1s" :key="po1._id">
          <v-card class="pa-1">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-img width="100" :src="`/${po1.video}`"></v-img>
              </v-col>
              <v-col sm="2" class="d-flex justify-end">
                <v-card-title class="headline">
                  Name: 
                  <v-card-title>
                    {{po1.name}}
                  </v-card-title>
                </v-card-title>
              </v-col>
              <v-col sm="1" class="d-flex justify-end">                          
                <v-btn color="red" @click="removePo1(po1._id)">Delete</v-btn>
              </v-col>
              </v-row>            

            <v-card-title class="headline">
              Comment: 
            </v-card-title>

            <v-card-title>
              {{po1.comment}}
            </v-card-title>
          </v-card>
        </v-col>
        
      </v-row>

      
    </v-container>
    
  </template>
  
  <script>
  import API from '../api.po1';
  
    
    export default {
      name: 'comment',
      data(){
        return{
          po1s: [],
          activeIndex: -1,
        };
      },
      async created(){
          this.po1s = await API.getAllPo1();
        },
      methods:{        
        async retrieveContacts() {
          try {
            this.po1 = await API.getAllPo1();
          } catch (error) {
            console.log(error);
          }
        },

        refreshList() {
          this.retrieveContacts();
          this.activeIndex = -1;
        },
        async removePo1(id){
              const response = await API.deletePo1(id);
              this.$router.push({name: 'addcomment', params: {message: response.message}});
          }
      },
      mounted() {
        this.refreshList();
      },

    };
  </script>
  
  
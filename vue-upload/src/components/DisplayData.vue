<template>
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
    <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in list" v-bind:key = "row._id">
        <td>{{row._id}}</td>
        <td>{{row.name}}</td>
        <td>{{row.email}}</td>
        <td>{{row.age}}</td>
        </tr>
    </tbody>
    </table>
    <div class="field is-grouped">
        <div class="control">
            <input v-model = "ID" class="input is-info" type="text" placeholder="Input ID">
        </div>
        <div class="control">
            <button v-on:click = "deleteUser" class="button is-danger is-outlined">Delete</button>
        </div>
        <div class = "control" v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
            <div class="message-body">{{message}}</div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'DisplayData',

    data() {
        return {
            list:[],
            ID :'',
            message:"",
            error:false
            }
    },

    async mounted(){
        var response = await axios.get('http://localhost:8000/displayData')
        //console.log(response.data);
        this.list = response.data;
    },

    methods: {
        async deleteUser () {

            try{
                var response = await axios.post(`/deleteUser/${this.ID}`)
                this.message  = response.data.message;
                this.error = false;
            }catch(err){
                this.message = err.response.data.message;
                this.error = true;
            }
        }
    }

    
}
</script>

<style>
.message-body{
    padding: 0.3em 1.25em
}
</style>


<template>
    <table id="firstTable">
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
</template>


<script>
import axios from 'axios';

export default {
    name: 'DisplayData',

    data() {
        return {
            list:[]
            }
    },

    async beforeCreate(){
        var response = await axios.get('http://localhost:8000/displayData')
        //console.log(response.data);
        this.list = response.data;
    },

    
}
</script>

<style>
    table {
    font-family: 'Open Sans', sans-serif;
    width: 940px;
    border-collapse: collapse;
    border: 3px solid #0fec25;
    margin: 10px 10px 10px 10px;
}
</style>
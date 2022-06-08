<template>
    <div class="section">
        <div class="container">
            <SimpleUpload />
        </div>
        <div class="container">
            <hr>
            <h1><center>Data is Displayed here...</center></h1>
            <hr>
        </div>
        <div class="container"> 
            <DisplayData/>
            <hr>
        </div>
    </div>
</template>

<script>
import SimpleUpload from '../components/SimpleUpload.vue';
import DisplayData from '../components/DisplayData.vue';

export default {
    name: "App",
    components: { SimpleUpload,DisplayData},
    
}
</script>

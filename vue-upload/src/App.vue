<template>
  <div class="section">
    <div class="container">
      <SimpleUpload />
      <hr>
      <h1><center>Data is Displayed here...</center></h1>
      <hr>
      <DisplayData/>
    </div>
    
  </div>
</template>

<script>
import SimpleUpload from './components/SimpleUpload.vue';
import DisplayData from './components/DisplayData.vue';


export default {
    name: "App",
    components: { SimpleUpload,DisplayData},
    
}
</script>


   
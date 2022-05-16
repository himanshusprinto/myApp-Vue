<template>
  <div class="section">
    <div class="container">
      <SimpleUpload />
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
    components: { SimpleUpload, DisplayData },
    
}
</script>


   
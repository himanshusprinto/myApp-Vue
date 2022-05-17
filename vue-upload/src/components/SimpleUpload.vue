<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
            <div class="message-body">{{message}}</div>
        </div>

        <div class="field">
            <div class="file is-boxed is-primary">
                <label class="file-label">
                   <input 
                        type="file"
                        @change="selectFile"
                        ref="file" 
                        class="file-input"
                    />
                    
                    <span class="file-cta">
                        <span class="file-icon">
                           <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file...
                        </span>
                    </span>

                    <span v-if="file" class="file-name">{{file.name}}</span>

                </label>
            </div>
        </div>

        
        <div class="field">
            <button class="button is-info">Send</button>
        </div>
    </form>
</template>


<script>
import axios from 'axios';

export default {
    name: 'SimpleUpload',

    data() {
        return {
            file: "",
            message: "",
            error: false,
            list:[]
            }
    },

    async mounted(){
        var response = await axios.get('http://localhost:8001/displayData')
        //console.log(response.data);
        this.list = response.data;
    },

    methods: {
        selectFile() {
            const file = this.$refs.file.files[0];
            const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
            const MAX_SIZE = 10000;
            const toolarge = file.size > MAX_SIZE;
            if(allowedTypes.includes(file.type)&& !toolarge){
                this.file = file;
                this.error  = false;
                this.message = "";
            } else{
                this.error = true;
                this.message = toolarge ? `Too large. Max size is ${MAX_SIZE/1000}Kb` :"Only xlsx files types are allowed";
            }
        },

        async sendFile() {
            const formData = new FormData();
            formData.append('file',this.file);
            
            try{
                await axios.post('/singleFile',formData);
                this.message = "File has been uploaded";
                this.file = "";
                this.error = false;
            }catch(err){
                this.message = err.response.data.error;
                this.error = true;
            }
        }
    },
}
</script>
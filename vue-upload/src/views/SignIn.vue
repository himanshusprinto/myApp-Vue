<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div>
                <div>
                    <h3>Login</h3>
                    <hr />
                </div>
                <div class="alert alert-danger" v-if="error">
                    {{ error }}
                </div>
                <form @submit.prevent="onLogin()">
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model.trim="email"
                        />
                        <div class="error" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model.trim="password"
                        />
                        <div class="error" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>

                    <div class="my-3">
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>




import SignupValidations from '../services/SignupValidations';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            error: '',
        };
    },
    methods: {
        async onLogin() {
            let validations = new SignupValidations(
                this.email,
                this.password,
            );
            this.errors = validations.checkValidations();
            if (this.errors.length) {
                return false;
            }
            
            
            try{
                await axios.post('/login',{
                    email:this.email, 
                    password:this.password
                });
                this.message = "User has been logged in successfully!";
                this.error = false;
                this.$router.push('/home');
        
            }catch(err){
                this.message = err.response.data.error;
                this.error = true;
            }

        },
    },
};
</script>
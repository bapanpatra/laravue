<template>
    <div class="home col-5 mx-auto py-5 mt-5">
        <h1 class="text-center">Register</h1>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="UserRegister()" >
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input
                                type="text"
                                v-model="form.name" name="name" :class="{ 'is-invalid': form.errors.has('name') }"
                                class="form-control"
                                id="name"
                        />
                        <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input
                                type="email"
                                v-model="form.email" name="email" :class="{ 'is-invalid': form.errors.has('email') }"
                                class="form-control"
                                id="email"
                        />
                        <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input
                                type="password"
                                v-model="form.password" name="password" :class="{ 'is-invalid': form.errors.has('password') }"
                                class="form-control"
                                id="password"
                        />
                        <has-error :form="form" field="password"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation">Confirm Password:</label>
                        <input
                                type="password"
                                v-model="form.password_confirmation" name="password_confirmation" :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
                                class="form-control"
                                id="password_confirmation"
                        />

                    </div>
                <button
                        type="submit"
                        class="btn btn-primary btn-block"
                >
                    Register
                </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                form: new Form({
                    f_name:'Bidyut',
                    l_name:'Patra',
                    phone_no:'+918371894035',
                    address:'Test',
                    latitude:'12.20',
                    longitude:'12.20',
                    state_id:'1',
                    city_id:'1',
                    zip_code:'713148',
                    email:'',
                    password:'',
                    password_confirmation:'',

                })
            }
        },
        methods:{
            UserRegister(){
                this.form.post('/api/v1/user/register')
                    .then((response)=>{
                        this.$router.push({ name: "Login" });
                        this.$message({
                            showClose: true,
                            message: 'Congrats, Registration Successfull.',
                            type: 'success'
                        });
                    })
                    .catch(()=>{

                    })

            }
        }
    }
</script>

<style scoped>

</style>

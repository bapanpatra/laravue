<template>
    <div class="home col-5 mx-auto py-5 mt-5">
        <h1 class="text-center">Admin Login</h1>
        <span class="text-danger" v-if="error!=''">{{error}}</span>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="UserLogin()">
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input
                                v-model="form.email" name="email" :class="{ 'is-invalid': form.errors.has('email') }"
                                type="email"
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
                    <button  class="btn btn-primary btn-block">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminLogin",
        data(){
            return {
                error:'',
                form: new Form({
                    email:'',
                    password:'',
                })
            }
        },
        methods:{
            UserLogin(){
                this.form.post('/api/v1/admin/login')
                    .then((response)=>{
                        console.log(response.data);
                        if(response.data.status=='error'){
                            this.error=response.data.message;
                        }else {
                            localStorage.setItem("api_token", response.data.data.token);
                            this.$router.push({ name: "AdminDashboard" });
                            this.$message({
                                showClose: true,
                                message: 'Login Successfully.',
                                type: 'success'
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })

            }
        }
    }
</script>

<style scoped>

</style>
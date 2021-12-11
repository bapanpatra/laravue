<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <!--<div class="col-sm-6">-->
                    <!--<h1>Blank Page</h1>-->
                    <!--</div>-->
                    <div class="col-sm-12">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name:'AdminDashboard'}" href="#" >Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </div>
                </div>
            </div>
            <!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Default box -->
            <div class="container-fluid">
                <div class="col-12 ">
                    <div class="card">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills">
                                <li class="nav-item"><a class="nav-link active" href="#profile" data-toggle="tab">User Profile</a></li>
                                <li class="nav-item"><a class="nav-link" href="#pass" data-toggle="tab">Change Password</a></li>
                            </ul>
                        </div><!-- /.card-header -->

                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content" v-loading="loading">
                                <div class="tab-pane active" id="profile">
                                    <form class="form-horizontal" @submit.prevent="UpdateProfile()">
                                        <div class="form-group">
                                            <label for="inputName" class="col-sm-2 control-label">First Name :</label>

                                            <div class="col-sm-10">
                                                <input type="text" v-model="form.f_name" class="form-control" autocomplete="off" id="inputName" placeholder="First Name" :class="{ 'is-invalid': form.errors.has('f_name') }">
                                                <has-error :form="form" field="f_name"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="m_name" class="col-sm-2 control-label">Middle Name :</label>

                                            <div class="col-sm-10">
                                                <input type="text" v-model="form.m_name" class="form-control" autocomplete="off" id="m_name" placeholder="Middle Name" :class="{ 'is-invalid': form.errors.has('m_name') }">
                                                <has-error :form="form" field="m_name"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="l_name" class="col-sm-2 control-label">Last Name :</label>

                                            <div class="col-sm-10">
                                                <input type="text" v-model="form.l_name" class="form-control" autocomplete="off" id="l_name" placeholder="Last Name" :class="{ 'is-invalid': form.errors.has('l_name') }">
                                                <has-error :form="form" field="l_name"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputEmail" class="col-sm-2 control-label">Email :</label>

                                            <div class="col-sm-10">
                                                <input type="email" v-model="form.email" class="form-control" autocomplete="off" id="inputEmail" placeholder="Email" :class="{ 'is-invalid': form.errors.has('email') }">
                                                <has-error :form="form" field="email"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputName2" class="col-sm-2 control-label">Phone No :</label>

                                            <div class="col-sm-10">
                                                <input type="text" v-model="form.phone_no" class="form-control" autocomplete="off" id="inputName2" placeholder="Phone No" :class="{ 'is-invalid': form.errors.has('phone_no') }">
                                                <has-error :form="form" field="phone_no"></has-error>
                                            </div>
                                        </div>
                                        <div class="row ml-0">
                                            <div class="col-lg-8">
                                                <div class="form-group">
                                                    <label for="exampleInputFile" class="col-sm-2 control-label">Image :</label>
                                                    <div class="input-group col-sm-10">
                                                        <div class="form-group">
                                                            <input type="file" class="custom-file-input" id="exampleInputFile" @change = "changePhoto($event)" :class="{ 'is-invalid': form.errors.has('image') }">
                                                            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                            <has-error :form="form" field="image"></has-error>
                                                        </div>
                                                    </div>
                                            </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="pic-area">
                                                    <img :src="form.image"/>
                                                </div>
                                            </div>
                                        </div>



                                        <div class="form-group">
                                            <label for="inputExperience" class="col-sm-2 control-label">Address :</label>

                                            <div class="col-sm-10">
                                                <input class="form-control" v-model="form.address" id="inputExperience" autocomplete="off" placeholder="Address" :class="{ 'is-invalid': form.errors.has('address') }" @keyup="updateSearchResults()">
                                                <has-error :form="form" field="address"></has-error>
                                            </div>
                                        </div>
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="item in autocompleteItems" style="cursor: pointer;" @click="selectSearchResult(item)">{{item.description}}</li>
                                        </ul>
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <button type="submit" class="btn btn-danger" :disabled="isAdding">{{isAdding ? 'Updating...' : 'Update'}}</button>
                                            </div>
                                        </div>
                                 </form>
                                </div>
                                <div class="tab-pane"  id="pass">
                                    <form class="form-horizontal" @submit.prevent="UpdatePassword()">
                                        <div class="form-group">
                                            <label for="inputName" class="col-sm-2 control-label">Old Password :</label>

                                            <div class="col-sm-10">
                                                <input type="password" v-model="form.o_password" class="form-control" id="o_password" placeholder="Old Password." :class="{ 'is-invalid': form.errors.has('o_password') }">
                                                <has-error :form="form" field="o_password"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputEmail" class="col-sm-2 control-label">New Password :</label>

                                            <div class="col-sm-10">
                                                <input type="password" v-model="form.n_password" class="form-control" id="n_password" placeholder="New Password." :class="{ 'is-invalid': form.errors.has('n_password') }">
                                                <has-error :form="form" field="n_password"></has-error>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="inputEmail" class="col-sm-2 control-label">Confirm Password :</label>

                                            <div class="col-sm-10">
                                                <input type="password" v-model="form.c_password" class="form-control" id="c_password" placeholder="Confirm Password." :class="{ 'is-invalid': form.errors.has('c_password') }">
                                                <has-error :form="form" field="c_password"></has-error>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <button type="submit" class="btn btn-danger" :disabled="isAdding">{{isAdding ? 'Updating...' : 'Update'}}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>

                </div>
            </div>
            <!-- /.card -->


        </section>
    </div>
</template>

<script>

    export default {
        name: "Profile",
        data(){
            return {
                form: new Form({
                    f_name:'',
                    m_name:'',
                    l_name:'',
                    email:'',
                    phone_no:'',
                    address:'',
                    latitude:'',
                    longitude:'',
                    image:'',
                    o_password:'',
                    n_password:'',
                    c_password:'',
                }),
                loading: true,
                isAdding: false,
                autocompleteItems:[]


            }
        },
        mounted() {
            this.$store.dispatch("getUser");
        },

        computed:{
            user(){
                return this.$store.getters.getUser
            },


        },
        methods:{
            UpdateProfile(){
                this.isAdding= true;
                this.form.post('/api/v1/admin/update-profile',{headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response)=>{
                        this.isAdding= false;
                        this.$store.dispatch("getUser");
                            this.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'success'
                            });
                    })
                    .catch((err)=>{
                        this.isAdding= false;
                        console.log(err);
                    })

            },

            UpdatePassword(){
                this.isAdding= true;
                this.form.post('/api/v1/admin/update-password',{headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response)=>{
                        this.isAdding= false;
                        this.form.o_password='',
                        this.form.n_password='',
                        this.form.c_password='',
                            this.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'success'
                            });
                    })
                    .catch((err)=>{
                        this.isAdding= false;
                        console.log(err);
                    })

            },

            updateSearchResults() {
                this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                this.autocompleteItems = [];
                if (this.form.address == '') {
                    this.autocompleteItems = [];
                    return;
                }
                this.GoogleAutocomplete.getPlacePredictions({input: this.form.address},
                    (predictions, status) => {
                        this.autocompleteItems = [];
                        if (predictions != null) {
                            predictions.forEach((prediction) => {
                                this.autocompleteItems.push(prediction);
                            });
                        }
                    });
            },

            selectSearchResult(item) {
                this.autocompleteItems = [];
                let base = this;
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'placeId': item.place_id}, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        console.log(results[0].geometry.location.lat());
                        base.form.latitude = results[0].geometry.location.lat();
                        base.form.longitude = results[0].geometry.location.lng();
                        base.form.address = results[0].formatted_address;
                    }
                });
            },

            changePhoto(event){
                console.log(event);
                let file = event.target.files[0];

                if(file.size>1048576){
                    this.$message({
                        showClose: true,
                        message: 'File size too large.',
                        type: 'warning'
                    });
                    this.$refs.myFiles.value=null;
                }else{
                    let reader = new FileReader();
                    reader.onload = event => {
                        this.form.image = event.target.result
                    };
                    reader.readAsDataURL(file);
                }

            },
        },
        watch:{
            user(n,o){
                this.loading=false,
                this.form.f_name=n.f_name;
                this.form.m_name=n.m_name;
                this.form.l_name=n.l_name;
                this.form.email=n.email;
                this.form.phone_no=n.phone_no;
                this.form.address=n.address;
                this.form.latitude=n.latitude;
                this.form.longitude=n.longitude;
                this.form.image=n.image;
            },

        }


    }
</script>

<style scoped>

</style>
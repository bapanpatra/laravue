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
                            <li class="breadcrumb-item active">{{$route.meta.title}}</li>
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
                        <div class="card-header">
                            <h1 class="card-title">Customers List</h1>
                            <div class="card-tools">
                                <button class="btn btn-sm btn-success btn-circle" @click="userCreate()"><i class="fa fa-plus" aria-hidden="true"></i></button>

                            </div>
                        </div>

                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="search-right">
                                <div class="form-group">
                                    <input type="text" class="form-control-search" v-model="keyword" placeholder="search here..." @keyup="handleSearch">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                    </span>
                                </div>
                            </div>
                            <el-table
                                    v-loading="loading"
                                    element-loading-text="Loading..."
                                    ref="multipleTable"
                                    :data="users.data"
                                    style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        label="Sl No"
                                        type="index"
                                        :index="indexMethod" width="55">
                                </el-table-column>
                                <el-table-column
                                        label="Referral Code"
                                        prop="referral_code">
                                </el-table-column>
                                <el-table-column  prop="display_pic_url" label="Image">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.image" class="user_image"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Name"
                                        prop="name">
                                </el-table-column>

                                <el-table-column
                                        label="Email"
                                        prop="email" min-width="100">
                                </el-table-column>
                                <el-table-column
                                        label="Phone No"
                                        prop="formatted_phone_no">
                                </el-table-column>
                                <el-table-column
                                        label="State Name">
                                    <template slot-scope="scope">
                                        {{scope.row.state.state_name}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="City Name">
                                    <template slot-scope="scope">
                                        {{scope.row.city.city_name}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Zip Code"
                                        prop="zip_code">
                                </el-table-column>
                                <el-table-column
                                >
                                    <template slot="header" slot-scope="scope">
                                        Action
                                    </template>
                                    <template slot-scope="scope">
                                        <button class="btn btn-sm btn-info btn-circle" @click="handleStatus(scope.$index,scope.row)" v-if="scope.row.status=='Active'">
                                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                                        </button>
                                        <button class="btn btn-sm btn-warning btn-circle" @click="handleStatus(scope.$index,scope.row)" v-else>
                                            <i class="fa fa-ban" aria-hidden="true" ></i>
                                        </button>
                                        <button class="btn btn-sm btn-primary btn-circle" @click="handleEdit(scope.$index,scope.row)"><i class="fa fa-edit" aria-hidden="true"></i></button>
                                        <button  class="btn btn-sm btn-danger btn-circle"  @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="margin-top: 20px">
                                <button  class="btn btn-sm btn-primary" @click="toggleSelection()" v-if="multipleSelection.length > 0">Clear selection</button>
                                <button  class="btn btn-sm btn-danger" @click="multipleDelete()" v-if="multipleSelection.length > 0">Multiple Delete</button>
                            </div>
                            <el-pagination class="text-center"
                                           background
                                           @current-change="handleCurrentChange"
                                           :current-page.sync="currentPage"
                                           :page-size="users.per_page"
                                           layout="prev, pager, next"
                                           :total="users.total">
                            </el-pagination>
                        </div>
                        <!-- /.card-body -->
                    </div>

                </div>
            </div>
            <!-- /.card -->
            <!-- Modal -->
            <div class="user-modal">
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <form role="form">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 content="Edit User" class="text-center" v-if="form.id">Edit Customer</h2>
                                    <h2 content="Add User" v-else>Add Customer</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="f_name">First Name :</label>
                                            <input type="text" class="form-control" id="f_name" placeholder="Enter First Name." v-model="form.f_name" name="f_name" :class="{ 'is-invalid': form.errors.has('f_name') }">
                                            <has-error :form="form" field="f_name"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="m_name">Middle Name :</label>
                                            <input type="text" class="form-control" id="m_name" placeholder="Enter Middle Name." v-model="form.m_name" name="m_name" :class="{ 'is-invalid': form.errors.has('m_name') }">
                                            <has-error :form="form" field="m_name"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="l_name">Last Name :</label>
                                            <input type="text" class="form-control" id="l_name" placeholder="Enter Last Name." v-model="form.l_name" name="l_name" :class="{ 'is-invalid': form.errors.has('l_name') }">
                                            <has-error :form="form" field="l_name"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email :</label>
                                            <input type="text" class="form-control" id="email" placeholder="Enter Email." v-model="form.email" name="email" :class="{ 'is-invalid': form.errors.has('email') }">
                                            <has-error :form="form" field="email"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Phone No :</label>
                                            <input type="text" class="form-control" id="phone_no" placeholder="Enter Phone No." v-model="form.phone_no" name="phone_no" :class="{ 'is-invalid': form.errors.has('phone_no') }">
                                            <has-error :form="form" field="phone_no"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Address :</label>
                                            <input type="text" class="form-control" id="address" placeholder="Enter Address." v-model="form.address" name="address" :class="{ 'is-invalid': form.errors.has('address') }" @keyup="updateSearchResults">
                                            <has-error :form="form" field="address"></has-error>
                                        </div>
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="item in autocompleteItems" style="cursor: pointer;" @click="selectSearchResult(item)">{{item.description}}</li>
                                        </ul>
                                        <div class="form-group">
                                            <label for="address2">Address 2 :</label>
                                            <input type="text" class="form-control" id="address2" placeholder="Enter Address 2." v-model="form.address2" name="address2" :class="{ 'is-invalid': form.errors.has('address2') }">
                                            <has-error :form="form" field="address2"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label class="typo__label">Select State :</label>
                                            <multiselect v-model="form.state_id" class="form-control"  deselect-label="Can't remove this value" track-by="state_name" label="state_name" placeholder="Select State." :options="states" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('state_id') }" @input="getCity">
                                                <template slot="singleLabel" slot-scope="{ option }">{{ option.state_name }}</template>
                                            </multiselect>
                                            <has-error :form="form" field="state_id"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label class="typo__label">Select City :</label>
                                            <multiselect v-model="form.city_id" class="form-control"  deselect-label="Can't remove this value" track-by="city_name" label="city_name" placeholder="Select City." :options="cities" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('city_id') }">
                                                <template slot="singleLabel" slot-scope="{ option }">{{ option.city_name }}</template>
                                            </multiselect>
                                            <has-error :form="form" field="city_id"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="zip_code">Zip Code :</label>
                                            <input type="text" class="form-control" id="zip_code" placeholder="Enter Zipcode." v-model="form.zip_code" name="zip_code" :class="{ 'is-invalid': form.errors.has('zip_code') }">
                                            <has-error :form="form" field="zip_code"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Password :</label>
                                            <input type="password" class="form-control" id="password" placeholder="Enter Password." v-model="form.password" name="password" :class="{ 'is-invalid': form.errors.has('password') }">
                                            <has-error :form="form" field="password"></has-error>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" style="margin-left: 0;">Close</button>
                                    <button type="button" class="btn btn-primary" :disabled="isAdding" @click="updateUser()" v-if="form.id">{{isAdding ? 'Updating...' : 'Update'}}</button>
                                    <button type="button" class="btn btn-primary" :disabled="isAdding" @click="addUser()" v-else>{{isAdding ? 'Saving...' : 'Save'}}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import _ from 'lodash'
    // import api from '../../../common/modules/admin/api'
    import Multiselect from 'vue-multiselect'
    export default {
        name: "List",
        components: { Multiselect },
        data() {
            return {
                keyword: '',
                currentPage: 1,
                index:'',
                next_url:'',
                prev_url:'',
                multipleSelection: [],
                loading: true,
                isAdding: false,
                form: new Form({
                    id: '',
                    f_name: '',
                    m_name: '',
                    l_name: '',
                    email: '',
                    phone_no: '',
                    address: '',
                    latitude: '',
                    longitude: '',
                    address2: '',
                    state_id: '',
                    city_id: '',
                    zip_code: '',
                    password:''
                }),
                autocompleteItems:[],
                cities:[]
            }
        },
        mounted(){
            this.getAllUsers();
            this.$store.dispatch('getStates');
        },
        computed:{
            users(){
                return this.$store.getters.getAllUsers
            },
            states(){
                return this.$store.getters.states
            },
        },

        methods: {
            getAllUsers() {
                this.$store.dispatch('getAllUsers', {page: this.currentPage, keyword: this.keyword});

            },

            userCreate() {
                // this.$getLocation({
                //     enableHighAccuracy: true, //defaults to false
                //     timeout: Infinity, //defaults to Infinity
                //     maximumAge: 0 //defaults to 0
                //
                // })
                //     .then(coordinates => {
                //         console.log(coordinates);
                //         let base = this;
                //         var latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
                //         var geocoder = new google.maps.Geocoder();
                //         geocoder.geocode({'latLng': latlng}, function (results, status) {
                //             if (status == google.maps.GeocoderStatus.OK) {
                //                 if (results[0]) {
                //
                //                     base.form.address = results[0].formatted_address;
                //                     console.log(base.form.address);
                //
                //                 } else {
                //                     console.log('Error');
                //
                //                 }
                //             } else {
                //
                //                 console.log('Error:' + status);
                //             }
                //         });
                //     })
                $("#myModal").modal('show');
                this.form.clear();
                this.form.reset();
            },

            addUser() {
                this.isAdding= true;
                this.form.post('/api/v1/admin/add-user', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((res) => {
                        this.isAdding= false;
                        this.getAllUsers();
                        this.form.reset();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                    })
                    .catch((err) => {
                        this.isAdding= false;
                        if (err.response.status != '422') {
                            this.$message({
                                showClose: true,
                                message: err.message,
                                type: 'error'
                            });
                        }

                    })
            },

            updateUser() {
                this.isAdding= true;
                this.form.post(`/api/v1/admin/update-user/${this.form.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.isAdding= false;
                        this.loading=true;
                        this.getAllUsers();
                        this.$message({
                            showClose: true,
                            message: response.data.message,
                            type: 'success'
                        });
                        $("#myModal").modal('hide');
                    })
                    .catch((err) => {
                        this.isAdding= false;
                        if (err.response.status != '422') {
                            this.$message({
                                showClose: true,
                                message: err.message,
                                type: 'warning'
                            });
                        }

                    })
            },

            handleEdit(index, row) {
                this.form.clear();
                $("#myModal").modal('show');
                this.form.fill(row)
                axios.get('/api/v1/admin/get-city/' + this.form.state_id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        console.log(response.data);
                        this.cities=response.data.data;
                    })
                    .catch((err) => {

                    });
                this.form.state_id=row.state;
                this.form.city_id=row.city;
            },

            handleDelete(index, row) {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/delete-user/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllUsers();
                            this.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'success'
                            });
                        })
                        .catch((err) => {
                            if (err.response.status != '422') {
                                this.$message({
                                    showClose: true,
                                    message: err.message,
                                    type: 'error'
                                });
                            }
                        });

                }).catch((err) => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
            },

            handleCurrentChange() {
                this.getAllUsers();
            },

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllUsers();
            }, 1000),

            indexMethod(index) {
                return index + 1;
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            multipleDelete() {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.post('/api/v1/admin/delete-multiple-user/', this.multipleSelection, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllUsers();
                            this.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'success'
                            });
                        })
                        .catch((err) => {
                            if (err.response.status != '422') {
                                this.$message({
                                    showClose: true,
                                    message: err.message,
                                    type: 'error'
                                });
                            }
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
            },

            handleStatus(index, row){
                console.log(row);
                axios.get('/api/v1/admin/active-inactive-user/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.getAllUsers();
                        this.$message({
                            showClose: true,
                            message: response.data.message,
                            type: 'success'
                        });
                    })
                    .catch((err) => {
                        if (err.response.status != '422') {
                            this.$message({
                                showClose: true,
                                message: err.message,
                                type: 'error'
                            });
                        }
                    });
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

            getCity(){
                this.form.city_id='';
                axios.get('/api/v1/admin/get-city/' + this.form.state_id.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                       this.cities=response.data.data;
                    })
                    .catch((err) => {

                    });
            }
        },

        watch:{
            users(){
             this.loading=false
            },

        }
    }
</script>

<style scoped>

</style>
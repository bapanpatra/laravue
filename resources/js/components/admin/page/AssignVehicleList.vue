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
                            <h1 class="card-title">Assign Vehicle List</h1>
                            <div class="card-tools">
                                <button class="btn btn-sm btn-success btn-circle" @click="handleCreate()"><i class="fa fa-plus" aria-hidden="true"></i></button>

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
                                    :data="driverVehicle.data"
                                    style="width: 100%">

                                <el-table-column
                                        label="Sl No"
                                        type="index"
                                        :index="indexMethod" width="55">
                                </el-table-column>
                                <el-table-column  prop="display_pic_url" label="Vehicle Type Image">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.vehicle.vehicle_type.image"/>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Driver Name">
                                    <template slot-scope="scope">
                                       {{scope.row.driver.name}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Vehicle Name">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicle.name}}
                                    </template>
                                </el-table-column>
                                <!--<el-table-column-->
                                        <!--label="Max Ride Distance (Mile)"-->
                                        <!--prop="max_ride_distance">-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        label="Assign Date Time"
                                        prop="assign_date_time">
                                </el-table-column>
                                <el-table-column
                                        label="Remove Date Time"
                                        >
                                    <template slot-scope="scope">
                                        <button class="btn btn-sm btn-danger"  @click="handleRemove(scope.$index, scope.row)" v-if="scope.row.status=='Active'">Remove</button>
                                        <template slot-scope="scope" v-else>
                                            {{scope.row.remove_date_time}}
                                        </template>
                                    </template>

                                </el-table-column>

                            </el-table>

                            <el-pagination class="text-center"
                                           background
                                           @current-change="handleCurrentChange"
                                           :current-page.sync="currentPage"
                                           :page-size="driverVehicle.per_page"
                                           layout="prev, pager, next"
                                           :total="driverVehicle.total">
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
                                    <h2 content="Edit User" class="text-center" v-if="form.id">Edit Assign Vehicle</h2>
                                    <h2 content="Add User" v-else>Assign Vehicle</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="typo__label">Select Vehicle :</label>
                                            <multiselect v-model="form.vehicle_id" class="form-control"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select Vehicle." :options="vehicles" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('vehicle_id') }">
                                                <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                            </multiselect>
                                            <has-error :form="form" field="vehicle_id"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label class="typo__label">Select Driver :</label>
                                            <multiselect v-model="form.user_id" class="form-control"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select Driver." :options="drivers" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('user_id') }">
                                                <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                            </multiselect>
                                            <has-error :form="form" field="user_id"></has-error>
                                        </div>
                                        <!--<div class="form-group">-->
                                            <!--<label for="max_ride_distance">Max Ride Distance (Mile) :</label>-->
                                            <!--<input type="text" class="form-control" id="max_ride_distance" placeholder="Enter Max Ride Distance." v-model="form.max_ride_distance" name="max_ride_distance" :class="{ 'is-invalid': form.errors.has('max_ride_distance') }">-->
                                            <!--<has-error :form="form" field="max_ride_distance"></has-error>-->
                                        <!--</div>-->
                                        <div class="form-group" @input="handleFocusVehicleExp">
                                            <label for="assign_date_time">Vehicle Assign Date Time:</label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD h:i:s"  ref="datepicker" class="form-control" id="assign_date_time" placeholder="Enter Vehicle Assign Date." v-model="form.assign_date_time" name="assign_date_time" :class="{ 'is-invalid': form.errors.has('assign_date_time') }"></datetime>
                                                <has-error :form="form" field="assign_date_time"></has-error>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" style="margin-left: 0;">Close</button>
                                    <button type="button" class="btn btn-primary" :disabled="isAdding" @click="update()" v-if="form.id">{{isAdding ? 'Updating...' : 'Update'}}</button>
                                    <button type="button" class="btn btn-primary" :disabled="isAdding" @click="add()" v-else>{{isAdding ? 'Saving...' : 'Save'}}</button>
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
    import datetime from 'vuejs-datetimepicker';
    export default {
        name: "AssignVehicleList",
        components: { Multiselect,datetime },
        data() {
            return {
                keyword: '',
                currentPage: 1,
                index:'',
                multipleSelection: [],
                loading: true,
                isAdding: false,
                form: new Form({
                    id: '',
                    user_id: '',
                    vehicle_id: '',
                 //   max_ride_distance: '',
                    assign_date_time: '',
                    remove_date_time: ''
                }),
            }
        },
        mounted(){
            this.getAllDriverVehicle();
            this.$store.dispatch('getDrivers');
            this.$store.dispatch('getVehicles');
            document.getElementsByName("assign_date_time")[0].setAttribute("placeholder", "Enter Vehicle Assign Date Time.");
        },

        computed:{
            driverVehicle(){
                return this.$store.getters.getAllDriverVehicle
            },
            vehicles(){
                return this.$store.getters.getAllVehicles
            },
            drivers(){
                return this.$store.getters.getAllUsers
            },
        },

        methods: {
            handleFocusVehicleExp() {
                this.form.vehicle_expire_date='';
                this.$refs.datepicker.clearDate();
            },



            getAllDriverVehicle() {
                this.$store.dispatch('getAllDriverVehicle', {page: this.currentPage, keyword: this.keyword});
            },

            handleCreate() {
                $("#myModal").modal('show');
                this.form.clear();
                this.$refs.datepicker.clearDate();
                this.form.reset();
            },

            add() {
                this.isAdding= true;
                this.form.post('/api/v1/admin/add-assign-vehicle', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((res) => {
                        this.isAdding= false;
                        this.getAllDriverVehicle();
                        this.form.reset();
                        this.$refs.datepicker.clearDate();
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

            handleRemove(index, row) {
                this.$confirm('Are You Sure?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/remove-driver-vehicle/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllDriverVehicle();
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

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllDriverVehicle();
            }, 1000),

            indexMethod(index) {
                return index + 1;
            },

            handleCurrentChange() {
                this.getAllDriverVehicle();
            },

        },

        watch:{
            driverVehicle(){
                this.loading=false
            },

        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
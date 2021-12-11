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
                            <h1 class="card-title">Vehicles List</h1>
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
                                    :data="vehicles.data"
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
                                        label="Vehicle Type">
                                    <template slot-scope="scope">
                                        {{scope.row.vehicle_type.name}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="Ride Type"
                                        prop="type">
                                </el-table-column>
                                <el-table-column
                                        label="Name"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="Reg No"
                                        prop="vehicle_reg_no">
                                </el-table-column>
                                <el-table-column
                                        label="Expire Date"
                                        prop="vehicle_expire_date">
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
                                           :page-size="vehicles.per_page"
                                           layout="prev, pager, next"
                                           :total="vehicles.total">
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
                                    <h2 content="Edit User" class="text-center" v-if="form.id">Edit Vehicle</h2>
                                    <h2 content="Add User" v-else>Add Vehicle</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="typo__label">Select Vehicle Type :</label>
                                            <multiselect v-model="form.vehicle_type_id" class="form-control"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select Vehicle Type." :options="vehicle_types" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('vehicle_type_id') }">
                                                <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                            </multiselect>
                                            <has-error :form="form" field="vehicle_type_id"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label class="typo__label">Ride Type :</label>
                                            <multiselect v-model="form.type" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Select Vehicle Type." class="form-control" :class="{ 'is-invalid': form.errors.has('type') }"></multiselect>
                                            <has-error :form="form" field="type"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Name :</label>
                                            <input type="text" class="form-control" id="name" placeholder="Enter Name." v-model="form.name" name="name" :class="{ 'is-invalid': form.errors.has('name') }">
                                            <has-error :form="form" field="name"></has-error>
                                        </div>
                                        <!--<div class="row">-->
                                            <!--<div class="col-sm-8">-->
                                                <!--<div class="form-group">-->
                                                    <!--<label for="exampleInputFile" >Vehicle Image :</label>-->
                                                    <!--<div class="input-group col-sm-10">-->
                                                        <!--<div class="form-group">-->
                                                            <!--<input type="file" class="custom-file-input" id="exampleInputFile" @change = "changePhoto($event)" :class="{ 'is-invalid': form.errors.has('image') }">-->
                                                            <!--<label class="custom-file-label" for="exampleInputFile">Choose file</label>-->
                                                            <!--<has-error :form="form" field="image"></has-error>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                            <!--<div class="col-sm-4">-->
                                                <!--<div class="pic-area">-->
                                                    <!--<img :src="form.image"/>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <div class="form-group">
                                            <label for="vehicle_reg_no">Vehicle Registration No :</label>
                                            <input type="text" class="form-control" id="vehicle_reg_no" placeholder="Enter Vehicle Registration No." v-model="form.vehicle_reg_no" name="vehicle_reg_no" :class="{ 'is-invalid': form.errors.has('vehicle_reg_no') }">
                                            <has-error :form="form" field="vehicle_reg_no"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="vehicle_color">Vehicle Color :</label>
                                            <input type="text" class="form-control" id="vehicle_color" placeholder="Enter Vehicle Color." v-model="form.vehicle_color" name="vehicle_color" :class="{ 'is-invalid': form.errors.has('vehicle_color') }">
                                            <has-error :form="form" field="vehicle_color"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="vehicle_no_plate">Vehicle No Plate :</label>
                                            <input type="text" class="form-control" id="vehicle_no_plate" placeholder="Enter Vehicle No Plate." v-model="form.vehicle_no_plate" name="vehicle_no_plate" :class="{ 'is-invalid': form.errors.has('vehicle_no_plate') }">
                                            <has-error :form="form" field="vehicle_no_plate"></has-error>
                                        </div>
                                        <div class="form-group" @input="handleFocusVehicleExp">
                                            <label for="vehicle_expire_date">Vehicle Expire Date :</label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD"  ref="datepicker" class="form-control" id="vehicle_expire_date" placeholder="Enter Vehicle Expire Date." v-model="form.vehicle_expire_date" name="vehicle_expire_date" :class="{ 'is-invalid': form.errors.has('vehicle_expire_date') }"></datetime>
                                                <has-error :form="form" field="vehicle_expire_date"></has-error>
                                            </template>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for="vehicle_rc_document" >Vehicle Registration Certificate :</label>
                                                    <div class="input-group col-sm-10">
                                                        <div class="form-group">
                                                            <input type="file" class="custom-file-input" id="vehicle_rc_document" @change = "changeRcPhoto($event)" :class="{ 'is-invalid': form.errors.has('vehicle_rc_document') }">
                                                            <label class="custom-file-label" for="vehicle_rc_document">Choose file</label>
                                                            <has-error :form="form" field="vehicle_rc_document"></has-error>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="pic-area">
                                                    <img :src="form.vehicle_rc_document"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for="vehicle_insurance_document" >Vehicle Insurance Certificate :</label>
                                                    <div class="input-group col-sm-10">
                                                        <div class="form-group">
                                                            <input type="file" class="custom-file-input" id="vehicle_insurance_document" @change = "changeInsPhoto($event)" :class="{ 'is-invalid': form.errors.has('vehicle_insurance_document') }">
                                                            <label class="custom-file-label" for="vehicle_insurance_document">Choose file</label>
                                                            <has-error :form="form" field="vehicle_insurance_document"></has-error>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="pic-area">
                                                    <img :src="form.vehicle_insurance_document"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" @input="handleFocusVehicleInsExp">
                                            <label for="vehicle_insurance_expire_date">Vehicle Insurance Expire Date :</label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD"  ref="datepicker_ins" class="form-control" id="vehicle_insurance_expire_date" placeholder="Enter Vehicle Insurance Expire Date." v-model="form.vehicle_insurance_expire_date" name="vehicle_insurance_expire_date" :class="{ 'is-invalid': form.errors.has('vehicle_insurance_expire_date') }"></datetime>
                                                <has-error :form="form" field="vehicle_insurance_expire_date"></has-error>
                                            </template>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for="vehicle_tax_document" >Vehicle Tax Certificate :</label>
                                                    <div class="input-group col-sm-10">
                                                        <div class="form-group">
                                                            <input type="file" class="custom-file-input" id="vehicle_tax_document" @change = "changeTaxPhoto($event)" :class="{ 'is-invalid': form.errors.has('vehicle_tax_document') }">
                                                            <label class="custom-file-label" for="vehicle_tax_document">Choose file</label>
                                                            <has-error :form="form" field="vehicle_tax_document"></has-error>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="pic-area">
                                                    <img :src="form.vehicle_tax_document"/>
                                                </div>
                                            </div>
                                        </div>

                                        <!--<div class="form-group">-->
                                        <!--<label class="typo__label">Goods :</label>-->
                                        <!--<multiselect v-model="form.good_id" tag-placeholder="Add this as new tag" placeholder="Select Goods." label="name" track-by="name" :options="goods" :multiple="true" :searchable="true" :taggable="true" class="form-control" :class="{ 'is-invalid': form.errors.has('good_id') }">-->
                                        <!--<template slot="singleLabel" slot-scope="{ good }"><strong>{{ good.name }}</strong></template>-->
                                        <!--</multiselect>-->
                                        <!--<has-error :form="form" field="good_id"></has-error>-->
                                        <!--</div>-->
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
        name: "VehicleList",
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
                    type: '',
                    name: '',
                    vehicle_type_id: '',
                    image: '',
                    vehicle_reg_no: '',
                    vehicle_color: '',
                    vehicle_no_plate: '',
                    vehicle_expire_date: '',
                    vehicle_rc_document: '',
                    vehicle_insurance_document: '',
                    vehicle_insurance_expire_date: '',
                    vehicle_tax_document: '',

                    // good_id:[],
                }),
                options: ['Private', 'Share' ]
            }
        },
        mounted(){
            this.getAllVehicles();
            this.$store.dispatch('getGoods');
            this.$store.dispatch('getVehicleTypes');
            document.getElementsByName("vehicle_expire_date")[0].setAttribute("placeholder", "Enter Vehicle Expire Date.");
            document.getElementsByName("vehicle_insurance_expire_date")[0].setAttribute("placeholder", "Enter Vehicle Insurance Expire Date.");
        },

        computed:{
            vehicles(){
                return this.$store.getters.getAllVehicles
            },
            goods(){
                return this.$store.getters.goods
            },
            vehicle_types(){
                return this.$store.getters.vehicleTypes
            }
        },

        methods: {
            handleFocusVehicleExp() {
                this.form.vehicle_expire_date='';
                this.$refs.datepicker.clearDate();
            },
            handleFocusVehicleInsExp() {
                this.form.vehicle_insurance_expire_date='';
                this.$refs.datepicker_ins.clearDate();
            },
            getAllVehicles() {
                this.$store.dispatch('getAllVehicles', {page: this.currentPage, keyword: this.keyword});
            },

            handleCreate() {
                $("#myModal").modal('show');
                this.form.clear();
                this.$refs.datepicker.clearDate();
                this.$refs.datepicker_ins.clearDate();
                this.form.reset();
            },

            add() {
                this.isAdding= true;
                this.form.post('/api/v1/admin/add-vehicle', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((res) => {
                        this.isAdding= false;
                        this.getAllVehicles();
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

            update() {
                this.isAdding= true;
                this.form.post(`/api/v1/admin/update-vehicle/${this.form.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.isAdding= false;
                        this.loading=true;
                        this.getAllVehicles();
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
                console.log(row);
                this.form.clear();
                $("#myModal").modal('show');
                this.form.fill(row);
                this.form.vehicle_type_id=row.vehicle_type;
            },

            handleDelete(index, row) {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/delete-vehicle/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllVehicles();
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
                this.getAllVehicles();
            },

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllVehicles();
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
                    axios.post('/api/v1/admin/delete-multiple-vehicle/', this.multipleSelection, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllVehicles();
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
                axios.get('/api/v1/admin/active-inactive-vehicle/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.getAllVehicles();
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

            changePhoto(event){
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

            changeRcPhoto(event){
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
                        this.form.vehicle_rc_document = event.target.result
                    };
                    reader.readAsDataURL(file);
                }

            },

            changeInsPhoto(event){
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
                        this.form.vehicle_insurance_document = event.target.result
                    };
                    reader.readAsDataURL(file);
                }

            },

            changeTaxPhoto(event){
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
                        this.form.vehicle_tax_document = event.target.result
                    };
                    reader.readAsDataURL(file);
                }

            },



        },

        watch:{
            vehicles(){
                this.loading=false
            },

        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
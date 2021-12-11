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
                            <h1 class="card-title">Promo Code List</h1>
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
                                    :data="promoCodes.data"
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
                                        label="Promo Code"
                                        prop="promo_code">
                                </el-table-column>
                                <el-table-column
                                        label="Discount Type"
                                        prop="discount_type">
                                </el-table-column>
                                <el-table-column
                                        label="Promo Discount"
                                        prop="promo_discount">
                                </el-table-column>
                                <el-table-column
                                        label="Min Amount"
                                        prop="min_amount">
                                </el-table-column>
                                <el-table-column
                                        label="Max Discount"
                                        prop="max_discount">
                                </el-table-column>
                                <el-table-column
                                        label="Expire Date"
                                        prop="expire_date">
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
                                           :page-size="promoCodes.per_page"
                                           layout="prev, pager, next"
                                           :total="promoCodes.total">
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
                                    <h2 content="Edit User" class="text-center" v-if="form.id">Edit Promo Code</h2>
                                    <h2 content="Add User" v-else>Add Promo Code</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="promo_code">Promo Code :</label>
                                            <input type="text" class="form-control" id="promo_code" placeholder="Enter Promo Code." v-model="form.promo_code" name="promo_code" :class="{ 'is-invalid': form.errors.has('promo_code') }">
                                            <has-error :form="form" field="promo_code"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label class="typo__label">Promo Discount Type :</label>
                                            <multiselect v-model="form.discount_type" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Select Discount Type." class="form-control" :class="{ 'is-invalid': form.errors.has('discount_type') }"></multiselect>
                                            <has-error :form="form" field="discount_type"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="promo_code">Promo Discount :</label>
                                            <input type="text" class="form-control" id="promo_discount" placeholder="Enter Promo Discount." v-model="form.promo_discount" name="promo_discount" :class="{ 'is-invalid': form.errors.has('promo_discount') }">
                                            <has-error :form="form" field="promo_discount"></has-error>
                                        </div>
                                        <div class="form-group" @input="handleFocus">
                                            <label for="expire_date">Expire Date :</label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD h:i:s"  ref="datepicker" class="form-control" id="expire_date" placeholder="Enter Expire Date." v-model="form.expire_date" name="promo_discount" :class="{ 'is-invalid': form.errors.has('expire_date') }"></datetime>
                                                <has-error :form="form" field="expire_date"></has-error>
                                            </template>
                                        </div>
                                        <div class="form-group">
                                            <label for="min_amount">Min Amount :</label>
                                            <input type="text" class="form-control" id="min_amount" placeholder="Enter Min Amount." v-model="form.min_amount" name="min_amount" :class="{ 'is-invalid': form.errors.has('min_amount') }">
                                            <has-error :form="form" field="min_amount"></has-error>
                                        </div>
                                        <div class="form-group">
                                            <label for="max_discount">Max Discount :</label>
                                            <input type="text" class="form-control" id="max_discount" placeholder="Enter Max Discount." v-model="form.max_discount" name="max_discount" :class="{ 'is-invalid': form.errors.has('max_discount') }">
                                            <has-error :form="form" field="max_discount"></has-error>
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
        name: "PromoCodeList",
        components: { Multiselect,datetime  },
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
                    promo_code: '',
                    discount_type: '',
                    promo_discount: '',
                    expire_date: '',
                    min_amount: '',
                    max_discount: '',
                }),
                value: '',
                options: ['Flat', 'Percentage' ]
            }
        },
        mounted(){
            this.getAllPromoCodes();
            document.getElementById("tj-datetime-input").setAttribute("placeholder", "Select Expire Date.");
        },
        computed:{
            promoCodes(){
                return this.$store.getters.getAllPromoCodes
            }
        },

        methods: {
            handleFocus() {
                this.form.expire_date='';
                this.$refs.datepicker.clearDate();
            },
            getAllPromoCodes() {
                this.$store.dispatch('getAllPromoCodes', {page: this.currentPage, keyword: this.keyword});
            },

            handleCreate() {
                $("#myModal").modal('show');
                this.form.clear();
                this.form.reset();
            },

            add() {
                this.isAdding= true;
                this.form.post('/api/v1/admin/add-promo-code', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((res) => {
                        this.isAdding= false;
                        this.getAllPromoCodes();
                        this.form.reset();
                        this.$refs.datepicker.clearDate()
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
                this.form.post(`/api/v1/admin/update-promo-code/${this.form.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.isAdding= false;
                        this.loading=true;
                        this.getAllPromoCodes();
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
                this.form.fill(row);
            },

            handleDelete(index, row) {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/delete-promo-code/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllPromoCodes();
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
                this.getAllPromoCodes();
            },

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllPromoCodes();
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
                    axios.post('/api/v1/admin/delete-multiple-promo-code/', this.multipleSelection, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllPromoCodes();
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
                axios.get('/api/v1/admin/active-inactive-promo-code/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.getAllPromoCodes();
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





        },

        watch:{
            promoCodes(){
                this.loading=false
            },

        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
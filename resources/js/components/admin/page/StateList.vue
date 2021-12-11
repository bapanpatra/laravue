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
                            <h1 class="card-title">States List</h1>
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
                                    :data="states.data"
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
                                        label="State Name"
                                        prop="state_name">
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
                                           :page-size="states.per_page"
                                           layout="prev, pager, next"
                                           :total="states.total">
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
                                    <h2 content="Edit User" class="text-center" v-if="form.id">Edit State</h2>
                                    <h2 content="Add User" v-else>Add State</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="name">State Name :</label>
                                            <input type="text" class="form-control" id="name" placeholder="Enter State Name." v-model="form.state_name" name="state_name" :class="{ 'is-invalid': form.errors.has('state_name') }">
                                            <has-error :form="form" field="state_name"></has-error>
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
    export default {
        name: "StateList",
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
                    state_name: '',
                }),
            }
        },
        mounted(){
            this.getAllStates();

        },
        computed:{
            states(){
                return this.$store.getters.getAllStates
            }
        },

        methods: {
            getAllStates() {
                this.$store.dispatch('getAllStates', {page: this.currentPage, keyword: this.keyword});
            },

            handleCreate() {
                $("#myModal").modal('show');
                this.form.clear();
                this.form.reset();
            },

            add() {
                this.isAdding= true;
                this.form.post('/api/v1/admin/add-state', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((res) => {
                        this.isAdding= false;
                        this.getAllStates();
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
                this.form.post(`/api/v1/admin/update-state/${this.form.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.isAdding= false;
                        this.loading=true;
                        this.getAllStates();
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
            },

            handleDelete(index, row) {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/delete-state/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllStates();
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
                this.getAllStates();
            },

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllStates();
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
                    axios.post('/api/v1/admin/delete-multiple-state/', this.multipleSelection, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllStates();
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
                axios.get('/api/v1/admin/active-inactive-state/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.getAllStates();
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
            states(){
                this.loading=false
            },

        }
    }
</script>

<style scoped>

</style>
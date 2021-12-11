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
                            <h1 class="card-title">Orders List (Total - {{orders.total_sum}})</h1>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <form @submit.prevent="searchReport()">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4" @input="handleFromDate">
                                        <div class="form-group">
                                            <label>From Date : </label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD"  ref="datepicker_from_date" class="form-control" id="from_date" v-model="form.from_date"  name="from_date" :class="{ 'is-invalid': form.errors.has('from_date') }"></datetime>
                                                <has-error :form="form" field="from_date"></has-error>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4" @input="handleToDate">
                                        <div class="form-group">
                                            <label>To Date :</label>
                                            <template>
                                                <datetime firstDayOfWeek="1" format="YYYY-MM-DD"  ref="datepicker_to_date" class="form-control" id="to_date" v-model="form.to_date"   name="to_date" :class="{ 'is-invalid': form.errors.has('to_date') }"></datetime>
                                                <has-error :form="form" field="to_date"></has-error>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="card-footer bg-transparent" style="text-align: left;margin-top: 20px;">
                                            <button type="submit" class="btn btn-primary">{{isAdding ? 'Searching...' : 'Search'}}</button>
                                        </div>
                                    </div>


                                </div>

                            </form>
                            <div class="search-right" style="margin-top: 20px;">
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
                                    v-if="orders.orders"
                                    v-loading="loading"
                                    element-loading-text="Loading..."
                                    ref="multipleTable"
                                    :data="orders.orders.data"
                                    :row-class-name="tableRowClassName"
                                    style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        label="Unique Id"
                                        prop="unique_id">
                                </el-table-column>
                                <el-table-column
                                        label="Transaction Id"
                                        prop="transaction_id"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        label="Ride Type"
                                        prop="ride_type">
                                </el-table-column>
                                <el-table-column
                                        label="Schedule  Date"
                                        prop="order_date">
                                </el-table-column>
                                <el-table-column
                                        label="Schedule  Time"
                                        prop="order_time">
                                </el-table-column>
                                <el-table-column
                                        label="Payment Type"
                                        prop="payment_method">
                                </el-table-column>
                                <el-table-column
                                        label="Payment Date"
                                        prop="payment_date_time">
                                </el-table-column>
                                <el-table-column
                                        label="Payment Status"
                                        prop="payment_status" width="100">
                                </el-table-column>
                                <el-table-column
                                        label="Order Date"
                                >
                                    <template slot-scope="scope">{{scope.row.created_at | timeformat}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="Order Status"
                                        prop="status" width="100">
                                </el-table-column>
                                <el-table-column
                                        label="Total Amount"
                                        prop="total_amount">
                                </el-table-column>
                                <el-table-column
                                >
                                    <template slot="header" slot-scope="scope">
                                        Action
                                    </template>
                                    <template slot-scope="scope">
                                        <button class="btn btn-sm btn-primary btn-circle" @click="handleView(scope.$index,scope.row)"><i class="fa fa-eye" aria-hidden="true" title="view"></i></button>
                                        <button  class="btn btn-sm btn-danger btn-circle"  @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="margin-top: 20px" v-if="orders.orders">
                                <table class="table table-condensed">
                                    <tr>
                                        <th class="total-amount">Total : {{orders.sum}}</th>
                                    </tr>
                                </table>
                                <button  class="btn btn-sm btn-primary" @click="toggleSelection()" v-if="multipleSelection.length > 0">Clear selection</button>
                                <button  class="btn btn-sm btn-danger" @click="multipleDelete()" v-if="multipleSelection.length > 0">Multiple Delete</button>
                            </div>
                            <el-pagination class="text-center"
                                           v-if="orders.orders"
                                           background
                                           @current-change="handleCurrentChange"
                                           :current-page.sync="currentPage"
                                           :page-size="orders.orders.per_page"
                                           layout="prev, pager, next"
                                           :total="orders.orders.total">
                            </el-pagination>
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
    import _ from 'lodash'
    // import api from '../../../common/modules/admin/api'
    import datetime from 'vuejs-datetimepicker';
    export default {
        name: "OrderList",
        components: {datetime },
        data() {
            return {
                keyword: '',
                currentPage: 1,
                index:'',
                multipleSelection: [],
                loading: true,
                isAdding: false,
                form: new Form({
                    from_date: '',
                    to_date: '',
                }),
            }
        },
        mounted(){
            this.getAllOrders();

        },
        computed:{
            orders(){
                this.isAdding= false;
                return this.$store.getters.getAllOrders
            }
        },

        methods: {
            handleFromDate() {
                this.$refs.datepicker.clearDate();
            },
            handleToDate() {
                this.$refs.datepicker.clearDate();
            },
            getAllOrders() {
                this.$store.dispatch('getAllOrders', {from_date:this.form.from_date,to_date:this.form.to_date,page: this.currentPage, keyword: this.keyword});
            },

            handleView(index, row) {
                this.$router.push({name:'OrderDetails',params:{orderId:row.id}});
            },


            handleDelete(index, row) {
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.get('/api/v1/admin/delete-order/' + row.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllOrders();
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
                this.getAllOrders();
            },

            handleSearch: _.debounce(function () {
                this.currentPage = 1;
                this.loading=true;
                this.getAllOrders();
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
                    axios.post('/api/v1/admin/delete-multiple-order/', this.multipleSelection, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                        .then((response) => {
                            this.loading=true;
                            this.getAllOrders();
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

            tableRowClassName({row, rowIndex}) {
                if (row.status === 'Processing' && row.current_date_time > row.add_date_time) {
                    return 'warning-row';
                }
                return '';
            },
            searchReport(){
                this.isAdding= true;
                this.getAllOrders();
            },


        },

        watch:{
            orders(){
                this.loading=false
            },

        }
    }
</script>

<style scoped>


</style>
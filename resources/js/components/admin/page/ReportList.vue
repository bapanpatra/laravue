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

                        </div>

                        <div class="row">
                            <!-- left column -->
                            <div class="col-md-12">
                                <div class="card-info">
                                    <div class="card-header">
                                        <h3 style="color: #ffffff;" class="card-title">Select Date Between</h3>
                                    </div>
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
                                                    <div class="form-group">
                                                        <label>Status :</label>
                                                        <select class="form-control" v-model="form.status" name="status" :class="{ 'is-invalid': form.errors.has('status') }">
                                                            <option value="Processing">Processing</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Picking Up">Picking Up</option>
                                                            <option value="PickedUp">Picked Up</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Canceled">Canceled</option>
                                                        </select>
                                                        <has-error :form="form" field="status"></has-error>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="card-footer bg-transparent" style="text-align: center;">
                                                <button type="submit" class="btn btn-primary">{{isAdding ? 'Searching...' : 'Search'}}</button>
                                            </div>
                                        </form>
                                        <div v-if="orders.length > 0">
                                            <div class="card-header">
                                                <h3 class="card-title">Total Amount</h3>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-bordered">
                                                    <tr>
                                                        <th>Payment Type</th>
                                                        <th>Amount</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    <tr v-for="(order,index) in orders" :key="index">
                                                        <td>{{order.payment_method}}</td>
                                                        <td>{{order.total_amount}}</td>
                                                        <td>
                                                            <button class="btn btn-sm btn-primary btn-circle" @click="handleView(order.payment_method)"><i class="fa fa-eye" aria-hidden="true" title="view"></i></button>
                                                        </td>
                                                    </tr>


                                                </table>
                                            </div>

                                        </div>
                                        <div v-else>
                                            <p style="font-weight: 600;text-transform: capitalize;color: #666;" class="text-center">No data found.</p>
                                        </div>


                                    </div>
                                    <!-- /.card-body -->

                                </div>


                            </div>
                            <!--/.col (left) -->

                        </div>
                    </div>

                </div>
            </div>
            <!-- /.card -->


        </section>
    </div>

</template>

<script>
    import datetime from 'vuejs-datetimepicker';
    export default {
        name: "ReportList",
        components: {datetime },
        data() {
            return {
                isAdding: false,
                form: new Form({
                    from_date: new Date().toISOString().slice(0, 10),
                    to_date: new Date().toISOString().slice(0, 10),
                    status: 'Delivered',
                    payment_method: '',
                }),
                orders:[]
            }
        },
        mounted(){
            this.searchReport();
        },
        methods: {
            handleFromDate() {
                this.$refs.datepicker.clearDate();
            },
            handleToDate() {
                this.$refs.datepicker.clearDate();
            },
            searchReport(){
                this.isAdding= true;
                this.form.post('/api/v1/admin/get-report', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response)=>{
                        this.isAdding= false;
                      this.orders=response.data.data;
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            handleView(payment_method){
                this.$router.push({name:'OrderReport',query:{from_date:this.form.from_date,to_date:this.form.to_date,status:this.form.status,payment_method:payment_method}});
            }
        }
    }
</script>

<style scoped>

</style>
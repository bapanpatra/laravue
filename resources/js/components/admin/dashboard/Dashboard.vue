<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Dashboard</h1>
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name:'AdminDashboard'}" href="#" >Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <!-- Small boxes (Stat box) -->
                <div class="row">
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-info">
                            <div class="inner" v-if="charts.bar_chart">
                                <h3>{{charts.bar_chart.Accepted + charts.bar_chart.Canceled + charts.bar_chart.Delivered + charts.bar_chart.PickedUp + charts.bar_chart.pickingUp + charts.bar_chart.Processing}}</h3>

                                <p>Total Orders</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <router-link :to="{name:'OrderList'}" class="small-box-footer">
                                More info
                                <i class="fas fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-success">
                            <div class="inner" v-if="charts.today_order">
                                <h3>
                                    {{charts.today_order.today_report}}
                                </h3>

                                <p>Today Report</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-stats-bars"></i>
                            </div>
                            <router-link :to="{name:'ReportList'}" class="small-box-footer">
                                More info
                                <i class="fas fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-warning">
                            <div class="inner" v-if="charts.pie_chart">
                                <h3>{{charts.pie_chart.Users}}</h3>

                                <p>User Registrations</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-person-add"></i>
                            </div>
                            <router-link :to="{name:'UserList'}" class="small-box-footer">
                                More info
                                <i class="fas fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-danger">
                            <div class="inner" v-if="charts.pie_chart">
                                <h3>{{charts.pie_chart.Drivers}}</h3>
                                <p>Driver Registrations</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-pie-graph"></i>
                            </div>
                            <router-link :to="{name:'DriverList'}" class="small-box-footer">
                                More info
                                <i class="fas fa-arrow-circle-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <!-- ./col -->
                </div>

            </div>
            <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                pieChartData: [],
                barChartData: [],
                lineChartData: {},
                columnChartData: {},
            }
        },
        mounted(){
            this.getAllCharts();
        },
        computed: {
            users() {
                return this.$store.getters.getAllUsers
            },
            charts(){
                return this.$store.getters.getAllCharts
            },


        },
        methods: {
            getAllCharts() {
                this.$store.dispatch('getAllCharts');
            },
        },

        watch:{
            charts(n,o){
                this.pieChartData=Object.entries(n.pie_chart);
                this.barChartData=Object.entries(n.bar_chart);
                this.columnChartData=n.column_chart;
                // console.log(this.columnChartData.Days);
                var resultdata =[];
                var result =n.line_chart.Orders;
                for(var i =0;i<result.length;i++)
                {
                    resultdata.push({
                        [result[i].my_date]: result[i].total
                    })
                }
                this.lineChartData=Object.assign({}, ...resultdata);
                var days=this.columnChartData.Days;
                var data=[];
                for (var key in days) {
                    var value = days[key];
                    data.push([key, value])
                }
                this.columnChartData=data;

            },

        }



    }
</script>

<style scoped>

</style>
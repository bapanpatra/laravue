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
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h1 class="card-title">Order Details</h1>
                                <div class="card-tools">
                                    <!--<button class="btn btn-sm btn-success btn-circle" style><i class="fa fa-plus" aria-hidden="true"></i></button>-->

                                </div>
                            </div>

                            <!-- /.card-header -->
                            <div class="card-body">
                                <!-- Main content -->
                                <div class="invoice p-3 mb-3" v-loading="loading">
                                    <!-- title row -->
                                    <div class="row">
                                        <div class="col-12">
                                            <h4>
                                                <i class="fa fa-globe"></i> MyDelivery
                                                <small class="float-right">Date: {{order.created_at | timeformat}}</small>
                                            </h4>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- info row -->
                                    <div class="row invoice-info">
                                        <div class="col-sm-4 invoice-col">
                                            From
                                            <address>
                                                <strong>Swadesh Softwares Pvt. Ltd</strong><br>
                                                CA-9, Ambedkar Sarani, Urvashi, Phase- II<br>
                                                City Center, Durgapur,West Bengal 713216<br>
                                                Phone: 097323 66750<br>
                                                Email: info@swadeshsoftwares.com
                                            </address>
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4 invoice-col">
                                            To
                                            <address v-if="order.user">
                                                <b>{{order.user.name}}</b><br>
                                                <b>Phone: </b>{{order.user.phone_no}}<br>
                                                <b>Email: </b>{{order.user.email}}<br>
                                                <b>Address: </b>{{order.user.address}}
                                            </address>
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-sm-4 invoice-col">
                                            <b>Schedule Date Time: {{order.order_date}} {{order.order_time}}</b><br>
                                            <b>Order ID:</b> {{order.unique_id}}<br>
                                            <b>Payment Method :</b> {{order.payment_method}}<br>
                                            <b>Payment Date :</b> {{order.payment_date_time | timeformat}}<br>
                                            <b>Transaction Id :</b> {{order.transaction_id}}<br>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <!-- Table row -->
                                    <div class="row">
                                        <div class="col-12 table-responsive">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tr>
                                                        <th style="width:50%">Ride Type</th>
                                                        <td>:</td>
                                                        <td>{{order.ride_type}}</td>
                                                    </tr>
                                                    <tr v-if="order.vehicle_type && order.ride_type=='Private'">
                                                        <th>Vehicle Type</th>
                                                        <td>:</td>
                                                        <td>{{order.vehicle_type.name}}</td>
                                                    </tr>
                                                    <tr v-if="order.driver">
                                                        <th>Vehicle Name</th>
                                                        <td>:</td>
                                                        <td v-if="order.status=='Processing'">Driver Not Accepted Yet.</td>
                                                        <td v-else-if="order.status=='Canceled'">Order Canceled. (Driver Not Accepted Yet.)</td>
                                                        <td v-else><p v-if="order.driver.user.driver_vehicle && order.driver.user.roles[0].name=='driver'">{{order.driver.user.driver_vehicle.vehicle.name}}</p><p v-else>Driver Not Accepted Yet.</p></td>

                                                    </tr>
                                                    <tr v-if="order.driver">
                                                        <th>Driver Name</th>
                                                        <td>:</td>
                                                        <td v-if="order.status=='Processing'">Driver Not Accepted Yet.</td>
                                                        <td v-else-if="order.status=='Canceled'">Order Canceled. (Driver Not Accepted Yet.)</td>
                                                        <td v-else><p v-if="order.driver.user.roles[0].name=='driver'">{{order.driver.user.name}}</p><p v-else>Driver Not Accepted Yet.</p></td>

                                                    </tr>
                                                    <tr  v-if="order.pickup_address">
                                                        <th>Pickup Address</th>
                                                        <td>:</td>
                                                        <td>Address : {{order.pickup_address.address}} <br> Details Address : {{order.pickup_address.detail_address}} <br> Landmark : {{order.pickup_address.landmark}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Drop Address:</th>
                                                        <td>:</td>
                                                        <td>
                                                            <div v-for="(d_address,index) in order.drop_address"> <b>{{index + 1}})</b>
                                                                Address : {{d_address.drop_address.address}} <br> &emsp;Details Address : {{d_address.drop_address.detail_address}} <br> &emsp;Landmark : {{d_address.drop_address.landmark}}<br>
                                                                <a href="javascript:void(0)" @click="viewItemDetails(d_address)">View Item Details</a>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Parcel Quantity</th>
                                                        <td>:</td>
                                                        <td>{{order.parcel_qty}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Weight</th>
                                                        <td>:</td>
                                                        <td>{{order.weight}} Kg</td>
                                                    </tr>
                                                    <!--<tr>-->
                                                    <!--<th>Documents</th>-->
                                                    <!--<td>:</td>-->
                                                    <!--<td>-->
                                                    <!--<span v-for="(document,index) in order.documents">-->
                                                    <!--Attachment {{index + 1}} : <a :href="document" target="_blank">Download</a> <br>-->
                                                    <!--</span>-->
                                                    <!--</td>-->
                                                    <!--</tr>-->
                                                    <tr>
                                                        <th>Total Distance</th>
                                                        <td>:</td>
                                                        <td>{{order.total_distance}} Km</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Vehicle Fare</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.vehicle_fare}}</td>
                                                    </tr>
                                                    <tr v-if="(order.drop_address && order.drop_address.length - 1) > 0">
                                                        <th>Extra Stoppage Charge</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.vehicle.extra_stoppage_price * (order.drop_address.length - 1)}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Required Labour</th>
                                                        <td>:</td>
                                                        <td>{{order.required_labour}}</td>
                                                    </tr>
                                                    <tr v-if="order.required_labour=='Yes'">
                                                        <th>Labour Charge</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.labour_charge}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Apply Promo</th>
                                                        <td>:</td>
                                                        <td>{{order.applied_promo_code}}</td>
                                                    </tr>
                                                    <tr v-if="order.applied_promo_code=='Yes'">
                                                        <th>Promo Discount</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.promo_discount}}</td>
                                                    </tr>
                                                    <tr v-if="order.gst_charge">
                                                        <th>Gst Charge</th>
                                                        <td>:</td>
                                                        <td>{{order.gst_charge.gst}} %</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Service Charge</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.service_charge}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Amount</th>
                                                        <td>:</td>
                                                        <td>Rs {{order.total_amount}}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <div class="row">
                                        <!-- accepted payments column -->
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label class="typo__label">Select Driver :</label>
                                                <multiselect v-model="form.user_id" class="form-control"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select Driver." :options="drivers" :searchable="false" :allow-empty="false" :class="{ 'is-invalid': form.errors.has('user_id') }">
                                                    <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                                </multiselect>
                                                <has-error :form="form" field="user_id"></has-error>
                                            </div>
                                            <div class="form-group">
                                                <label class="typo__label">Order Status :</label>
                                                <multiselect v-model="form.status" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Select Order Status." class="form-control" :class="{ 'is-invalid': form.errors.has('status') }"></multiselect>
                                                <has-error :form="form" field="status"></has-error>
                                            </div>
                                            <div class="form-group" v-if="form.status=='Canceled' && order.status!='Canceled'">
                                                <label for="remarks">Remarks :</label>
                                                <input type="text" class="form-control" id="remarks" placeholder="Enter Remarks." v-model="form.remarks" name="remarks" :class="{ 'is-invalid': form.errors.has('remarks') }">
                                                <has-error :form="form" field="remarks"></has-error>
                                            </div>
                                            <button type="button" class="btn btn-success" @click="updateOrderStatus()">Update</button>
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-6" v-if="order.status=='Canceled'">

                                            <div class="table-responsive">
                                                <table class="table" border="1">
                                                    <tr>
                                                        <th style="width:50%">Canceled By:</th>
                                                        <td>{{order.canceled_by.user.name}} (<span v-if="order.canceled_by.user.roles[0].name=='user'">Customer</span> <span v-else>{{order.canceled_by.user.roles[0].display_name}}</span>)</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Remarks:</th>
                                                        <td>{{order.canceled_by.remarks}}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <!-- this row will not appear when printing -->
                                    <!--<div class="row no-print">-->
                                    <!--<div class="col-12">-->
                                    <!--<a href="invoice-print.html" target="_blank" class="btn btn-default"><i class="fa fa-print"></i> Print</a>-->
                                    <!--<button type="button" class="btn btn-success float-right"><i class="fa fa-credit-card"></i> Submit-->
                                    <!--Payment-->
                                    <!--</button>-->
                                    <!--<button type="button" class="btn btn-primary float-right" style="margin-right: 5px;">-->
                                    <!--<i class="fa fa-download"></i> Generate PDF-->
                                    <!--</button>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <div class="clearfix"></div>
                                    <div class="row">
                                        <div class="custom-control custom-switch ml-2 mb-3 mt-1">
                                            <input type="checkbox" class="custom-control-input" id="customSwitch1" @click="changeMapStyle">
                                            <label class="custom-control-label" for="customSwitch1">Night</label>
                                        </div>
                                        <GmapMap
                                                ref="mapRef"
                                                :center="center"
                                                :zoom="18"
                                                map-type-id="terrain"
                                                style="width: 100%; min-height: 600px;"
                                                :options="mapStyle"
                                        >
                                            <!--<GmapMarker-->
                                            <!--:position="center"-->

                                            <!--/>-->
                                            <GmapMarker
                                                    v-for="(item, index) in markers"
                                                    :key="index"
                                                    :position="item.position"
                                                    :clickable="true"
                                                    @click="toggleInfoWindow(item, index)"
                                            />
                                            <gmap-info-window
                                                    :options="infoOptions"
                                                    :position="infoWindowPos"
                                                    :opened="infoWinOpen"
                                                    @closeclick="infoWinOpen = false"
                                            >
                                            </gmap-info-window>

                                            <gmap-info-window
                                                    :opened=opened
                                                    :position="center"
                                                    :options="{
                                                    pixelOffset: {
                                                        width: 0,
                                                        height: -35
                                                    }
                                                }"
                                            >
                                                Home
                                            </gmap-info-window>

                                            <gmap-info-window
                                                    :opened=isCarWindowOpened
                                                    :position="carLocation"
                                                    :options="{
                                                    pixelOffset: {
                                                        width: 0,
                                                        height: -35
                                                    }
                                                }"
                                            >
                                                {{ carInfoWindow }}
                                            </gmap-info-window>

                                            <!--<gmap-polyline v-if="path.length > 0" :path="path" ref="polyline" :options="polylineOptions"></gmap-polyline>-->
                                            <!--<gmap-polygon v-if="paths.length > 0" :paths="paths" ref="polygon">-->
                                            <!--</gmap-polygon>-->
                                            <DirectionsRenderer travelMode="DRIVING" :origin="origin" :destination="destionation"/>
                                        </GmapMap>
                                    </div>
                                </div>
                                <!-- /.invoice -->
                            </div>
                        </div>

                    </div><!-- /.col -->
                </div><!-- /.row -->
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
                                    <h2 content="Add User">Item Details</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <div class="card-body table-responsive p-0">
                                        <table class="table table-hover">
                                            <tbody><tr>
                                                <th>Sl no</th>
                                                <th>Good Type</th>
                                                <th>Item Name</th>
                                                <th>Item Weight</th>
                                                <th>Item Length</th>
                                                <th>Item Height</th>
                                                <th>Item Image</th>
                                                <th>Status</th>
                                            </tr>
                                            <tr v-for="(item,index) in items.items">
                                                <td>{{index+1}}</td>
                                                <td v-if="item.good">{{item.good.name}}</td>
                                                <td>{{item.item_name}}</td>
                                                <td>{{item.item_weight}}</td>
                                                <td>{{item.item_length}}</td>
                                                <td>{{item.item_height}}</td>
                                                <td><img :src="item.image" style="width:50px; height:50px"/></td>
                                                <td>{{items.status}}</td>

                                            </tr>

                                            </tbody></table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" style="margin-left: 0;">Close</button>

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
    import DirectionsRenderer from './json/DirectionsRenderer'
    import data from './json/data.json'
    import nightStyle from './json/night-style.json'
    import Multiselect from 'vue-multiselect'
    const home = {lat: 53.4620,lng: -2.2493};
    const work = {lat: 53.46260769183019,lng: -2.250012352001368};
    const homeToWorkCoords = [home, work];
    let marker;
    let i = 0
    export default {
        name: "OrderDetails",
        components: { Multiselect,DirectionsRenderer },
        data() {
            return {
                loading: true,
                path: [
                    { lat: 53.462658772581754, lng: -2.250049734216737 },
                    { lat: 53.46258212400539, lng: -2.249996090036439 },
                    { lat: 53.462505475290655, lng: -2.249953174692201 },
                    { lat: 53.46242882643754, lng: -2.249910259347963 },
                    { lat: 53.462352177446014, lng: -2.249867344003724 },
                    { lat: 53.46226914088241, lng: -2.249813699823426 },
                    { lat: 53.462218041377895, lng: -2.249792242151307 },
                    { lat: 53.46216055436182, lng: -2.249760055643129 },
                    { lat: 53.46209667980822, lng: -2.249706411462831 },
                    { lat: 53.46204558009619, lng: -2.249674224954652  },
                    { lat: 53.46200725527173, lng: -2.249642038446473 },
                    { lat: 53.46196893041272, lng: -2.249609851938295 },
                    { lat: 53.46198856705823, lng: -2.249551644815013 },
                    { lat: 53.461999745140524, lng: -2.249508729470775 },
                    { lat: 53.46200852791738, lng: -2.249444356454418 },
                    { lat: 53.462018907560434, lng: -2.249409487737224 },
                    { lat: 53.46203008563473, lng: -2.249366572392986 },
                    { lat: 53.46204286057318, lng: -2.249310246003673 },
                    { lat: 53.46205563550777, lng: -2.249279400600002 },
                    { lat: 53.46206681357241, lng: -2.249228438628719 },
                    { lat: 53.462073999469524, lng: -2.249194911016033 }
                ],
                paths: [],

                polylineOptions: {
                    strokeColor: 'black'
                },
                markers:[],
                mapStyle:{},
                carIcon: 'https://laravel.gowebbidemo.com/122282/public/images/car.png',
                whiteCarIcon: 'https://laravel.gowebbidemo.com/122282/public/images/car-white.png',
                dayStyle: {
                    styles: [
                        []
                    ]
                },
                center: {
                    lat: 53.4620,
                    lng: -2.2493,
                    // lat:23.537645216898383,
                    // lng:87.2972389122064,
                },
                carLocation: {
                    lat: '',
                    lng: '',
                    // lat:23.537645216898383,
                    // lng:87.2972389122064,
                },
                nightOn: false,
                isCarWindowOpened: false,
                opened: true,
                carInfoWindow: 'Driver',
                infoWindowPos: null,
                infoWinOpen: false,
                currentMidx: null,
                infoOptions: {
                    content: "",
                    //optional: offset infowindow so it visually sits nicely on top of our marker
                    pixelOffset: {
                        width: 0,
                        height: -35,
                    },
                },
                origin:{},
                destionation:{},
                form: new Form({
                    id: '',
                    status: '',
                    remarks: '',
                    user_id: '',
                }),
                items:[],
                options: ['Processing', 'Accepted','Picking Up','PickedUp','Delivered','Canceled']
            }
        },

        mounted(){
            // this.$refs.mapRef.$mapPromise.then(() => {
            //     this.initSlidingMarker(this.$refs.mapRef.$mapObject)
            // });
            //  this.drawMarkers();
            //   this.moveCar();
            // this.animatePolyline();
            this.getOrderDetails();
            this.$store.dispatch('getDrivers');

        },

        computed:{
            order(){
                return this.$store.getters.getOrderDetails
            },
            drivers(){
                return this.$store.getters.getAllUsers
            },


        },

        methods: {
            getOrderDetails() {
                this.$store.dispatch('getOrderDetails', this.$route.params.orderId);
            },
            updateOrderStatus(){
                this.form.post('/api/v1/admin/update-order-status', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        this.getOrderDetails();
                        this.$message({
                            showClose: true,
                            message: response.data.message,
                            type: 'success'
                        });
                        this.form.remarks='';
                    })
                    .catch(() => {

                    })
            },

            viewItemDetails(items) {
                this.items=items;
                $("#myModal").modal('show');

            },

            changeMapStyle() {
                this.nightOn = !this.nightOn
                this.mapStyle = this.nightOn  ? nightStyle : this.dayStyle
                marker.setIcon(this.nightOn ? this.whiteCarIcon: this.carIcon)
            },

            initSlidingMarker(map) {
                const SlidingMarker = require('marker-animate-unobtrusive')
                SlidingMarker.initializeGlobally()
                marker = new SlidingMarker({
                    position: this.carLocation,
                    map: map,
                    title: 'I am driver',
                    icon: this.carIcon
                })
            },

            moveCar() {
                let v = this
                //   console.log(v.order);
                //   var updatedLat=parseFloat(this.order.latitude);
                //  var updatedLng=parseFloat(this.order.longitude);


                axios.get('/api/v1/admin/get-driver-latitude-longitude/' + v.order.driver.user.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response) => {
                        const toLat =  parseFloat(response.data.data.latitude)
                        const toLng= parseFloat(response.data.data.longitude)
                        // const toLat = data.features[i].geometry.coordinates[0]
                        // const toLng= data.features[i].geometry.coordinates[1]
                        const bearing = v.$bearing(v.carLocation.lat, v.carLocation.lng, toLat, toLng)
                        let distance = v.$distance(v.carLocation.lat, v.carLocation.lng, toLat, toLng)
                        v.carLocation = { lat: toLat, lng: toLng}
                        marker.setEasing('linear')
                        marker.setPosition(v.carLocation)
                        $('img[src*="car.png"]').css('transform', 'rotate('+ bearing +'deg)');
                        $('img[src*="car-white.png"]').css('transform', 'rotate('+ bearing +'deg)');
                        if(distance <= 3) {
                            v.isCarWindowOpened = true
                            v.carInfoWindow = "Drive Here"
                        }
                        i += 1;

                        setTimeout( function() {
                            v.moveCar()
                        }, 1000)

                    });

            },

            animatePolyline() {
                let isPolylineBlack = true
                let currentOptions;
                let v = this
                function togglePolyline() {
                    if(isPolylineBlack) {
                        currentOptions = { strokeColor: 'gray' }
                        isPolylineBlack = false
                    } else {
                        currentOptions = { strokeColor: 'black' }
                        isPolylineBlack = true
                    }
                    v.polylineOptions = currentOptions
                }
                setInterval(togglePolyline, 1000)
            },

            drawDirection() {
                this.paths = homeToWorkCoords;
            },

            drawMarkers() {

                this.markers = [
                    {
                        position: work,
                        infoText: "<strong>Work</strong>",

                    },
                    {
                        position: home,
                        infoText: "<strong>Home</strong>",

                    },
                ];
            },

            toggleInfoWindow(marker, idx) {
                this.infoWindowPos = marker.position;
                this.infoOptions.content = marker.infoText;

                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
                }
            },
        },


        watch:{
            order(n,o){
                this.loading=false,
                    this.form.id=n.id
                this.form.status=n.status
                if(n.driver.user.id && n.driver.user.roles[0].name=='driver'){
                    this.form.user_id=n.driver.user
                }
                this.center={
                    lat:parseFloat(n.pickup_address.latitude),
                    lng:parseFloat(n.pickup_address.longitude),
                    // lat: 53.4620,
                    // lng: -2.2493,
                }
                //  console.log(n)
                this.carLocation={
                    lat:parseFloat(n.latitude),
                    lng:parseFloat(n.longitude),
                    // lat: 53.46260769183019,
                    // lng: -2.250012352001368,
                }
                this.markers.push({
                    position: {
                        lat:parseFloat(n.pickup_address.latitude),
                        lng:parseFloat(n.pickup_address.longitude)
                    },
                    infoText: "<strong>"+n.pickup_address.address+"</strong>",
                })
                for(var i=0;i<n.drop_address.length;i++){
                    this.markers.push({
                        position: {
                            lat:parseFloat(n.drop_address[i].drop_address.latitude),
                            lng:parseFloat(n.drop_address[i].drop_address.longitude)
                        },
                        infoText: "<strong>"+n.drop_address[i].drop_address.address+"</strong>",
                    })
                }

                // this.paths = [
                //     {
                //         lat:parseFloat(n.pickup_address.latitude),
                //         lng:parseFloat(n.pickup_address.longitude)
                //     },
                //     {
                //         lat:parseFloat(n.drop_address[n.drop_address.length-1].drop_address.latitude),
                //         lng:parseFloat(n.drop_address[n.drop_address.length-1].drop_address.longitude)
                //     }
                //     ];
                this.origin={query:n.pickup_address.address};
                this.destionation={query:n.drop_address[n.drop_address.length-1].drop_address.address};
                this.$refs.mapRef.$mapPromise.then(() => {
                    this.initSlidingMarker(this.$refs.mapRef.$mapObject)
                });
                this.moveCar();
                // this.animatePolyline();
            },


        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    .custom-control-label {
        position: relative;
        margin-bottom: 0;
        vertical-align: top;
    }
    .custom-control-input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    .custom-switch {
        padding-left: 2.25rem;
    }
    .custom-control {
        position: relative;
        display: block;
        min-height: 1.5rem;
        padding-left: 1.5rem;
    }
    .custom-control-input:checked ~ .custom-control-label::before {
        color: #fff;
        border-color: #0b55c1;
        background-color: #0b55c1;
    }
    .custom-switch .custom-control-label::before {
        left: -2.25rem;
        width: 1.75rem;
        pointer-events: all;
        border-radius: .5rem;
    }
    .custom-control-label::before, .custom-file-label, .custom-select {
        transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
    .custom-control-label::before {
        position: absolute;
        top: .25rem;
        left: -1.5rem;
        display: block;
        width: 1rem;
        height: 1rem;
        pointer-events: none;
        content: "";
        background-color: #fff;
        border: #adb5bd solid 1px;
    }
    .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
        background-color: #fff;
        -webkit-transform: translateX(.75rem);
        transform: translateX(.75rem);
    }
    .custom-switch .custom-control-label::after {
        top: calc(.25rem + 2px);
        left: calc(-2.25rem + 2px);
        width: calc(1rem - 4px);
        height: calc(1rem - 4px);
        background-color: #adb5bd;
        border-radius: .5rem;
        transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-transform .15s ease-in-out;
        transition: transform .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        transition: transform .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-transform .15s ease-in-out;
    }
    .custom-control-label::after {
        position: absolute;
        top: .25rem;
        left: -1.5rem;
        display: block;
        width: 1rem;
        height: 1rem;
        content: "";
        background: no-repeat 50%/50% 50%;
    }
</style>
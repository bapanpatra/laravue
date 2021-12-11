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
                            <h1 class="card-title">Settings</h1>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-pane active" id="profile"  v-loading="loading">
                                <form class="form-horizontal" @submit.prevent="UpdateSetting()">
                                    <div class="row ml-0">
                                        <div class="col-lg-8">
                                            <div class="form-group">
                                                <label for="exampleInputFile" class="col-sm-2 control-label">Logo :</label>
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
                                        <label for="inputName" class="col-sm-2 control-label">Referral Bonus :</label>

                                        <div class="col-sm-10">
                                            <input type="text" v-model="form.referral_bonus" class="form-control" autocomplete="off" id="inputName" placeholder="Referral Bonus." :class="{ 'is-invalid': form.errors.has('referral_bonus') }">
                                            <has-error :form="form" field="referral_bonus"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail" class="col-sm-2 control-label">User Bonus :</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="form.user_bonus" class="form-control" autocomplete="off" id="inputEmail" placeholder="User Bonus." :class="{ 'is-invalid': form.errors.has('user_bonus') }">
                                            <has-error :form="form" field="user_bonus"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="distance" class="col-sm-2 control-label">Distance (Km) :</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="form.distance" class="form-control" autocomplete="off" id="distance" placeholder="Enter Distance." :class="{ 'is-invalid': form.errors.has('distance') }">
                                            <has-error :form="form" field="distance"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="avg_speed" class="col-sm-2 control-label">Avg Speed (km/hour) :</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="form.avg_speed" class="form-control" autocomplete="off" id="avg_speed" placeholder="Enter Avg Speed." :class="{ 'is-invalid': form.errors.has('avg_speed') }">
                                            <has-error :form="form" field="avg_speed"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="base_price" class="col-sm-2 control-label">Base Price :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="base_price" placeholder="Enter Base Price." v-model="form.base_price" name="base_price" :class="{ 'is-invalid': form.errors.has('base_price') }">
                                            <has-error :form="form" field="base_price"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="per_km_price" class="col-sm-2 control-label">Per Km Price :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="per_km_price" placeholder="Enter Per Mile Price." v-model="form.per_km_price" name="per_km_price" :class="{ 'is-invalid': form.errors.has('per_km_price') }">
                                            <has-error :form="form" field="per_km_price"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="per_kg_price" class="col-sm-2 control-label">Per Kg Price :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="per_kg_price" placeholder="Enter Per Kg Price." v-model="form.per_kg_price" name="per_kg_price" :class="{ 'is-invalid': form.errors.has('per_kg_price') }">
                                            <has-error :form="form" field="per_kg_price"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="extra_stoppage_price" class="col-sm-2 control-label">Extra Stoppage Price :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="extra_stoppage_price" placeholder="Enter Extra Stoppage Price." v-model="form.extra_stoppage_price" name="extra_stoppage_price" :class="{ 'is-invalid': form.errors.has('extra_stoppage_price') }">
                                            <has-error :form="form" field="extra_stoppage_price"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="service_charge" class="col-sm-2 control-label">Service Charge :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="service_charge" placeholder="Enter Service Charge." v-model="form.service_charge" name="service_charge" :class="{ 'is-invalid': form.errors.has('service_charge') }">
                                            <has-error :form="form" field="service_charge"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="labour_charge" class="col-sm-2 control-label">Labour Charge :</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="labour_charge" placeholder="Enter Labour Charge." v-model="form.labour_charge" name="service_charge" :class="{ 'is-invalid': form.errors.has('labour_charge') }">
                                            <has-error :form="form" field="labour_charge"></has-error>
                                        </div>
                                    </div>
                                    <!--<div class="form-group">-->
                                        <!--<label for="gst" class="col-sm-2 control-label">Gst :</label>-->
                                        <!--<div class="col-sm-10">-->
                                            <!--<input type="text" class="form-control" id="gst" placeholder="Enter Gst." v-model="form.gst" name="gst" :class="{ 'is-invalid': form.errors.has('gst') }">-->
                                            <!--<has-error :form="form" field="gst"></has-error>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <div class="form-group">
                                        <label  class="col-sm-2 control-label">Gst : {{form.gst}} %</label>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="form-group row">
                                                    <div class="col-lg-6">
                                                        <div class="inner">
                                                            <ul>
                                                                <li>
                                                                    <label  class="col-lg-12 control-label">Cgst (%) :</label>
                                                                </li>
                                                                <li>
                                                                    <input type="text" class="form-control" id="cgst" placeholder="Enter Cgst." v-model="form.cgst" name="cgst" :class="{ 'is-invalid': form.errors.has('cgst') }">
                                                                    <has-error :form="form" field="cgst"></has-error>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6">
                                                        <div class="inner">
                                                            <ul>
                                                                <li>
                                                                    <label  class="col-lg-12 control-label">Sgst (%) :</label>
                                                                </li>
                                                                <li>
                                                                    <input type="text" class="form-control" id="sgst" placeholder="Enter Sgst." v-model="form.sgst" name="sgst" :class="{ 'is-invalid': form.errors.has('sgst') }">
                                                                    <has-error :form="form" field="sgst"></has-error>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
        name: "Setting",
        data(){
            return {
                form: new Form({
                    id:'',
                    image:'',
                    referral_bonus:'',
                    user_bonus:'',
                    distance:'',
                    avg_speed:'',
                    base_price:'',
                    per_km_price:'',
                    per_kg_price:'',
                    extra_stoppage_price:'',
                    service_charge:'',
                    labour_charge:'',
                    gst:'',
                    cgst:'',
                    sgst:'',
                }),
                loading: true,
                isAdding: false,
                autocompleteItems:[]


            }
        },
        mounted() {
            this.$store.dispatch("getSetting");
        },

        computed:{
            setting(){
                return this.$store.getters.getSetting
            },


        },
        methods:{
            UpdateSetting(){
                this.isAdding= true;
                this.form.post(`/api/v1/admin/update-setting/${this.form.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('api_token')}})
                    .then((response)=>{
                        this.isAdding= false;
                        this.$store.dispatch("getSetting");
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
        },
        watch:{
            setting(n,o){
                this.loading=false,
                this.form.id=n.id;
                this.form.image=n.logo;
                this.form.referral_bonus=n.referral_bonus;
                this.form.user_bonus=n.user_bonus;
                this.form.distance=n.distance;
                this.form.avg_speed=n.avg_speed;
                this.form.base_price=n.base_price;
                this.form.per_km_price=n.per_km_price;
                this.form.per_kg_price=n.per_kg_price;
                this.form.extra_stoppage_price=n.extra_stoppage_price;
                this.form.service_charge=n.service_charge;
                this.form.labour_charge=n.labour_charge;
                this.form.gst=n.gst.gst;
                this.form.cgst=n.gst.cgst;
                this.form.sgst=n.gst.sgst;
            },

        }

    }
</script>

<style scoped>

</style>
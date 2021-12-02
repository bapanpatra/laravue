import api from './api';
export default {
    state:{
        allOrders:[],
        allOrderDetails:[],
        allOrderReport:[],
    },
    getters:{
        getAllOrders(state){
            return state.allOrders
        },
        getOrderDetails(state){
            return state.allOrderDetails
        },
        getAllOrderReport(state){
            return state.allOrderReport
        },
    },
    actions:{
        getAllOrders(context,payload){
            api().get('/api/v1/admin/get-all-orders?page='+payload['page']+'&keyword='+payload['keyword']+'&from_date='+payload['from_date']+'&to_date='+payload['to_date'])
                .then((response)=>{
                    context.commit('getAllOrders',response.data.orders)
                })
        },
        getOrderDetails(context,payload){
            api().get('/api/v1/admin/get-order-details/'+payload)
                .then((response)=>{
                    context.commit('getOrderDetails',response.data.order)
                })
        },
        getAllOrderReport(context,payload){
            api().get('/api/v1/admin/get-order-report?page='+payload['page']+'&keyword='+payload['keyword']+'&from_date='+payload['from_date']+'&to_date='+payload['to_date']+'&status='+payload['status']+'&payment_method='+payload['payment_method'])
                .then((response)=>{
                    context.commit('getAllOrderReport',response.data.report)
                })
        },

    },
    mutations:{
        getAllOrders(state,data){
            return state.allOrders = data
        },
        getOrderDetails(state,data){
            return state.allOrderDetails = data
        },
        getAllOrderReport(state,data){
            return state.allOrderReport = data
        },
    }
}

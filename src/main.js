import Vue from 'vue'
import Vuex from 'vuex'
import app from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'n-zepto'
import 'element-ui/lib/theme-default/index.css'
import index from './components/index'
import customNum from './components/customNum'
// ---------------------
import order from './components/order/order'
import orderDetail from './components/order/orderDetail'
import serve from './components/serve'
import buy from './components/order/buy/buy'
import info from './components/order/info/info'
import sAe from './components/order/sAe/sAe'
import score from './components/order/info/scoresDetail'
import search from './components/search'
import numControl from './components/order/buy/numControl'
import register from './components/register'
import registerSucceed from './components/registerSucceed'
import finished from './components/order/buy/finished'
import indent from './components/order/buy/indent'
import pay from './components/order/buy/pay'
import ratingOrRewardSucceed from './components/order/buy/ratingOrRewardSucceed'
import affirm from './components/order/buy/affirm'
import progress from './components/order/buy/progress'
import paySucceed from'./components/order/buy/paySucceed'
import ratingFinished from './components/order/buy/ratingFinished'
import rating from './components/order/buy/rating'
import reward from './components/order/buy/reward'
import navs from './components/order/buy/navs'
import alert from './components/order/buy/alert'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Resource)
Vue.use(Vuex)
//注册全局组件
Vue.component('serve',serve)
Vue.component('numControl',numControl)
Vue.component('navs',navs)
Vue.component('alert',alert)
//路由
const router = new VueRouter({
//	mode:'history',
	routes:[
	{path:'/',component:index},
//	{path:'/index',component:index},
	{	
		path:'/order',component:orderDetail,
		children:[
		{path:'/order/buy',component:buy},
		{path:'/order/info',component:info},
		{path:'/order/sAe',component:sAe},
		{path:'/order/indent',component:indent},
		{path:'/order/search',component:search},
		{path:'/order/affirm',component:affirm},
		{path:'/order/customNum',component:customNum},
		{path:'/order/progress',component:progress},
		{path:'/order/register',component:register},
		{path:'/order/registerSucceed',component:registerSucceed}
		]
	},
	{path:'/order/info/score',component:score},
	{path:'/order/buy/finished',component:finished},
	{path:'/order/buy/pay',component:pay},
	{path:'/order/buy/ratingOrRewardSucceed',component:ratingOrRewardSucceed},
	{path:'/order/buy/paySucceed',component:paySucceed},
	{path:'/order/buy/ratingFinished',component:ratingFinished},
	{path:'/order/buy/reward',component:reward},
	{path:'/order/buy/rating',component:rating}
	]
})
//vuex
const store = new Vuex.Store({
  state: {
//商品有关的参数
	//是否为预点餐
  	beforeOrder:false,
  	//http
//	orderHttp:'http://192.168.2.9:9085',
//	merchantHttp:'http://192.168.2.9:9084',
//	accountHttp:'http://192.168.2.9:9081',
//	paymentHttp:'http://paytest.jinghanit.com:9089',
//	rewardHttp:'http://192.168.2.9:9093',
//	waiterHttp:'http://192.168.2.9:9088',
//	ws:'192.168.2.9:9085/',
  	
//	orderHttp:'http://192.168.2.6:9085',
//	merchantHttp:'http://192.168.2.6:9084',
//	accountHttp:'http://192.168.2.6:9081',
//	paymentHttp:'http://paytest.jinghanit.com:9089',
//	rewardHttp:'http://192.168.2.6:9093',
//	waiterHttp:'http://192.168.2.6:9088',
//	ws:'192.168.2.6:9085/',
  	
	orderHttp:'http://192.168.2.11:9085',
	merchantHttp:'http://192.168.2.11:9084',
	accountHttp:'http://192.168.2.11:9081',
	paymentHttp:'http://paytest.jinghanit.com:50089',
	rewardHttp:'http://192.168.2.11:9093',
	waiterHttp:'http://192.168.2.11:9088',
	ws:'192.168.2.11:9085/',
	
//	orderHttp:'https://order.jinghanit.com',
//	merchantHttp:'https://merchant.jinghanit.com',
//	accountHttp:'https://account.jinghanit.com',
//	paymentHttp:'https://pay.jinghanit.com',
//	rewardHttp:'https://reward.jinghanit.com',
//	waiterHttp:'https://waiter.jinghanit.com',
//	ws:'order.jinghanit.com:29510/',
	//商铺Id、名字、桌台Id、名字
	merchantId:61,
	tableId:102,
//	merchantId:631,
//	tableId:618,
  	tableName:'',
  	merchantName:'',
  	merchantPicUrl:'',
//用户信息、昵称、头像、userId、手机号
  	nickName:'',
  	headImgUrl:'',
  	userId:'',
  	phoneNumber:null,
  	//当前操作用户
  	nowImgUrl:'',
  	nowUserName:'',
//固定的必选商品信息
  	mustStatus:0,
  	mustPerMoney:0,
    customerNum:0,
//订单信息
	//订单号
    orderNo:null,
	//下单时间
    orderTime:null,
    //已下单的菜品
    hasOrderedList:[],
     //常规订单菜品
    submitFoodsList:[],
    //常规订单菜品按数量分
    submitListCount:[],
    //常规订单菜品按种类分
    submitListCates:[],
    //小菜list
    addedDishesList:[],
    //必选项list
    mustRequires:[],
//下单之前的各个list
	//总的菜单列表信息
    foodsList:[],
	//选中的菜品
    selectFoods:[],
    //菜品种类
    kinds:[],
    cates:[],
    catesList:[],
    originList:[],
    catesNums:[],
     //购物车状态
    commandCode:0,
    //购物车list
    cartList:[],
    //确认页面的购物车list
    affCartList:[],
    //选中菜品种类
    cateName:[],
    //现在正在操作的菜品,nowFood
    nowFood:{showIndex:false,name:null,addIndex:null},
//各种价格、数量
    //总价
    totalPrice:0,
    //需要付的钱
    needPay:0,
    //会员价
    memberPrice:0,
    //总的小菜价格
    allCakeMoney:0,
    //总数量
    allCounts:0,
    allCount:0,
//各类标记
    //是否打赏
    isReward:false,
    //支付方式
    payWeChat:false,
    payAliPay:false,
    //支付成功
    paySucceed:false,
    payResult:'支付失败',
    //保存label标签信息
    labelInfo:[],
    //indent页面标志
    indentIndex:false,
    //pay页面的支付按钮
    showPayBtn:false,
    //orderStatus
    orderStatus:0,
    //addingIndex
    addingIndex:false,
    //下单确认
    hasAffirmed:false,
    tempIflag:true,
    //会员从首页进
    memberIndex:false,
    //会员从buy进
    memberBuy:false,
    //会员从affirm进
    memberAffirm:false,
    //会员从fininshed进
    memberFinish:false,
    //pc端加菜消息标记
    pcAddDish:false,
    //现在的finished需要加载的状态
    finishedStatus:0,
    //判断是否是别人下单后台发送的消息导致跳转到finished页面
    goFinishFromMsg:false,
    //alert弹框组件
    showAlert:false,
    //订单菜品process
    process:'等待商家确认',
    //总的口味和要求
    allOrderAsk:{},
    //是否显示继续点菜按钮
    ifShowAddingBtn:false,
    //审核消息到来
    checkComing:false,
    //是否显示代付款
    ifShowWillPay:true,
    //显示打赏按钮
    showRewardBtn:true,
    //显示去评价按钮
    showRatingBtn:true,
    //是否显示催菜
    showCallDishes:false,
    //是否显示买单:
    showPayBill:false,
    //是否支付成功
    ifPaySucceed:false,
    tempDishesNum:1
  },
  mutations: {
  	//清空原来已点数据
  	change(state){
  		//选中的菜清空
  		state.selectFoods = []
  		//加的菜清空
  		for(var i=0;i<state.foodsList.length;i++){
  			for(var j=0;j<state.foodsList[i].length;j++){
  				Vue.set(state.foodsList[i][j] , 'count' , 0)
				Vue.set(state.foodsList[i][j] , 'memoLists' , [])
  			}
  		}
  		//人数和餐具清空
  		state.customNum = 0
  	}
  	//计算菜品种类数量
  }
})

new Vue({ 
	router:router,
	store,
	render: h => h(app)
}).$mount('#app')





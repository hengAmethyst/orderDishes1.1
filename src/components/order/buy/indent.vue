<template>
	<div class="indent">
		<!--蒙版-->
		<div class="shadow" v-if="showShadow">
			<img class="rotation" src="../../../../static/imgs/1.png" width="50px" height="50px"/>
		</div>
		<!--nav-->
		<div class="navs">
			<p href="javascript:" onclick="history.back()">
				<i class='iconfont icon-zuojiantou'></i>
				<span>菜单</span>
			</p>
			<p>
				{{information.name}}
			</p>
			<p>
				<span @click="reload">
					<a>
						<img src="../../../assets/icons/刷新@3x.png" v-show="information.ifShowReload"/>
					</a>
				</span>
			</p>
		</div>
		<!--选项卡-->
		<div class='tab'>
			<ul>
				<li @click="willBill=true,willRating=false,hadBill=false" class="active-indent">待付款</li>
				<li @click="willBill=false,willRating=true,hadBill=false,getOldInfo1()">待评价</li>
				<li @click="willBill=false,willRating=false,hadBill=true,getOldInfo2()">已付款</li>
			</ul>
		</div>
		<!--inner-->
		<!--待结账-->
		<div class="willBill" v-show="willBill">
			<p v-for="item in mergeList" v-if="item.count>0" @click="change($event.currentTarget)">
				<span>{{item.time}}</span>
				<span>共{{item.count}}份</span>
				<span>￥{{item.price/100}}</span>
				<img :src="'../../../static/imgs/static'+ item.status +'.png'"/>
			</p>
		</div>
		<!--待评价-->
		<div class="willRating" v-show="willRating">
			<p v-for="item in oldDataPart" @click="getCurrentOrderNo(item.orderNo)">
				<span>{{item.dinnerTime}}</span>
				<span>共{{item.dishesCount}}份</span>
				<span>￥{{item.totalAmount}}</span>
			</p>
		</div>
		<!--已付款-->
		<div class="hadBill" v-show="hadBill">
			<p v-for="item in oldDataAll">
				<span>{{item.updateTime}}</span>
				<span>共{{item.dishesCount}}份</span>
				<span>￥{{item.totalAmount}}</span>
			</p>
		</div>
	</div>
</template>
<script>
import {getCurrentTime} from '../../../js/getCurrentTime.js'
	export default{
		data(){
			return{
				information:{name:'我的订单',ifShowReload:true,ifShowMenu:false},
				willBill:true,
				willRating:false,
				hadBill:false,
				//保存菜品list
				goodsList:[],
				//合并之后的list
				mergeList:[],
				//暂存老数据1
				oldDataAll:null,
				//暂存老数据2
				oldDataPart:null,
				showShadow:false
			}
		}
		,
		methods:{
			reload(){
				this.showShadow = true
				this.getOldInfo1()
				this.getOldInfo2()
				var loading = false
				//获取加菜订单详情
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getOrderDetailById",
					JSON.stringify({"param":{
											"merchantId":this.$store.state.merchantId,
											"tableId":this.$store.state.tableId,
											"id":this.$store.state.orderId},
											"channel":1}
					), {emulateJSON: true
					}).then(function(res) {
						loading = true
						console.log(res)
						if(res.body.data.orderStatus==3){
							this.$store.state.ifShowWillPay = true
						}
						else{
							this.$store.state.ifShowWillPay = false
						}
						this.goodsList = res.body.data.orderItemList
						let tempData = []
						if(this.$store.state.ifShowWillPay){
							for(let i=0;i<6;i++){
								tempData.push({
									time:this.$store.state.orderTime,
									count:0,
									price:0,
									status:''
								})
							}
							//按状态分类
							for(let i=0;i<this.goodsList.length;i++){
								if(this.goodsList[i].status == 1){
									tempData[0].count += this.goodsList[i].dishesCount
									if(this.$store.state.phoneNumber!=null){
										tempData[0].price += this.goodsList[i].memberPrice
									}
									else{
										tempData[0].price += this.goodsList[i].dishesPrice
									}
									tempData[0].status = this.goodsList[i].status
									//如果存在小菜
									if(this.goodsList[i].addedDishList.length>0){
										for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
											tempData[0].price += this.goodsList[i].addedDishList[j].price
										}
									}
								}
								if(this.goodsList[i].status == 2){
									tempData[1].count += this.goodsList[i].dishesCount
									if(this.$store.state.phoneNumber!=null){
										tempData[1].price += this.goodsList[i].memberPrice
									}
									else{
										tempData[1].price += this.goodsList[i].dishesPrice
									}
									tempData[1].status = this.goodsList[i].status
									//如果存在小菜
									if(this.goodsList[i].addedDishList.length>0){
										for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
											tempData[1].price += this.goodsList[i].addedDishList[j].price
										}
									}
								}
								if(this.goodsList[i].status == 3){
									tempData[2].count += this.goodsList[i].dishesCount
									if(this.$store.state.phoneNumber!=null){
										tempData[2].price += this.goodsList[i].memberPrice
									}
									else{
										tempData[2].price += this.goodsList[i].dishesPrice
									}
									tempData[2].status = this.goodsList[i].status
									//如果存在小菜
									if(this.goodsList[i].addedDishList.length>0){
										for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
											tempData[2].price += this.goodsList[i].addedDishList[j].price
										}
									}
								}
								if(this.goodsList[i].status == 5){
									tempData[3].count += this.goodsList[i].dishesCount
									if(this.$store.state.phoneNumber!=null){
										tempData[3].price += this.goodsList[i].memberPrice
									}
									else{
										tempData[3].price += this.goodsList[i].dishesPrice
									}
									tempData[3].status = this.goodsList[i].status
									//如果存在小菜
									if(this.goodsList[i].addedDishList.length>0){
										for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
											tempData[3].price += this.goodsList[i].addedDishList[j].price
										}
									}
								}
								if(this.goodsList[i].status == 6){
									tempData[4].count += this.goodsList[i].dishesCount
									if(this.$store.state.phoneNumber!=null){
										tempData[4].price += this.goodsList[i].memberPrice
									}
									else{
										tempData[4].price += this.goodsList[i].dishesPrice
									}
									tempDatd[4].status = this.goodsList[i].status
									//如果存在小菜
									if(this.goodsList[i].addedDishList.length>0){
										for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
											tempData[4].price += this.goodsList[i].addedDishList[j].price
										}
									}
								}
							}
						}
						this.mergeList = tempData
						this.showShadow = false
						//模板消失
					})
				if(!loading){
					var that = this
					setTimeout(function(){
						that.showShadow = false
					},5000)
				}
			},
			getCurrentOrderNo(target){
				this.$store.state.orderNo = target
				this.$router.push({path:'/order/buy/rating'})
			},
			change(target){
				//判断当前点击的项的状态
				if(target.children[3].src.indexOf('static1')>-1){
					this.$store.state.finishedStatus = 1
				}
				else if(target.children[3].src.indexOf('static2')>-1){
					this.$store.state.finishedStatus = 2
				}
				else if(target.children[3].src.indexOf('static3')>-1){
					this.$store.state.finishedStatus = 3
				}
				else if(target.children[3].src.indexOf('static4')>-1){
					this.$store.state.finishedStatus = 4
				}
				else if(target.children[3].src.indexOf('static6')>-1){
					this.$store.state.finishedStatus = 6
				}
				this.$router.push({path:'/order/buy/finished'})
			},
			//获取未评价账单
			getOldInfo1(){
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getCustomerOrderListByOpenId",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"openUserName":this.$store.state.nickName,"evalFlag":0}}), 
					{emulateJSON: true})
					.then(function(res) {
						if(res.body.msg.indexOf('订单信息为空')>-1){
							this.oldDataPart = []
						}
						else{
							this.oldDataPart = res.body.data.orderResponseList
						}
					})
			},
			//获取已结账账单
			getOldInfo2(){
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getCustomerOrderListByOpenId",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"openUserName":this.$store.state.nickName,"evalFlag":1}}),
					{emulateJSON: true})
					.then(function(res) {
						console.log(res)
						if(typeof(res.body.data.orderResponseList)=="undefined"){
							this.oldDataAll = []
						}
						else{
							this.oldDataAll = res.body.data.orderResponseList
						}
					})
			}
		}
		,
		created(){
			this.getOldInfo1()
			this.getOldInfo2()
			//获取加菜订单详情
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getOrderDetailById",
				JSON.stringify({"param":{
										"merchantId":this.$store.state.merchantId,
										"tableId":this.$store.state.tableId,
										"id":this.$store.state.orderId},
										"channel":1}
				), {emulateJSON: true})
				.then(function(res) {
					this.goodsList = res.body.data.orderItemList
					let tempData = []
					for(let i=0;i<6;i++){
						tempData.push({
							time:this.$store.state.orderTime,
							count:0,
							price:0,
							status:''
						})
					}
					//按状态分类
					for(let i=0;i<this.goodsList.length;i++){
						if(this.goodsList[i].status == 1){
							tempData[0].count += this.goodsList[i].dishesCount
							if(this.$store.state.phoneNumber!=null){
								tempData[0].price += this.goodsList[i].memberPrice
							}
							else{
								tempData[0].price += this.goodsList[i].dishesPrice
							}
							tempData[0].status = this.goodsList[i].status
							//如果存在小菜
							if(this.goodsList[i].addedDishList.length>0){
								for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
									tempData[0].price += this.goodsList[i].addedDishList[j].price
								}
							}
						}
						if(this.goodsList[i].status == 2){
							tempData[1].count += this.goodsList[i].dishesCount
							if(this.$store.state.phoneNumber!=null){
								tempData[1].price += this.goodsList[i].memberPrice
							}
							else{
								tempData[1].price += this.goodsList[i].dishesPrice
							}
							tempData[1].status = this.goodsList[i].status
							//如果存在小菜
							if(this.goodsList[i].addedDishList.length>0){
								for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
									tempData[1].price += this.goodsList[i].addedDishList[j].price
								}
							}
						}
						if(this.goodsList[i].status == 3){
							tempData[2].count += this.goodsList[i].dishesCount
							if(this.$store.state.phoneNumber!=null){
								tempData[2].price += this.goodsList[i].memberPrice
							}
							else{
								tempData[2].price += this.goodsList[i].dishesPrice
							}
							tempData[2].status = this.goodsList[i].status
							//如果存在配菜
							if(typeof(this.goodsList[i].addedOnSideList)!='undefined'){
								for(let j=0;j<this.goodsList[i].addedOnSideList.length;j++){
									tempData[2].price += this.goodsList[i].addedOnSideList[j].dishesPrice
								}
							}
						}
						if(this.goodsList[i].status == 5){
							tempData[3].count += this.goodsList[i].dishesCount
							if(this.$store.state.phoneNumber!=null){
								tempData[3].price += this.goodsList[i].memberPrice
							}
							else{
								tempData[3].price += this.goodsList[i].dishesPrice
							}
							tempData[3].status = this.goodsList[i].status
							//如果存在小菜
							if(this.goodsList[i].addedDishList.length>0){
								for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
									tempData[3].price += this.goodsList[i].addedDishList[j].price
								}
							}
						}
						if(this.goodsList[i].status == 6){
							tempData[4].count += this.goodsList[i].dishesCount
							if(this.$store.state.phoneNumber!=null){
								tempData[4].price += this.goodsList[i].memberPrice
							}
							else{
								tempData[4].price += this.goodsList[i].dishesPrice
							}
							tempDatd[4].status = this.goodsList[i].status
							//如果存在小菜
							if(this.goodsList[i].addedDishList.length>0){
								for(let j=0;j<this.goodsList[i].addedDishList.length;j++){
									tempData[4].price += this.goodsList[i].addedDishList[j].price
								}
							}
						}
					}
					this.mergeList = tempData
				})
		}
		,
		mounted(){
			var oLi = document.getElementsByTagName('li')
				for(var i=0;i<oLi.length;i++){
					oLi[i].onclick = function(){
						for(var j=0;j<oLi.length;j++){
							oLi[j].className = ''
						}
						this.className = 'active-indent'
					}
				}
		}
		,
		computed:{
			checkComing(){
				return this.$store.state.checkComing
			},
			ifShowWillPay(){
				return this.$store.state.ifShowWillPay
			}
			,
			ifPaySucceed(){
				return this.$store.state.ifPaySucceed
			}
		}
		,
		watch:{
			checkComing(){
				this.reload()
			},
			ifShowWillPay(){
				this.reload()
			},
			ifPaySucceed(){
				this.reload()
			}
		}
	}
</script>
<style lang="scss">
	.indent{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:#eee;
		z-index:2000;
		/*蒙版*/
		.shadow{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:black;
			z-index: 3003;
			opacity: 0.5;
			@-webkit-keyframes rotation{
				from {-webkit-transform: rotate(0deg);}
				to {-webkit-transform: rotate(360deg);}
			}
			.rotation{
				position:absolute;
				top:30%;
				left:50%;
				transform: translate(-50% -50%);
				-webkit-transform: rotate(360deg);
				animation: rotation 1.5s linear infinite;
				/*-moz-animation: rotation 1.5s linear infinite;
				-webkit-animation: rotation 1.5s linear infinite;
				-o-animation: rotation 1.5s linear infinite;*/
				border-radius: 100%;
			}
		}
		/*头部导航栏*/
		.navs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 0.6rem;
			background: #fff;
			border-bottom:1px solid #F9F9F9;
			p:nth-child(1) {
				width: 0.8rem;
				margin-left: 0.15rem;
				color: #282828;
				i {
					font-size: 0.16rem;
				}
				span {
					font-size: 0.16rem;
				}
			}
			p:nth-child(2) {
				width: 1.4rem;
				margin-left: 0.25rem;
				text-align: center;
				color: #282828;
				font-size: 0.20rem;
			}
			p:nth-child(3) {
				display: flex;
				justify-content: flex-end;
				width: 1rem;
				margin-right: 0.08rem;
				span:nth-child(1) {
					display: flex;
					justify-content: center;
					align-items: center;
					a {
						img {
							width: 0.24rem;
							height: 0.22rem;
							margin-right: 0.05rem;
						}
					}
				}
				span:nth-child(2) {
					img {
						width: 0.4rem;
						height: 0.4rem
					}
				}
			}
		}
		/*选项卡*/
		.tab{
			width:100%;
			height:0.4rem;
			border-bottom: 1px solid #F0F0F0;
			background:#fff;
			ul{
				display:flex;
				justify-content: space-around;
				width:100%;
				li{
					width:0.5rem;
					line-height:0.4rem;
					border-bottom: 2px solid #fff;
					text-align: center;
					font-size: 0.16rem;
					color: #A0A0A0;
				}
				.active-indent{
					border-bottom: 2px solid #31C4C3;
					color: #31C4C4;
				}
			}
		}
		/*未结账*/
		.willBill{
			width:100%;
			height:4.8rem;
			overflow: scroll;
			p{
				position:relative;
				display: flex;
				align-items: center;
				width:100%;
				height:0.6rem;
				border-top:1px solid #F9F9F9;
				background:#fff;
				span:nth-child(1){
					display: inline-block;
					width:1.4rem;
					margin-left:0.15rem;
					font-size:0.14rem;
					color: #5A5A5A;
				}
				span:nth-child(2){
					display:inline-block;
					width:0.51rem;
					margin-left:0.04rem;
					font-size:0.14rem;
					color: #A0A0A0;
				}
				span:nth-child(3){
					display:inline-block;
					width:0.325rem;
					margin-left:0.27rem;
					font-size:0.18rem;
					color: #282828;
				}
				img{
					position: absolute;
					right:0;
					bottom:0;
					width:0.5rem;
					height:0.42rem;
					margin-left:0.36rem;
				}
			}
		}
		/*待评价*/
		.willRating{
			width:100%;
			height:4.8rem;
			overflow: scroll;
			p{
				display: flex;
				justify-content: space-around;
				align-items: center;
				width:100%;
				height:0.6rem;
				border-top:1px solid #F9F9F9;
				background:#fff;
				span:nth-child(1){
					display: inline-block;
					width:1.3rem;
					margin-left:0.15rem;
					font-size:0.14rem;
					color: #282828;
				}
				span:nth-child(2){
					display:inline-block;
					width:0.51rem;
					margin-left:0.04rem;
					font-size:0.14rem;
					color: #282828;
				}
				span:nth-child(3){
					display:inline-block;
					width:0.6rem;
					margin-left:0.1rem;
					font-size:0.18rem;
					color: #282828;
				}
			}
		}
		/*已结账*/
		.hadBill{
			width:100%;
			height:4.8rem;
			overflow: scroll;
			p{
				display: flex;
				justify-content: space-around;
				align-items: center;
				width:100%;
				height:0.6rem;
				border-top:1px solid #F9F9F9;
				background:#fff;
				span:nth-child(1){
					display: inline-block;
					width:1.3rem;
					margin-left:0.15rem;
					font-size:0.14rem;
					color: #5A5A5A;
				}
				span:nth-child(2){
					display:inline-block;
					width:0.51rem;
					margin-left:0.04rem;
					font-size:0.14rem;
					color: #A0A0A0;
				}
				span:nth-child(3){
					display:inline-block;
					width:0.6rem;
					margin-left:0.1rem;
					font-size:0.18rem;
					color: #282828;
				}
			}
		}
	}
</style>
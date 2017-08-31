<template>
	<div class="affirm">
		<!--nav-->
		<div class="navs">
			<router-link to="/order/buy">
				<p>
					<i class='iconfont icon-zuojiantou'></i>
					<span>菜单</span>
				</p>
			</router-link>
			<p>
				{{information.name}}
			</p>
			<p>
				<span @click="reload">
					<a>
						<img src="../../../assets/icons/刷新@3x.png" v-show="information.ifShowReload"/>
					</a>
				</span>
				<span>
					<router-link to="/order/indent">
						<img src="../../../assets/icons/订单@3x.png" v-show="information.ifShowMenu"/>
					</router-link>
				</span>
			</p>
		</div>
		<div class="wrapper">
		<!--选的菜品-->
			<div class="orderd" v-for="(item,index) in this.$store.state.catesList" v-show="item.length>0">
				<div class="category">
					<span>{{beforeCateName[index]}}</span>
					<span>共<i>{{catesNums[index]}}</i>份</span>
				</div>
				<ul>
					<li v-for="(food,order) in item">
						<!--菜品信息栏-->
						<div class="selectFood">
							<div class="foodPic">
								<img :src="food.picUrl"/>
							</div>
							<div class="headers">
								<p>
									<span>
										{{food.name}}
									</span>
									<span>
										￥{{food.price}}/{{food.unitName}}
									</span>
									<span>
										会员价￥{{food.memberPrice}}/{{food.unitName}}
									</span>
								</p>
								<!--头像-->
								<!--1个人-->
								<p v-show="food.userHeadUrls.length==1">
									<span v-for="(img,index) in food.userHeadUrls">
										<img :src="img"/>
										<i>{{food.userNames[index]}}</i>
									</span>
								</p>
								<!--2个人-->
								<p v-show="food.userHeadUrls.length==2">
									<span v-for="img in food.userHeadUrls">
										<img :src="img"/>
									</span>
								</p>
								<!--3个人-->
								<p v-show="food.userHeadUrls.length==3">
									<span v-for="img in food.userHeadUrls">
										<img :src="img"/>
									</span>
								</p>
								<!--4个人-->
								<p v-show="food.userHeadUrls.length>3">
									<span  v-for="(img,index) in food.userHeadUrls" v-show="index<3">
										<img :src="img"/>
									</span>
									<span>
										<img src="../../../assets/icons/头像更多.png"/>
									</span>
								</p>
							</div>
							<numControl :food="food"></numControl>
							<!--菜品重复-->
							<div class="moreTimes" v-show="food.count>1">
								<img src="../../../assets/icons/重复@3x.png" />
							</div>
						</div>
						<!--备注栏-->
						<div class="tips" v-if="food.tip&food.type!=9" v-for="exp in food.memoLists">
							<div class="tip-title">
								<span>
									备注详情
								</span>
								<i class="icon iconfont icon-yqfxiajiantou" @click="exp.showIndex = !exp.showIndex,changeArrow($event.currentTarget)"></i>
							</div>
							<div class="tipBox">
								<div class="tip-inner" v-if="exp.showIndex">
									<ul>
										<li v-show="exp.addedDishes">小菜:{{exp.addedDishes}}</li>
										<li v-show="exp.sideDishes">配菜:{{exp.sideDishes}}</li>
										<li v-show="exp.dictSetNameList">备注:{{exp.dictSetNameList}}</li>
										<li v-show="exp.makeWay">做法:{{exp.makeWay}}</li>
										<li v-show="exp.specialReq">特殊备注:{{exp.specialReq}}</li>
									</ul>
								</div>
								<img :src="exp.headImg" v-if="exp.showIndex"/>
							</div>
						</div>
						<!--套餐的具体详情-->
						<div class="tips" v-if="food.type==9">
							<div class="tip-title">
								<span>
									套餐详情
								</span>
								<i class="icon iconfont icon-yqfxiajiantou" @click="food.showTips = !food.showTips,changeArrow($event.currentTarget)"></i>
							</div>
							<div class="tipBox">
								<div class="tip-inner" v-if="food.showTips">
									<ul>
										<li>热菜</li>
										<li>凉菜</li>
										<li>饮料</li>
										<li>主食</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
	<!--必选商品-->
			<!--<div class="necessary">
				<p>
					<span>必选商品</span>
					<span>共<i>{{this.$store.state.customerNum}}</i>份</span>
				</p>
				<p>
					<span>
						<i>餐具费</i>
						<i>(每人1份)</i>
					</span>
					<span>￥{{this.$store.state.mustPerMoney}}/份</span>
					<span>
						x {{this.$store.state.customerNum}}
					</span>
				</p>-->
				<!--<p>
					<span>
						<i>调料费</i>
						<i>(每人1份)</i>
					</span>
					<span>￥{{this.$store.state.mustPerMoney}}/份</span>
					<span>
						x {{this.$store.state.customNum}}
					</span>
				</p>-->
			<!--</div>-->
		</div>
	<!--成为会员弹框-->
		<div class="toBeMember" v-show="showMemberBox">
			<div class="toBeMember-1">
				<router-link to="/order/register">
					<p>
						<span>成为会员</span>
						<img src="../../../assets/icons/Group 3@3x.png"/>
					</p>
					<p>
						<span>立即注册会员,享受会员价</span>
					</p>
				</router-link>
			</div>
			<div class="toBeMember-2">
				<p>会员价：￥{{totalMemberPrice}}</p>
			</div>
			<div class="close" @click="showMemberBox=false">
				<img src="../../../assets/icons/会员弹框-取消@3x.png"/>
			</div>
		</div>
<!--顶部-->
		<div class="footer">
			<p>
				<span v-if="this.$store.state.phoneNumber==null">原价:￥{{totalPrice}}</span>
				<span v-else class="ifMember">会员价:￥{{totalMemberPrice}}</span>
			</p>
			<router-link to="/order/buy/finished" @click.native="submitOrder">
				<p class="order">确认下单</p>
			</router-link>
		</div>
		<alert :showMsg="showMsg" v-if="this.$store.state.showAlert"></alert>
		<!--加菜时候的加载蒙版-->
		<div class="adding" v-show="this.$store.state.addingIndex">
			<img class="Rotation img" src="../../../../static/imgs/1.png" width="50px" height="50px"/>
		</div>
	</div>
</template>
<script>
import {mergeDishes,reloadShopCart} from '../../../js/merge.js'
import {getCurrentTime} from '../../../js/getCurrentTime.js'
import Vue from 'vue'
	export default{
		data(){
			return{
				iFlag:false,
				food:{},
				//用来存储已经选中的菜品
				foods:[],
				//餐具商品的数量
				must:{count:0},
				inputValue:'',
				personNum:0,
				information:{name:'确认订单',ifShowReload:true,ifShowMenu:true},
				custom:0,
				isTips:false,
				showMemberBox:true,
				showMsg:'已经有人下单了'
			}
		}
		,
		methods:{
			//改变菜品备注栏的箭头
			changeArrow(target){
				if(target.className == "icon iconfont icon-yqfxiajiantou"){
					target.className = "icon iconfont icon-yqfshangjiantou"
				}
				else if(target.className == "icon iconfont icon-yqfshangjiantou"){
					target.className = "icon iconfont icon-yqfxiajiantou"
				}
			},
			//刷新购物车
			reload(){
				//loading蒙版出现
				this.$store.state.addingIndex = true
				//引入刷新购物车的外部js函数
				var tempVue = Vue
				reloadShopCart(this,tempVue)
			},
			//提交购物车
			submitOrder(){
				//总价置0
				this.$store.state.totalPrice = 0
				//总数量置0
				this.$store.state.allCount = 0
				//确认下单请求
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/submitOrderCartItem",
				JSON.stringify({"param":{
										"merchantId":this.$store.state.merchantId,
										"tableId":this.$store.state.tableId,
										"tableName":this.$store.state.tableName,
										"userId":this.$store.state.nickName,
										"userName":this.$store.state.nickName,
										"userHeadUrl":this.$store.state.headImgUrl,
										"nickName":this.$store.state.nickName},
										"channel":1
										})
				,{emulateJSON:true })
				.then(function(res){
					console.log("确认订单")
					console.log(res)
					//显示催菜
					this.$store.state.showCallDishes = true
					//显示买单
					this.$store.state.showPayBill = true
					//下单时间
					this.$store.state.orderTime = getCurrentTime(res.body.data.data.createTime)
					//总菜品list
					this.$store.state.submitFoodsList = res.body.data.data.orderItemList
					//菜品总价
					this.$store.state.totalPrice = Number(res.body.data.data.orderTotalAmount/100).toFixed(2)
					//需要支付的价格
					this.$store.state.needPay = this.$store.state.totalPrice
					//会员价
					this.$store.state.memberPrice = Number(res.body.data.data.orderMemberAmount/100).toFixed(2)
					//orderId获取
					this.$store.state.orderId = res.body.data.data.id
					//orderNo
					this.$store.state.orderCode =  res.body.data.data.orderCode
					//必选项
					this.$store.state.mustRequires = res.body.data.data.requires
					//将人数置为0
					this.$store.state.customerNum = 0
					for(let i=0;i<this.$store.state.mustRequires.length;i++){
						this.$store.state.customerNum = Number(this.$store.state.customerNum)
						this.$store.state.customerNum += Number(this.$store.state.mustRequires[i].count)
					}
					//总的口味/做法/特殊备注/及显示与否
					this.$store.state.allOrderAsk.flavorName = res.body.data.data.dictSetNameList
					this.$store.state.allOrderAsk.specialReq = res.body.data.data.memo
					if(typeof(this.$store.state.allOrderAsk.flavorName)!='undefined'&this.$store.state.allOrderAsk.flavorName.length>0){
						this.$store.state.allOrderAsk.showIndex = true
					}
					if(typeof(this.$store.state.allOrderAsk.specialReq)!='undefined'&this.$store.state.allOrderAsk.specialReq.length>0){
						this.$store.state.allOrderAsk.showIndex = true
					}
					//给每个菜品添加一个Memo的属性，用来展示
					for(var i=0;i<this.$store.state.submitFoodsList.length;i++){
						if(this.$store.state.submitFoodsList[i].status==3){
							this.$store.state.process = '等待商家确认'
						}
						//添加一些控制备注详情显示的属性
						Vue.set(this.$store.state.submitFoodsList[i], 'showTip' , false)
						//如果为套餐,需要添加type=9的属性
						if(this.$store.state.submitFoodsList[i].categoryName == '套餐'){
							Vue.set(this.$store.state.submitFoodsList[i], 'type' , 9)
						}
						//菜品总数量计算
						this.$store.state.allCount += this.$store.state.submitFoodsList[i].dishesCount
						//菜品价格和会员价拿到/100
						this.$store.state.submitFoodsList[i].dishesPrice = (this.$store.state.submitFoodsList[i].dishesPrice/100).toFixed(2)
						this.$store.state.submitFoodsList[i].memberPrice = (this.$store.state.submitFoodsList[i].memberPrice/100).toFixed(2)
						//小菜名字解析合并
						var addedDishesName = ''
						if(this.$store.state.submitFoodsList[i].addedDishList){
							for(var j=0;j<this.$store.state.submitFoodsList[i].addedDishList.length;j++){
								addedDishesName += this.$store.state.submitFoodsList[i].addedDishList[j].addedDishName+'+'+Number(this.$store.state.submitFoodsList[i].addedDishList[j].price/100).toFixed(2)+'元,'
							}
						}
						addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
						//合并信息为memoLists对象
						this.$store.state.submitFoodsList[i].memoLists = 
							[{
							headImg:this.$store.state.submitFoodsList[i].userHeadUrl,
							nickName:this.$store.state.submitFoodsList[i].userName,
							//小菜
							addedDishes:addedDishesName,
							//备注
							dictSetNameList:this.$store.state.submitFoodsList[i].dictSetNameList,
							//做法
							makeWay:this.$store.state.submitFoodsList[i].cuisineNameList,
							//特殊备注
							specialReq:this.$store.state.submitFoodsList[i].memo
							}]
					}
					//判断备注是否需要显示
					for(var i=0;i<this.$store.state.submitFoodsList.length;i++){
						for(var j=0;j<this.$store.state.submitFoodsList[i].memoLists.length;j++){
							if(this.$store.state.submitFoodsList[i].memoLists[j].addedDishes||this.$store.state.submitFoodsList[i].memoLists[j].dictSetNameList||this.$store.state.submitFoodsList[i].memoLists[j].makeWay||this.$store.state.submitFoodsList[i].memoLists[j].specialReq){
								this.$store.state.submitFoodsList[i].tip = true
							}
							else{
								this.$store.state.submitFoodsList[i].tip = false
							}
						}
					}
					//计算按菜品种类分菜品list
					var tempList = []
					for(var i=0;i<this.$store.state.kinds.length;i++){
						tempList.push([])
					}
					for(var i=0;i<this.$store.state.submitFoodsList.length;i++){
						for(var j=0;j<this.$store.state.kinds.length;j++){
							if(this.$store.state.submitFoodsList[i].categoryId==this.$store.state.kinds[j].id){
								tempList[j].push(this.$store.state.submitFoodsList[i])
							}
						}
					}
					this.$store.state.submitListCates = tempList
					//计算菜品的菜种类名
					var cateName = []
					for(var i=0;i<tempList.length;i++){
						if(tempList[i].length>0){
							cateName.push(tempList[i][0].categoryName)
						}
						else{
							cateName.push('')
						}
					}
					this.$store.state.cateName = cateName
					//计算每种菜品的数量
					var tempCates = []
					var tempCategory = []
					for(var i=0;i<this.$store.state.kinds.length;i++){
						tempCates.push(0)
					}
					for(var i=0;i<this.$store.state.submitFoodsList.length;i++){
						for(var j=0;j<this.$store.state.kinds.length;j++){
							if(this.$store.state.submitFoodsList[i].categoryId==this.$store.state.kinds[j].id){
								tempCates[j]+=this.$store.state.submitFoodsList[i].dishesCount
							}
						}
					}
					this.$store.state.submitListCount = tempCates
				})
			}
		}
		,
		created(){
			//进入的时候先刷新一次购物车
			this.reload()
			//判断是否为会员
			if(this.$store.state.phoneNumber!=null){
				this.showMemberBox = false
			}
			this.must.count = this.$store.state.customerNum
			
			
			//获取必选商品
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantObligatoryContentByMerchantId",
				JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,},"channel":1})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(
				function(res){
					console.log(res)
				})
		}
		,
		computed:{
			//根据选定用餐人数来的总餐具数
			allNums(){
				return this.$store.state.customerNum
			}
			,
			//计算总价格
			totalPrice() {
				let total = 0
				this.$store.state.selectFoods.forEach((food) => {
					total += Number(food.price*food.count+food.addedDishesMoney)
				})
				return total.toFixed(2)
			}
			,
			//计算会员价
			totalMemberPrice(){
				let total = 0
				this.$store.state.selectFoods.forEach((food) => {
					total += Number(food.memberPrice*food.count+food.addedDishesMoney)
				})
				return total.toFixed(2)
			}
			,
			//计算菜品总数
			totalCount(){
				let count = 0
				this.$store.state.selectFoods.forEach((food) => {
					count += food.count
				})
				return count
			}
			,
			//此种菜品的数量
			catesNums(){
				return this.$store.state.catesNums
			}
			,
			//菜种的名称
			beforeCateName(){
				//生成一个长度为种类长度的数组
				var tempCatesName = []
				for(var i=0;i<this.$store.state.catesList.length;i++){
					tempCatesName.push('')
				}
				//每个种类菜品的数量
				for(var j=0;j<this.$store.state.catesList.length;j++){
					if(this.$store.state.catesList[j].length>0){
						tempCatesName[j] = this.$store.state.catesList[j][0].categoryName
					}
				}
				return tempCatesName
			}
		}
		,
		watch:{
			must(){
				this.$store.state.personNum = this.must.count
			}
		}
	}
</script>
<style lang="scss">
	.affirm{
		position:fixed;
		top:0;
		left:0;
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		background:white;
		z-index:2000;
		.wrapper{
			flex:1;
			overflow: scroll;
			/*苹果滚动*/
			-webkit-overflow-scrolling : touch;
		}
		.navs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 0.6rem;
			background: #fff;
			p:nth-child(1) {
				width: 0.8rem;
				margin-left: 0.15rem;
				font-size: 0.16rem;
				color: #282828;
			}
			p:nth-child(2) {
				width: 1.4rem;
				margin-left: 0.25rem;
				text-align: center;
				font-size: 0.20rem;
				color: #282828;
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
							margin-right: 0.32rem;
						}
					}
				}
				span:nth-child(2) {
					img {
							width: 0.24rem;
							height: 0.22rem;
							margin-right: 0.05rem;
						}
				}
			}
		}
		.orderd{
			.goodsNum{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width:100%;
				height:0.3rem;
				background:#F0F0F0;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size: 0.15rem;
					color:#6A6A6A;
				}
				span:nth-child(2){
					font-size:0.15rem;
					margin-right:0.2rem;
					color:#6A6A6A;
					i{
						display:inline-block;
						width:0.16rem;
						text-align: center;
						font-style:normal;
					}
				}
			}
			.category{
				display:flex;
				justify-content: space-between;
				width:100%;
				height:0.3rem;
				line-height:0.3rem;
				background: #F0F0F0;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size:0.14rem;
					color: #6A6A6A;
				}
				span:nth-child(2){
					font-size:0.15rem;
					margin-right:0.2rem;
					color:#6A6A6A;
					i{
						display:inline-block;
						width:0.16rem;
						text-align: center;
						font-style:normal;
					}
				}
			}
			ul{
				width:100%;
				li{
					position:relative;
					/*无备注时*/
					.selectFood{
						position:relative;
						display: flex;
						width:100%;
						height:1rem;
						border-bottom: 1px solid #F0F0F0;
						.foodPic{
							margin-top:0.12rem;
							margin-left:0.1rem;
							img{
								width:0.65rem;
								height:0.65rem;
							}
						}
						.headers{
							display: flex;
							width:2.8rem;
							height:1rem;
							margin-top:0.12rem;
							margin-left:0.1rem;
							p:nth-child(1){
								display:flex;
								flex-direction: column;
								justify-content: space-between;
								width:1.1rem;
								height:0.65rem;
								font-size:0.18rem;
								color: #282828;
								span:nth-child(1){
									display: inline-block;
									width:100%;
									overflow: hidden;
									white-space:nowrap;
									text-overflow: ellipsis;
									font-size:0.16rem;
									color: #282828;
								}
								span:nth-child(2){
									font-size:0.16rem;
									color:#282828;
								}
								span:nth-child(3){
									
									color:#FF2C2C;
								}
							}
							/*头像*/
							/*1人*/
							p:nth-child(2){
								display: flex;
								justify-content: center;
								align-items: center;
								width:0.8rem;
								height: 0.65rem;
								span{
									display:flex;
									flex-direction: column;
									justify-content: space-around;
									align-items: center;
									width:0.8rem;
									height: 100%;
									img{
										width:0.4rem;
										height:0.4rem;
										border-radius: 100%;
									}
									i{
										display: inline-block;
										width:0.6rem;
										text-align: center;
										text-overflow: ellipsis;
										overflow: hidden;
										white-space: nowrap;
										font-style:normal;
									}
								}
							}
							/*2人*/
							p:nth-child(3){
								display: flex;
								justify-content: center;
								align-items: center;
								width:0.8rem;
								height: 100%;
								span{
									display:flex;
									flex-direction: column;
									justify-content: space-around;
									align-items: center;
									width:0.4rem;
									height: 100%;
									img{
										width:0.3rem;
										height:0.3rem;
										border-radius: 100%;
									}
								}
							}
							/*3人*/
							p:nth-child(4){
								display: flex;
								flex-wrap: wrap;
								width:0.6rem;
								height: 100%;
								margin-left:0.1rem;
								margin-right:0.1rem;
								span{
									display:flex;
									flex-direction: column;
									justify-content: space-around;
									align-items: center;
									width:0.28rem;
									img{
										width:0.2rem;
										height:0.2rem;
										border-radius: 100%;
									}
								}
							}
							/*4个人*/
							p:nth-child(5){
								display: flex;
								flex-wrap: wrap;
								width:0.6rem;
								height: 100%;
								margin-left:0.1rem;
								margin-right:0.1rem;
								span{
									display:flex;
									flex-direction: column;
									justify-content: space-around;
									align-items: center;
									width:0.28rem;
									img{
										width:0.2rem;
										height:0.2rem;
										border-radius: 100%;
									}
								}
							}
						}
						/*菜品数量加减*/
						.numControl{
							position:absolute;
							top:0.5rem;
							right:0%;
						}
						/*菜品重复*/
						.moreTimes{
							position:absolute;
							bottom:0%;
							right:0%;
							img{
								width:0.3rem;
								height:0.3rem;
							}
						}
						.headUrl{
							position:absolute;
							top:6%;
							right:30%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width:0.9rem;
							height:0.9rem;
						}
					}
					/*备注栏*/
					.tips{
						width:100%;
						background:#fff;
						border-bottom:1px solid #f9f9f9;
						.tip-title{
							display:flex;
							justify-content: space-between;
							align-items: center;
							width:100%;
							height:0.35rem;
							background:#fff;
							span{
								margin-left:0.15rem;
								font-size:0.13rem;
								color: #787878;
							}
							i{
								margin-right:0.15rem;
								color:#B5B5B5;
							}
						}
						.tipBox{
							position:relative;
							display: flex;
							justify-content: flex-end;
							width:100%;
							.tip-inner{
								width:75%;
								ul{
									li{
										display: flex;
										align-items: center;
										height:0.35rem;
										margin-top:0.03rem;
										font-size:0.13rem;
										color: #787878;
									}
								}
							}
							/*头像*/
							img{
								position:absolute;
								left:5%;
								top:60%;
								transform: translateY(-70%);
								width:0.3rem;
								height:0.3rem;
								border-radius:100%;
							}
						}
					}
				}
			}
		}
		/*必选商品*/
		.necessary{
			display: flex;
			flex-direction: column;
			width:100%;
			height:1.5rem;
			p:nth-child(1){
				display: flex;
				justify-content: space-between;
				align-items: center;
				width:100%;
				height:0.3rem;
				background:#F0F0F0;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size: 0.15rem;
					color:#6A6A6A;
				}
				span:nth-child(2){
					font-size:0.15rem;
					margin-right:0.2rem;
					color:#6A6A6A;
					i{
						display: inline-block;
						width:0.16rem;
						text-align: center;
						font-style:normal;
					}
				}
			}
			p:nth-child(2){
				display:flex;
				justify-content: space-between;
				align-items: center;
				height:0.6rem;
				border-bottom: 1px solid #eee;
				span:nth-child(1){
					display:flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:100%;
					margin-left:0.15rem;
					i:nth-child(1){
						font-style:normal;
						font-size:0.16rem;
					}
					i:nth-child(2){
						font-style:normal;
						font-size:0.12rem;
						color: #F5A623;
					}
				}
				span:nth-child(2){
					font-size:0.16rem;
					color: #FF2C2C;
				}
				span:nth-child(3){
					display: flex;
					justify-content: center;
					align-items: center;
					width:1rem;
					height:100%;
					margin-right:0.04rem;
					font-size:0.16rem;
					color: #5A5A5A
				}
			}
			p:nth-child(3){
				display:flex;
				justify-content: space-between;
				align-items: center;
				height:0.6rem;
				border-bottom: 1px solid #eee;
				span:nth-child(1){
					display:flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:100%;
					margin-left:0.15rem;
					i:nth-child(1){
						font-style:normal;
						font-size:0.16rem;
					}
					i:nth-child(2){
						font-style:normal;
						font-size:0.12rem;
						color: #F5A623;
					}
				}
				span:nth-child(2){
					font-size:0.16rem;
					color: #FF2C2C;
				}
				span:nth-child(3){
					display: flex;
					align-items: center;
					justify-content: center;
					width:1rem;
					height:100%;
					margin-right:0.04rem;
					font-size:0.16rem;
					color: #5A5A5A
				}
			}
		}
		/*会员弹框*/
		.toBeMember{
				position:absolute;
				bottom:0.6rem;
				left:0;
				display: flex;
				width:100%;
				height:0.6rem;
				background-image: url('../../../assets/icons/Rectangle.png');
				background-size: 100% 100%;
				.toBeMember-1{
					display: flex;
					flex-direction: column;
					width:50%;
					height:100%;
					p:nth-child(1){
						width:100%;
						height:50%;
						margin-left:0.15rem;
						line-height: 0.3rem;
						span{
							font-size:0.16rem;
							color:#282828;
						}
						img{
							width:0.3rem;
							height:0.16rem;
						}
					}
					p:nth-child(2){
						height:50%;
						margin-left:0.15rem;
						line-height:0.3rem;
						span{
							color: #A7A7A7;
						}
					}
				}
				.toBeMember-2{
					display:flex;
					justify-content: center;
					align-items:center;
					width:50%;
					height:100%;
					p{
						font-size:0.16rem;
						color: #FF0001;
					}
				}
				.close{
					position:absolute;
					top:-30%;
					right:2%;
					width:0.3rem;
					height:0.3rem;
					img{
						width:0.3rem;
						height:0.3rem;
					}
				}
			}
		/*底部*/
		.footer{
			position:relative;
			display: flex;
			align-items: center;
			width:100%;
			height:0.5rem;
			background: #FFFFFF;
			box-shadow: inset 0 1px 1px 0 rgba(220,220,220,0.50);
			p:nth-child(1){
				position:relative;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size: 0.18rem;
					color: #282828;
				}
				.ifMember{
					margin-left:0.15rem;
					font-size: 0.16rem !important;
					color:#FF2C2C !important;
				}
			}
			a{
				position:absolute;
				bottom:0;
				right:0;
				.order{
					width:0.9rem;
					height:0.5rem;
					font-size:0.16rem;
					color:#fff;
					text-align: center;
					line-height: 0.5rem;
					border-radius: 0;
					background: #31C4C4;
				}
			}
		}
		/*刷新或加菜*/
		.adding{
			position:fixed;
			left:0;
			top:0;
			display:flex;
			align-items: center;
			justify-content: center;
			width:100%;
			height:100%;
			background:black;
			opacity: 0.2;
			z-index:3000;
			@-webkit-keyframes rotation{
				from {-webkit-transform: rotate(0deg);}
				to {-webkit-transform: rotate(360deg);}
			}
			.Rotation{
				-webkit-transform: rotate(360deg);
				animation: rotation 1.5s linear infinite;
				/*-moz-animation: rotation 1.5s linear infinite;
				-webkit-animation: rotation 1.5s linear infinite;
				-o-animation: rotation 1.5s linear infinite;*/
				border-radius: 100%;
			}
		}
	}
</style>
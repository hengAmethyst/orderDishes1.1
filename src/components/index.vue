<template>
	<div class='index'>
			<!--welcome-->
			<div class='welcome' ref="div">
				<div class='welcome-1'>欢迎光临</span></div>
				<div class='restaurant'>{{this.$store.state.merchantName}}</div>
			</div>
			<!--头像-->
			<div class="headImg">
				<div class='touxiang'>
					<img :src="this.$store.state.headImgUrl"/>
					<span>{{this.$store.state.nickName}}</span>
				</div>
			</div>
			<!--按钮-->
			<div class='beforeOrder' v-show="orderTime0">
			<!--<div class='beforeOrder'>-->
				<router-link to='/order/customNum'>
					<el-button class='order' type='primary'>开启美食之旅</el-button>
				</router-link>
			</div>
			<div class='beforeOrder' v-show="orderTime1">
				<router-link to='/order/buy'>
					<el-button class='order' type='primary'>开启美食之旅</el-button>
				</router-link>
			</div>
			<div class='beforeOrder' v-show="orderTime2">
				<router-link to='/order/buy/finished'>
					<el-button class='order' type='primary'>开启美食之旅</el-button>
				</router-link>
			</div>
			<!--背景-->
			<div class="bg">
				
			</div>
			<!--会员按钮-->
			<div class="beforeRegister" v-if="this.$store.state.phoneNumber==null">
				<router-link to='/order/register'>
					<el-button class='register' type='primary'>成为会员</el-button>
				</router-link>
			</div>
			<!--version-->
			<div class="version">
				<p>晶彩自助点餐系统V1.1.1</p>
			</div>
			<alert :showMsg="showMsg" v-show="showAlert"></alert>
	</div>
</template>
<script>
import {mergeDishes} from '../js/merge.js'
import {splitMerchantInfo,splitUserInfo} from '../js/splitInfo.js'
import {getURLParam} from '../js/splitInfo.js'
import Vue from 'vue'
import ReconnectingWebSocket from '../../static/reconnectingWebSocket.js'
import cookie from '../js/cookie.js'
	export default{
		data(){
			return{
				//扫码跳转方式
				orderTime0:false,
				orderTime1:false,
				orderTime2:false,
				// 菜品种类
				kind:[],
				showMsg:'由于当前桌台已被占用 ，您点的菜将不会被保存',
				showAlert:false
			}
		}
		,
		created(){
				var localUrl = window.location.href
				//判断是否为调试模式
				if(localUrl.indexOf('localhost') < 0 & localUrl.indexOf('192.168') < 0){
					//没有openId，即刚进入或者从本地拿到资源
					if(localUrl.indexOf('openId') < 0){
						//调用splitMerchantInfo函数分解url里面的ID值
						let saveMerchantInfo = splitMerchantInfo(localUrl)
						this.$store.state.tableId = saveMerchantInfo.tableId
						this.$store.state.merchantId = saveMerchantInfo.merchantId
						//获取商铺Name和桌台Name
						this.$http.post(this.$store.state.merchantHttp+"/merchant/merchantTable/api/pc/getMerchantTableById",
							JSON.stringify({"param":{"id":this.$store.state.tableId},"channel":1})
						,{
							emulateJSON:true  //必须设置这个头文件
						}).then(function(res){
							this.$store.state.merchantPicUrl = res.body.data.merchantPicUrl
							this.$store.state.merchantName = res.body.data.merchantName
							this.$store.state.tableName = res.body.data.tableName
						})
							var merchantInfo = {
												tableId:this.$store.state.tableId,
												merchantId:this.$store.state.merchantId,
												merchantPicUrl:this.$store.state.merchantPicUrl
												}
							merchantInfo = JSON.stringify(merchantInfo)
							//保存到本地localStorage
							sessionStorage.setItem('merchantInfo',merchantInfo)
						//取本地openId
						var tempInfo = JSON.parse($.fn.cookie('openId'))
						if(!tempInfo){
							window.location.href="https://pay.jinghanit.com/jinghan-payment/api/h5/index?merchantId="+this.$store.state.merchantId
//							window.location.href="https://pay.jinghanit.com/jinghan-payment/api/h5/index?returnUrl=http://h5test.jinghanit.com:50088&merchantId="+this.$store.state.merchantId
//							window.location.href="https://pay.jinghanit.com/jinghan-payment/api/h5/index?returnUrl=http://h5test.jinghanit.com:8088&merchantId="+this.$store.state.merchantId
						}
						else{
							this.$store.state.openId = tempInfo.openId
							this.$store.state.nickName = tempInfo.nickName
							this.$store.state.userId = tempInfo.nickName
							this.$store.state.headImgUrl = tempInfo.headImgUrl
						}
					}
					//有openId，从后台跳转过来
					else {
						//到本地取商铺信息
						var tempMerchant = JSON.parse(sessionStorage.getItem('merchantInfo'))
							this.$store.state.tableId = tempMerchant.tableId
							this.$store.state.merchantId = tempMerchant.merchantId
							this.$store.state.merchantPicUrl = tempMerchant.merchantPicUrl
						//分解用户信息
						//调用splitUserInfo函数分解userInfo
						var tempUserInfo = splitUserInfo(localUrl)
							this.$store.state.openId = tempUserInfo.openId
							this.$store.state.nickName = tempUserInfo.nickName
							this.$store.state.userId = tempUserInfo.nickName
							this.$store.state.headImgUrl = tempUserInfo.headImgUrl
						//保存用户信息到本地local
						tempUserInfo = JSON.stringify(tempUserInfo)
						$.fn.cookie('openId', tempUserInfo , { expires: 1 });
						//获取商铺Name和桌台Name
						this.$http.post(this.$store.state.merchantHttp+"/merchant/merchantTable/api/pc/getMerchantTableById",
							JSON.stringify({"param":{"id":this.$store.state.tableId},"channel":1})
						,{emulateJSON:true})
						.then(function(res){
							this.$store.state.merchantPicUrl = res.body.data.merchantPicUrl
							this.$store.state.merchantName = res.body.data.merchantName
							this.$store.state.tableName = res.body.data.tableName
						})
					}
				}
				//调试模式
				else{
					this.$store.state.merchantName = '晶汉'
					this.$store.state.tableName = '123456789'
					//处理url
					var tempStr = "http://192.168.2.120:8080/?openId=xxxq000011oHixf1I3YSbysaNdeKPRNae60D90&nickName=Amethyst14&headimgurl=http://wx.qlogo.cn/mmopen/w74oVdmaFCpqjG86vAaGlal3z4mYDfo1wV2vsEV8HnO9cXwPjMZKfjWpXfYIcJBPEibFneaibsyp1WQic0raZr3CRQXycGKg5/0&sex=1"
					this.$store.state.openId = getURLParam('openId',tempStr)
					this.$store.state.nickName = getURLParam('nickName',tempStr)
					this.$store.state.headImgUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496731612415&di=2642c6b42fcb1c394e2384c3e25a9d25&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201604%2F07%2F20160407173608_fmN2B.thumb.700_0.jpeg"
					this.$store.state.userId = getURLParam('nickName',tempStr)
//					this.$store.state.openId="jiangheng"
//					this.$store.state.nickName = 'jiangheng'
//					this.$store.state.headImgUrl = '123'
//					this.$store.state.userId = 'jiangheng'
				}
			//根据openId获取手机号，判断是否为会员
			this.$http.post(this.$store.state.accountHttp+'/jinghan-account/api/user/queryByOpenId',
				JSON.stringify({"param":{"openId":this.$store.state.openId,
										"merchantId":this.$store.state.merchantId},
										"channel":1})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(
				function(res){
					console.log(res)
					if(res.body.data.phone == 0){
						this.$store.state.phoneNumber = null
					}
					else{
						this.$store.state.phoneNumber = res.body.data.phone
					}
				})
			//扫码开台
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/tableStatus/scanOrOpenTable",
				JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,
										"openId":this.$store.state.openId,
										"tableId":this.$store.state.tableId,
										"nickName":this.$store.state.nickName,
										"headImgUrl":this.$store.state.headImgUrl
										},
										"channel":1})
			,{emulateJSON:true})
			.then(
				function(res){
					console.log('扫码开台')
					console.log(res)
					if(typeof(res.body.data.data.orderCartResponse)!='undefined'){
						if(res.body.data.data.orderCartResponse.hasH5PreOrder==0){
							if(this.$store.state.openId != res.body.data.data.orderCartResponse.openId){
								this.showAlert = true
								var that = this
								setTimeout(function(){
									that.showAlert = false
								},2000)
							}
						}
					}
					//存储code的值
					this.$store.state.commandCode = res.body.data.commandCode
					//code=2000，首次开台
					if(res.body.data.commandCode==2000){
						this.orderTime0 = true
						this.orderTime1 = false
						this.orderTime2 = false
					}
					//code=2002，已下单后扫码进入
					if(res.body.data.commandCode==2002){
						this.orderTime0 = false
						this.orderTime1 = false
						this.orderTime2 = true
						this.$store.state.doneList = res.body.data.data.orderResponse.orderItemList
						this.$store.state.orderId = res.body.data.data.orderResponse.id
						//保存现在的订单号
						this.$store.state.orderCode = res.body.data.data.orderCode
						this.$store.state.showCallDishes = true
						this.$store.state.showPayBill = true
					}
					//code=2001，未下单之前进入
					if(res.body.data.commandCode==2001){
						this.orderTime0 = false
						this.orderTime1 = true
						this.orderTime2 = false
						this.$store.state.cartList = res.body.data.data.orderCartResponse.cartItemList
						this.$store.state.showCallDishes = true
						this.$store.state.showPayBill = true
					}
					//获取菜品的种类信息
					this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantDishesCategoryList",
						JSON.stringify({"param":{"merchantId":this.$store.state.merchantId},"channel":1})
					,{
						emulateJSON:true  //必须设置这个头文件
					}).then(function(res){
						console.log(res)
						this.kind = res.body.data
						this.$store.state.kinds = res.body.data
						//获取小菜的list
						this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantAddedDishesList",
							JSON.stringify({"param":{"merchantId":this.$store.state.merchantId},"channel":1})
						,{
							emulateJSON:true  //必须设置这个头文件
						}).then(function(res){
							console.log('小菜list')
							console.log(res)
							this.$store.state.addedDishesList = res.body.data
							for(let i=0;i<this.$store.state.addedDishesList.length;i++){
								this.$store.state.addedDishesList[i].price = Number(this.$store.state.addedDishesList[i].price/100).toFixed(2)
							}
						})
						//获取菜品list信息
						this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantDishesList",
							JSON.stringify({"param":{"merchantId":this.$store.state.merchantId},"channel":1})
						,{
							emulateJSON:true  //必须设置这个头文件
						}).then(function(res){
								console.log(res)
								//初始菜品list
								this.$store.state.originList = res.body.data.dishesInfoList
								//给菜品添加默认属性
								for(var i=0;i<this.$store.state.originList.length;i++){
									this.$store.state.originList[i].price = (this.$store.state.originList[i].price/100).toFixed(2)
									this.$store.state.originList[i].memberPrice = (this.$store.state.originList[i].memberPrice/100).toFixed(2)
									if(this.$store.state.originList[i].shortcutCode){
										this.$store.state.originList[i].shortcutCode = this.$store.state.originList[i].shortcutCode.toLowerCase()
									}
									if(this.$store.state.originList[i].minSaleNum==0){
										this.$store.state.originList[i].minSaleNum = 1
									}
									Vue.set(this.$store.state.originList[i],'count', 0)
									Vue.set(this.$store.state.originList[i], 'showIndex' , false)
									Vue.set(this.$store.state.originList[i], 'showTips' , false)
									Vue.set(this.$store.state.originList[i], 'addedDishesMoney' , 0)
									Vue.set(this.$store.state.originList[i], 'sideDishesMoney' , 0)
									Vue.set(this.$store.state.originList[i], 'memoLists',[])
								}
								//给菜品添加新的数组属性用于处理备注信息
								for(var i=0;i<this.$store.state.originList.length;i++){
									Vue.set(this.$store.state.originList[i], 'memoLists',[])
								}
								//生成一个用来按菜品种类保存的空数组
								for(var i=0;i<this.kind.length;i++){
									this.$store.state.foodsList.push([])
								}
								//菜品按种类list
								for(var i=0;i<this.$store.state.originList.length;i++){
									for(var j=0;j<this.$store.state.kinds.length;j++){
										if(this.$store.state.originList[i].categoryId==this.$store.state.kinds[j].id){
											this.$store.state.foodsList[j].push(this.$store.state.originList[i])
										}
									}
								}
								//计算菜品的菜种类名
								var cateName = []
								for(var i=0;i<this.$store.state.foodsList.length;i++){
									if(this.$store.state.foodsList[i].length>0){
										cateName.push(this.$store.state.foodsList[i][0].categoryName)
									}
									else{
										cateName.push('')
									}
								}
								this.$store.state.beforeCateName = cateName
								//code=2001的时候,初始化未下单的情况
								if(this.$store.state.commandCode==2001){
									for(var i=0;i<this.$store.state.cartList.length;i++){
										var sideDishesName = ''
										var sideDishesMoney = 0
										//配菜
										if(this.$store.state.cartList[i].addedOnSideList){
											for(let k=0;k<this.$store.state.cartList[i].addedOnSideList.length;k++){
												sideDishesName += this.$store.state.cartList[i].addedOnSideList[k].dishesName + '+' + Number(this.$store.state.cartList[i].addedOnSideList[k].dishesPrice/100).toFixed(2)+'元,'
												sideDishesMoney += this.$store.state.cartList[i].addedOnSideList[k].dishesPrice/100
											}
											sideDishesName = sideDishesName.substr(0,sideDishesName.length-1)
										}
										//小菜
										var addedDishesName = ''
										var addedDishesMoney = 0
										if(this.$store.state.cartList[i].addedDishList){
											for(var k=0;k<this.$store.state.cartList[i].addedDishList.length;k++){
												addedDishesName += this.$store.state.cartList[i].addedDishList[k].addedDishName + '+' + Number(this.$store.state.cartList[i].addedDishList[k].price/100).toFixed(2)+'元,'
												addedDishesMoney += this.$store.state.cartList[i].addedDishList[k].price/100
											}
											addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
										}
										var 	tempCartTips = [{
														headImg:this.$store.state.headImgUrl,
														nickName:this.$store.state.nickName,
														//配菜
														sideDishes:sideDishesName,
														//小菜
														addedDishes:addedDishesName,
														showIndex:false,
														//备注
														dictSetName:this.$store.state.cartList[i].dictSetNameList,
														//做法
														makeWay:this.$store.state.cartList[i].cuisineNameList,
														//特殊要求
														specialReq:this.$store.state.cartList[i].memo
														}]
										//给菜品添加一个备注属性
										Vue.set(this.$store.state.cartList[i], 'memoLists',tempCartTips)
										Vue.set(this.$store.state.cartList[i], 'sideDishesMoney',sideDishesMoney)
										Vue.set(this.$store.state.cartList[i], 'addedDishesMoney',addedDishesMoney)
										Vue.set(this.$store.state.cartList[i], 'userHeadUrls' , [this.$store.state.cartList[i].userHeadUrl])
										Vue.set(this.$store.state.cartList[i], 'userNames' , [this.$store.state.cartList[i].userName])
										Vue.set(this.$store.state.cartList[i], 'cartItemIds' , [])
										for(var j=0;j<this.$store.state.cartList[i].dishesCount;j++){
											this.$store.state.cartList[i].cartItemIds.push(this.$store.state.cartList[i].cartItemId)
										}
									}
									//购物车中已选中菜品合并,调用mergeDishes函数
									this.$store.state.cartList = mergeDishes(this.$store.state.cartList)
									//初始化菜品的数据
									for(var i=0;i<this.$store.state.cartList.length;i++){
										for(var j=0;j<this.$store.state.originList.length;j++){
											if(this.$store.state.originList[j].id == this.$store.state.cartList[i].dishesId){
												Vue.set(this.$store.state.originList[j], 'count' , this.$store.state.cartList[i].dishesCount)
												Vue.set(this.$store.state.originList[j], 'sideDishesMoney' , this.$store.state.cartList[i].sideDishesMoney)
												Vue.set(this.$store.state.originList[j], 'userHeadUrls' , this.$store.state.cartList[i].userHeadUrls)
												Vue.set(this.$store.state.originList[j], 'userNames' , this.$store.state.cartList[i].userNames)
												Vue.set(this.$store.state.originList[j], 'cartItemIds' , this.$store.state.cartList[i].cartItemIds)
												Vue.set(this.$store.state.originList[j], 'memoLists', this.$store.state.cartList[i].memoLists)
												if(this.$store.state.originList[j].memoLists[0].sideDishes!=''|this.$store.state.originList[j].memoLists[0].dictSetName!=''|this.$store.state.originList[j].memoLists[0].makeWay!=''){
													Vue.set(this.$store.state.originList[j], 'tip', true)
												}
											}
										}
									}
								}
								
								//websocket连接
								var ws = new ReconnectingWebSocket("ws://"+this.$store.state.ws+"jinghan-order/orderWebSocket", null, {debug: true, reconnectInterval: 3000})
								ws.onerror = function(event){  
						    		}
								ws.onopen = function(event){ 
									ws.send(JSON.stringify({"merchantId":that.$store.state.merchantId,"tableId":that.$store.state.tableId,"userId":that.$store.state.nickName,"userType":5,"msgType":100}))
						   		}  
						   		var that = this
						   		ws.onmessage = function(evt){
						   			var data = JSON.parse(evt.data)
									console.log(data)
									//支付后的消息
									if(data.msgType == 14){
										that.$store.state.ifShowWillPay = false
									}
									//常规下单消息
									if(data.msgType == 16){
										if(data.token!=that.$store.state.nickName){
											that.$store.state.hasAffirmed = true
											that.$store.state.hasAffirmed = true
											//清空原始点菜数据
											that.$store.commit('change')
											that.$store.state.orderId = data.data.orderId
											//弹出弹框提示
											that.$store.state.showAlert = true
											//跳转到订单完成页面
											that.$router.push({path:"/order/buy/finished"})
											//判断要跳转到finished页面
											that.$store.state.goFinishFromMsg = true
											var thus = that
											setTimeout(function(){
												thus.$store.state.showAlert = false
											},2000)
										}
									}
									//加菜下单
									if(data.msgType == 17){
										that.$store.commit('change')
									}
									//划菜
									if(data.msgType == 20){
										for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
											for(var j=0;j<data.data.orderItemList.length;j++){
												//改变每个菜品的状态
												if(that.$store.state.submitFoodsList[i].dishesId == data.data.orderItemList[j].dishesId){
													that.$store.state.submitFoodsList[i].status = data.data.orderItemList[j].status
												}
											}
										}
									}
									//删除菜品
									if(data.msgType == 8){
										var tempProcess0 = true
										for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
											for(var j=0;j<data.data.orderItemList.length;j++){
												//改变每个菜品的状态
												if(that.$store.state.submitFoodsList[i].id == data.data.orderItemList[j].id){
													that.$store.state.submitFoodsList[i].status = data.data.orderItemList[j].status
													that.$store.state.submitFoodsList[i].dishesCount = data.data.orderItemList[j].dishesCount
												}
												if(data.data.orderItemList[j].status!=6&data.data.orderItemList[j].status!=5){
													tempProcess0 = false
												}
											}
										}
										if(tempProcess0){
											that.$store.state.process = '菜品已售罄'
											that.$store.state.ifShowAddingBtn = true
										}
									}
									//菜品审核后消息
									if(data.msgType == 9||data.msgType == 22){
										//刷新的时候让订单看见的菜品为全部
										that.$store.state.finishedStatus = 0
										that.$store.state.checkComing = !that.$store.state.checkComing
										//总价更新
										that.$store.state.totalPrice = Number(data.data.orderPayAmount/100).toFixed(2)
										that.$store.state.memberPrice = Number(data.data.orderMemberAmount/100).toFixed(2)
										//暂时存放菜品审核的结果
										var tempMsgMark = true
										var tempProcess = true
										var tempMark1 = false
										var tempMark2 = false
										//部分售罄
										var tempMixStatus = true
										for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
											for(var j=0;j<data.data.orderItemList.length;j++){
												//改变每个菜品的状态
												if(that.$store.state.submitFoodsList[i].id == data.data.orderItemList[j].id){
													that.$store.state.submitFoodsList[i].status = data.data.orderItemList[j].status
												}
												if(data.data.orderItemList[j].status==4){
													tempMsgMark = false
												}
												if(data.data.orderItemList[j].status!=6&data.data.orderItemList[j].status!=5){
													tempProcess = false
												}
												if(data.data.orderItemList[j].status!=4){
													if(data.data.orderItemList[j].status!=5&data.data.orderItemList[j].status!=6){
														tempMark1 = true
													}
													if(data.data.orderItemList[j].status==5|data.data.orderItemList[j].status==6){
														tempMark2 = true
													}
													//混合模式成立
													if(tempMark1&tempMark2){
														tempMixStatus = false
													}
												}
											}
										}
										that.$store.state.orderStatus = tempMsgMark
										if(tempProcess){
											that.$store.state.process = '菜品已售罄'
											that.$store.state.ifShowAddingBtn = true
										}
										else{
											that.$store.state.process = '商家正在制作菜品'
											that.$store.state.ifShowAddingBtn = false
										}
										if(!tempMixStatus){
											that.$store.state.process = '商家正在制作菜品(部分菜品已售罄)'
										}
									}
									if(data.msgType == 12){
										that.$store.state.pcAddDish = true
									}
									//加减菜的消息
									that.data = data.data
									//为了消除最开始的连接消息，所以要添加data.msgType的判断
									if(data.msgType != 100){
										for(let i=0;i<that.$store.state.originList.length;i++){
											//加菜信息
											if(that.data.dishesId==that.$store.state.originList[i].id){
												//加菜
												if(data.msgType==2|data.msgType==7){
													if(data.msgType==7){
														//有此消息表面已经有人下单了
														that.$store.state.addFoodsMark = true
													}
													//以前此种菜的数量为零
													if(!that.$store.state.originList[i].showIndex&&!that.$store.state.originList[i].count&&!that.$store.state.originList[i].addIndex){
														Vue.set(that.$store.state.originList[i], 'showIndex' , true)
														Vue.set(that.$store.state.originList[i], 'sideDishesMoney' ,0)
														Vue.set(that.$store.state.originList[i], 'count', 1)
														Vue.set(that.$store.state.originList[i], 'addIndex' , '+1')
														Vue.set(that.$store.state.originList[i], 'userHeadUrls' , [that.data.userHeadUrl])
														Vue.set(that.$store.state.originList[i], 'userNames' , [that.data.userName])
														Vue.set(that.$store.state.originList[i], 'cartItemIds' , [that.data.cartItemId])
														//当前用户头像和名字
														that.$store.state.nowImgUrl = that.data.userHeadUrl
														that.$store.state.nowUserName = that.data.userName
													}
													//以前此种菜的数量不为零
													else{
														that.$store.state.originList[i].count++
														that.$store.state.originList[i].addIndex = "+1"
														that.$store.state.originList[i].showIndex = true
														//加入用户信息
														that.$store.state.originList[i].userHeadUrls.push(that.data.userHeadUrl)
														that.$store.state.originList[i].userNames.push(that.data.userName)
														that.$store.state.originList[i].cartItemIds.push(that.data.cartItemId)
														//当前用户头像
														that.$store.state.nowImgUrl = that.data.userHeadUrl
														that.$store.state.nowUserName = that.data.userName
														//用户头像去重
														var newArr = []
													    for(var j=0;j<that.$store.state.originList[i].userHeadUrls.length;j++){
													        if(newArr.indexOf(that.$store.state.originList[i].userHeadUrls[j]) == -1){
													          newArr.push(that.$store.state.originList[i].userHeadUrls[j]);
													      	}
													    }
														that.$store.state.originList[i].userHeadUrls = newArr
														//用户名字去重
														var newArr1 = []
													    for(var j=0;j<that.$store.state.originList[i].userNames.length;j++){
													        if(newArr1.indexOf(that.$store.state.originList[i].userNames[j]) == -1){
													          newArr1.push(that.$store.state.originList[i].userNames[j]);
													      	}
													    }
														that.$store.state.originList[i].userNames = newArr1
													}
													that.$store.state.nowFood = that.$store.state.originList[i]
													//如果有小菜、备注、做法、特殊要求
													if(that.data.dictSetNameList|that.data.cuisineNameList|that.data.addedDishList.length>0){
														//配菜
														var sideDishesName = ''
														for(var k=0;k<that.data.addedOnSideList.length;k++){
															sideDishesName += that.data.addedOnSideList[k].dishesName + Number(that.data.addedOnSideList[k].dishesPrice/100).toFixed(2)+'元,'
															that.$store.state.originList[i].sideDishesMoney += Number(that.data.addedOnSideList[k].dishesPrice/100)
														}
														sideDishesName = sideDishesName.substr(0,sideDishesName.length-1)
														//小菜
														var addedDishesName = ''
														for(var k=0;k<that.data.addedDishList.length;k++){
															addedDishesName += that.data.addedDishList[k].addedDishName + '+' + Number(that.data.addedDishList[k].price/100).toFixed(2)+'元,'
															that.$store.state.originList[i].addedDishesMoney += Number(that.data.addedDishList[k].price/100)
														}
														addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
														//暂时存储当前消息的备注信息
														var tempTips = {
																		headImg:that.data.userHeadUrl,
																		nickName:that.data.userName,
																		showIndex:false,
																		//配菜
																		sideDishes:sideDishesName,
																		//小菜
																		addedDishes:addedDishesName,
																		//备注
																		dictSetName:that.data.dictSetNameList,
																		//做法
																		makeWay:that.data.cuisineNameList,
																		//特殊要求
																		specialReq:that.data.memo
																		}
														//将备注信息加入到备注list中
														that.$store.state.originList[i].memoLists.push(tempTips)
														//显示tip
														Vue.set(that.$store.state.originList[i], 'tip', true)
													}
													var self = that
													setTimeout(function(){
														self.$store.state.originList[i].showIndex = false
													},2500)
												}
												//减菜信息
												if(data.msgType==3||data.msgType==8){
													Vue.set(that.$store.state.originList[i], 'showIndex' , true)
													Vue.set(that.$store.state.originList[i], 'addIndex' , '-1')
											    		that.$store.state.originList[i].count--
											    		that.$store.state.originList[i].memoLists.pop()
											    		if(that.$store.state.originList[i].userHeadUrls.length>1){
														that.$store.state.originList[i].userHeadUrls.splice(0,1)
														that.$store.state.originList[i].userNames.splice(0,1)
											    		}
											    		if(that.$store.state.originList[i].dishesCount==0){
											    			that.$store.state.originList[i].userHeadUrls.splice(0,1)
														that.$store.state.originList[i].userNames.splice(0,1)
											    		}
											    		that.$store.state.originList[i].cartItemIds.splice(0,1)
											    		var self = that
													setTimeout(function(){
														self.$store.state.originList[i].showIndex = false
													},2500)
												}
											}
										}
									}
								}
							})
						})
					})
		}
	}
		
</script>
<style lang='scss'>
	.index{
		position:relative;
		display:flex;
		flex-direction: column;
		width:100%;
		height:100%;
		.welcome{
			position:absolute;
			top:-3%;
			width:100%;
			.welcome-1{
				text-align: center;
				width:1.5rem;
				margin:0.88rem auto 0 auto;
				font-family: PingFangSC-Semibold;
				font-size: 0.24rem;
				color: #282828;
				span{
					color:orange;
				}
			};
			.restaurant{
				width:2rem;
				margin:0.1rem auto 0 auto;
				text-align: center;
				font-size:0.2rem;
				color: #5A5A5A;
			}
		}
		.headImg{
			position:absolute;
			top:48%;
			width:100%;
			display: flex;
			justify-content: center;
			.touxiang{
				display:flex;
				flex-direction:column;
				align-items:center;
				text-align: center;
				img{
					display:block;
					width:0.6rem;
					height:0.6rem;
					border-radius: 100%;
				}
				span{
					font-size: 0.16rem;
					color: #282828;
				}
			}
		}
		.beforeOrder{
			position:absolute;
			bottom:18%;
			width:100%;
			.order{
				display:block;
				width:2.2rem;
				height:0.41rem;
				margin:0 auto;
				line-height: 0.24rem;
				border:0;
				background: #EE5A32;
				span{
					font-size:0.18rem;
				}
			}
		}
		.wifiTop{
			position:absolute;
			bottom:18%;
			width:100%;
			display: flex;
			justify-content: center;
			.wifi{
				p{
					margin-top:0.1rem;
					font-size:0.16rem;
					color:#6A6A6A;
					span{
						display: flex;
						display:inline-block;
						justify-content: center;
						width:0.5rem;
						height:0.21rem;
						i{
							display: inline-block;
							width:100%;
							height:100%;
							font-style:normal;
							font-size:0.15rem;
						}
					}
				}
			}
		}
		.beforeOrder{
			position:absolute;
			bottom:28%;
			width:100%;
			.order{
				display:block;
				width:2.2rem;
				height:0.41rem;
				margin:0 auto;
				line-height: 0.24rem;
				border:0;
				background: #30BFBE;
				span{
					font-size:0.18rem;
				}
			}
		}
		.version{
			position:absolute;
			bottom:0;
			left:0;
			width:100%;
			p{
				width:100%;
				margin-bottom:0.1rem;
				text-align: center;
				color: #6A6A6A;
			}
		}
		/*register按钮*/
		.beforeRegister{
			position:absolute;
			bottom:20%;
			width:100%;
			height:0.41rem;
			.register{
				position: absolute;
				top:0;
				left:21%;
				display:block;
				width:2.2rem;
				height:0.41rem;
				line-height: 0.18rem;
				border: 1px solid rgba(49,196,195,0.5);
				background:#fff;
				span{
					font-size:0.18rem;
					color:#31C4C3;
				}
			}
		}
		/*背景*/
		.bg{
			width:100%;
			height:100%;
			background-image:url('../assets/imgs/background1.jpg');
			background-size: 100% 100%;
			opacity: 0.5;
			z-index: -1;
		}
	}
</style>
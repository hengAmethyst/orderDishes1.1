<template>
	<div class="finished">
		<!--nav-->
		<div class="navs">
			<router-link to="/order/buy" @click.native="addFoods">
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
				<!--我的订单-->
				<span>
					<router-link to="/order/indent" @click.native="toIndent">
						<img src="../../../assets/icons/订单@3x.png" v-show="information.ifShowMenu"/>
					</router-link>
				</span>
			</p>
		</div>
		<!--更多-->
		<div class="more">
			<p>
				<span>订单已提交成功</span>
				<span>{{this.$store.state.process}}</span>
			</p>
		</div>
		<div class="ableFlow">
			<!--订单明细-->
			<div class="detail-title">
				<span>订单明细</span>
				<span v-show="showIf">共<i>{{allCount}}</i>份</span>
			</div>
	<!--点菜菜品-->
			<div class="detail-goods">
				<div class="for-cates" v-for="(item,index) in submitListCates" v-show="item.length>0">
					<div class="cates">
						<span>{{cateName[index]}}</span>
						<span>共<i>{{submitListCount[index]}}</i>份</span>
					</div>
					<ul>
						<li v-for="food in item" v-if="food.status==finishedStatus|finishedStatus==0">
							<!--没有备注时-->
							<div class="noTip">
								<div class="finish-food-img">
									<img :src="food.dishPicUrl" />
								</div>
								<div class="finish-food-name">
									<span>
										{{food.dishesName}}
									</span>
									<span>
										￥{{food.dishesPrice}}/{{food.unitName}}
									</span>
									<span>
										会员价￥{{food.memberPrice}}/{{food.unitName}}
									</span>
								</div>
								<div class="finish-food-price">
									<span>x{{food.dishesCount}}</span>
									<img :src="'../../../static/imgs/static'+ food.status +'.png'"/>
								</div>
							</div>
							<!--备注栏-->
							<div class="tips" v-if="food.tip&food.type!=9" v-for="exp in food.memoLists">
								<div class="tip-title">
									<span>
										备注详情
									</span>
									<i class="icon iconfont icon-yqfxiajiantou" @click="food.showTip = !food.showTip,tempShow = food.showTip,changeArrow($event.currentTarget)"></i>
								</div>
								<div class="tipBox" v-if="food.showTip">
									<div class="tip-inner">
										<ul>
											<li v-show="exp.addedDishes">小菜:{{exp.addedDishes}}</li>
											<li v-show="exp.dictSetNameList">备注:{{exp.dictSetNameList}}</li>
											<li v-show="exp.makeWay">做法:{{exp.makeWay}}</li>
											<li v-show="exp.specialReq">特殊备注:{{exp.specialReq}}</li>
										</ul>
									</div>
									<img :src="exp.headImg" v-if="food.showTip"/>
								</div>
							</div>
							<!--套餐的具体详情-->
							<div class="tips" v-if="food.type==9">
								<div class="tip-title">
									<span>
										套餐详情
									</span>
									<i class="icon iconfont icon-yqfxiajiantou" @click="food.showTip = !food.showTip,changeArrow($event.currentTarget)"></i>
								</div>
								<div class="tipBox">
									<div class="tip-inner" v-if="food.showTip">
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
				<div class="mustBuy">
					<span>必选商品</span>
					<span>共<i>{{this.$store.state.customerNum}}</i>份</span>
				</div>
				<!--必选商品详细内容-->
				<div class="mustBuy-inner" v-for="item in this.$store.state.mustRequires" v-if="item.price>0">
					<p>
						<span>
							<i>{{item.name}}</i>
							<i>(每人1份)</i>
						</span>
						<span>
							x{{item.count}}
						</span>
						<span>
							<i>￥</i>{{item.total/100}}
						</span>
					</p>
				</div>
				<!--整单备注-->
				<div class="allFlavor" v-if="this.$store.state.allOrderAsk.showIndex">
					<div class="allFlavor-title">
						<span>
							整单备注
						</span>
					</div>
					<div class="allFlavor-inner">
						<span v-if="this.$store.state.allOrderAsk.flavorName">
							备注:{{this.$store.state.allOrderAsk.flavorName}}
						</span>
						<span v-if="this.$store.state.allOrderAsk.specialReq">
							特殊要求:{{this.$store.state.allOrderAsk.specialReq}}
						</span>
					</div>
				</div>
				<div class="billInfo">
					<span class="s1" v-show="showIf">应付总额 ￥{{totalPrice}}</span>
					<router-link to="/order/register">
						<span class="s2" v-show="showIf"><i>会员价 ￥{{memberPrice}}</i></span>
					</router-link>
				</div>
			</div>
			<!--其他信息-->
			<div class="otherInfo">
				<p>
					<span>其他信息</span>
				</p>
				<p>
					<span>订单号:{{this.$store.state.orderCode}}</span>
				</p>
				<p>
					<span>下单时间: {{this.$store.state.orderTime}}</span>
				</p>
			</div>
			
		</div>
		<!--底部-->
		<div class="footer" v-if="!this.$store.state.ifShowAddingBtn">
			<div class="forBtn">
				<router-link to="/order/buy" @click.native="addFoods">
					<p class="addFoods">加菜</p>
				</router-link>
				<router-link to="/order/buy/pay" v-show="orderStatus" @click.native="judgeMember">
					<p class="pay">支付</p>
				</router-link>
			</div>
			<p v-show="showIf" class="totalPrice">
				<span v-if="this.$store.state.phoneNumber==null"><b>原价:</b><i>￥</i>{{totalPrice}}</span>
				<span v-else class="isMember"><b>会员价:</b><i>￥</i>{{memberPrice}}</span>
			</p>
			<!--成为会员弹框-->
			<div class="toBeMember" v-show="showMemberBox">
				<div class="toBeMember-1">
					<router-link to="/order/register">
						<p>
							<span>成为会员</span>
							<img src="../../../assets/icons/Group 3@3x.png"/>
						</p>
					</router-link>
					<p>
						<span>立即注册会员,享受会员价</span>
					</p>
				</div>
				<div class="toBeMember-2">
					<p>会员价：￥{{memberPrice}}</p>
				</div>
				<div class="close" @click="showMemberBox=false">
					<img src="../../../assets/icons/会员弹框-取消@3x.png"/>
				</div>
			</div>
		</div>
		<div class="footer" v-if="this.$store.state.ifShowAddingBtn">
			<p class="continueAdd" @click="continueAdd">继续点菜</p>
		</div>
		<!--加菜时候的加载蒙版-->
		<div class="adding" v-show="this.$store.state.addingIndex">
			<img class="Rotation img" src="../../../../static/imgs/1.png" width="50px" height="50px"/>
		</div>
		<!--弹框-->
		<alert :showMsg="showMsg" v-if="this.$store.state.showAlert"></alert>
	</div>
</template>
<script>
import Vue from 'vue'
import {getCurrentTime} from '../../../js/getCurrentTime.js'
import {reloadOrder} from '../../../js/reloadOrder.js'
	export default {
		data() {
				return {
					//下单时间
					orderedTime: '',
					information: {
						name: '订单完成',
						ifShowReload: true,
						ifShowMenu: true
					},
					// 菜品种类
					foodsList: [],
					showIf:true,
					//控制会员注册提示框显示
					showMemberBox:true,
					tempShow:null,
					//弹框显示
					showMsg:'已经有人下单了'
				}
			},
			methods: {
				//继续点菜
				continueAdd(){
					this.$router.push({path:"/order/buy"})
				},
				changeArrow(target){
					if(target.className == "icon iconfont icon-yqfxiajiantou"){
						target.className = "icon iconfont icon-yqfshangjiantou"
					}
					else if(target.className == "icon iconfont icon-yqfshangjiantou"){
						target.className = "icon iconfont icon-yqfxiajiantou"
					}
				},
				//支付时候判断是否是会员:
				judgeMember(){
					if(this.$store.state.phoneNumber!=null){
						this.$store.state.needPay = this.memberPrice
					}
				},
				addFoods() {
					//
					this.$store.state.orderStatus = false
					//清空原始点菜数据
					this.$store.commit('change')
					//改变添加菜单的状态
					this.$store.state.addFoodsMark = true
					this.$store.state.allCount = 0
				}
				,
				//跳到indent页面的标记
				toIndent(){
					this.$store.state.indentIndex = true
				}
				,
				reload(){
					this.$store.state.addingIndex = true
					this.showIf = false
					//总价置0
					this.$store.state.totalPrice = 0
					//数量置0
					this.$store.state.allCount = 0
					var tempVue = Vue
					reloadOrder(this,tempVue)
				}
			},
			created() {
				//判断是否为会员
				if(this.$store.state.phoneNumber!=null){
					this.showMemberBox = false
				}
				//由于消息而跳转到此页面
				if(this.$store.state.goFinishFromMsg){
					//显示催菜
					this.$store.state.showCallDishes = true
					//显示买单
					this.$store.state.showPayBill = true
					//总价置0
					this.$store.state.totalPrice = 0
					//数量置0
					this.$store.state.allCount = 0
					//确认下单请求
					this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/submitOrderCartItem",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,
											"tableId":this.$store.state.tableId,
											"tableName":this.$store.state.tableName,
											"userId":this.$store.state.nickName,
											"userName":this.$store.state.nickName,
											"userHeadUrl":this.$store.state.headImgUrl,
											"nickName":this.$store.state.nickName},
											"channel":1})
					,{
						emulateJSON:true  //必须设置这个头文件
					}).then(function(res){
						console.log("确认订单")
						console.log(res)
						//总菜品list
						this.$store.state.submitFoodsList = res.body.data.data.orderItemList
						//下单时间
						this.$store.state.orderTime = getCurrentTime(res.body.data.data.createTime)
						//菜品总价
						this.$store.state.totalPrice = Number(res.body.data.data.orderTotalAmount/100).toFixed(2)
						this.$store.state.needPay = this.$store.state.totalPrice
						//会员价
						this.$store.state.memberPrice = Number(res.body.data.data.orderMemberAmount/100).toFixed(2)
						//orderId获取
						this.$store.state.orderId = res.body.data.data.id
						//orderNo获取
						this.$store.state.orderCode =  res.body.data.data.orderCode
						//必选项
						this.$store.state.mustRequires = res.body.data.data.requires
						for(let i=0;i<this.$store.state.mustRequires.length;i++){
							this.$store.state.customerNum = Number(this.$store.state.customerNum)
							if(this.$store.state.mustRequires[i].price>0){
								this.$store.state.customerNum += Number(this.$store.state.mustRequires[i].count)
							}
						}
						//总的口味/做法/特殊备注
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
							this.$store.state.allCount += this.$store.state.submitFoodsList[i].dishesCount
							//菜品价格拿到
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
							this.$store.state.submitFoodsList[i].memoLists = [{
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
						//如果没有备注就不展示备注栏,所以需要判断有没有备注信息
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
				//如果其他人已经下单
				if(this.$store.state.commandCode==2002){
					var tempVue = Vue
					reloadOrder(this,tempVue)
				}
			}
			,
			computed: {
				//常规菜品list
				submitListCount() {
					return this.$store.state.submitListCount
				},
				//常规菜品种类的数量
				submitListCates() {
					return this.$store.state.submitListCates
				},
				//菜品种类
				cateName(){
					return this.$store.state.cateName
				},
				//添加的菜品信息list
				appendList(){
					return this.$store.state.appendList
				},
				//菜品总数量
				allCount(){
					return this.$store.state.allCount
				},
				//审核状态
				orderStatus(){
					return this.$store.state.orderStatus
				},
				//计算总价
				totalPrice(){
					return Number(this.$store.state.totalPrice).toFixed(2)
				}
				,
				//会员价
				memberPrice(){
					return this.$store.state.memberPrice
				}
				,
				pcAddDish(){
					return this.$store.state.pcAddDish
				}
				,
				finishedStatus(){
					return this.$store.state.finishedStatus
				}
				,
				mustPerMoney(){
					return this.$store.state.mustPerMoney
				}
			}
			,
			watch:{
				pcAddDish(){
					this.reload()
				}
			}
	}
</script>
<style lang="scss">
	.finished {
		display: flex;
		flex-direction: column;
		height: 100%;
		.navs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 0.6rem;
			background: #fff;
			border-bottom:1px solid #f9f9f9;
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
							margin-right: 0.33rem;
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
		.more {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 0.6rem;
			line-height: 0.28rem;
			background-image:url(../../../assets/icons/订单状态@3x.png);
			background-size: 100% 100%;
			p:nth-child(1) {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 2rem;
				height: 100%;
				margin-left: 0.35rem;
				span:nth-child(1) {
					display: block;
					font-size: 0.14rem;
					color:#fff;
				}
				span:nth-child(2) {
					display: block;
					color: #fff;
				}
			}
			p:nth-child(2) {
				margin-top: 0.18rem;
				margin-right: 0.1rem;
				color: #DCDCDC;
				font-size: 0.14rem;
				a {
					color: #fff;
				}
			}
		}
		.ableFlow {
			flex: 1;
			overflow: scroll;
			width: 100%;
		}
		.detail-title {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			border-top: 1px solid #F6F6F6;
			background: #fff;
			span:nth-child(1) {
				margin-left: 0.15rem;
				font-size: 0.16rem;
				color: #282828;
			}
			span:nth-child(2) {
				margin-right: 0.15rem;
				font-size: 0.14rem;
				color: #282828;
				i {
					display: inline-block;
					text-align: center;
					width: 0.2rem;
					font-style: normal;
					}
			}
		}
		/*加菜*/
		.addFoodsList {
			width: 100%;
			.addCates {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 0.3rem;
				line-height: 0.3rem;
				background: #F0F0F0;
				span:nth-child(1) {
					margin-left: 0.15rem;
					font-size: 0.14rem;
					color: #6A6A6A;
				}
				span:nth-child(2) {
					margin-right: 0.15rem;
					font-size: 0.14rem;
					color: #6A6A6A;
					i {
						display: inline-block;
						text-align: center;
						width: 0.2rem;
						font-style: normal;
					}
				}
			}
			ul {
				li {
					width: 100%;
					.noTip {
						position: relative;
						display: flex;
						width: 100%;
						margin-top: 0.1rem;
						border-bottom: 1px solid #F0F0F0;
						/*图片*/
						.finish-food-img {
							margin-left: 0.15rem;
							img {
								width: 0.65rem;
								height: 0.65rem;
							}
						}
						/*价格和状态*/
						.finish-food-price {
							position: absolute;
							top: 0%;
							right: 0%;
							display: flex;
							flex-direction: column;
							span {
								font-size: 0.18rem;
								color: #282828;
								i {
									font-style: normal;
									font-size: 0.12rem;
								}
							}
							img {
								width: 0.61rem;
								height: 0.41rem;
							}
						}
					}
				}
			}
		}
		/*订单明细title*/
		.detail-goods {
			width: 100%;
			.cates {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 0.3rem;
				background: #F0F0F0;
				span:nth-child(1) {
					margin-left: 0.15rem;
					font-size: 0.14rem;
					color: #6A6A6A;
				}
				span:nth-child(2) {
					margin-right: 0.15rem;
					font-size: 0.14rem;
					color: #6A6A6A;
					i {
						display: inline-block;
						text-align: center;
						width: 0.2rem;
						font-style: normal;
					}
				}
			}
			ul {
				width: 100%;
				li {
					width: 100%;
					.noTip {
						position: relative;
						display: flex;
						align-items: center;
						width: 100%;
						height:1rem;
						margin-top: 0.05rem;
						border-bottom: 1px solid #F0F0F0;
						/*图片*/
						.finish-food-img {
							margin-left: 0.15rem;
							img {
								width: 0.65rem;
								height: 0.65rem;
							}
						}
						.userInfo{
							position:absolute;
							top:20%;
							left:44%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width:0.65rem;
							img{
								width:0.3rem;
								height:0.3rem;
								border-radius: 100%;
							}
							span{
								color:#787878;
							}
						}
						/*名字和数量*/
						.finish-food-name{
							display: flex;
							flex-direction: column;
							width: 1.4rem;
							height: 0.65rem;
							margin-left: 0.1rem;
							font-style:normal;
							span:nth-child(1) {
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								font-size: 0.16rem;
								color: #282828;
							}
							span:nth-child(2) {
								font-size: 0.16rem;
								color: #282828;
							}
							span:nth-child(3) {
								color:#F00;
							}
						}
						/*价格和状态*/
						.finish-food-price {
							position: absolute;
							bottom: 0%;
							right: 0%;
							display: flex;
							flex-direction: column;
							align-items:center;
							justify-content: space-between;
							height: 1rem;
							span {
								margin-left:0.1rem;
								font-size: 0.18rem;
								color: #282828;
								i {
									font-style: normal;
									font-size: 0.12rem;
								}
							}
							img {
								width: 0.5rem;
								height: 0.41rem;
							}
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
								top:52%;
								transform: translateY(-70%);
								width:0.4rem;
								height:0.4rem;
								border-radius:100%;
							}
						}
					}
				}
			}
			/*必选商品*/
			.mustBuy{
				display:flex;
				justify-content: space-between;
				align-items: center;
				width:100%;
				height:0.3rem;
				background:#F0F0F0;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size:0.14rem;
					color: #6A6A6A;
				}
				span:nth-child(2){
					margin-right:0.15rem;
					font-size:0.14rem;
					color: #A0A0A0;
					i{
						display:inline-block;
						width:0.2rem;
						text-align: center;
						font-style:normal;
					}
				}
			}
			/*mustBuyinner*/
			.mustBuy-inner{
				position:relative;
				width:100%;
				height:0.6rem;
				p:nth-child(1){
					width:100%;
					height:0.5rem;
					margin-top:0.1rem;
					border-bottom:1px solid #F9F9F9;
					span:nth-child(1){
						display:flex;
						flex-direction: column;
						margin-left:0.15rem;
						color: #F5A623;
						i:nth-child(1){
							font-style:normal;
							font-size:0.16rem;
							color: #282828;
						}
						i:nth-child(2){
							font-style:normal;
							color: #F5A623;
						}
					}
					span:nth-child(2){
						position:absolute;
						top:-1%;
						left:26%;
						font-size:0.16rem;
						color: #5A5A5A;
					}
					span:nth-child(3){
						position:absolute;
						top:20%;
						right:4%;
						font-size:0.16rem;
						color: #282828;
						i{
							font-style:normal;
							font-size:0.12rem;
						}
					}
				}
				p:nth-child(2){
					display:flex;
					flex-direction: column;
					width:100%;
					height:0.5rem;
					margin-top:0.1rem;
					border-bottom:1px solid #F9F9F9;
					span:nth-child(1){
						display:flex;
						flex-direction: column;
						margin-left:0.21rem;
						color: #F5A623;
						i:nth-child(1){
							font-style:normal;
							font-size:0.16rem;
							color: #282828;
						}
						i:nth-child(2){
							font-style:normal;
							color: #F5A623;
						}
					}
					span:nth-child(2){
						position:absolute;
						top:51%;
						left:26%;
						font-size:0.16rem;
						color: #5A5A5A;
					}
					span:nth-child(3){
						position:absolute;
						top:71%;
						right:4%;
						font-size:0.16rem;
						color: #282828;
						i{
							font-style:normal;
							font-size:0.12rem;
						}
					}
				}
			}
			/*整单备注*/
			.allFlavor {
				display: flex;
				width: 100%;
				height: 0.7rem;
				.allFlavor-title {
					width: 30%;
					height: 0.5rem;
					margin-left: 0.15rem;
					span {
						font-size: 0.16rem;
						color: #282828;
					}
				}
				.allFlavor-inner {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 70%;
					height: 0.7rem;
					border-bottom:1px solid #f9f9f9;
					span:nth-child(1) {
						display: inline-block;
						margin-top: 0.05rem;
						font-size: 0.14rem;
						color: #787878;
					}
					span:nth-child(2) {
						display: inline-block;
						margin-top: 0.05rem;
						font-size: 0.14rem;
						color: #787878;
					}
					span:nth-child(3) {
						display: inline-block;
						margin-top: 0.05rem;
						font-size: 0.14rem;
						color: #787878;
					}
				}
			}
			.billInfo {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 0.4rem;
				line-height: 0.4rem;
				span:nth-child(1){
					margin-left:0.15rem;
					font-size: 0.16rem;
					color: #282828;
				}
				a:nth-child(2) {
					display: inline-block;
					margin-top:0.05rem;
					margin-right:0.6rem;
					i{
						font-style:normal;
						font-size:0.14rem;
						color: #FF0001;
					}
				}
			}
		}
		.otherInfo {
			width: 100%;
			height: 1.2rem;
			p:nth-child(1) {
				width: 100%;
				height: 0.4rem;
				line-height: 0.4rem;
				color: #5A5A5A;
				background: #f0f0f0;
				span {
					margin-left: 0.15rem;
				}
			}
			p:nth-child(2) {
				width: 100%;
				height: 0.38rem;
				line-height: 0.38rem;
				color: #787878;
				border-bottom: 1px solid #F6F6F6;
				span {
					margin-left: 0.15rem;
				}
			}
			p:nth-child(3) {
				width: 100%;
				height: 0.4rem;
				line-height: 0.4rem;
				color: #787878;
				span {
					margin-left: 0.15rem;
				}
			}
		}
		.footer {
			position: relative;
			width: 100%;
			height: 0.5rem;
			line-height: 0.5rem;
			border-top: 1px solid #eee;
			z-index: 2013;
			.forBtn{
				position:absolute;
				top:0;
				right:0;
				display: flex;
				justify-content: flex-end;
				width:2rem;
				height:0.5rem;
				.pay{
					width: 0.94rem;
					height: 100%;
					margin-left:0.05rem;
					text-align: center;
					background: #31C4C4;
					font-size: 0.18rem;
					color: #fff;
				}
				.addFoods{
					width: 0.94rem;
					height: 100%;
					text-align: center;
					font-size: 0.18rem;
					color: #fff;
					background: #31C4C4;
				}
			}
			.totalPrice{
				display: flex;
				align-items: center;
				span{
					display: inline-block;
					margin-left: 0.18rem;
					font-size: 0.2rem;
					color: #282828;
					i{
						font-style:normal;
						font-size:0.16rem;
					}
					b{
						font-weight:normal;
						font-size:0.16rem;
					}
				}
				.isMember{
					color: #FF2C2C !important;
				}
			}
			.toBeMember{
				position:absolute;
				top:-0.65rem;
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
			.continueAdd{
				position:absolute;
				top:50%;
				left:50%;
				transform: translate(-50%,-50%);
				width:2.2rem;
				height:0.41rem;
				line-height:0.41rem;
				text-align: center;
				font-size:0.2rem;
				color:#fff;
				background: #31C4C4;
				border-radius: 6px;
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
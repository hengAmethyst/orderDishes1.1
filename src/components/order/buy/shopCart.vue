<template>
	<div class='orderedinfo'>
		<p class="numInfo">
			<span v-show="tempIflag">
				￥{{totalPrice}}
			</span>
		</p>
		<div class="member">
			<span ref="memberPrice">会员价:￥<i v-show="tempIflag">{{totalMemberPrice}}</i></span>
			<span v-show="this.$store.state.phoneNumber==null">
				<router-link to="/order/register">
					成为会员
				</router-link>
			</span>
		</div>
		<div class='checked' @click = 'save'>
			<router-link to='/order/affirm'>
				<span>确认</span>
			</router-link>
		</div>
		<div class="icons-num">
			<img src="../../../assets/icons/厨师@3x.png" @click="reload"/>
			<span  v-show="tempIflag">{{totalCount}}</span>
		</div>
		<!--购物车-->
		<div class="shopCar" v-show="iFlag" @click="iFlag=false">
		</div>
			<div class="shopCarDetail" v-show="iFlag">
				<div class="readyGoods">
					<!--清空按钮部分-->
					<div class="clear">
						<img src="../../../assets/icons/清空购物车@3x.png" @click="clearOrderCart"/>
					</div>
					<div class="scroll-area">
						<div class="divide-kinds" v-for="(item,index) in catesList">
							<p class="kinds-title" v-show="item.length>0">
								<span>{{catesName[index]}}</span>
								<span>共<i>{{catesNums[index]}}</i>份</span>
							</p>
							<ul v-show="item.length>0">
								<li v-for="(food,order) in item">
									<!--菜品名字-->
									<p>
										<span class="normalName">
											{{food.name}}
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
									<!--菜品名称和价格-->
									<p>
										<span>
											￥{{food.price}}/{{food.unitName}}
										</span>
										<span>
											会员价￥{{food.memberPrice}}/{{food.unitName}}
										</span>
									</p>
									<p>
										<numControl :food="food"></numControl>
									</p>
									<!--重复-->
									<p class="moreTimes" v-show="food.count>1">
										<img src="../../../assets/icons/重复-左@3x.png"/>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>
<script>
import {mergeDishes,reloadShopCart} from '../../../js/merge.js'
import Vue from 'vue'
	export default{
		data(){
			return{
				// 购物车显示开关
				iFlag:false,
				temp:0
			}
		},
		props:['affirmToggle','catesList','selectFoods','catesNums']
		,
		methods:{
			//清空购物车
			clearOrderCart(){
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/clearOrderCart",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,
											"tableId":this.$store.state.tableId,
											"userName":this.$store.state.nickName
											},
											"channel":1})
					
					,{
						emulateJSON:true  //必须设置这个头文件
					}).then(function(res){
						console.log(res)
						this.$store.commit('change')
					})
			}
			,
			save(){
				// 判断已选菜品是否为空，如果为空将不能确认订单
				if(this.$store.state.selectFoods[0]){
					this.affirmToggle.show = true
				}
				else{
					this.affirmToggle.show = false
				}
				//计算加的菜品
				for(var i=0;i<this.$store.state.selectFoods.length;i++){
					if(this.$store.state.selectFoods[i].addMark){
						this.$store.state.appendList.push(this.$store.state.selectFoods[i])
					}
				}
    			}
			,
			reload(){
				this.iFlag = !this.iFlag
				//引入刷新购物车的外部js函数
				var tempVue = Vue
				reloadShopCart(this,tempVue)
			}
		}
		,
		mounted(){
			if(this.$store.state.phoneNumber!=0){
				this.$refs.memberPrice.className = 'registed'
			}
		}
		,
		computed:{
			//选中的菜品
			selectFoods(){
				return this.$store.state.selectFoods
			}
			,
			//总价
			totalPrice() {
				let total = 0
				this.$store.state.selectFoods.forEach((food) => {
					total += Number(food.price*food.count)
				})
				return total.toFixed(2)
			},
			//会员价
			totalMemberPrice(){
				let total = 0
				this.$store.state.selectFoods.forEach((food) => {
					total += Number(food.memberPrice*food.count)
				})
				return total.toFixed(2)
			},
			//总数量
			totalCount(){
				let count = 0
				this.$store.state.selectFoods.forEach((food) => {
					count += food.count
				})
				return count
			},
			//菜品种类
			catesName(){
				return this.$store.state.beforeCateName
			},
			//控制刷新的时候的数字的突变
			tempIflag(){
				return this.$store.state.tempIflag
			}
		}
		,
		watch:{
			selectFoods:function(){
				if(this.$store.state.selectFoods.length>5){
					$('.scroll-area').css({'height':'4.5rem','overflow':'scroll'})
         		}
				else{
					$('.scroll-area').css({'height':''})
				}
			}
		}
	}
</script>
<style lang='scss'>
	.orderedinfo{
		position:relative;
		width:100%;
		height:0.5rem;
		background:white;
		border-top:1px solid #F6F6F6;
		.numInfo{
			position:relative;
			display:flex;
			margin-left:0.6rem;
			line-height:0.46rem;
			span:nth-child(1){
				font-size: 0.18rem;
				color: #282828;
			};
			span:nth-child(2){
				position:absolute;
				top:5%;
				right:40%;
				margin-left:0.8rem;
				font-family: PingFangSC-Regular;
				font-size: 0.15rem;
				color: #282828;
				i{
					display:inline-block;
					width:0.16rem;
					text-align: center;
					font-style:normal;
				}
			}
		}
		/*会员提醒*/
		.member{
			position:absolute;
			top:-6%;
			left:40%;
			display:flex;
			flex-direction: column;
			span:nth-child(1){
				font-size:0.14rem;
				color: #FF0001;
				i{
					font-style:normal;
				}
			}
			.registed{
				display: inline-block;
				margin-left:0.05rem;
				margin-top:0.12rem;
			}
			span:nth-child(2){
				display:inline-block;
				width:0.55rem;
				height:0.15rem;
				text-align: center;
				line-height:0.15rem;
				margin-left:0.1rem;
				color: #31C4C3;;
				border: 1px solid #f00;;
				border-radius: 80px;
				a{
					color: #FF0001;
				}
			}
		}
		.checked{
			position:absolute;
			right:0;
			bottom:0;
			display:inline-block;
			width:0.94rem;
			height:100%;
			text-align: center;
			background: #31C4C3;
			span{
				line-height: 0.45rem;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size:0.18rem;
				color:white;
			}
		};
		.icons-num{
			position:absolute;
			top:-16%;
			left:2%;
			z-index: 2000;
			img{
				width:0.48rem;
				height:0.48rem0000000;
			}
			span{
				position:absolute;
				top:-8%;
				left:78%;
				width:0.21rem;
				height:0.21rem;
				text-align: center;
				line-height:0.21rem;
				color:#fff;
				background:#FF0001;
				border-radius: 100%;
			}
		};
		.shopCar{
			position:absolute;
			top:-1400%;
			left:0;
			width:100%;
			height:1400%;
			background:black;
			opacity:0.5;
		};
		/*购物车菜品详情*/
		.shopCarDetail{
				position:absolute;
				bottom:100%;
				left:0;
				width:100%;
				.warn{
					position:absolute;
					top:-0.6rem;
					width:100%;
					height:0.6rem;
					background:#F0F0F0;
					z-index:1999;
					p{
						position:absolute;
						top:0.1rem;
						display: flex;
						align-items: center;
						margin-left:0.2rem;
						span:nth-child(1){
							display:inline-block;
							width:0.18rem;
							height:0.18rem;
							background:#D8D8D8;;
							border-radius: 100%;
						}
						span:nth-child(2){
							display: inline-block;
							margin-left:0.1rem;
							font-family: PingFangSC-Regular;
							font-size: 0.16rem;
							color: #5A5A5A;
						}
					}
				};
				.readyGoods{
					.clear{
						display: flex;
						justify-content: flex-end;
						align-items: center;
						width:100%;
						height:0.4rem;
						background: #F9F9F9;
						img{
							width:0.2rem;
							height:0.2rem;
							margin-right:0.1rem;
						}
					}
					.scroll-area{
						/*苹果滚动*/
						-webkit-overflow-scrolling : touch;
						.divide-kinds{
							width:100%;
							.kinds-title{
								display: flex;
								justify-content:space-between;
								width:100%;
								height:0.3rem;
								line-height:0.3rem;
								background: #F0F0F0;
								span:nth-child(1){
									margin-left:0.15rem;
									font-size:0.14rem;
									color:#6A6A6A;
								}
								span:nth-child(2){
									margin-right:0.2rem;
									font-size:0.14rem;
									color:#6A6A6A;
									i{
										display:inline-block;
										text-align: center;
										width:0.2rem;
										font-style:normal;
									}
								}
							}
							ul{
								width:100%;
								li{
									position:relative;
									display: flex;
									align-items: center;
									width:100%;
									height:0.68rem;
									background:#fff;
									border-bottom:1px solid #f6f6f6;
									/*菜品名字*/
									p:nth-child(1){
										width:0.84rem;
										height:0.4rem;
										margin-left:0.1rem;
										.normalName{
											width:100%;
											height:100%;
											line-height: 0.2rem;
											font-size:0.14rem;
											color: #282828;
											text-overflow: ellipsis;
										 	display: -webkit-box;
										  	-webkit-line-clamp: 2;
										 	-webkit-box-orient: vertical;
										  	overflow: hidden;
										}
										.overName{
											display:flex;
											width:100%;
											height:0.4rem;
											line-height:0.4rem;
											font-size:0.16rem;
											color: #282828;
										}
									}
									/*头像*/
									/*1人*/
									p:nth-child(2){
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
									/*菜品价格*/
									p:nth-child(6){
										display:flex;
										flex-direction: column;
										justify-content: space-around;
										width:1.1rem;
										height:0.4rem;
										span:nth-child(1){
											font-size:0.16rem;
											color: #282828;
										}
										span:nth-child(2){
											color:#f00;
										}
									}
									.moreTimes{
										position:absolute;
										top:0;
										left:0;
										img{
											width:0.27rem;
											height:0.27rem;
										}
									}
									/*小菜价格*/
									.cakes{
										position:absolute;
										top:70%;
										right:26%;
										span{
											font-size:0.14rem;
											color:#EE5A32;
										}
									}
								}
							}
						}
					}
				}
			}
	}
</style>
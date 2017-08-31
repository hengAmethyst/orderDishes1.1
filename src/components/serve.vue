<template>
	<div class='serve'>
<!--服务员蒙版-->
	<div class="bg-serve" v-show="showMB" @click="iFlag1=false,iFlag2=false,iFlag3=false,showMB=!showMB"></div>
	<!--加菜时候的加载蒙版-->
	<div class="addings" v-show="this.$store.state.addingIndex">
		<img class="Rotation img" src="../../static/imgs/1.png" width="50px" height="50px"/>
	</div>
<!--呼叫服务员服务-->
		<div class='server-info'>
			<ul>
				<li  @click="clickSever1">
					<img src="../assets/icons/serve.png"/>
					<p></p>
					<!--呼叫服务员功能框-->
					<p v-show="iFlag1" class="options1">
						<span @click="forHelp">呼叫</span>
						<span @click="hurry" v-if="this.$store.state.showCallDishes">催菜</span>
						<span @click="addWater">加水</span>
						<span @click="pay" v-if="this.$store.state.showPayBill">买单</span>
					</p>
					<!--<img src="../assets/icons/local.png"/>-->
					<p>{{this.$store.state.tableName}}</p>
				</li>
			</ul>
		</div>
		<!--呼叫服务提示弹框-->
		<div class='tipBox' v-show="showTipBox">
			<span>
				已通知 请稍后...
			</span>
		</div>
<!--刷新，搜索，菜单-->
		<div class='server-menu'>
			<ul>
				<!--刷新-->
				<li @click="reload">
					<a>
						<img src="../assets/icons/刷新@3x.png"/>
					</a>
				</li>
				<!--菜品检索-->
				<li>
					<router-link to="/order/search">
						<img src="../assets/icons/搜索@3x.png"/>
					</router-link>
				</li>
				<!--我的订单-->
				<li>
					<router-link to="/order/indent">
						<img src="../assets/icons/订单@3x.png"/>
					</router-link>
				</li>
			</ul>
		</div>
		<div></div>
	</div>
</template>
<script>
import {mergeDishes,reloadShopCart} from '../js/merge.js'
import Vue from 'vue'
	export default{
		data(){
			return{
				iFlag1:false,
				iFlag2:false,
				iFlag3:false,
				showMB:false,
				// search的开关
				search:false,
				showTipBox:false,
				//发消息的时间
				msgTime:''
			}
		},
		methods:{
			//控制提示框弹出
			tipBox(){
				var that = this
				this.showTipBox = true
				setTimeout(function(){
					that.showTipBox = false
				},3000)
			},
			reload(){
				this.$store.state.addingIndex = true
				//引入刷新购物车的外部js函数
				var tempVue = Vue
				reloadShopCart(this,tempVue)
						
			},
			clickSever1(){
				if(!this.iFlag1){
					this.showMB=true;
				}
				else{
					this.showMB=false;
				}
				this.iFlag1=!this.iFlag1,
				this.iFlag2=false,
				this.iFlag3=false
			},
			clickSever2(){
				if(!this.iFlag2){
					this.showMB=true;
				}
				else{
					this.showMB=false;
				}
				this.iFlag1=false,
				this.iFlag2=!this.iFlag2,
				this.iFlag3=false
			},
			clickSever3(){
				if(!this.iFlag3){
					this.showMB=true;
				}
				else{
					this.showMB=false;
				}
				this.iFlag1=false,
				this.iFlag2=false,
				this.iFlag3=!this.iFlag3
			},
			//呼叫服务员
			forHelp(){
				this.msgTime = Date.parse(new Date())
				this.tipBox()
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/serviceMsg/api/order/sendMsgToWaiter",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"tableId":this.$store.state.tableId,"userId":this.$store.state.userId,"userName":this.$store.state.nickName,"tableName":this.$store.state.tableName,"msgType":1,"callingMsgType":1,"callingTime":this.msgTime},"channel":1})
				,{
					emulateJSON:true  //必须设置这个头文件
				}).then(function(res){
					console.log(res)
				})
			},
			//催菜
			hurry(){
				this.msgTime = Date.parse(new Date())
				this.tipBox()
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/serviceMsg/api/order/sendMsgToWaiter",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"tableId":this.$store.state.tableId,"userId":this.$store.state.userId,"userName":this.$store.state.nickName,"tableName":this.$store.state.tableName,"msgType":2,"callingMsgType":1,"callingTime":this.msgTime},"channel":1})
				,{
					emulateJSON:true  //必须设置这个头文件
				}).then(function(res){
				})
			},
			//加水
			addWater(){
				this.msgTime = Date.parse(new Date())
				this.tipBox()
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/serviceMsg/api/order/sendMsgToWaiter",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"tableId":this.$store.state.tableId,"userId":this.$store.state.userId,"userName":this.$store.state.nickName,"tableName":this.$store.state.tableName,"msgType":3,"callingMsgType":1,"callingTime":this.msgTime},"channel":1})
				,{
					emulateJSON:true  //必须设置这个头文件
				}).then(function(res){
				})
			},
			//买单
			pay(){
				this.msgTime = Date.parse(new Date())
				this.tipBox()
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/serviceMsg/api/order/sendMsgToWaiter",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"tableId":this.$store.state.tableId,"userId":this.$store.state.userId,"userName":this.$store.state.nickName,"tableName":this.$store.state.tableName,"msgType":4,"callingMsgType":1,"callingTime":this.msgTime},"channel":1})
				,{
					emulateJSON:true  //必须设置这个头文件
				}).then(function(res){
				})
			}
		}
		,
		mounted(){
			//服务员点击选项
			$('.options1').find('span').click(function(){
				var now = $(this).html()
					$('.shade1').css('display','block')
					$('.shade1').html(now)
				setTimeout(function(){
					$('.shade1').css("display","none")
				},3000)
			})
			$('.options2').find('span').click(function(){
				var now = $(this).html()
					$('.shade2').css('display','block')
					$('.shade2').html(now)
				setTimeout(function(){
					$('.shade2').css("display","none")
				},3000)
			})
			$('.options3').find('span').click(function(){
				var now = $(this).html()
					$('.shade3').css('display','block')
					$('.shade3').html(now)
				setTimeout(function(){
					$('.shade3').css("display","none")
				},3000)
			})
		}
	}
</script>
<style lang='scss'>
	.serve{
		position:relative;
		display:flex;
		justify-content: space-between;
		width:100%;
		height:0.6rem;
		border-bottom:1px solid #f9f9f9;
		background: #fff;
		.addings{
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
			/*图片转动*/
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
		.bg-serve{
			position: absolute;
			top:0;
			left:0;
			width:100%;
			height:1500%;
			z-index: 2000;
		}
		/*服务员呼叫块*/
		.server-info{
			z-index: 2000;
			ul{
				display:flex; 
				width:1.8rem;
				height:0.6rem;
				li{
					position:relative;
					text-align:center;
					display:flex;
					margin-left:0.1rem;
					margin-top:0.08rem;
					border-radius: 0.04rem;
					img:nth-child(1){
						display:block;
						width:0.45rem;
						height:0.45rem;
						border-radius:0.04rem;
					};
					p:nth-child(1){
						position:absolute;
						bottom:-3%;
						left:24%;
						color:#fff;
						z-index: 2;
					}
					/*呼叫框*/
					p:nth-child(3){
						position:absolute;
						top:0.46rem;
						left:0;
						display: flex;
						flex-direction: column;
						align-items: center;
						width:1rem;
						background-size:100% 100%;
						background-image:url('../assets/icons/呼叫背景.png');
						background-repeat:no-repeat;
						z-index: 2000;
						span{
							display:flex;
							justify-content: center;
							align-items: center;
							width:0.65rem;
							height:0.65rem;
							text-align: center;
							font-size:0.16rem;
							color:#fff;
							border-bottom: 1px solid rgba(250,250,250,0.5);
						}
						span:nth-child(4){
							border:none;
						}
						span:hover{
							background:deeppink;
						}
					}
					p:nth-child(4){
						position:absolute;
						top:21%;
						right:-0.7rem;
						width:0.6rem;
						height:0.3rem;
						font-size:0.18rem;
						color:#282828;
					}
					.shade1,.shade2,.shade3{
						position:absolute;
						top:0;
						left:0;
						width:0.45rem;
						height:0.45rem;
						text-align: center;
						line-height:0.45rem;
						font-size: 0.16rem;
						color:#fff;
						opacity: 0.8;
						background: #1B1A1F;
						z-index: 3000;
						display: none;
					}
				}
			}
		}
		.tipBox{
			position:fixed;
			top:47%;
			left:36%;
			display:flex;
			align-items: center;
			justify-content: center;
			width:1.42rem;
			height:0.51rem;
			border-radius:6px;
			background:#000;
			opacity:0.7;
			z-index:3001;
			span{
				font-size:0.16rem;
				color:#fff;
			}
		}
		/*功能菜单*/
		.server-menu{
			width:1.7rem;
			height:0.6rem;
			ul{
				width:1.7rem;
				height:0.6rem;
				display:flex;
				justify-content:space-around;
				align-items:center;
				li{
					display:flex;
					width:0.4rem;
					height:0.4rem;
					margin-left:0.26rem;
					text-align: center;
					line-height:0.4rem;
					a{
						display:flex;
						align-items:center;
						img{
							width:0.24rem;
							height:0.23rem;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="paySucceed">
		<!--nav-->
		<div class="navs">
			<p>
				{{information.name}}
			</p>
		</div>
		<!--支付成功显示栏-->
		<div class="succeed-view">
			<p>
				<img src="../../../assets/icons/支付成功@3x.png" v-if="payStatus"/>
				<img src="../../../assets/icons/支付失败@3x.png" v-if="!payStatus"/>
			</p>
			<p>
				<span>
				<img src="../../../assets/icons/wechatPay.png" v-if="wayImgStatus==1"/>
				<img src="../../../assets/icons/aliPay.png" v-if="wayImgStatus==2"/>
					<i>{{this.$store.state.payResult}}</i>
				</span>
			</p>
		</div>
		<!--按钮-->
		<router-link to="/order/buy/reward" class="rating" v-if="weChat">去打赏</router-link>
		<router-link to="/order/buy/rating" class="reward" v-if="showToRating">去评价</router-link>
		<alert :showMsg="showMsg" v-if="showAlert"></alert>
	</div>
</template>
<script>
import {getURLParam} from '../../../js/splitInfo.js'
	export default{
		data(){
			return{
				value1: null,
       			value2: null,
       			information:{name:'支付完成',ifShowReload:false,ifShowMenu:true},
       			//标签选项
       			options:[],
       			//星星数
       			starCount:0,
       			labelInfo:[],
       			//微信
       			weCaht:false,
       			//支付宝
       			aliPay:false,
       			//显示微信或者支付宝图片
        			wayImgStatus:null,
        			//支付状态
        			payStatus:false,
        			showMsg:'',
        			showAlert:false,
        			showToRating:true
			}
		},
		methods:{
			add(){
				var payed = {payed:true}
				localStorage.setItem('payed',payed)
			}
		}
		,
		mounted(){
		}
		,
		created(){
				this.$store.state.ifPaySucceed = true
				//判断用什么浏览器方式打开
				var userWay = navigator.userAgent
				if(userWay.indexOf('MicroMessenger') >= 0){
					this.payStatus = true
					this.weChat = true
					this.wayImgStatus = 1
					this.$store.state.ifShowWillPay = false
				}
				if(userWay.indexOf('AlipayClient') >= 0){
					this.aliPay = true
					this.wayImgStatus = 2
				}
				//如果支付宝支付成功,需要重新取数据
				if(this.aliPay){
					var localUrl = window.location.href
					this.showMsg = getURLParam('msg',localUrl)
					this.showMsg = decodeURI(this.showMsg)
					if(localUrl.indexOf('out_trade_no') >= 0){
						this.$store.state.ifShowWillPay = false
						this.payStatus = true
						this.$store.state.paySucceed = true
						this.$store.state.payResult = '支付成功'
						//取本地数据
//						var needSaveInfo = JSON.parse(sessionStorage.getItem('needSaveInfo'))
						var needSaveInfo = JSON.parse($.fn.cookie('needSaveInfo'))
						//分发数据
						this.$store.state.openId = needSaveInfo.openId
						this.$store.state.nickName = needSaveInfo.nickName
						this.$store.state.headImgUrl = needSaveInfo.headImgUrl
						this.$store.state.merchantId = needSaveInfo.merchantId
						this.$store.state.tableId = needSaveInfo.tableId
						this.$store.state.merchantName = needSaveInfo.merchantName
						this.$store.state.orderNo = needSaveInfo.orderNo
						this.$store.state.orderId = needSaveInfo.orderId
						this.$store.state.merchantPicUrl = needSaveInfo.merchantPicUrl
						this.$store.state.orderTime = needSaveInfo.orderTime
					}
					else{
						this.showToRating = false
						this.showAlert = true
						var that = this
						setTimeout(function(){
							that.showAlert = false
						},2000)
						this.$store.state.paySucceed = true
						this.$store.state.payResult = '支付失败'
					}
				}
				if(this.weChat){
					this.$store.state.paySucceed = true
				}
		}
		,
		computed:{
			paySucceed(){
				return this.$store.state.paySucceed
			},
			labelInfo(){
				return this.$store.state.labelInfo
			},
			payResult(){
				return this.$store.state.payResult
			}
		}
	}
</script>
<style lang="scss">
	.paySucceed{
		position:relative;
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		.navs{
			display: flex;
			align-content: center;
			justify-content: center;
			p{
				font-size:0.2rem;
			}
		}
		.succeed-view{
			display: flex;
			width:100%;
			flex-direction: column;
			align-items: center;
			p:nth-child(1){
				margin-top:0.38rem;
				img{
					width:1.56rem;
					height:1.27rem;
				}
			}
			p:nth-child(2){
				margin-top:0.3rem;
				span{
					display:flex;
					justify-content: center;
					align-items: center;
					width:1.4rem;
					img{
						width:0.2rem;
						height:0.2rem;
					}
					i{
						margin-left:0.08rem;
						font-style:normal;
						font-size:0.2rem;
					}
				}
			}
		}
		/*去评价按钮*/
		.rating{
			position:absolute;
			bottom:2rem;
			left:20%;
			width:2.2rem;
			height:0.4rem;
			text-align: center;
			line-height:0.4rem;
			font-size:0.2rem;
			color: #fff;
			background: #30BFBE;
			border-radius: 6px;
		}
		/*去打赏按钮*/
		.reward{
			position:absolute;
			bottom:1.2rem;
			left:20%;
			width:2.2rem;
			height:0.4rem;
			text-align: center;
			line-height:0.4rem;
			font-size:0.2rem;
			color: #30BFBE;
			opacity: 0.5;
			border: 2px solid #30BFBE;
			border-radius: 6px;
		}
	}
</style>
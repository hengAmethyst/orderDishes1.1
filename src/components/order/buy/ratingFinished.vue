<template>
	<div class="payReady">
		<!--nav-->
		<div class="navs">
			<p>
			</p>
			<p>
				{{information.name}}
			</p>
			<p>
				<span>
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
		<!--完成图片1-->
		<div class="img" v-show="!this.$store.state.isReward">
			<p>
				<img src="../../../assets/icons/支付成功@3x.png"/>
			</p>
			<p>
				<img src="../../../assets/icons/wechatPay.png" v-show="this.$store.state.payWeChat"/>
				<img src="../../../assets/icons/aliPay.png" v-show="this.$store.state.payAliPay"/>
				<span>评价成功!</span>
			</p>
		</div>
		<!--打赏服务生-->
		<router-link to="/order/buy/reward" v-if="weChat">
			<el-button class="reword">打赏服务员</el-button>
		</router-link>
	</div>
</template>
<script>
export default{
	data(){
		return{
			information:{name:'评价成功',ifShowReload:false,ifShowMenu:false},
			weChat:false,
			aliPay:false
		}
	}
	,
	methods:{
		closed(){
		}
	}
	,
	created(){
		//判断用什么浏览器方式打开
		var userWay = navigator.userAgent
		if(userWay.indexOf('MicroMessenger') >= 0){
			this.weChat = true
			this.$store.state.payWeChat = this.weChat
		}
		else if(userWay.indexOf('AlipayClient') >= 0){
			this.aliPay = true
			this.$store.state.payAliPay = this.aliPay
		}
	}
}
</script>
<style lang="scss">
	.payReady{
		position:relative;
		display:flex;
		flex-direction:column;
		height:100%;
		/*图片*/
		.img{
			position:absolute;
			top:14%;
			left:28%;
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			width:1.7rem;
			height:2rem;
			p:nth-child(1){
				img{
					width:1.56rem;
					height:1.27rem;
				}
			}
			p:nth-child(2){
				display: flex;
				align-items:center;
				margin-top:0.08rem;
				img{
					width:0.2rem;
					height:0.2rem;
				}
				span{
					margin-left:0.1rem;
					font-size:0.2rem
				}
			}
		}
		/*打赏图片*/
		.img2{
			position:absolute;
			top:18%;
			left:38%;
			display: flex;
			flex-direction: column;
			p:nth-child(1){
				img{
					width:1rem;
					height:1rem;
					border-radius: 100%;
				}
			}
			p:nth-child(2){
				display: flex;
				display: flex;
				align-items: center;
				margin-top:0.12rem;
				margin-left: -0.08rem;
				img{
					width:0.2rem;
					height:0.2rem;
					margin-top:0.05rem;
				}
				span{
					margin-left:0.1rem;
					font-family: STYuanti-SC-Regular;
					font-size: 0.2rem;
					color: #EE5A32;
				}
			}
			p:nth-child(3){
				margin-top:0.18rem;
				margin-left:-0.28rem;
				font-size:0.2rem;
			}
		}
		.reword{
			position:absolute;
			top:56%;
			left:19%;
			width:2.4rem;
			height:0.45rem;
			color: #30BFBE;
			background:#fff;
			border: 1px solid #30BFBE;
			span{
				font-size: 0.2rem;
			}
		}
		.add{
			position:absolute;
			top:66%;
			left:19%;
			width:2.4rem;
			height:0.45rem;
			color:#EE5A32;
			border: 1px solid #bfcbd9;
			span{
				font-size: 0.2rem;
			}
		}
	}
</style>
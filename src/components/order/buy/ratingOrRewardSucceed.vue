<template>
	<div class="ratingOrRewardSucceed">
		<!--nav-->
		<div class="navs">
			<p>
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
				<span>
					<router-link to="/order/indent">
						<img src="../../../assets/icons/订单@3x.png" v-show="information.ifShowMenu"/>
					</router-link>
				</span>
			</p>
		</div>
		<!--头像和感谢-->
		<div class="thanks">
			<div class="head-img">
				<img src="../../../assets/icons/支付成功@3x.png" class="server-head-img"/>
				<p>
					<img src="../../../assets/icons/wechatPay.png" v-show="this.$store.state.payWeChat"/>
					<img src="../../../assets/icons/aliPay.png" v-show="this.$store.state.payAliPay"/>
					<span>打赏成功</span>
				</p>
				<p>
					<span>谢谢你的打赏哦！</span>
				</p>
				<router-link to="/order/buy/rating">
					<p class="goToRating">去评价</p>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			information:{name:'打赏成功',ifShowReload:false,ifShowMenu:true}
		}
	}
}
</script>
<style lang="scss">
	.ratingOrRewardSucceed{
		width:100%;
		height:100%;
		/*感谢栏*/
		.thanks{
			width:100%;
			height:3rem;
			/*头像*/
			.head-img{
				display:flex;
				flex-direction:column;
				align-items:center;
				.server-head-img{
					width:1rem;
					height:1rem;
					margin-top:0.4rem;
					border-radius: 100%;
				}
				p:nth-child(2){
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top:0.12rem;
					img{
						width:0.2rem;
						height:0.2rem;
					}
					span{
						margin-left:0.1rem;
						font-size:0.2rem;
						color:#31C4C3;
					}
				}
				p:nth-child(3){
					margin-top:0.1rem;
					span{
						font-size:0.16rem;
					}
				}
				.goToRating{
					margin-top:0.4rem;
					width:2.2rem;
					height:0.4rem;
					line-height:0.4rem;
					text-align: center;
					font-size:0.18rem;
					color: #31C4C3;
					opacity: 0.5;
					border: 2px solid #30BFBE;
					border-radius: 6px;
				}
			}
		}
	}
</style>
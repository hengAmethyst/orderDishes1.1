<template>
	<div class="progress">
		<!--nav-->
		<navs :information="information"></navs>
		<!--进程内容部分-->
		<div class="content">
			<!--1-->
			<div class="content-inner">
				<p>
					<span v-show="!steps.step1">订单已提交</span>
					<span v-show="steps.step1">订单已提交</span>
					<img src="../../../assets/icons/订单对勾@3x.png" v-show="steps.step1"/>
				</p>
				<p>
					<img src="../../../assets/icons/订单链条@3x.png"/>
				</p>
			</div>
			<!--2-->
			<div class="content-inner">
				<p>
					<span v-show="!steps.step2">商家已确认订单</span>
					<span v-show="steps.step2">商家已确认订单</span>
					<img src="../../../assets/icons/订单对勾@3x.png" v-show="steps.step2"/>
				</p>
				<p>
					<img src="../../../assets/icons/订单链条@3x.png"/>
				</p>
			</div>
			<!--3-->
			<div class="content-inner">
				<p>
					<span v-show="!steps.step3">订单待支付</span>
					<span v-show="steps.step3">订单待支付</span>
					<img src="../../../assets/icons/订单对勾@3x.png" v-show="steps.step3"/>
				</p>
				<p>
					<img src="../../../assets/icons/订单链条@3x.png"/>
				</p>
			</div>
			<!--4-->
			<div class="content-inner">
				<p>
					<span v-show="!steps.step4">订单已结账</span>
					<span v-show="steps.step4">订单已结账</span>
					<img src="../../../assets/icons/订单对勾@3x.png" v-show="steps.step4"/>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				information:{name:'订单状态',ifShowReload:false,ifShowMenu:true},
				steps:{step1:true,step2:false,step3:false,step4:false}
			}
		}
	}
</script>
<style lang="scss">
	.progress{
		position:fixed;
		top:0;
		left:0;
		display:flex;
		flex-direction: column;
		width:100%;
		height:100%;
		background:#efefef;
		z-index: 2000;
		/*content内容栏*/
		.content{
			flex:1;
			height:70%;
			margin-top:0.15rem;
			.content-inner{
				display: flex;
				flex-direction: column;
				align-items: center;
				width:100%;
				height:1rem;
				p:nth-child(1){
					position:relative;
					display:flex;
					justify-content: center;
					align-items: center;
					width:88%;
					height:0.7rem;
					background:url('../../../assets/icons/订单-未完成@3x.png');
					background-size:100% 100%;
					span:nth-child(1){
						font-size:0.18rem;
						color: #A0A0A0;
					}
					span:nth-child(2){
						font-size:0.21rem;
						font-weight: bold;
						color: #EE5A32;
					}
					img{
						position:absolute;
						top:38%;
						right:9%;
						width:0.18rem;
						height:0.18rem;
					}
				}
				p:nth-child(2){
					display:flex;
					justify-content: center;
					width:100%;
					height:0.3rem;
					img{
						margin-left:0.3rem;
						width:60%;
						height:100%;
					}
				}
			}
		}
	}
</style>
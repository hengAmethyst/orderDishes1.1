<template>
	<div class='info-score'>
		<p class='space'></p>
		<div class="main-info">
			<img :src="this.$store.state.headImgUrl">
			<span style="font-size:0.2rem;margin-top:0.1rem">
				{{this.$store.state.nickName}}
			</span>
		</div>
		<p class="scores-able">
			<span>
				积分功能暂未开通
			</span>
		</p>
		<router-link to='/order/info/score'></router-link>
	</div>
</template>
<script>
	export default{
		}
</script>
<style lang='scss'>
	.info-score{
		display: flex;
		flex-direction: column;
		flex:1;
		width:100%;
		height:100%;
		background:#F6F6F6;
		.space{
			width:100%;
			height:0.2rem;
			background:#f6f6f6;
		};
		.main-info{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			width:100%;
			height:1.65rem;
			background:white;
			img{
				width:0.8rem;
				height:0.8rem;
				border-radius: 100%;
			}
		};
		.scores-able{
			text-align: center;
			flex: 1;
			background:#f6f6f6;
			span{
				display: block;
				margin-top:0.2rem;
				color:#B4B4B4
			}
		}
		}
</style>
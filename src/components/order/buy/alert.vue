<template>
	<div class="alert">
		<div class="alert-inner">
			<p>{{showMsg}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		}
		,
		props:['showMsg']
	}
</script>
<style lang="scss">
	.alert{
		position:fixed;
		top:30%;
		left:50%;
		.alert-inner{
			display: flex;
			justify-content: center;
			align-items: center;
			width:2rem;
			height:1.2rem;
			border-radius: 6px;
			transform: translate(-50%,-50%);
			background:#30BFBE;
			opacity: 0.9;
			p{
				font-size: 0.2rem;
				color:#fff;
			}
		}
	}
</style>
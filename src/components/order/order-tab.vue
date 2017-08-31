<template>
	<div class='tabs'>
		<div class='tab'>
			<router-link to='/order/buy' @touchstart.native="iNumChangeT" style="margin-left:0.04rem">点菜</router-link>
			<router-link to='/order/info' @touchstart.native="iNumChangeF" class="info-style">会员信息</router-link>
			<router-link to='/order/sAe' @touchstart.native="iNumChangeF">商家信息</router-link>
		</div>
			<!--<transition name="view">-->
				<keep-alive>
		          <router-view v-show="isView"></router-view>
				</keep-alive>
	        <!--</transition>-->
	</div>
</template>
<script>
	export default{
		data(){
			return{
				iTemp:true,
				active:true,
				isView:true
			}
		}
		,
		methods:{
			iNumChangeT:function(){
				this.iTemp=true
				this.$emit('child-say',this.iTemp)
			},
			iNumChangeF:function(){
				this.iTemp=false
				this.$emit('child-say',this.iTemp)
			}
		}
		,
		updated:function(){
		}
	}
</script>
<style lang='scss'>
.tabs{
	display:flex;
	flex-direction: column; 
	flex:1;
	height:100%;
	.tab{
		display: flex;
		justify-content: space-around;
		align-items:center;
		width:100%;
	 	height:0.4rem;
		a{
			display:block;
			height:98%;
			line-height:0.45rem;
			text-align:center;
			font-family: PingFangSC-Regular;
			font-size: 0.16rem;
			color: #A0A0A0;
			border-bottom: 3px solid white;
		 }
		 .info-style{
		 	margin-left:0.25rem;
		 }
		.router-link-active{
		  color: #31C4C4;
		  border-bottom: 3px solid #31C4C3;
		}
	}
	.view-enter-active{
		transition:all 0.3s ease;
	}
	.view-enter{
		transform: translate3d(100px,50px,-50px);
	}
}

</style>
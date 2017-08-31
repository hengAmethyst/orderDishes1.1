<template>
	<div class="registerSucceed">
		<!--头部导航栏-->
		<div class="navs">
			<p href="javascript:" onclick="history.back()">
				<i class='iconfont icon-zuojiantou'></i>
				<span>菜单</span>
			</p>
			<p>
				{{information.name}}
			</p>
			<!--占位无实际作用-->
			<p>
			</p>
		</div>
		<!--图片-->
		<div class="succeed-img">
			<img src="../assets/icons/注册成功@3x.png"/>
			<span>
				注册成功！
			</span>
		</div>
		<!--开始点餐按钮-->
		<div class="begain-btn">
			<p onclick ="window.history.go(-2)">
				开启美食之旅
			</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				information:{name:'注册成功',ifShowReload:true,ifShowMenu:false}
			}
		}
		,
		methods:{
			enter(){
				//退回到首页
				if(this.$store.state.memberIndex){
					this.$router.push({path:'/'})
				}//退回到buy
				if(this.$store.state.memberBuy){
					this.$router.push({path:'/order/buy'})
				}//退回到affirm
				if(this.$store.state.memberAffirm){
					this.$router.push({path:'/order/affirm'})
				}//退回到finish
				if(this.$store.state.memberFinish){
					this.$router.push({path:'/order/buy/finished'})
				}
			}
		}
	}
</script>
<style lang="scss">
	.registerSucceed{
		position:fixed;
		top:0;
		left:0;
		z-index: 3001;
		.navs{
			border-bottom:1px solid #f9f9f9;
			background:#fff;
			p:nth-child(1){
				color:#282828;
			}
			p:nth-child(2){
				color:#282828;
			}
		}
		.succeed-img{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width:100%;
			height:2.4rem;
			background:#fff;
			img{
				width:1.5rem;
				height:1.5rem;
			}
			span{
				margin-left:0.3rem;
				margin-top:0.2rem;
				font-size:0.2rem;
				color:#000;
			}
		}
		/*按钮*/
		.begain-btn{
			display: flex;
			justify-content: center;
			align-items: center;
			width:100%;
			height:0.41rem;
			margin-top:0.35rem;
			p{
				width:2.2rem;
				height:0.41rem;
				text-align: center;
				line-height: 0.41rem;
				font-size:0.18rem;
				color:#fff;
				background: #30BFBE;
				border-radius:6px;
			}
		}
	}
</style>
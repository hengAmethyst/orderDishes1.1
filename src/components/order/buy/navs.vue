<template>
	<div class="navs">
		<p href="javascript:" onclick="history.back()" >
			<i class='iconfont icon-zuojiantou'></i>
			<span>菜单</span>
		</p>
		<p>
			{{information.name}}
		</p>
		<p>
			<span>
				<!--<a href="javascript:location.reload();">
					<img src="../../../assets/icons/刷新@3x.png" href="javascript:location.reload();" v-show="information.ifShowReload"/>
				</a>-->
			</span>
			<!--我的订单-->
			<span>
				<router-link to="/order/indent">
					<img src="../../../assets/icons/订单@3x.png" v-show="information.ifShowMenu"/>
				</router-link>
			</span>
		</p>
	</div>
</template>
<script>
	export default{
		props:['information']
	}
</script>
<style lang="scss">
	.navs{
			display:flex;
			justify-content: space-between;
			align-items:center;
			width:100%;
			height:0.6rem;
			background: #fff;
			border-bottom: 1px solid #f9f9f9;
			p:nth-child(1){
				width:0.8rem;
				margin-left:0.15rem;
				color:#282828;
				i{
					font-size:0.16rem;
				}
				span{
					font-size:0.16rem;
				}
			}
			p:nth-child(2){
				width:1.4rem;
				margin-left:0.25rem;
				text-align: center;
				color:#282828;
				font-size:0.20rem;
			}
			p:nth-child(3){
				display:flex;
				justify-content: flex-end;
				width:1rem;
				margin-right:0.08rem;
				span:nth-child(1){
					display: flex;
					justify-content: center;
					align-items: center;
					a{
						img{
							width:0.4rem;
							height:0.4rem;
							margin-right:0.05rem;
						}
					}
				}
				span:nth-child(2){
					img{
						width:0.22rem;
						height:0.24rem
					}
				}
			}
		}
</style>
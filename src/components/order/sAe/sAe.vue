<template>
	<div class='sAe'>
		<div class="banner">
			<img src="../../../assets/icons/餐厅背景.png"/>
			<span>{{this.$store.state.merchantName}}</span>
		</div>
		<div class="averageStar">
			<span>
				{{this.$store.state.merchantName}}
			</span>			
		</div>
		<div class='information'>
			<p>11:00-00:00</p>
			<p>{{merchantInfo.address}}</p>
			<span>
				<img src="../../../assets/icons/电话@3x.png" @click="iFlag=true"/>
			</span>
		</div>
		<div class="reward">
			<span>
				商家活动
			</span>
		</div>
		<div class="activities">
			<span>商家暂时没有活动</span>
		</div>
		<!--蒙版-->
		<div class="shadow" v-show="iFlag" @click="iFlag=false">
		</div>
		<!--蒙版内容-->
		<div class="shadow-inner" v-show="iFlag">
				<p>{{merchantInfo.contactPhone}}</p>
				<p>
					<span @click="iFlag=false">取消</span>
					<span>
						<a :href="'tel:'+merchantInfo.contactPhone">
							呼叫
						</a>
					</span>
				</p>
		</div>
		<!--空白-->
		<div class="space">
			
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				iFlag:false,
				//商品信息
				merchantInfo:{}
			}
		}
		,
		created(){
			this.$http.post(this.$store.state.merchantHttp+"/merchant/merchantBasicInfo/api/pc/getMerchantBasicInfoById",
							JSON.stringify({"param":{"merchantId":this.$store.state.merchantId},"channel":1})
						,{
							emulateJSON:true  //必须设置这个头文件
						}).then(function(res){
							console.log(res)
							this.merchantInfo = res.body.data
						})
		}
	}
</script>
<style lang='scss'>
	.sAe{
		display: flex;
		flex-direction: column;
		align-items: center;
		width:100%;
		height:100%;
		flex:1;
		overflow: scroll;
		background:#f6f6f6;
		.banner{
			position:relative;
			width:100%;
			height:2rem;
			span{
				position:absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				color:white;
				font-family: PingFangSC-Medium;
				font-size:0.24rem;
			};
			img{
				width:100%;
				height:100%;
			}
		};
		.averageStar{
			width:100%;
			height:0.4rem;
			background:#fff;
			line-height:0.4rem;
			border-bottom:0.05rem solid #f6f6f6;
			span{
				margin-left:0.2rem;
				font-size:0.2rem;
				color:#333;
			}
		};
		.information{
			position:relative;
			width:100%;
			background:white;
			line-height: 0.3rem;
			p:nth-child(1){
				margin-left:0.2rem;
				font-size:0.16rem;
				color:#6A6A6A;
			}
			p:nth-child(2){
				width:80%;
				margin-left:0.2rem;
				font-size:0.16rem;
				color:#6A6A6A;
			}
			span{
				position:absolute;
				top:15%;
				right:0;
				display:inline-block;
				display:flex;
				justify-content: center;
				align-items: center;
				width:0.54rem;
				height:0.44rem;
				border-left:1px solid #E5E5E5;
				img{
					width:0.18rem;
					height:0.18rem;
				}
			}
			
		}
		.parkTime{
			width:100%;
			height:0.4rem;
			background:white;
			line-height:0.4rem;
			span{
				margin-left:0.2rem;
				color:#6A6A6A;
			}
		};
		.activity{
			display: flex;
			align-items: center;
			width:100%;
			height:0.4rem;
			background:white;
			img{
				margin-left:0.15rem;
			}
			p{
				margin-left: 0.4rem;
				font-size: 0.14rem;
				span{
					display: inline-block;
					width:0.32rem;
					height:0.2rem;
					margin-left:0.1rem;
					background:#EE5A32;
					border-radius: 0.02rem;
					color:white;
					line-height: 0.2rem;
					text-align: center;
				}
			}
		};
		.reward{
			width:100%;
			height:0.35rem;
			line-height:0.35rem;
			background:#f6f6f6;
			span{
				margin-left:0.2rem;
				font-size: 0.14rem;
				color:#6A6A6A;
			}
		}
		.activities{
			width:100%;
			height:0.6rem;
			line-height:0.6rem;
			background:#fff;
			span{
				margin-left:0.2rem;
				line-height:0.35rem;
				font-size:0.16rem;
				color:#31C4C3;;
			}
		}
		/*蒙版*/
		.shadow{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			opacity: 0.7;
			background:#000;
			z-index:2003;
		}
		.shadow-inner{
			position:absolute;
			top:42%;
			left:18%;
			width:2.45rem;
			height:0.96rem;
			background:black;
			z-index: 2004;
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
			border-radius:0.18rem;
			p:nth-child(1){
				width:100%;
				height:0.57rem;
				text-align: center;
				line-height:0.57rem;
				font-size:0.18rem;
				color:#333;
				border-bottom:1px solid #EEEEEE;
			}
			p:nth-child(2){
				display:flex;
				span:nth-child(1){
					display:inline-block;
					width:1.22rem;
					height:0.375rem;
					text-align: center;
					line-height:0.375rem;
					font-size:0.16rem;
					color: #6A6A6A;
					border-right:1px solid #EEEEEE;
				}
				span:nth-child(2){
					display:inline-block;
					flex:1;
					text-align:center;
					line-height:0.375rem;
					font-size:0.16rem;
					color: #0977FA;
					a{
						color: #31C4C3;
					}
				}
			}
		}
		.space{
			width:100%;
			flex:1;
			background:#f6f6f6;
		}
	}
</style>
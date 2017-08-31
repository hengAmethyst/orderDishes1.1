<template>
	<div class="reward">
		<!--nav-->
		<div class="navs">
			<p href="javascript:" onclick="history.back()">
				<i class='iconfont icon-zuojiantou'></i>
				<span>菜单</span>
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
		<!--可以滑动区域-->
		<div class="wrapper">
			<!--评价-->
			<div class="swiper-container swiper-container-horizontal swiper-container-3d swiper-container-coverflow">
				<div class=" swiper-wrapper">
					<div class="swiper-slide" v-for="item in waiterList">
						<div class="inner">
							<p>
								<img :src="item.headImageUrl"/>
								<span>服务员:{{item.nickName}}<i v-show="false" class="waiterId">{{item.waiterId}}</i></span>
							</p>
							<p>
								<span>打赏<i>{{item.gratuityCount}}</i>次</span>
								<span>评价<i>{{item.evaluationCount}}</i>次</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<!--打赏-->
			<div class="reward-money">
				<!--打赏头部信息-->
				<div class="isReward">
					<p>
						<span>打赏金额</span>
					</p>
				</div>
				<!--打赏选项-->
				<div class="isMoney">
					<p>
						<span v-for="(item,index) in moneyData" v-if="index<4">￥{{item.amount/100}}</span>
					</p>
				</div>
			</div>
			<!--提交按钮-->
			<div class="submit-btn">
				<el-button @click="submit">提 交</el-button>
			</div>
			<alert :showMsg="showMsg" v-if="showAlert"></alert>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				value1: null,
       			value2: null,
       			rewardMoney:0,
       			information:{name:'打赏',ifShowReload:false,ifShowMenu:true},
       			//服务员list
       			waiterList:[],
       			//打赏的金额list
       			moneyData:null,
       			//打赏金额Id
       			moneyId:null,
       			showMsg:'打赏失败,请重试',
       			//是否展示弹框
       			showAlert:false,
       			//服务员Id
       			waiterId:null,
       			//打赏的支付码
       			orderNo:null
			}
		}
		,
		methods:{
			submit(){
				//打赏价码点击
				let obj = document.getElementsByClassName('isMoney')[0]
				let oSpan = obj.getElementsByTagName('span')
				for(let i=0;i<oSpan.length;i++){
					if(oSpan[i].className){
						this.tempMoney = oSpan[i].innerHTML.substr(1)
						this.tempMoney = String(this.tempMoney*100)
						for(let j=0;j<this.moneyData.length;j++){
							if(this.tempMoney.indexOf(this.moneyData[j].amount)>-1){
								this.moneyId = this.moneyData[j].id
							}
						}
					}
				}
				//获取waiterId
				this.waiterId = $('.swiper-slide-active .waiterId').html()
				//调用打赏提交
				this.$http.post(this.$store.state.rewardHttp+'/jinghan-reward/rewards',
				JSON.stringify({"bountyId":this.moneyId,"waiterId":this.waiterId,"openId":this.$store.state.openId,"nickName":this.$store.state.nickName,"dataSource":2})
				,{emulateJSON:true})
				.then(function(res){
					//打赏的orderNo
					this.orderNo = res.body.data.orderNo
					//调用微信支付接口
					this.$http.post(this.$store.state.paymentHttp+"/jinghan-payment/api/wx/wxUnifiedOrder",
					JSON.stringify({"param":{"openid":this.$store.state.openId,
											"orderNo":this.orderNo,
											"tradeType":"JSAPI",
											"billType":8},
											"reqId":1,
											"sign":"",
											"signType":"RSA",
											"token":"0087506ce6e24472bc8a176e482ac85b",
											"ver":"1.0"})
				,{emulateJSON:true})  //必须设置这个头文件
				.then(
					function(ret){
						this.$store.state.q = ret.body
						if(ret.body.code != 0) {
							this.showAlert = true
							let that = this
							setTimeout(function(){
								that.showAlert = false
							},2000)
							this.$store.state.payResult = '支付失败'
							return
						}else{
								var appId = ret.body.data.appId
								var nonceStr = ret.body.data.nonceStr
								var packageStr = ret.body.data.package
								var paySign = ret.body.data.paySign
								var signType = ret.body.data.signType
								var timeStamp = ret.body.data.timeStamp
								var that = this
								WeixinJSBridge.invoke(
							    			"getBrandWCPayRequest", {
							           "appId": appId,     //公众号名称，由商户传入     
							           "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
							           "nonceStr": nonceStr, //随机串     
							           "package": packageStr,     
							           "signType": signType,         //微信签名方式：     
							           "paySign": paySign //微信签名 
							       },
							       function(res){ 
							           if(res.err_msg != "get_brand_wcpay_request:ok" ) {
							        	  	 alert(res.err_msg);    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
							           }else{
										that.$router.push({path:'/order/buy/ratingOrRewardSucceed'})
							           }
							       	}
							   )
						}
					})
				})
			}
		}
		,
		created(){
			//服务员信息获取
			this.$http.post(this.$store.state.waiterHttp+"/jinghan-waiter/waiterTable/api/waiters",
				JSON.stringify({"param":{"id":this.$store.state.tableId}})
				,{emulateJSON:true})  //必须设置这个头文件
				.then(function(res){
					console.log('人数')
					console.log(res)
					this.waiterList = res.body.data
				})
			//取打赏标签
			this.$http.post(this.$store.state.rewardHttp+"/jinghan-reward/bountys",
				JSON.stringify({})
				,{emulateJSON:true})
				.then(function(res){
					console.log(res)
					this.moneyData = res.body.data
				})
		}
		,
		updated(){
			//打赏金额选择
			var obj1 = document.getElementsByClassName('isMoney')[0]
			var oSpan1 = obj1.getElementsByTagName('span')
				for(var i=0;i<oSpan1.length;i++){
					oSpan1[i].index = i
					oSpan1[i].onclick = function(){
						//判断是否有class
						if(this.className){
							var temp = true
						}
						//清空所有
						for(var j=0;j<oSpan1.length;j++){
							oSpan1[j].className = ''
						}
						if(temp){
							this.className = 'ratingActive'
						}
						if(this.className){
							this.className = ''
						}
						else{
							this.className = 'ratingActive'
						}
					}
				}
			//swiper滑动
		    var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        effect: 'coverflow',
		        grabCursor: true,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        coverflow: {
		            rotate: 50,
		            stretch: 0,
		            depth: 100,
		            modifier: 1,
		            slideShadows : true
		        }
		    })
		}
	}
</script>
<style lang="scss">
	.reward{
		position:relative;
		display:flex;
		flex-direction:column;
		height:100%;
		background:#f9f9f9;
		.navs {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 0.6rem;
			background: #fff;
			p:nth-child(1) {
				width: 0.8rem;
				margin-left: 0.15rem;
				font-size: 0.16rem;
				color: #282828;
			}
			p:nth-child(2) {
				width: 1.4rem;
				margin-left: 0.25rem;
				text-align: center;
				font-size: 0.20rem;
				color: #282828;
			}
			p:nth-child(3) {
				display: flex;
				justify-content: flex-end;
				width: 1rem;
				margin-right: 0.08rem;
				span:nth-child(1) {
					display: flex;
					justify-content: center;
					align-items: center;
					a {
						img {
							width: 0.22rem;
							height: 0.23rem;
							margin-right: 0.15rem;
						}
					}
				}
				span:nth-child(2) {
					img {
						width: 0.22rem;
						height: 0.23rem;
						margin-right: 0.15rem;
					}
				}
			}
		}
		.wrapper{
			width:100%;
			height:80%;
			.input-words{
				width:100%;
				height:2.6rem;
				.star-rating{
					display:flex;
					justify-content: center;
					width:100%;
					height:2.45rem;
					margin-top:0.6rem;
					.star-rating-child{
						width:90%;
						height:2.45rem;
						border-radius:8px;
						background:#fff;
						/*头像*/
						.head-img{
							display: flex;
							flex-direction: column;
							align-items: center;
							width:100%;
							height:1.2rem;
							margin-top:0.05rem;
							p{
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								width:0.86rem;
								height:1.2rem;
								img{
									width:0.86rem;
									height:0.86rem;
									margin-bottom:0.1rem;
									border-radius:100%;
								}
								span{
									
								}
							}
						}
						/*关于个人打赏*/
						.reward-history{
							display:flex;
							justify-content: center;
							width:100%;
							height:0.4rem;
							p{
								display:flex;
								justify-content: space-between;
								width:40%;
								height:0.4rem;
								line-height:0.4rem;
								span{
									font-size:0.13rem;
									color:#333;
								}
							}
						}
					}
				}
			}
			.reward-money{
				width:100%;
				height:1.4rem;
				background:#fff;
				.isReward{
					display:flex;
					align-items: center;
					width:100%;
					height:0.4rem;
					background:#eee;
					p{
						span:nth-child(1){
							font-size:0.14rem;
							color: #5A5A5A;
							margin-left:0.15rem;
						}
						span:nth-child(2){
							font-size:0.14rem;
							color:#EE5A32;
						}
					}
				}
				.isMoney{
					display: flex;
					justify-content: center;
					width:100%;
					height:0.85rem;
					background:#fff;
					p{
						display: flex;
						justify-content: space-between;
						align-items: center;
						width:80%;
						height:0.85rem;
						span{
							display:inline-block;
							width:0.63rem;
							height:0.4rem;
							line-height:0.4rem;
							text-align: center;
							font-size:0.18rem;
							color:#A0A0A0;
							border:1px solid #E4E4E4;
						}
						input{
							width:0.66rem;
							height:0.4rem;
							text-align: center;
							color:#A0A0A0;
							border: 1px solid #E4E4E4;
							-webkit-appearance: none;
						}
					}
					.ratingActive{
								border:1px solid #f00;
								color:#f00;
					}
				}
			}
			/*button*/
			.submit-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width:100%;
				height:1.12rem;
				margin-top:0.2rem;
				.el-button{
					width:2.2rem;
					height:0.41rem;	
					background: #31C4C3;
					border: 1px solid #31C4C3;
				
					span{
						font-size:0.2rem;
						color:#fff;
					}
				}
			}
		}
		.swiper-container{
			width:100%;
			height:2.2rem;
			background:#f9f9f9;
			.swiper-wrapper{
				    background-position: center;
				    background-size: cover;
				    width: 300px;
				    height: 300px;
				
				.swiper-slide{
					position: relative;	
					flex-shrink: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					height:75%;
					.swiper-slide-shadow-right,.swiper-slide-shadow-left{
						background-image: none !important;
					}
					.inner{
						display:flex;
						flex-direction: column;
						align-items: center;
						width:3.18rem;
						height:2.1rem;
						border-radius:6px;
						background:url(../../../assets/icons/服务员tab@3x.png);
						background-size: 100% 100%;
						/*头像*/
						p:nth-child(1){
							display: flex;
							flex-direction: column;
							align-items:center;
							justify-content: center;
							margin-top:0.165rem;
							img{
								width:1rem;
								height:1rem;
								border-radius:100%;
							}
							span{
								display: inline-block;
								width:1.2rem;
								margin-top:0.08rem;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								text-align: center;
								font-size:0.16rem;
								color:#282828;
							}
						}
						/*数据*/
						p:nth-child(2){
							display:flex;
							justify-content: space-around;
							width:1.5rem;
							margin-top:0.05rem;
							span:nth-child(1){
								font-size:0.13rem;
								color:#333;
								i{
									font-style:normal;
									color:#EE5A32;
								}
							}
							span:nth-child(2){
								font-size:0.13rem;
								color:#333;
								i{
									font-style:normal;
									color:#EE5A32;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
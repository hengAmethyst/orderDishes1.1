<template>
	<div class="pay">
<!--nav-->
		<navs :information="information"></navs>
		<!--支付框-->
		<div class="payBox">
			<div class="payBoxInner">
				<p>
					<span>支付金额</span>
					<span>￥{{totalPrice}}</span>
				</p>
				<p>
					<span>支付方式</span>
					<span>
						<img src="../../../assets/icons/wechatPay.png" v-if="wayImgStatus==1"/>
						<img src="../../../assets/icons/aliPay.png" v-if="wayImgStatus==2"/>
						<i>{{whichServer}}</i>
					</span>
				</p>
			</div>
		</div>
		<!--支付-->
		<div class="payBtn">
			<!--微信-->
			<p @click="enterPay" v-show="this.$store.state.payWeChat&showMsgMark">支 付</p>
			<!--支付宝-->
			<!--<a :href="'http://192.168.2.11:9089/jinghan-payment/api/ali/wapPay?orderNo=' + orderCode +'&billType=1&returnUrl=http://h5test.jinghanit.com:8088/jh/order/buy/paySucceed'">-->
			<!--<a v-show="this.$store.state.payAliPay&showMsgMark" :href="paymentHttp+'/jinghan-payment/api/ali/wapPay?orderNo=' + orderCode +'&merchantId=' + merchantId + '&billType=1&returnUrl=http://h5test.jinghanit.com:8088/jh/order/buy/paySucceed'">-->
			
			<a v-show="this.$store.state.payAliPay&showMsgMark" :href="paymentHttp+'/jinghan-payment/api/ali/wapPay?orderNo=' + orderCode +'&merchantId=' + merchantId + '&billType=1&returnUrl=http://h5.jinghanit.com/jh/order/buy/paySucceed'">
				<p>支 付</p>
			</a>
		</div>
		<!--弹框-->
		<alert :showMsg="showMsg" v-if="showAlert"></alert>
	</div>
</template>
<script>
	export default{
		data(){
			return{
        			money:0,
        			//微信支付
        			weChat:false,
        			//支付宝
        			aliPay:false,
        			//其他
        			others:false,
        			payWays1:false,
        			payWays2:false,
        			//nav组件的控制信息栏
        			information:{name:'支付',ifShowReload:false,ifShowMenu:true},
        			//订单号
        			orderCode:'',
        			//弹框显示信息
        			showMsg:'订单支付失败',
        			//是否显示alert框
        			showAlert:false,
        			//显示微信或者支付宝图片
        			wayImgStatus:null,
        			//显示微信或者支付宝server
        			whichServer:null,
        			showMsgMark:true
			}
		}
		,
		methods:{
			show(){
				this.$store.state.isReward = !this.$store.state.isReward
			},
			enterPay(){
			//清空原始点菜数据
				this.$store.commit('change')
			//微信支付请求
				this.$http.post(this.$store.state.paymentHttp+"/jinghan-payment/api/wx/wxUnifiedOrder",
				JSON.stringify({"param":{"openid":this.$store.state.openId,
										"orderNo":this.orderCode,
										"merchantId":this.$store.state.merchantId,
										"tradeType":"JSAPI",
										"billType":1},
										"reqId":1,
										"sign":"",
										"signType":"RSA",
										"token":"0087506ce6e24472bc8a176e482ac85b",
										"ver":"1.0"})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(
				function(ret){
					this.showMsg = ret.body.showMsg
					if(ret.body.code != 0) {
						//展示弹出框
						this.showAlert = true
						let that = this
						setTimeout(function(){
							that.showAlert = false
						},3000)
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
						           	//显示支付成功界面
							        	that.$store.state.paySucceed = true
							        	//显示pay的支付按钮
							        	that.$store.state.showPayBtn = true
									that.$store.state.payResult = '支付成功'
						           	that.$router.push({path:'/order/buy/paySucceed'})
						           }
						       }
						   )
					}
				})
			},
			//判断显示
			showWays1(){
				this.payWays1=!this.payWays1
				if(this.payWays1){
					this.payWays2 = false
				}
			},
			showWays2(){
				this.payWays2=!this.payWays2
				if(this.payWays2){
					this.payWays1 = false
				}
			}
		}
		,
		created(){
			//判断用什么浏览器方式打开
			var userWay = navigator.userAgent
			if(userWay.indexOf('MicroMessenger') >= 0){
				this.weChat = true
				this.$store.state.payWeChat = this.weChat
				this.wayImgStatus = 1
				this.whichServer = '微信'
			}
			else if(userWay.indexOf('AlipayClient') >= 0){
				this.aliPay = true
				this.$store.state.payAliPay = this.aliPay
				this.wayImgStatus = 2
				this.whichServer = '支付宝'
			}
			else{
				this.others = true
			}
			//加载时获取订单号
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/billInfo/payOrder",
				JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,
										"tableId":this.$store.state.tableId,
										"userId":this.$store.state.nickName,
										"memberPhoneNumber":this.$store.state.phoneNumber,
										"id":this.$store.state.orderId},"channel":1})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(function(res){
				console.log(res)
				if(res.body.msg.indexOf("订单已经支付，不要重复支付")>-1){
					this.showMsg = res.body.msg
					this.showMsgMark = false
					this.showAlert = true
					var that = this
					setTimeout(function(){
						that.showAlert = false
					},2000)
				}
				else{
					this.orderCode = res.body.data.orderCode
					this.$store.state.orderNo = res.body.data.orderCode
				}
				//存储信息到本地
				let needSaveInfo = {
									openId:this.$store.state.openId,
									nickName:this.$store.state.nickName,
									headImgUrl:this.$store.state.headImgUrl,
									merchantId:this.$store.state.merchantId,
									tableId:this.$store.state.tableId,
									merchantName:this.$store.state.merchantName,
									orderNo:this.orderCode,
									orderId:this.$store.state.orderId,
									merchantPicUrl:this.$store.state.merchantPicUrl,
									orderTime:this.$store.state.orderTime
				}
				needSaveInfo = JSON.stringify(needSaveInfo)
				//保存到本地sessionStorage
//				sessionStorage.setItem('needSaveInfo',needSaveInfo)
				$.fn.cookie('needSaveInfo',needSaveInfo, { expires: 1 })
			})
		}
		,
		computed:{
			totalPrice(){
				return Number(this.$store.state.needPay).toFixed(2)
			},
			merchantId(){
				return this.$store.state.merchantId
			},
			paymentHttp(){
				return this.$store.state.paymentHttp
			}
		}
	}
</script>
<style lang="scss">
	.pay{
		width:100%;
		height:100%;
		background:#f9f9f9;
		.payBox{
			display: flex;
			justify-content: center;
			width:100%;
			.payBoxInner{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width:3.3rem;
				height:1.3rem;
				margin-top:0.41rem;
				background:url(../../../assets/icons/支付@3x.png);
				background-size: 100% 100%;
				p:nth-child(1){
					display: flex;
					justify-content: space-between;
					align-items: center;
					width:80%;
					height:0.64rem;
					margin-top:0.1rem;
					border-bottom:2px solid #F9F9F9;
					span:nth-child(1){
						font-size:0.16rem;
						color: #282828;
					}
					span:nth-child(2){
						font-size:0.2rem;
						color: #FF0000;
					}
				}
				p:nth-child(2){
					display: flex;
					justify-content: space-between;
					align-items: center;
					width:80%;
					height:0.64rem;
					span:nth-child(1){
						font-size:0.16rem;
						color: #282828;
					}
					span:nth-child(2){
						display: flex;
						width:0.7rem;
						justify-content: space-between;
						align-items: center;
						img{
							width:0.18rem;
							height:0.18rem;
						}
						i{
							font-style:normal;
							font-size:0.16rem;
							color: #282828;
						}
					}
				}
			}
		}
		/*支付按钮*/
		.payBtn{
			position:relative;
			display: flex;
			justify-content: center;
			width:100%;
			p{
				position:absolute;
				top:0;
				left:50%;
				transform: translateX(-50%);
				width:2.2rem;
				height:0.41rem;
				margin-top:0.5rem;
				line-height:0.41rem;
				text-align: center;
				font-size:0.18rem;
				color:#fff;
				background: #31C4C3;
				border-radius: 4px;
			}
		}
	}
</style>
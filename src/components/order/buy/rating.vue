<template>
	<div class="rating">
		<!--导航栏-->
		<navs :information="information"></navs>
		<!--可滚动区域-->
		<div class="rating-scroll-area">
			<!--评价餐厅-->
			<div class="rating-merchant">
				<div class="rating-merchant-head">
					<p>评价餐厅</p>
				</div>
				<div class="merchant-info">
					<img :src="merchantPicUrl"/>
					<p>
					<span>{{this.$store.state.merchantName}}</span>
					<span></span>
					</p>
				</div>
				<div class="merchant-rating-star">
					<!--评星-->
					<div class="block">
			 			 <el-rate v-model="merchantStar"></el-rate>
					</div>
				</div>
				<div class="merchant-rating-input">
					<textarea type="text" v-model="merchantInput" @focus="hideBtn" @blur="showBtn"></textarea>
				</div>
			</div>
			<!--评价服务员-->
			<div class="rating-waiter"  v-for="(item,index) in waiterList" v-if="index<showIfWaiter">
				<!--只有第一个显示评价服务员这个标签-->
				<div class="rating-waiter-head" v-if="index==0">
					<p>评价服务员</p>
				</div>
				<div class="waiter-info">
					<img :src="item.headImageUrl"/>
					<p>
					<span>{{item.nickName}}</span>
					</p>
				</div>
				<!--评星-->
				<div class="waiter-rating-star">
					<div class="block block-waiter">
			 			 <el-rate v-model="waiterStar[index]"></el-rate>
					</div>
				</div>
				<!--输入区域-->
				<div class="waiter-rating-input">
					<textarea type="text" v-model="waiterInput[index]" @focus="hideBtn" @blur="showBtn"></textarea>
				</div>
			</div>
			<!--服务员评价数量扩张-->
			<div class="openOther"v-if="waiterList.length>1">
				<span @click="getMoreWaiters">
					查看全部服务员
					<i class="icon iconfont icon-yqfxiajiantou" ref="getMoreWaiters"></i>
				</span>
			</div>
			<!--评价菜品-->
			<div class="rating-dishes">
				<div class="rating-dishes-head">
					<p>评价菜品</p>
				</div>
				<div class="rating-dishes-list">
					<ul>
						<li v-for="(item,index) in dishesRatingList" v-if="index<showIf&item.status!=5&item.status!=6">
							<p>
								<span>{{item.dishesName}}</span>
							</p>
							<p class="dishesRatingList">
								<span @click="goodRating(index)" ref="good">
									<i class="icon iconfont icon-haoping"></i>
									<b>赞</b>
									<h1 v-show="false">1</h1>
								</span>
								<span @click="badRating(index)" ref="bad">
									<i class="icon iconfont icon-chaping"></i>
									<b>踩</b>
									<h1 v-show="false">2</h1>
								</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<!--菜品数量扩张-->
			<div class="openOther" v-if="dishesRatingList.length>=5">
				<span @click="getMoreDishes">
					查看全部菜品
					<i class="icon iconfont icon-yqfxiajiantou" ref="getMoreDishes"></i>
				</span>
			</div>
		</div>
		<!--提交按钮-->
		<div class="rating-submit-btn" v-if="btnShow">
			<router-link to="/order/buy/ratingFinished">
				<p class="btn" @click="submitRating">
					提交
				</p>
			</router-link>
		</div>
	</div>
</template>
<script>
import Swiper from '../../../../static/swiper-3.4.2.jquery.min.js'
export default{
	data(){
		return{
			//商铺星的数量
       		merchantStar:null,
       		//商铺input评论
       		merchantInput:'',
       		//nav的显示控制
			information:{name:'评价',ifShowReload:false,ifShowMenu:true},
			//服务员是否最初就显示在评论区的数量控制
			showIfWaiter:1,
			//菜品是否最初就显示在评论区的数量控制
			showIf:4,
			rating:null,
			//服务员list
			waiterList:[],
			//服务员评星
			waiterStar:[],
			//服务员输入框
			waiterInput:[],
			//评论等级
			waiterRatingLevel:[],
			//需要评论的菜品名list
			dishesRatingList:[],
			//显示提交按钮
			btnShow:true
		}
	}
	,
	methods:{
		//展示提交按钮与否
		hideBtn(){
			this.btnShow = false
		},
		showBtn(){
			this.btnShow = true
		},
		//查看更多服务员,控制箭头的方向和显示更多的服务员
		getMoreWaiters(){
			if(this.$refs.getMoreWaiters.className.indexOf('icon-yqfxiajiantou')>0){
				this.$refs.getMoreWaiters.className = 'icon iconfont icon-yqfshangjiantou'
				this.showIfWaiter = 100
			}
			else{
				this.$refs.getMoreWaiters.className = 'icon iconfont icon-yqfxiajiantou'
				this.showIfWaiter = 1
			}
		},
		//查看更多菜品,控制箭头的方向和显示更多的菜品
		getMoreDishes(){
			if(this.$refs.getMoreDishes.className.indexOf('icon-yqfxiajiantou')>0){
				this.$refs.getMoreDishes.className = 'icon iconfont icon-yqfshangjiantou'
				this.showIf = 100
			}
			else{
				this.$refs.getMoreDishes.className = 'icon iconfont icon-yqfxiajiantou'
				this.showIf = 4
			}
		},
		submitRating(){
			//制造服务员提交参数
			var tempEvaluationInfos = []
			for(let i=0;i<this.waiterList.length;i++){
				//判断评星等级type
				if(this.waiterStar[i]<3){
					this.waiterRatingLevel[i] = 3
				}
				if(this.waiterStar[i]>2&this.waiterStar[i]<5){
					this.waiterRatingLevel[i] = 2
				}
				if(this.waiterStar[i]==5){
					this.waiterRatingLevel[i] = 3
				}
				tempEvaluationInfos.push({"waiterId":this.waiterList[i].waiterId,"type":this.waiterRatingLevel[i],"content":this.waiterInput[i],"stars":this.waiterStar[i]})
			}
			//店铺参数预定义
			var tempParam = {"param":{
					"merchantId":this.$store.state.merchantId,
					"merchantName":this.$store.state.merchantName,
					"openId":this.$store.state.openId,
					"nickName":this.$store.state.nickName,
					"headImgUrl":this.$store.state.headImgUrl,
					"orderNo":this.$store.state.orderNo,
					"evaluationInfos":tempEvaluationInfos
				}
			}
			//菜品评价参数
			var tempDishRating = []
			for(let i=0;i<this.dishesRatingList.length;i++){
				tempDishRating.push(
					{
						"merchantId":this.$store.state.merchantId,
						"id":this.dishesRatingList[i].dishesId,
						"thumbUpAmount":this.dishesRatingList[i].ratingTypeUp,
						"thumbDownAmount":this.dishesRatingList[i].ratingTypeDown
					}
				)
			}
			//提交服务员评论/商品评价
			this.$http.post(this.$store.state.waiterHttp+"/jinghan-waiter/waiter/api/waiter/v1/submitMultipleEvaluate",
			JSON.stringify(tempParam)
			,{emulateJSON:true})
			.then(function(res){
				console.log(res)
				this.$http.post(this.$store.state.merchantHttp+"/merchant/merchantComments/api/v1/submitComments",
					JSON.stringify({"param":{
									    "merchantId": this.$store.state.merchantId,
									    //这里的userId就是openId
									    "userId":this.$store.state.openId,
									    //2代表openId
									    "commentsIdType":2,
									    "portraitPicUrl":this.$store.state.headImgUrl,
										"orderNo":this.$store.state.orderNo,
									    "description": this.merchantInput,
									   	"userName":this.$store.state.nickName,
									    "starType": this.merchantStar,
									    "thumbAmountList":tempDishRating
									}
								  })
				,{emulateJSON:true})
				.then(function(res){
					this.$store.state.showRatingBtn = false
					this.$router.push({path:'/order/buy/ratingFinished'})
					console.log(res)
				})
			})
		},
		//点赞
		goodRating(target){
			let tempIndex = false
			if(this.$refs.good[target].className=="praise-active"){
				tempIndex = true
			}
			//清空class
			for(let i=0;i<this.$refs.good[target].parentElement.children.length;i++){
				this.$refs.good[target].parentElement.children[i].className = ''
			}
			if(tempIndex){
				this.dishesRatingList[target].ratingTypeUp = 0
			}
			else{
				this.$refs.good[target].className = 'praise-active'
				this.dishesRatingList[target].ratingTypeUp = 1
				this.dishesRatingList[target].ratingTypeDown = 0
			}
		}
		,
		badRating(target){
			let tempIndex = false
			if(this.$refs.bad[target].className=="praise-active"){
				tempIndex = true
			}
			for(let i=0;i<this.$refs.bad[target].parentElement.children.length;i++){
				this.$refs.bad[target].parentElement.children[i].className = ''
			}
			if(tempIndex){
				this.$refs.bad[target].className = ''
				this.dishesRatingList[target].ratingTypeDown = 0
			}
			else{
				this.$refs.bad[target].className = 'praise-active'
				this.dishesRatingList[target].ratingTypeDown = 1
				this.dishesRatingList[target].ratingTypeUp = 0
			}
		}
	}
	,
	created(){
		//服务员信息获取
		this.$http.post(this.$store.state.waiterHttp+"/jinghan-waiter/waiterTable/api/waiters",
				JSON.stringify({"param":{"id":this.$store.state.tableId}})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(function(res){
				console.log('人数')
				console.log(res)
				//如果返回的结果正确
				if(typeof(res.body.data)!='undefined'){
					this.waiterList = res.body.data
					//生成waiter记录数组
					for(let i=0;i<this.waiterList.length;i++){
						this.waiterStar.push(null)
						this.waiterInput.push(null)
						this.waiterRatingLevel.push(null)
					}
				}
			})
		//获取菜品的信息
		this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getOrderDetailById",
				JSON.stringify({"param":{
								"merchantId":this.$store.state.merchantId,
								"tableId":this.$store.state.tableId,
								"id":this.$store.state.orderId},
								"channel":1})
			,{
				emulateJSON:true  //必须设置这个头文件
			}).then(function(res){
				console.log(res)
				//如果返回的结果正确
				if(typeof(res.body.data)!="undefined"){
					var tempArryList = []
					var tempDishesList = res.body.data.orderItemList
					//记号，判断是否需要添加到新的数组
					var tempIndex = false
					for(let i=0;i<tempDishesList.length;i++){
						if(tempArryList.length){
							for(let j=0;j<tempArryList.length;j++){
								if(tempArryList[j].dishesId == tempDishesList[i].dishesId){
									tempIndex = true
								}
							}
							if(!tempIndex){
								tempArryList.push(tempDishesList[i])
							}
						}
						else{
							tempArryList.push(tempDishesList[i])
						}
					}
					this.dishesRatingList = tempArryList
					//添加属性
					for(let k=0;k<this.dishesRatingList.length;k++){
						this.dishesRatingList[k].ratingTypeUp = 0
						this.dishesRatingList[k].ratingTypeDown = 0
					}
				}
			})
	}
	,
	mounted(){
		//商户的星评价调节
		$('.merchant-rating-star .el-rate span').click(function(){
			if($(this).index()<1){
				if($(this).find('i').hasClass('hover')&$(this).find('i').hasClass('el-icon-star-on')){
					$(this).find('i').removeClass('el-icon-star-on')
					$(this).find('i').addClass('el-icon-star-off')
					$(this).find('i').css('color','rgb(198, 209, 222)')
				}
				else{
					$(this).find('i').addClass('el-icon-star-on')
					$(this).find('i').css('color','rgb(247, 186, 42)')
				}
			}
			else{
				$(this).parent().find('span').eq(0).find('i').css('color','rgb(247, 186, 42)')
			}
		})
	}
	,
	computed:{
		merchantPicUrl(){
			return this.$store.state.merchantPicUrl
		}
	}
}
</script>
<style lang="scss">
	.rating{
		display: flex;
		flex-direction:column;
		width:100%;
		height:100%;
		/*可滚动区域*/
		.rating-scroll-area{
			flex:1;
			width:100%;
			height:70%;
			overflow:scroll;
			/*评价服务员*/
			.rating-waiter{
				width:100%;
				height:2.7rem;
				/*服务员信息头部*/
				.rating-waiter-head{
					width:100%;
					height:0.3rem;
					background: #F9F9F9;
					p{
						margin-left:0.15rem;
						line-height:0.3rem;
						font-size:0.16rem;
						color: #6A6A6A;
					}
				}
				/*服务员信息*/
				.waiter-info{
					display: flex;
					align-items: center;
					width:100%;
					height:0.8rem;
					border-bottom: 1px solid #F9F9F9;
					img{
						width:0.5rem;
						height:0.5rem;
						margin-left:0.15rem;
						border-radius: 4px;
					}
					p{
						display:flex;
						flex-direction: column;
						margin-left:0.15rem;
						span:nth-child(1){
							font-size:0.16rem;
							color: #282828;
						}
						span:nth-child(2){
							font-size:0.15rem;
							color: #787878;
							i{
								font-style:normal;
								color:#EE5A32;
							}
						}
					}
				}
				/*评星*/
				.waiter-rating-star{
					display: flex;
					align-items: center;
					justify-content: center;
					width:100%;
					height:0.475rem;
					.block{
						display: flex;
						align-content: center;
						justify-content: center;
					}
				}
				/*输入框*/
				.waiter-rating-input{
					display:flex;
					justify-content:center;
					width:100%;
					height:0.9rem;
					textarea{
						width:2.5rem;
						height:100%;
						margin-left:0.15rem;
						padding-left:0.15rem;
						padding-top:0.15rem;
						font-size:0.16rem;
						background: #FDFDFD;
						border: 1px solid #E4E4E4;
						resize : none;
			  			-webkit-appearance: none;
					}
				}
			}
			/*评价餐厅*/
			.rating-merchant{
				width:100%;
				height:2.7rem;
				/*服务员信息头部*/
				.rating-merchant-head{
					width:100%;
					height:0.3rem;
					background: #F9F9F9;
					p{
						margin-left:0.15rem;
						line-height:0.3rem;
						font-size:0.16rem;
						color: #6A6A6A;
					}
				}
				/*服务员信息*/
				.merchant-info{
					display: flex;
					align-items: center;
					width:100%;
					height:0.8rem;
					border-bottom: 1px solid #F9F9F9;
					img{
						width:0.5rem;
						height:0.5rem;
						margin-left:0.15rem;
						border-radius: 4px;
					}
					p{
						display:flex;
						flex-direction: column;
						margin-left:0.15rem;
						span:nth-child(1){
							font-size:0.16rem;
							color: #282828;
						}
						span:nth-child(2){
							font-size:0.15rem;
							color: #787878;
							i{
								font-style:normal;
								color:#EE5A32;
							}
						}
					}
				}
				/*评星*/
				.merchant-rating-star{
					display: flex;
					align-items: center;
					justify-content: center;
					width:100%;
					height:0.475rem;
					.block{
						display: flex;
						align-content: center;
						justify-content: center;
					}
				}
				/*输入框*/
				.merchant-rating-input{
					display:flex;
					justify-content:center;
					width:100%;
					height:0.9rem;
					textarea{
						width:2.5rem;
						height:100%;
						margin-left:0.15rem;
						padding-left:0.15rem;
						padding-top:0.15rem;
						font-size:0.16rem;
						background: #FDFDFD;
						border: 1px solid #E4E4E4;
						resize : none;
			  			-webkit-appearance: none;
					}
				}
			}
			/*打开其他服务员的评价*/
			.openOther{
				display:flex;
				justify-content: center;
				align-items: center;
				width:100%;
				height:0.35rem;
				border-top: 1px  solid #E5E5E5;
				border-bottom: 1px  solid #E5E5E5;
				span{
					color: #FF0000;
					i{
						margin-left:0.05rem;
						font-size: 0.12rem;
					}
				}
			}
			/*菜品评价*/
			.rating-dishes{
				width:100%;
				.rating-dishes-head{
					width:100%;
					height:0.3rem;
					background: #F9F9F9;
					p{
						margin-left:0.15rem;
						line-height:0.3rem;
						font-size:0.16rem;
						color: #6A6A6A;
					}
				}
				/*菜品评论list*/
				.rating-dishes-list{
					width:100%;
					ul{
						li{
							display:flex;
							justify-content: space-between;
							align-items: center;
							width:100%;
							height:0.35rem;
							p:nth-child(1){
								span{
									margin-left:0.15rem;
									line-height:0.35rem;
									font-size:0.15rem;
									color: #282828;
								}
							}
							/*点赞*/
							p:nth-child(2){
								display: flex;
								span:nth-child(1){
									display: flex;
									justify-content: space-around;
									align-items: center;
									width:0.4rem;
									height:0.2rem;
									margin-right:0.1rem;
									color: #6A6A6A;
									border: 1px solid #E4E4E4;
									border-radius: 100px;
									i{
										font-size:0.12rem;
									}
								}
								span:nth-child(2){
									display: flex;
									justify-content: space-around;
									align-items: center;
									width:0.4rem;
									height:0.2rem;
									margin-right:0.25rem;
									color: #6A6A6A;
									border: 1px solid #E4E4E4;
									border-radius: 100px;
									i{
										font-size:0.12rem;
									}
								}
								.praise-active{
									border:1px solid #EE5A32 !important;
									color:#EE5A32 !important;
								}
							}
						}
					}
				}
			}
		}
		/*提交按钮*/
		.rating-submit-btn{
			position:relative;
			display:flex;
			justify-content: center;
			align-items: center;
			width:100%;
			height:0.9rem;
			background:#F9F9F9;
			p{
				width:2.2rem;
				height:0.41rem;
				text-align: center;
				line-height:0.41rem;
				font-size:0.2rem;
				color:#fff;
				background: #30BFBE;
				border-radius: 6px;
			}
		}
	}
</style>
<template>
	<div class="numControl">
		<div class="block">
			<!--用来占位-->
			<span class="space" v-show="!food.count"></span>
			<span class="space-num" v-show="!food.count"></span>
			<img src="../../../assets/icons/减去商品@3x.png" class="icon iconfont icon-jian" v-show="food.count>0" @click.stop.prevent="decreaseCart"/>
			<span v-show="food.count>0" class="numCount">{{food.count}}</span>
			<img src="../../../assets/icons/加上商品@3x.png" class="icon iconfont icon-plus" @click="addCart"/>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
	export default{
		data(){
			return{
			}
		}
		,
		props:['food','otherAdd']
		,
	    	methods:{
		    addCart(){
//		  	  	this.$store.state.tempDishesNum = this.food.count + 1
//		    		this.$store.state.addingIndex = true
//		    		Vue.set(this.food, 'cakeAllMoney' , 0)
//		    		var reloading = false
//		    		//加菜
//				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/addOrderCartItem",
//				JSON.stringify({"param":{
//										"merchantId":this.$store.state.merchantId,
//										"tableId":this.$store.state.tableId,
//										"userId":this.$store.state.nickName,
//										"userName":this.$store.state.nickName,
//										"categoryId":this.food.categoryId,
//										"categoryName":this.food.categoryName,
//										"dishesId":this.food.id,
//										"dishesName":this.food.name,
//										"unitId":this.food.unitId,
//										"unitName":this.food.unitName,
//										"dishesCount":1,
//										"salePrice":this.food.price*100,
//										"dishesPrice":this.food.price*100,
//										"mealsetPrice":this.food.price*100,
//										"memberPrice":this.food.memberPrice*100,
//										"dishPicUrl":this.food.picUrl,
//										"userHeadUrl":this.$store.state.headImgUrl,
//										"memo":"",//整单的输入备注
//										"flavorIdList":"",
//									    "flavorNameList":"",//口味和要求的集合
//									    "dictSetIdList":"",
//									    "dictSetNameList":"",//做法的集合
//										"addedDishList": []
//									},"channel":1})
//					,{emulateJSON:true}).then(
//						function(res){
//							console.log('加菜')
//							console.log(res)
//							this.$store.state.addingIndex = false
//							if(res.body.code==0){
//								reloading = true
//								if(!this.food.showIndex&&!this.food.count&&!this.food.addIndex){
//									Vue.set(this.food, 'showIndex' , true)
//									Vue.set(this.food, 'addIndex' , '+1')
//									Vue.set(this.food, 'count' , 1)
//									Vue.set(this.food, 'cakesMoney' , 0)
//									Vue.set(this.food, 'userNames' , [this.$store.state.nickName])
//									Vue.set(this.food, 'userHeadUrls' , [this.$store.state.headImgUrl])
//									//专门用于减菜
//									Vue.set(this.food, 'cartItemIds' , [res.body.data.cartItemId])
//									//存储备注信息
//									var 	tempMemo = [{headImg:this.$store.state.headImgUrl,
//													nickName:this.$store.state.nickName,
//													cake:this.food.addFoods,
//													flavor:this.food.flavor,
//													ask:this.food.ask}]
//									Vue.set(this.food, 'memoInfo',tempMemo)
//									//存储当前点菜用户信息
//									this.$store.state.nowUserName = this.$store.state.nickName
//									this.$store.state.nowImgUrl = this.$store.state.headImgUrl
//								}
//								else{
//									this.food.count++
//									this.food.addIndex = "+1"
//									this.food.showIndex = true
//									//存储菜的cartItemId
//									this.food.cartItemIds.push(res.body.data.cartItemId)
//									//加入头像
//									this.food.userHeadUrls.push(this.$store.state.headImgUrl)
//									//存储当前点菜用户信息,用于显示
//									this.$store.state.nowUserName = this.$store.state.nickName
//									this.$store.state.nowImgUrl = this.$store.state.headImgUrl
//								}
//						    		//用户头像和名字去重
//						    		//头像
//							    var newArr = []
//							    for(let i=0;i<this.food.userHeadUrls.length;i++){
//							        if(newArr.indexOf(this.food.userHeadUrls[i]) == -1){
//							          newArr.push(this.food.userHeadUrls[i]);
//							      	}
//							    }
//								this.food.userHeadUrls = newArr	
//								//名字
//								var newArr2 = []
//							    for(let i=0;i<this.food.userNames.length;i++){
//							        if(newArr2.indexOf(this.food.userNames[i]) == -1){
//							          newArr2.push(this.food.userNames[i]);
//							      	}
//							    }
//								this.food.userNames = newArr2
//								console.log(this.food.userHeadUrls)
//								//控制动画
//								var self = this
//								setTimeout(function(){
//									self.food.showIndex = false
//								},2500)
//							}
//							else{
//								alert(res.body.msg)
//								console.log('加菜失败')
//							}
//						})
//					//如果一直在加载中
//					var that = this
//					if(!reloading){
//						var timer = setTimeout(function(){
//							reloading = true
//							that.$store.state.addingIndex = false
//							clearTimeout(timer)
//						},6000)
//					}
			}
		    ,
		    decreaseCart(){
		    		this.$store.state.tempDishesNum = this.food.count - 1
		   	 	this.$store.state.addingIndex = true
		   	 	var reloading = false
		   	 	//正常减菜
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/deleteOrderCartItem",
				JSON.stringify({"param":{
										"merchantId":this.$store.state.merchantId,
										"tableId":this.$store.state.tableId,
										"userId":this.$store.state.nickName,
										"userName":this.$store.state.nickName,
										"categoryId":this.food.categoryId,
										"categoryName":this.food.categoryName,
										"dishesId":this.food.id,
										"dishesName":this.food.name,
										"dishesCount":1,
										"salePrice":this.food.price*100,
										"dishesPrice":this.food.price*100,
										"mealsetPrice":this.food.price*100,
										"memberPrice":this.food.memberPrice*100,
										"dishPicUrl":this.food.picUrl,
										"userHeadUrl":this.$store.state.headImgUrl,
										"cartItemId":this.food.cartItemIds[0],
										"memo":"",//整单的输入备注
										"flavorIdList": "",
									    "flavorNameList": "",//口味和要求的集合
									    "dictSetIdList": "",
									    "dictSetNameList": "",//做法的集合
										"addedDishList": []
									},
								"channel":1})
				
				,{emulateJSON:true}).then(
					function(res){
						console.log('减菜')
						console.log(res)
						//减菜成功
						if(res.body.code == 0){
							//加载中记号
							reloading = true
							this.$store.state.addingIndex = false
							this.food.addIndex = "-1"
					    		this.food.count --
							this.food.showIndex = true
							this.food.showTips = false
							this.food.memoLists
							this.food.memoLists.pop()
							//判断头像和菜品数量的关系，是否保留一个头像
							if(this.food.userHeadUrls.length>1){
								this.food.userHeadUrls.splice(0,1)
								this.food.userNames.splice(0,1)
							}
							if(this.food.count==0){
								this.food.userHeadUrls.splice(0,1)
								this.food.userNames.splice(0,1)
							}
							//专为减菜的cartItemIds减一个
							this.food.cartItemIds.splice(0,1)
							this.$store.state.nowUserName = this.$store.state.nickName
							this.$store.state.nowImgUrl = this.$store.state.headImgUrl
							var self = this
							setTimeout(function(){
								self.food.showIndex = false	
							},2500)
						}
					})
				//如果一直在加载中
				var that = this
				if(!reloading){
					var timer = setTimeout(function(){
						reloading = true
						that.$store.state.addingIndex = false
						clearTimeout(timer)
					},6000)
				}
			}
	    }
	    	,
	    	computed:{
	    		otherAddMsg(){
	    			return this.$store.state.otherAddMsg
	    		}
	    	}
	}
</script>
<style lang="scss">
	.numControl{
		display:flex;
		justify-content: space-between;
		align-items: center;   
		width:1rem;
		height:0.3rem;
		.iconfont{
			width:0.21rem;
			height:0.21rem;
		}
		.icon-jian{
			color:#F5A623;
			padding:6px;
		}
		.space{
			display:inline-block;
			width:0.21rem;
			height:0.21rem;
			padding:6px;
		}
		.space-num{
			display:inline-block;
			width:0.3rem;
			height:0.2rem;
		}
		.icon-plus{
			color:#F5A623;
			background:white;
			padding:6px;
		}
		.numCount{
			display:inline-block;
			width:0.3rem;
			height:0.2rem;
			text-align: center;
			font-size: 0.16rem;
			line-height:0.2rem;
			color:#000 !important;
		}
		.showChange{
			position:fixed;
			bottom:9%;
			right:0;
			display:flex;
			align-items: center;
			width:2.8rem;
			height:0.46rem;
			opacity:0;
			background: #444E88;
			box-shadow: 0 2px 4px 0 rgba(220,220,220,0.50);
			border-radius: 100px;
			z-index:4;
			img{
				margin-left:0.03rem;
				width:0.4rem;
				height:0.4rem;
				border-radius: 100%;
			}
			.customName{
				margin-left:0.05rem;
				font-size: 0.13rem;
				color: #FFFFFF;
			}
			span:nth-child(3){
				margin-left:0.1rem;
				font-size: 0.17rem;
				color: #FFFFFF;
				b{
					margin-right:0.13rem;
					font-weight: 100;
				}
			}
		}
		/*按钮加减之后的动画效果*/
		.fold-enter-active{
			/*定义动画延迟的不同时间效果*/
		    transition:bottom 0.5s ease,opacity 8s linear;
		}
		.fold-enter{
			bottom:-10%;
			right:3%;
			width:2.8rem;
			height:0.46rem;
			opacity:0.9;
		}
	}
	.block{
		display:flex;
		align-items: center;
		width:100%;
		height:100%;
	}
</style>
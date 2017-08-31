<template>
	<div class='customNum'>
		<!--头部显示-->
		<div class='title'>
			<div class="num-title">
				<span>选择用餐人数</span>
			</div>
		</div>
		<!--人数选择-->
		<div class='num-row'  @click="btnActive">
			<div class='num-row-1 row rowIndex'>
				<div v-for="(item,index) in 4" @click="addActive($event.currentTarget)"><span>{{index+1}}</span>人</div>
			</div>
			<div class='num-row-2 row rowIndex'>
				<div v-for="(item,index) in 4" @click="addActive($event.currentTarget)"><span>{{index+5}}</span>人</div>
			</div>
			<div class='num-row-3 rowIndex'>
				<div v-for="(item,index) in 2" @click="addActive($event.currentTarget)"><span>{{index+9}}</span>人</div>
				<!--输入框-->
				<input type="text" class="defined" placeholder="输入自定义人数" v-model="inputNum" @focus="whenInput" @blur="outInput"/>
			</div>
		</div>
		<div class="require-choose" v-show="inputing">
			<div class="flavor-tips">
				<!--flavor头部-->
				<div class="flavor-title">
					<i></i>你有哪些备注?   (可多选)
				</div>
				<!--flavor标签-->
				<div class="flavor-label">
					<span v-for="item in flavorList">{{item.value}}</span>
				</div>
				<!--特殊要求-->
				<div class="special-title">
					<i></i>你有哪些特殊要求?
				</div>
				<div class="special-input">
					<textarea maxlength="20" v-model="memoInput" @focus="isShowTextTip=false" @blur="isShowTextTip=true"></textarea>
					<span v-show="isShowTextTip">限定20字</span>
				</div>
			</div>
		</div>
		<!--点餐按钮-->
		<div class='orderToBuy'>
			<div class='btn-order'>
				<el-button  @click="enter" class="btn1">开始点餐</el-button>
			</div>
		</div>
		<alert :showMsg="showMsg" v-if="showAlert"></alert>
	</div>
</template>
<script>
import Vue from 'vue'
import {mergeDishes} from '../js/merge.js'
import Swiper from '../../static/swiper-3.4.2.jquery.min.js'
import {findFlavorId,makeWaysId} from '../js/memoJoin.js'
	export default{
		data(){
			return{
				//是否选择了人数后点击进入
				allowEnter:false,
				//用餐人数初始化
				personNum:0,
				//用餐人数更新存储
				customNum:0,
				//输入的人数
				inputNum:null,
				//点击选人数
				clickNum:false,
				//showMsg
				showMsg:'请选择人数',
				//if显示alert
				showAlert:false,
				//口味备注list
				flavorList:null,
				flavorIdList:[],
				flavorNameList:'',
				//做法
				makeWays:null,
				makeWaysIdList:[],
				makeWaysNameList:'',
				//输入的memo
				memoInput:'',
				//输入显示
				inputing:true,
				//显示限定20字提示
				isShowTextTip:true
			}
		},
		methods:{
			//输入的时候
			whenInput(){
				this.inputing = false
			},
			//输入完毕
			outInput(){
				this.inputing = true	
				if(this.inputNum>0){
					$('.rowIndex').find('div').removeClass('num-active')
				}
			},
			addActive(target){
				if(this.inputNum<=0){
					if(target.className=='num-active'){
						$('.rowIndex').find('div').removeClass('num-active')
						target.className = ''
					}
					else{
						$('.rowIndex').find('div').removeClass('num-active')
						target.className = 'num-active'
					}
				}
			},
			//给btn加active样式
			btnActive(){
				$(".btn1").addClass("btn-active")
			},
			//点击进入判断是否有选择人数
			enter(){
				//口味备注
        			for(var i=0;i<$('.flavor-label span').length;i++){
        				if($('.flavor-label').find('span').eq(i).hasClass('label-active')){
        					this.flavorNameList += $('.flavor-label span').eq(i).html()+','
        					this.flavorIdList.push($('.flavor-label span').eq(i).html())
        				}
        				$('.flavor-label').find('span').eq(i).removeClass('label-active')
        			}
				this.flavorIdList = findFlavorId(this.flavorIdList,this.flavorList)
				this.flavorNameList=this.flavorNameList.replace(/\t/g,'')
    				this.flavorNameList=this.flavorNameList.replace(/\n/g,'')
        			//每个口味以逗号隔开，去掉最后的逗号
        			this.flavorNameList = this.flavorNameList.substr(0,this.flavorNameList.length-1)
        			//每个口味以逗号隔开，去掉最后的逗号
        			this.makeWaysNameList = this.makeWaysNameList.substr(0,this.makeWaysNameList.length-1)
        			this.makeWaysNameList=this.makeWaysNameList.replace(/\t/g,'')
    				this.makeWaysNameList=this.makeWaysNameList.replace(/\n/g,'')
        			var showAllOrderIndex = false
				if(this.flavorNameList.length>0|this.makeWaysNameList.length>0|this.memoInput.length>0){
					var showAllOrderIndex = true
				}
				
				this.$store.state.allOrderAsk = {
												showIndex:showAllOrderIndex,
												flavorName:this.flavorNameList,
												specialReq:this.memoInput
												}
				
				for(var i=0;i<4;i++){
					for(var j=0;j<4;j++){
						if($('.rowIndex').eq(i).find('div').eq(j).hasClass('num-active')){
							this.clickNum = true
							this.allowEnter = true
							this.personNum = $('.rowIndex').eq(i).find('div').eq(j).find('span').html()
							$('.rowIndex').eq(i).find('div').eq(j).removeClass('num-active')
						}
					}
				}
				if(this.clickNum){
					//改变vuex里的用餐人数的数据并提交
					this.$store.state.customerNum = this.personNum
				}
				if(this.inputNum){
					this.$store.state.customerNum = this.inputNum
					this.allowEnter = true
					this.clickNum = false
					this.inputNum = null
				}
				//是否可以跳转
				if(this.allowEnter){
					//向后台请求响应的人数
					this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/tableStatus/scanOrOpenTable",
						JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,
												"tableId":this.$store.state.tableId,
												"nickName":this.$store.state.nickName,
												"headImgUrl":this.$store.state.headImgUrl,
												"openId":this.$store.state.openId,
												"dinnersCount":this.$store.state.customerNum,
												//口味备注
												"dictSetIdList":this.flavorIdList,
												"dictSetNameList":this.flavorNameList,
												"memo":this.memoInput
												},"channel":1})
												
					,{emulateJSON:true})
					.then(function(res){
						this.$router.push({path:"/order/buy"})
						console.log('人数')
						console.log(res)
						this.$store.state.cartList = res.body.data.data.orderCartResponse.cartItemList
						for(var i=0;i<this.$store.state.cartList.length;i++){
							//小菜名称合并
							var addedDishesName = ''
							if(this.$store.state.cartList[i].addedDishList){
								var addedDishesMoney = 0
								for(var j=0;j<this.$store.state.cartList[i].addedDishList.length;j++){
									addedDishesName += this.$store.state.cartList[i].addedDishList[j].addedDishName +'+'+Number(this.$store.state.cartList[i].addedDishList[j].price/100).toFixed(2)+'元,'
									addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
									addedDishesMoney += this.$store.state.cartList[i].addedDishList[j].price/100
								}
							}
							this.$store.state.cartList[i].addedDishesMoney = addedDishesMoney
							//配菜名称合并
							var sideDishesName = ''
							if(this.$store.state.cartList[i].addedOnSideList){
								var sideDishesMoney = 0
								for(var j=0;j<this.$store.state.cartList[i].addedOnSideList.length;j++){
									sideDishesName += this.$store.state.cartList[i].addedOnSideList[j].dishesName +'+'+Number(this.$store.state.cartList[i].addedOnSideList[j].salePrice/100).toFixed(2)+'元,'
									sideDishesName = sideDishesName.substr(0,sideDishesName.length-1)
									sideDishesMoney += this.$store.state.cartList[i].addedOnSideList[j].dishesPrice/100
								}
							}
							this.$store.state.cartList[i].sideDishesMoney = sideDishesMoney
							//生成一个memoLists对像
							this.$store.state.cartList[i].memoLists =
								[{
								headImg:this.$store.state.cartList[i].userHeadUrl,
								nickName:this.$store.state.cartList[i].userName,
								showIndex:false,
								//配菜
								sideDishes:sideDishesName,
								//小菜
								addedDishes:addedDishesName,
								//备注
								dictSetNameList:this.$store.state.cartList[i].dictSetNameList,
								//做法
								makeWay:this.$store.state.cartList[i].cuisineNameList,
								//特殊备注
								specialReq:this.$store.state.cartList[i].memo
								}]
							//给购物车添加新的属性
							Vue.set(this.$store.state.cartList[i], 'userHeadUrls' , [this.$store.state.cartList[i].userHeadUrl])
							Vue.set(this.$store.state.cartList[i], 'userNames' , [this.$store.state.cartList[i].userName])
							Vue.set(this.$store.state.cartList[i], 'cartItemIds' , [])
							//为同一cartItemId的菜品添加多个cartItemId用于减菜
							for(var j=0;j<this.$store.state.cartList[i].dishesCount;j++){
								this.$store.state.cartList[i].cartItemIds.push(this.$store.state.cartList[i].cartItemId)
							}
						}
						//购物车中已选中菜品合并，调用mergeDishes函数
						this.$store.state.cartList = mergeDishes(this.$store.state.cartList)
						//初始化菜品的数据
						for(var i=0;i<this.$store.state.cartList.length;i++){
							for(var j=0;j<this.$store.state.originList.length;j++){
								if(this.$store.state.originList[j].id == this.$store.state.cartList[i].dishesId){
									Vue.set(this.$store.state.originList[j], 'memoLists' , this.$store.state.cartList[i].memoLists)
									Vue.set(this.$store.state.originList[j], 'count' , this.$store.state.cartList[i].dishesCount)
									Vue.set(this.$store.state.originList[j], 'cakesMoney' , this.$store.state.cartList[i].cakesMoney)
									Vue.set(this.$store.state.originList[j], 'userHeadUrls' , this.$store.state.cartList[i].userHeadUrls)
									Vue.set(this.$store.state.originList[j], 'userNames' , this.$store.state.cartList[i].userNames)
									Vue.set(this.$store.state.originList[j], 'cartItemIds' , this.$store.state.cartList[i].cartItemIds)
								}
							}
						}
					})
				}
				else{
					this.showAlert = true
					let that = this
					setTimeout(function(){
						that.showAlert = false
					},2000)
				}
			}
		}
		,
		created(){
			//口味选择
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantDictSettingListByMerchantId",
						JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"typeCode":2},"channel":1})
					,{emulateJSON:true})
					.then(function(res){
						console.log(res)
						this.flavorList = res.body.data
					})
		}
		,
		updated(){
			//flavor-tips
			var obj0 = document.getElementsByClassName('flavor-label')[0]
			var oSpan0 = obj0.getElementsByTagName('span')
			var tempCount = 0
			for(var i=0;i<oSpan0.length;i++){
				oSpan0[i].index = i
				oSpan0[i].onclick = function(){
					if(this.className){
						this.className = ''
						tempCount--
					}
					else{
						if(tempCount<3){
							this.className = 'label-active'
							tempCount++
						}
					}
				}
			}
		}
		,
		watch:{
			inputNum(){
				if(this.inputNum>0){
					$('.rowIndex').find('div').removeClass('num-active')
				}
			}
		}
	}
	
</script>
<style lang='scss'>
	.customNum{
		position:fixed;
		top:0;
		left:0;
		display:flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		width:100%;
		height:100%;
		background:#f9f9f9;
		z-index:2000;
		overflow: scroll;
		}
	.btn-sever{
		width:100%;
		height:5%;
		position:absolute;
		bottom:6%;
		display: flex;
		justify-content: space-between;
		i{
			display:block;
			width:0.3rem;
			height:0.5rem;
			text-align: center;
			line-height:0.5rem;
			background:#F2F2F2;
			font-size:0.22rem;
			color:#919191;
			z-index: 11;
		}
	}
	.title{
		width:100%;
		height:0.3rem;
		margin-top: 1px;
		background: #F9F9F9;
		.num-title{
			display: flex;
			justify-content: space-between;
			width:100%;
			height:100%;
			line-height: 0.3rem;
			span:nth-child(1){
				margin-left:0.15rem;
				font-family: PingFangSC-Regular;
				font-size: 0.16rem;
				color: #5A5A5A;
			}
			span:nth-child(2){
				margin-right:0.15rem;
				font-family: PingFangSC-Regular;
				font-size: 0.16rem;
				color: #AAAAAA;
			}
		}
	}
	.num-row{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:100%;
		.row{
			margin:2px auto 0 auto;
			display:flex;
			justify-content: space-between;
			width:88.5%;
			height:0.6rem;
			margin-top:0.08rem;
			text-align: center;
			line-height:0.6rem;
			div{
				width:0.70rem;
				height:0.6rem;
				font-size:0.2rem;
				color: #334450;
				background:#fff;
				border-radius: 3px;
				span{
					font-size:0.24rem;
				}
			}
			.num-active{
				color:#fff;
				background: #31C4C3;
				border:none;
			}
		}
		.num-row-3{
			margin:2px auto 0 auto;
			display:flex;
			justify-content: space-between;
			width:88.5%;
			height:0.6rem;
			margin-top:0.08rem;
			text-align: center;
			line-height:0.6rem;
			div{
				width:0.70rem;
				height:0.6rem;
				font-size:0.2rem;
				color: #334450;
				background:#fff;
				border-radius: 3px;
				span{
					font-size:0.24rem;
				}
			}
			.defined{
				width:1.55rem;
				height:0.6rem;
				margin-top:2px;
				text-align: center;
				font-size:0.15rem;
				color:#6A6A6A;
				border: none;
				border-radius: 3px;
			}
			.num-active{
				color:#fff;
				background: #31C4C3;
				border:none;
			}
		}
	}
	/*要求选择*/
	.require-choose{
		display: flex;
		justify-content: center;
		width:88.5%;
		height:2.7rem;
		margin-top:0.12rem;
		background:#fff;
		border-radius: 3px;
		overflow-y: scroll;
		.flavor-tips{
			width:100%;
			.flavor-title{
				width:100%;
				margin-top:0.15rem;
				font-size:0.16rem;
				color: #334450;
				i{
					display:inline-block;
					width:0.08rem;
					height:0.08rem;
					margin-left:0.1rem;
					margin-right:0.09rem;
					background: #31C4C3;
					border: 1px solid #909DA7;
				}
			}
			.flavor-label{
				display:flex;
				flex-wrap:wrap;
				width:100%;
				background:#fff;
				span{
					display:inline-block;
					width:0.7rem;
					height:0.35rem;
					margin-top:0.1rem;
					margin-left:0.07rem;
					line-height:0.35rem;
					text-align: center;
					font-size:0.14rem;
					color: #1D8887;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					background: rgba(49,196,195,0.10);
					border: 1px solid rgba(49,196,195,0.80);
					border-radius: 2px;
					opacity: 0.5;
				}
			}
			/*特殊要求title*/
			.special-title{
				width:100%;
				margin-top:0.2rem;
				font-size:0.16rem;
				color: #334450;
				i{
					display:inline-block;
					width:0.08rem;
					height:0.08rem;
					margin-left:0.1rem;
					margin-right:0.09rem;
					background: #31C4C3;
					border: 1px solid #909DA7;
				}
			}
			/*label-active*/
			.label-active{
				color:#fff !important;
				background: #31C4C3 !important;
				opacity: 1 !important;
			}
			/*特殊要求输入框*/
			.special-input{
				position:relative;
				width:100%;
				margin-top:0.1rem;
				textarea{
					width:2.9rem;
					height:0.45rem;
					margin-left:0.15rem;
					padding-left:0.15rem;
					padding-top:0.08rem;
					background: #FDFDFD;
					border: 1px solid #E4E4E4;
					resize : none;
		  			-webkit-appearance: none;
		  			background: rgba(49,196,195,0.10);
					border: 1px solid rgba(49,196,195,0.80);
				}
				span{
					position:absolute;
					bottom:10%;
					right:5%;
					color: #1E8887;
					opacity: 0.8;
				}
			}
		}
	}
	/*按钮*/
	.btn-order{
		margin-top:0.15rem;
		text-align: center;
		margin-bottom:0.1rem;
		button{
			border:none;
			width:2.2rem;
			height:0.4rem;
			color: #fff;
			background: #ccc;
			span{
				font-size: 0.2rem;
				line-height: 0.2rem;
			}
		}
		/*处理默认的蓝色的按钮颜色*/
		.el-button:active{
			color:#fff;
		}
		.el-button:hover{
			color:#fff;
		}
		.btn-active{
			background: #31C4C3 !important;
		}
	}
</style>

<template>
<div class="topDetail" v-show="showFlag">
	<!--蒙版-->
	<div class='detailPage'>
	</div>
	<!--蒙版里的内容-->
	<div class="detailPage-inner">
		<!--删除按钮-->
		<div class="delBtn" @click="resetClass">
			<img src="../../../assets/icons/取消@3x.png" @click="showFlag = false"/>
		</div>
		<!--菜品信息部分-->
		<div class="dishInfo" v-if="whenInput">
			<div class="dishPic">
				<img :src="food.picUrl"/>
			</div>
			<div class="dishOtherInfo">
				<p>{{food.name}}</p>
				<p>￥{{food.price}}/{{food.unitName}}</p>
				<p><span>会员价:</span>￥{{food.memberPrice}}/{{food.unitName}}</p>
			</div>
		</div>
		<!--数量加减-->
		<div class="numBox" v-if="whenInput">
			<div class="nowNum">
				<img src="../../../assets/icons/减去商品@3x.png" class="icon iconfont icon-jian" v-show="tempNum>0" @click="delDish"/>
				<span v-show="tempNum>0" class='tempNum'>{{tempNum}}</span>
				<img src="../../../assets/icons/加上商品@3x.png" class="icon iconfont icon-plus" @click="addDish"/>
			</div>
		</div>
		<!--加小菜-->
		<div class="addedDishes-container" v-show="whenInput&food.isAddSideDishes==0">
			<div class="leftWords">
				<span>小菜</span>
			</div>
			<div class="addedDishes-info">
				<div class="addedDishesLabel">
					<span v-for="item in this.$store.state.addedDishesList">
						{{item.name}}+{{item.price}}元
					</span>
				</div>
			</div>
		</div>
		<!--加配菜-->
		<div class="sideDishes-container" v-show="whenInput&food.isAddSideDish==0">
			<div class="leftWords">
				<span>配菜</span>
			</div>
			<div class="sideDishes-info">
				<div class="sideDishesLabel">
					<span v-for="item in food.sideDishesInfoList">
						{{item.dishesName}}+{{item.sidePrice/100}}元
					</span>
				</div>
			</div>
		</div>
		<!--备注-->
		<div class="memo-container" v-show="whenInput&food.isAddRemark==0">
			<div class="leftWords">
				<span>备注</span>
			</div>
			<div class="memo-info">
				<!--左边栏-->
				<div class="memoLabel">
					<span v-for="item in memoList">
						{{item.value}}
					</span>
				</div>
			</div>
		</div>
		<!--做法-->
		<div class="makeWays-container" v-show="whenInput">
			<div class="leftWords">
				<span>做法</span>
			</div>
			<div class="makeWays-info">
				<!--左边栏-->
				<div class="makeWaysLabel">
					<span v-for="item in food.dishesMakingInfoList">
						{{item.dishesMakingName}}
					</span>
				</div>
			</div>
		</div>
		<!--特殊要求-->
		<div class="specialAsk">
			<i>特殊要求</i>
			<textarea type="text" maxlength="20" v-model="specialReq" @focus="justForInput" @blur="notInput"></textarea>
			<b>限定20个字</b>
		</div>
		<!--确认按钮-->
		<div class="affirmBtn" @click="affirm">
			<span>确认</span>
		</div>
		<!--确认按钮-->
		<div class="affirmBtn-false" v-show="tempNum<=0">
			<span>确认</span>
		</div>
	</div>
</div>
</template>
<script>
import {findAddedDishesPrice,findAddedDishesName,findAddedDishesId,findMemoId,
		findMakeWaysId,findSideDishesUnitName,findSideDishesUnitId,
		findSideDishesId,findSideDishesName,findSideDishesPrice,findSideDishesCategoryId,findSideDishesCategoryName,
		findSideDishesPicUrl
		} from '../../../js/memoJoin.js'
import {reloadShopCart} from '../../../js/merge.js'
import Vue from 'vue'
	export default{
		data(){
			return{
				//详情显示页开关
				showFlag:false,
				//存储备注
				memoList:[],
				//当前页面的数量
				tempNum:1,
				//小菜
				addedDishList:[],
				addedDishesName:'',
				//配菜
				sideDishesList:[],
				sideDishesName:'',
				//备注Id
				dictSetIdList:[],
				dictSetNameList:'',
				//做法Id
				cuisineIdList:[],
				cuisineNameList:'',
				//特殊要求
				specialReq:'',
				//输入的时候
				whenInput:true,
				//显示限定20字提示
				isShowTextTip:true
			}
		}
		,
		props:['food']
		,
		methods:{
			addDish(){
				this.tempNum = this.tempNum + 1
			},
			delDish(){
				this.tempNum = this.tempNum - 1
			},
			//输入的时候
			justForInput(){
				this.whenInput = false
			},
			notInput(){
				this.whenInput = true
			},
			//来自父组件的show方法
			show() {
				this.showFlag = true
     		},
     		//清除class
     		resetClass(){
     			$('.addedDishesLabel').find('span').removeClass('addedDishesActive')
     			$('.sideDishesLabel').find('span').removeClass('sideDishesActive')
        			$('.memoLabel').find('span').removeClass('memoActive')
        			$('.makeWaysLabel').find('span').removeClass('makeWaysActive')
        			this.specialReq = ''
        			this.tempNum = 1
     		},
			//提交
			affirm(){
				//蒙版消失
				this.showFlag = false
				//显示备注区域
				Vue.set(this.food, 'tip' , false)
				//显示affirm中的备注中的详情
				Vue.set(this.food, 'showTip' , false)
				//判断选中哪些选项
				//小菜
				for(var i=0;i<$('.addedDishesLabel span').length;i++){
        				if($('.addedDishesLabel').find('span').eq(i).hasClass('addedDishesActive')){
        					//小菜的name
        					let tempAddedDishesName = findAddedDishesName($('.addedDishesLabel span').eq(i).html(),this.$store.state.addedDishesList)
        					//小菜的ID
        					let tempAddedDishesId = findAddedDishesId($('.addedDishesLabel span').eq(i).html(),this.$store.state.addedDishesList)
        					//小菜的价格
        					let tempAddedDishesPrice = Number(findAddedDishesPrice($('.addedDishesLabel span').eq(i).html(),this.$store.state.addedDishesList))
        					this.food.addedDishesMoney += Number(tempAddedDishesPrice)
        					//affirm页面需要展示的小菜字段
        					this.addedDishesName += $('.addedDishesLabel span').eq(i).html()+','
        					//每次创建一个{}用来存小菜
        					this.addedDishList.push({
        							"addedDishId": tempAddedDishesId,//小菜ID
						        "addedDishName": tempAddedDishesName,
						        "dishesCount": this.tempNum,
						        "price": tempAddedDishesPrice*100
        						})
        					this.food.tip = true
        				}
        				$('.addedDishesLabel').find('span').eq(i).removeClass('addedDishesActive')
        			}
				//每个小菜以逗号隔开，去掉最后的逗号
        			this.addedDishesName = this.addedDishesName.substr(0,this.addedDishesName.length-1)
        			//整理格式
    				this.addedDishesName=this.addedDishesName.replace(/\t/g,'')
    				this.addedDishesName=this.addedDishesName.replace(/\n/g,'')
        			//配菜
				for(var i=0;i<$('.sideDishesLabel span').length;i++){
        				if($('.sideDishesLabel').find('span').eq(i).hasClass('sideDishesActive')){
        					//配菜的name
        					let tempSideDishesName = findSideDishesName($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//配菜的图片
        					let tempSidePicUrl = findSideDishesPicUrl($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//配菜的ID
        					let tempSideDishesId = findSideDishesId($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//配菜的单位
        					let tempUnitName = findSideDishesUnitName($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//单位Id
        					let tempUnitId = findSideDishesUnitId($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//种类Id
        					let tempCateId = findSideDishesCategoryId($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//种类Name
        					let tempCateName = findSideDishesCategoryName($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					//配菜的价格
        					let tempSideDishesPrice = findSideDishesPrice($('.sideDishesLabel span').eq(i).html(),this.food.sideDishesInfoList)
        					this.food.sideDishesMoney += Number(tempSideDishesPrice/100)
        					//affirm页面需要展示的配菜字段
        					this.sideDishesName += $('.sideDishesLabel span').eq(i).html()+','
        					//每次创建一个{}用来存配菜
        					this.sideDishesList.push({
        							"dishesId":tempSideDishesId,
								"dishesName":tempSideDishesName,
								"dishesCount":this.tempNum,
								"dishPicUrl":tempSidePicUrl,
								"categoryId":tempCateId,
								"categoryName":tempCateName,
								"unitId":tempUnitId,
								"unitName":tempUnitName,
								"salePrice":tempSideDishesPrice,
								"dishesPrice":tempSideDishesPrice,
								"mealsetPrice":tempSideDishesPrice,
								"memberPrice":tempSideDishesPrice
        						})
        				}
        				$('.sideDishesLabel').find('span').eq(i).removeClass('sideDishesActive')
        			}
				//每个配菜以逗号隔开，去掉最后的逗号
        			this.sideDishesName = this.sideDishesName.substr(0,this.sideDishesName.length-1)
				//备注1
        			for(var i=0;i<$('.memoLabel span').length;i++){
        				if($('.memoLabel').find('span').eq(i).hasClass('memoActive')){
        					this.dictSetNameList += $('.memoLabel span').eq(i).html()+','
        					this.dictSetIdList.push($('.memoLabel span').eq(i).html())
        					this.food.tip = true
        				}
        				$('.memoLabel').find('span').eq(i).removeClass('memoActive')
        			}
        			this.dictSetIdList = findMemoId(this.dictSetIdList,this.memoList)
        			//每个口味以逗号隔开，去掉最后的逗号
        			this.dictSetNameList = this.dictSetNameList.substr(0,this.dictSetNameList.length-1)
        			this.dictSetNameList=this.dictSetNameList.replace(/\t/g,'')
    				this.dictSetNameList=this.dictSetNameList.replace(/\n/g,'')
        			//做法
        			for(var i=0;i<$('.makeWaysLabel span').length;i++){
        				if($('.makeWaysLabel').find('span').eq(i).hasClass('makeWaysActive')){
        					this.cuisineNameList += $('.makeWaysLabel span').eq(i).html()+','
        					//先把每个元素放入数组中
        					this.cuisineIdList.push($('.makeWaysLabel span').eq(i).html())
        					this.food.tip = true
        				}
        				$('.makeWaysLabel').find('span').eq(i).removeClass('makeWaysActive')
        			}
        			this.cuisineIdList = findMakeWaysId(this.cuisineIdList,this.food.dishesMakingInfoList)
        			//每个做法以逗号隔开，去掉最后的逗号
        			this.cuisineNameList = this.cuisineNameList.substr(0,this.cuisineNameList.length-1)
        			this.cuisineNameList=this.cuisineNameList.replace(/\t/g,'')
    				this.cuisineNameList=this.cuisineNameList.replace(/\n/g,'')
        			//存储备注信息
				var 	tempMemo = {
								headImg:this.$store.state.headImgUrl,
								nickName:this.$store.state.nickName,
								showIndex:false,
								//小菜
								addedDishes:this.addedDishesName,
								//配菜
								sideDishes:this.sideDishesName,
								//备注
								dictSetName:this.dictSetNameList,
								//做法
								makeWay:this.cuisineNameList,
								//特殊要求
								specialReq:this.specialReq
								}
				//把备注加入备注list
				this.food.memoLists.push(tempMemo)
				//加载的标记
		    		var reloading = false
		    		//加菜参数
		    		var tempParam = {
								"merchantId":this.$store.state.merchantId,
								"tableId":this.$store.state.tableId,
								"userId":this.$store.state.nickName,
								"userName":this.$store.state.nickName,
								"categoryId":this.food.categoryId,
								"categoryName":this.food.categoryName,
								"dishesId":this.food.id,
								"dishesName":this.food.name,
								"dishesCount":this.tempNum,
								"unitId":this.food.unitId,
								"unitName":this.food.unitName,
								"salePrice":this.food.price*100,
								"dishesPrice":this.food.price*100,
								"mealsetPrice":this.food.price*100,
								"memberPrice":this.food.memberPrice*100,
								"dishPicUrl":this.food.picUrl,
								"userHeadUrl":this.$store.state.headImgUrl,
								"memo":this.specialReq,//整单的输入备注
								"dictSetIdList": this.dictSetIdList,//口味和要求的集合
							    "dictSetNameList": this.dictSetNameList,
							    "cuisineIdList": this.cuisineIdList,//做法的集合
							    "cuisineNameList": this.cuisineNameList,
								"addedDishList": this.addedDishList,
								"addedOnSideList":this.sideDishesList
							}
				//加菜接口
				this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/addOrderCartItem",
				JSON.stringify({"param":tempParam,"channel":1})
					,{emulateJSON:true}).then(
						function(res){
							console.log('加菜')
							console.log(res)
							this.$store.state.addingIndex = false
							if(res.body.code==0){
								if(!this.food.showIndex&&!this.food.count&&!this.food.addIndex){
									Vue.set(this.food, 'showIndex' , true)
									Vue.set(this.food, 'addIndex' , '+'+this.tempNum)
									Vue.set(this.food, 'count' , this.tempNum)
									Vue.set(this.food, 'userNames' , [this.$store.state.nickName])
									Vue.set(this.food, 'userHeadUrls' , [this.$store.state.headImgUrl])
									//专门用于减菜
									Vue.set(this.food, 'cartItemIds' , [res.body.data.cartItemId])
									//存储当前点菜用户信息
									this.$store.state.nowUserName = this.$store.state.nickName
									this.$store.state.nowImgUrl = this.$store.state.headImgUrl
								}
								else{
									this.food.count += this.tempNum
									this.food.addIndex = "+"+this.tempNum
									this.food.showIndex = true
									//存储菜的cartItemId
									this.food.cartItemIds.push(res.body.data.cartItemId)
									//加入头像
									this.food.userHeadUrls.push(this.$store.state.headImgUrl)
									//存储当前点菜用户信息,用于显示
									this.$store.state.nowUserName = this.$store.state.nickName
									this.$store.state.nowImgUrl = this.$store.state.headImgUrl
								}
								//用户头像和名字去重
						    		//头像
							    var newArr = []
							    for(let i=0;i<this.food.userHeadUrls.length;i++){
							        if(newArr.indexOf(this.food.userHeadUrls[i]) == -1){
							          newArr.push(this.food.userHeadUrls[i]);
							      	}
							    }
								this.food.userHeadUrls = newArr	
								//名字
								var newArr2 = []
							    for(var i=0;i<this.food.userNames.length;i++){
							        if(newArr2.indexOf(this.food.userNames[i]) == -1){
							          newArr2.push(this.food.userNames[i]);
							      	}
							    }
								this.food.userNames = newArr2
								//控制动画
								var self = this
								var tempVue = Vue
								setTimeout(function(){
									self.food.showIndex = false
								},2500)
								//调用购物车刷新函数
								reloadShopCart(self,tempVue)
							}
							else{
								console.log('加菜失败')
							}
							//数据reset
					    		this.tempNum = 1
					    		this.dictSetIdList = []
							this.dictSetNameList = ''
							this.sideDishesList = []
							this.addedDishList = []
							this.cuisineIdList = []
							this.cuisineNameList = ''
							this.specialReq = ''
							this.addedDishesName = ''
							this.sideDishesName = ''
							
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
		created(){
			//备注list
			this.$http.post(this.$store.state.orderHttp+"/jinghan-order/api/order/merchantInfo/getMerchantDictSettingListByMerchantId",
					JSON.stringify({"param":{"merchantId":this.$store.state.merchantId,"typeCode":2},"channel":1})
				,{
					emulateJSON:true  //必须设置这个头文件
				}).then(function(res){
					console.log(res)
					this.memoList = res.body.data
				})
		}
		,
		updated(){
			//小菜
			var obj = document.getElementsByClassName('addedDishesLabel')[0]
			var oSpan2 = obj.getElementsByTagName('span')
				for(var i=0;i<oSpan2.length;i++){
					oSpan2[i].index = i
					oSpan2[i].onclick = function(){
						if(this.className){
							var temp = true
						}
						if(temp){
							this.className = ''
						}
						if(!temp){
							this.className = 'addedDishesActive'
						}
					}
				}
			//配菜
			var obj = document.getElementsByClassName('sideDishesLabel')[0]
			var oSpan0 = obj.getElementsByTagName('span')
				for(var i=0;i<oSpan0.length;i++){
					oSpan0[i].index = i
					oSpan0[i].onclick = function(){
						if(this.className){
							var temp = true
						}
						if(temp){
							this.className = ''
						}
						if(!temp){
							this.className = 'sideDishesActive'
						}
					}
				}
			//备注
			var obj = document.getElementsByClassName('memoLabel')[0]
			var oSpan = obj.getElementsByTagName('span')
				for(var i=0;i<oSpan.length;i++){
					oSpan[i].index = i
					oSpan[i].onclick = function(){
						if(this.className){
							var temp = true
						}
						if(temp){
							this.className = ''
						}
						if(!temp){
							this.className = 'memoActive'
						}
					}
				}
			//做法
			var obj = document.getElementsByClassName('makeWaysLabel')[0]
			var oSpan3 = obj.getElementsByTagName('span')
				for(var i=0;i<oSpan3.length;i++){
					oSpan3[i].index = i
					oSpan3[i].onclick = function(){
						if(this.className){
							var temp = true
						}
						for(var j=0;j<oSpan3.length;j++){
							oSpan3[j].className = ''
						}
						if(!temp){
							this.className = 'makeWaysActive'
						}
					}
				}
				//改变滚动的宽度
				//小菜
				let tempAddedDishesLabelWidth = this.$store.state.addedDishesList.length*0.8 + 'rem'
				$('.addedDishesLabel').css('width',tempAddedDishesLabelWidth) 
				//配菜
				let tempSideDishesWidth = this.food.sideDishesInfoList.length*0.8 + 'rem'
				$('.sideDishesLabel').css('width',tempSideDishesWidth)
				//备注
				let tempMemoWidth = this.memoList.length*0.8 + 'rem'
				$('.memoLabel').css('width',tempMemoWidth)
				//做法
				let tempMakeWaysLabelWidth = this.food.dishesMakingInfoList.length*0.8 + 'rem'
				$('.makeWaysLabel').css('width',tempMakeWaysLabelWidth) 
		}
		,
		computed:{
			nowNum(){
				return this.$store.state.tempDishesNum
			}
		}
	}
</script>
<style lang="scss">
	.topDetail{
		width:100%;
		height:100%;
		z-index: 2001;
		.detailPage{
			width:100%;
			height:100%;
			opacity: 0.5;
			background:#000;
		}
		.detailPage-inner{
			position:fixed;
			top:0.61rem;
			left:5%;
			width:3.4rem;
			height:81%;
			border-radius:0.08rem;
			background:white;
			/*删除按钮*/
			.delBtn{
				position:absolute;
				right:0.07rem;
				top:0.09rem;
				img{
					width:0.13rem;
					height:0.13rem;
				}
			}
			.dishInfo{
				display: flex;
				width:100%;
				height:1rem;
				margin-top:0.25rem;
				.dishPic{
					margin-left:0.15rem;
					img{
						width:1.5rem;
						height:1rem;
						border-radius:4px;
					}
				}
				.dishOtherInfo{
					display:flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left:0.15rem;
					/*菜名*/
					p:nth-child(1){
						width:1.6rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 0.16rem;
						color: #282828;
					}
					/*正常价*/
					p:nth-child(2){
						font-size: 0.16rem;
						color: #282828;
					}
					/*会员价*/
					p:nth-child(3){
						font-size: 0.16rem;
						color: #FF0001;
						span{
							font-size:0.14rem;
						}
					}
				}
			}
			/*加减按钮盒子*/
			.numBox{
				position:absolute;
				bottom:0.25rem;
				left:0.15rem;
				display: flex;
				margin-top:0.05rem;
				.nowNum{
					position:relative;
					width:1.2rem;
					height:0.3rem;
					.iconfont{
						width:0.27rem;
						height:0.27rem;
					}
					.icon-jian{
						color:#F5A623;
						padding:6px;
					}
					.icon-plus{
						position:absolute;
						top:0%;
						right:0.03rem;
						color:#F5A623;
						background:white;
						padding:6px;
					}
					.tempNum{
						position:absolute;
						top:24%;
						left:45%;
						font-size:0.16rem;
					}
				}
			}
			.addedDishes-container{
				display: flex;
				width:100%;
				height:0.35rem;
				margin-top:0.15rem;
				.leftWords{
					display: flex;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:0.3rem;
					span{
						font-size: 0.13rem;
						color: #979797;
					}
				}
				.addedDishes-info{
					flex:1;
					overflow: scroll;
					.addedDishesLabel{
						display: flex;
						justify-content: flex-start;
						width:10rem;
						height:0.35rem;
						span{
							display: flex;
							justify-content: center;
							align-items: center;
							width:0.7rem;
							height:0.3rem;
							margin-left:0.05rem;
							font-size:0.12rem;
							color: #A0A0A0;
							border: 1px solid #E4E4E4;
						}
						.addedDishesActive{
							color: #31C4C3;
							border: 1px solid #31C4C4;
						}
					}
				}
			}
			/*配菜*/
			.sideDishes-container{
				display: flex;
				width:100%;
				height:0.35rem;
				margin-top:0.12rem;
				.leftWords{
					display: flex;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:0.3rem;
					span{
						font-size: 0.13rem;
						color: #979797;
					}
				}
				.sideDishes-info{
					flex:1;
					overflow: scroll;
					.sideDishesLabel{
						display: flex;
						justify-content: flex-start;
						width:10rem;
						height:0.35rem;
						span{
							display: flex;
							justify-content: center;
							align-items: center;
							width:0.7rem;
							height:0.3rem;
							margin-left:0.05rem;
							font-size:0.12rem;
							color: #A0A0A0;
							border: 1px solid #E4E4E4;
						}
						.sideDishesActive{
							color: #31C4C3;
							border: 1px solid #31C4C4;
						}
					}
				}
			}
			/*备注*/
			.memo-container{
				display: flex;
				width:100%;
				height:0.35rem;
				margin-top:0.15rem;
				.leftWords{
					display: flex;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:0.3rem;
					span{
						font-size: 0.13rem;
						color: #979797;
					}
				}
				.memo-info{
					flex:1;
					overflow: scroll;
					.memoLabel{
						display: flex;
						justify-content: flex-start;
						width:10rem;
						height:0.35rem;
						span{
							display: flex;
							justify-content: center;
							align-items: center;
							width:0.7rem;
							height:0.3rem;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							margin-left:0.05rem;
							font-size:0.12rem;
							color: #A0A0A0;
							border: 1px solid #E4E4E4;
						}
						.memoActive{
							color: #31C4C3;
							border: 1px solid #31C4C4;
						}
					}
				}
			}
			/*做法*/
			.makeWays-container{
				display: flex;
				width:100%;
				height:0.35rem;
				margin-top:0.15rem;
				.leftWords{
					display: flex;
					justify-content: center;
					align-items: center;
					width:0.5rem;
					height:0.3rem;
					span{
						font-size: 0.13rem;
						color: #979797;
					}
				}
				.makeWays-info{
					flex:1;
					overflow: scroll;
					.makeWaysLabel{
						display: flex;
						justify-content: flex-start;
						width:10rem;
						height:0.35rem;
						span{
							display: flex;
							justify-content: center;
							align-items: center;
							width:0.7rem;
							height:0.3rem;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							margin-left:0.05rem;
							font-size:0.12rem;
							color: #A0A0A0;
							border: 1px solid #E4E4E4;
						}
						.makeWaysActive{
							color: #31C4C3;
							border: 1px solid #31C4C4;
						}
					}
				}
			}
			/*特殊要求*/
			.specialAsk{
				position:relative;
				width:100%;
				height:0.6rem;
				margin-top:0.15rem;
				textarea{
					width:2.25rem;
					height:0.4rem;
					margin-left:0.55rem;
					padding-left:0.2rem;
					padding-top:0.1rem;
					font-size:0.15rem;
					background: #FDFDFD;
					border: 1px solid #E4E4E4;
					resize : none;
		  			-webkit-appearance: none;
		  			/*border:none;*/
				}
				i{
					position:absolute;
					top:0%;
					display: inline-block;
					width:0.27rem;
					left:0.15rem;
					font-style:normal;
					font-size:0.13rem;
					color: #979797;
				}
				b{
					position:absolute;
					bottom:14%;
					right:12%;
					font-weight: normal;
					color: #BFBFBF;
				}
			}
			/*确认按钮*/
			.affirmBtn{
				position: absolute;
				bottom:0;
				right:0.15rem;
				span{
					display: inline-block;
					width:0.5rem;
					height:0.36rem;
					text-align: center;
					line-height: 0.36rem;
					font-size:0.18rem;
					color:#fff;
					background: #31C4C3;
					border-radius: 8px 8px 0 0;
				}
			}
			/*确认按钮*/
			.affirmBtn-false{
				position: absolute;
				bottom:0;
				right:0.15rem;
				span{
					display: inline-block;
					width:0.5rem;
					height:0.36rem;
					text-align: center;
					line-height: 0.36rem;
					font-size:0.18rem;
					color:#fff;
					background: #CCCCCC;
					border-radius: 8px 8px 0 0;
				}
			}
		}
	}
</style>
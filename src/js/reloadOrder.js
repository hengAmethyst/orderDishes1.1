function reloadOrder(that,tempVue){
	//获取订单详情
	that.$http.post(that.$store.state.orderHttp+"/jinghan-order/api/order/orderInfo/getOrderDetailById",
		JSON.stringify({"param":{
								"merchantId":that.$store.state.merchantId,
								"tableId":that.$store.state.tableId,
								"id":that.$store.state.orderId},
								"channel":1}
		), {
			emulateJSON: true //必须设置这个头文件
		}).then(function(res) {
		console.log("获取订单详情")
		console.log(res)
		//刷新的时候让订单看见的菜品为全部
		that.$store.state.finishedStatus = 0
		that.$store.state.addingIndex = false
		that.showIf = true
		//下单时间
		that.$store.state.orderTime = getCurrentTime(res.body.data.createTime)
		//菜品总list
		that.$store.state.submitFoodsList = res.body.data.orderItemList
		//总价
		that.$store.state.totalPrice = Number(res.body.data.orderPayAmount/100).toFixed(2)
		//会员总价
		that.$store.state.memberPrice = (res.body.data.orderMemberAmount/100).toFixed(2)
		//实际需要支付的价格
		that.$store.state.needPay = that.$store.state.totalPrice
		//orderNo
		that.$store.state.orderCode = res.body.data.orderCode
		//用餐人数
		that.$store.state.customerNum = res.body.data.dinnersCount
		//必选商品
		this.$store.state.mustRequires = res.body.data.requires
		//显示支付按钮
		that.$store.state.orderStatus = true
		for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
			//改变每个菜品的状态
			if(that.$store.state.submitFoodsList[i].status == 3){
				that.$store.state.orderStatus = false
			}
		}
		//总的口味/做法/特殊备注/及显示与否
		that.$store.state.allOrderAsk.flavorName = res.body.data.dictSetNameList
		that.$store.state.allOrderAsk.specialReq = res.body.data.memo
		if(typeof(that.$store.state.allOrderAsk.flavorName)!='undefined'&that.$store.state.allOrderAsk.flavorName.length>0){
			that.$store.state.allOrderAsk.showIndex = true
		}
		if(typeof(that.$store.state.allOrderAsk.specialReq)!='undefined'&that.$store.state.allOrderAsk.specialReq.length>0){
			that.$store.state.allOrderAsk.showIndex = true
		}
		//菜品状态
		var tempMixStatus = true
		//有已下厨的状态
		var tempProcess = false
		//全部拒绝
		var tempAllRejected = true
		var tempMark1 = false
		var tempMark2 = false
		//处理相同的多人菜品相同时的备注
		for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
			//部分已下厨
			if(that.$store.state.submitFoodsList[i].status==1){
				tempProcess = true
			}
			//全部拒绝,只要有不是拒绝的就不把状态改为全部售罄
			if(that.$store.state.submitFoodsList[i].status!=6|that.$store.state.submitFoodsList[i].status!=5){
				tempAllRejected = false
			}
			if(that.$store.state.submitFoodsList[i].status!=4){
				if(that.$store.state.submitFoodsList[i].status!=5&that.$store.state.submitFoodsList[i].status!=6){
					tempMark1 = true
				}
				if(that.$store.state.submitFoodsList[i].status==5|that.$store.state.submitFoodsList[i].status==6){
					tempMark2 = true
				}
			}
			//混合模式成立
			if(tempMark1&tempMark2){
				tempMixStatus = false
			}
			//菜价/100
			that.$store.state.submitFoodsList[i].dishesPrice = (that.$store.state.submitFoodsList[i].dishesPrice/100).toFixed(2)
			that.$store.state.submitFoodsList[i].memberPrice = (that.$store.state.submitFoodsList[i].memberPrice/100).toFixed(2)
			//小菜显示
			var addedDishesName = ''
			if(that.$store.state.submitFoodsList[i].addedDishList){
				for(var j=0;j<that.$store.state.submitFoodsList[i].addedDishList.length;j++){
					addedDishesName += this.$store.state.submitFoodsList[i].addedDishList[j].addedDishName+'+'+Number(this.$store.state.submitFoodsList[i].addedDishList[j].price/100).toFixed(2)+'元'+ ','
				}
			}
			addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
			//创建备注对象
			that.$store.state.submitFoodsList[i].memoLists = [{
									headImg:that.$store.state.submitFoodsList[i].userHeadUrl,
									nickName:that.$store.state.submitFoodsList[i].userName,
									//小菜
									addedDishes:addedDishesName,
									//备注
									dictSetNameList:that.$store.state.submitFoodsList[i].dictSetNameList,
									//做法
									makeWay:that.$store.state.submitFoodsList[i].cuisineNameList,
									//特殊备注
									specialReq:that.$store.state.submitFoodsList[i].memo
								}]
			//菜品总数量
			that.$store.state.allCount += that.$store.state.submitFoodsList[i].dishesCount
			tempVue.set(that.$store.state.submitFoodsList[i], 'showTip' , false)
		}
		//有菜品已下厨
		if(tempProcess){
			that.$store.state.process = '商家正在制作菜品'
			that.$store.state.ifShowAddingBtn = false
		}
		//全部拒绝或者售罄
		if(tempAllRejected){
			that.$store.state.process = '菜品已售罄'
			that.$store.state.ifShowAddingBtn = true
		}
		if(!tempMixStatus){
			that.$store.state.process = '商家正在制作菜品(部分菜品已售罄)'
		}
		//如果没有备注就不展示备注栏,所以需要判断有没有备注信息
		for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
			for(var j=0;j<that.$store.state.submitFoodsList[i].memoLists.length;j++){
				if(that.$store.state.submitFoodsList[i].memoLists[j].addedDishes||that.$store.state.submitFoodsList[i].memoLists[j].dictSetNameList||that.$store.state.submitFoodsList[i].memoLists[j].makeWay||that.$store.state.submitFoodsList[i].memoLists[j].specialReq){
					that.$store.state.submitFoodsList[i].tip = true
				}
				else{
					that.$store.state.submitFoodsList[i].tip = false
				}
			}
		}
		//计算按菜品种类分菜品list
		var tempList = []
		for(var i=0;i<that.$store.state.kinds.length;i++){
			tempList.push([])
		}
		for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
			for(var j=0;j<that.$store.state.kinds.length;j++){
				if(that.$store.state.submitFoodsList[i].categoryId==that.$store.state.kinds[j].id){
					tempList[j].push(that.$store.state.submitFoodsList[i])
				}
			}
		}
		that.$store.state.submitListCates = tempList
		//计算菜品的菜种类名
		var cateName = []
		for(var i=0;i<tempList.length;i++){
			if(tempList[i].length>0){
				cateName.push(tempList[i][0].categoryName)
			}
			else{
				cateName.push('')
			}
		}
		that.$store.state.cateName = cateName
		//计算每种菜品的数量
		var tempCates = []
		var tempCategory = []
		for(var i=0;i<that.$store.state.kinds.length;i++){
			tempCates.push(0)
		}
		for(var i=0;i<that.$store.state.submitFoodsList.length;i++){
			for(var j=0;j<that.$store.state.kinds.length;j++){
				if(that.$store.state.submitFoodsList[i].categoryId==that.$store.state.kinds[j].id){
					tempCates[j]+=that.$store.state.submitFoodsList[i].dishesCount
				}
			}
		}
		that.$store.state.submitListCount = tempCates
	})
}
function getCurrentTime(time){
	 var   now = new Date(time);  
	 var   year = now.getFullYear();
	 var   month = now.getMonth()+1;     
	 var   day = now.getDate();     
	 var   hour = now.getHours();     
	 var   minute = now.getMinutes();
	if(month<10){
		month = "0"+month
	}
	if(day<10){
		day = "0"+day
	}
	if(hour<10){
		hour = "0"+hour
	}
	if(minute<10){
		minute = "0"+minute
	}
	var info = year+'-'+month+'-'+day+' '+hour+':'+minute
	return info
}
export {reloadOrder,getCurrentTime}

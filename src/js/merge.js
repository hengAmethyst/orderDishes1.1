function mergeDishes(cartList){
//购物车中已选中菜品合并
	var newArry = []
	for(var i=0;i<cartList.length;i++){
		var tempIndex = false
		//如果newArry不为空
		if(newArry.length){
			for(var j=0;j<newArry.length;j++){
				if(cartList[i].dishesId == newArry[j].dishesId){
					//加数量
					newArry[j].dishesCount += cartList[i].dishesCount
					//判断是否添加头像
					let urlMark = true
					for(let k=0;k<newArry[j].userHeadUrls.length;k++){
						if(cartList[i].userHeadUrl == newArry[j].userHeadUrls[k]){
							urlMark = false
						}
					}
					if(urlMark){
						newArry[j].userHeadUrls.push(cartList[i].userHeadUrl)
					}
					//判断是否添加userName
					let userNameMark = true
					for(let k=0;k<newArry[j].userNames.length;k++){
						if(cartList[i].userName == newArry[j].userNames[k]){
							userNameMark = false
						}
					}
					if(userNameMark){
						newArry[j].userNames.push(cartList[i].userName)
					}
					newArry[j].userNames.push(cartList[i].userName)
					//加入cartItemId
					for(var k=0;k<cartList[i].cartItemIds.length;k++){
						newArry[j].cartItemIds.push(cartList[i].cartItemIds[k]) 
					}
					//计算配菜价格
					newArry[j].sideDishesMoney += cartList[i].sideDishesMoney
					//计算小菜价格
					newArry[j].addedDishesMoney += cartList[i].addedDishesMoney
					//合并备注信息
					for(var k=0;k<cartList[i].memoLists.length;k++){
						newArry[j].memoLists.push(cartList[i].memoLists[k])
					}
					tempIndex = true
				}
			}
			if(!tempIndex)
			{
				newArry.push(cartList[i])
			}
		}
		//如果newArry为空
		else{
			newArry.push(cartList[i])
		}
	}
	return newArry
}
function reloadShopCart(that,tempVue){
	//蒙版loading
	that.$store.state.tempIflag = false
	//暂时清空购物车
	that.$store.commit('change')
	//开始loading
	var reloading = false
	//刷新同步购物车
	that.$http.post(that.$store.state.orderHttp+"/jinghan-order/api/order/orderCart/refreshOrderCartAddItemsByOrderId",
			JSON.stringify({"param":{"merchantId":that.$store.state.merchantId,
									"tableId":that.$store.state.tableId,
									"orderId":that.$store.state.orderId,
									"nickName":that.$store.state.nickName,
									"headImgUrl":that.$store.state.headImgUrl
									},"channel":1})
			,{emulateJSON:true})
			.then(function(res){
				console.log('加菜刷新')
				console.log(res)
				//蒙版loading
				that.$store.state.tempIflag = true
				//购物车数据
				that.$store.state.cartList = res.body.data
				//加载完成
				reloading = true
				//刷新数据时候的蒙版
				that.$store.state.addingIndex = false
				for(var i=0;i<that.$store.state.cartList.length;i++){
					//小菜名称合并
					var addedDishesName = ''
					if(that.$store.state.cartList[i].addedDishList){
						var addedDishesMoney = 0
						for(var j=0;j<that.$store.state.cartList[i].addedDishList.length;j++){
							addedDishesName += that.$store.state.cartList[i].addedDishList[j].addedDishName +'+'+Number(that.$store.state.cartList[i].addedDishList[j].price/100).toFixed(2)+'元,'
							addedDishesName = addedDishesName.substr(0,addedDishesName.length-1)
							addedDishesMoney += that.$store.state.cartList[i].addedDishList[j].price/100
						}
					}
					that.$store.state.cartList[i].addedDishesMoney = addedDishesMoney
					//配菜名称合并
					var sideDishesName = ''
					if(that.$store.state.cartList[i].addedOnSideList){
						var sideDishesMoney = 0
						for(var j=0;j<that.$store.state.cartList[i].addedOnSideList.length;j++){
							sideDishesName += that.$store.state.cartList[i].addedOnSideList[j].dishesName +'+'+Number(that.$store.state.cartList[i].addedOnSideList[j].salePrice/100).toFixed(2)+'元,'
							sideDishesName = sideDishesName.substr(0,sideDishesName.length-1)
							sideDishesMoney += that.$store.state.cartList[i].addedOnSideList[j].dishesPrice/100
						}
					}
					that.$store.state.cartList[i].sideDishesMoney = sideDishesMoney
					//生成一个memoLists对像
					that.$store.state.cartList[i].memoLists =
						[{
						headImg:that.$store.state.cartList[i].userHeadUrl,
						nickName:that.$store.state.cartList[i].userName,
						showIndex:false,
						//配菜
						sideDishes:sideDishesName,
						//小菜
						addedDishes:addedDishesName,
						//备注
						dictSetNameList:that.$store.state.cartList[i].dictSetNameList,
						//做法
						makeWay:that.$store.state.cartList[i].cuisineNameList,
						//特殊备注
						specialReq:that.$store.state.cartList[i].memo
						}]
					//给购物车添加新的属性
					tempVue.set(that.$store.state.cartList[i], 'userHeadUrls' , [that.$store.state.cartList[i].userHeadUrl])
					tempVue.set(that.$store.state.cartList[i], 'userNames' , [that.$store.state.cartList[i].userName])
					tempVue.set(that.$store.state.cartList[i], 'cartItemIds' , [])
					//为同一cartItemId的菜品添加多个cartItemId用于减菜
					for(var j=0;j<that.$store.state.cartList[i].dishesCount;j++){
						that.$store.state.cartList[i].cartItemIds.push(that.$store.state.cartList[i].cartItemId)
					}
				}
				//购物车中已选中菜品合并，调用mergeDishes函数
				that.$store.state.cartList = mergeDishes(that.$store.state.cartList)
				
				//初始化菜品的数据
				for(var i=0;i<that.$store.state.cartList.length;i++){
					for(var j=0;j<that.$store.state.originList.length;j++){
						if(that.$store.state.originList[j].id == that.$store.state.cartList[i].dishesId){
							tempVue.set(that.$store.state.originList[j], 'memoLists' , that.$store.state.cartList[i].memoLists)
							tempVue.set(that.$store.state.originList[j], 'count' , that.$store.state.cartList[i].dishesCount)
							tempVue.set(that.$store.state.originList[j], 'cakesMoney' , that.$store.state.cartList[i].cakesMoney)
							tempVue.set(that.$store.state.originList[j], 'userHeadUrls' , that.$store.state.cartList[i].userHeadUrls)
							tempVue.set(that.$store.state.originList[j], 'userNames' , that.$store.state.cartList[i].userNames)
							tempVue.set(that.$store.state.originList[j], 'cartItemIds' , that.$store.state.cartList[i].cartItemIds)
						}
					}
				}
			})
			//如果一直在加载中
			var that = that
			if(!reloading){
				var timer = setTimeout(function(){
					reloading = true
					that.$store.state.addingIndex = false
					clearTimeout(timer)
				},3000)
			}
}
export {mergeDishes,reloadShopCart}

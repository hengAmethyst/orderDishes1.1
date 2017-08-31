function findMemoId(choose,data){
	var temp = ''
	for(let i=0;i<choose.length;i++){
		for(let j=0;j<data.length;j++){
			if(choose[i].indexOf(data[j].value)>-1){
				temp += data[j].id +','
			}
		}
	}
	temp = temp.substr(0,temp.length-1)
	return temp
}
function findFlavorId(choose,data){
	var temp = ''
	for(let i=0;i<choose.length;i++){
		for(let j=0;j<data.length;j++){
			if(choose[i].indexOf(data[j].value)>-1){
				temp += data[j].id +','
			}
		}
	}
	temp = temp.substr(0,temp.length-1)
	return temp
}
function findMakeWaysId(choose,data){
	var temp = ''
	for(let i=0;i<choose.length;i++){
		for(let j=0;j<data.length;j++){
			if(choose[i].indexOf(data[j].dishesMakingName)>-1){
				temp += data[j].dishesMakingId +','
			}
		}
	}
	temp = temp.substr(0,temp.length-1)
	return temp
}

function makeWaysId(choose,data){
	var temp = ''
	for(let i=0;i<choose.length;i++){
		for(let j=0;j<data.length;j++){
			if(choose[i].indexOf(data[j].name)>-1){
				temp += data[j].id +','
			}
		}
	}
	temp = temp.substr(0,temp.length-1)
	return temp
}

function findAddedDishesId(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].name)>-1){
			var temp = data[i].id
		}
	}
	return temp
}
function findAddedDishesName(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].name)>-1){
			var temp = data[i].name
		}
	}
	return temp
}
function findAddedDishesPrice(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].name)>-1){
			var temp = data[i].price
		}
	}
	return temp
}
//配菜
function findSideDishesId(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sideDishesId
		}
	}
	return temp
}
function findSideDishesName(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].dishesName
		}
	}
	return temp
}
function findSideDishesPrice(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sidePrice
		}
	}
	return temp
}
function findSideDishesUnitName(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sideDishesUnitName
		}
	}
	return temp
}
function findSideDishesUnitId(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sideDishesUnitId
		}
	}
	return temp
}
//配菜categoryId
function findSideDishesCategoryId(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sideCategoryId
		}
	}
	return temp
}
//配菜categoryName
function findSideDishesCategoryName(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sideCategoryName
		}
	}
	return temp
}
//配菜的图片
function findSideDishesPicUrl(choose,data){
	for(let i=0;i<data.length;i++){
		if(choose.indexOf(data[i].dishesName)>-1){
			var temp = data[i].sidePicUrl
		}
	}
	return temp
}
export {
	findAddedDishesPrice,
	findAddedDishesName,
	findAddedDishesId,
	findMemoId,
	findFlavorId,
	findMakeWaysId,
	makeWaysId,
	findSideDishesUnitName,
	findSideDishesUnitId,
	findSideDishesId,
	findSideDishesName,
	findSideDishesPrice,
	findSideDishesCategoryId,
	findSideDishesCategoryName,
	findSideDishesPicUrl
}
function splitMerchantInfo(url){
	var tableTemp = url.split("?")[1].split("&")
	var tableId = tableTemp[0].split("=")[1]
	var merchantId = tableTemp[1].split("=")[1]
		merchantId = merchantId.split("#/")[0]
	var info = {
				tableId:tableId,
				merchantId:merchantId
				}
	return info
}
function splitUserInfo(url){
	var tempStr = url.split("?")[2].split("&")
	var openId = tempStr[0].split('=')[1]
	var headImgUrl = tempStr[2].split('=')[1]
	var info = {
				openId:openId,
				headImgUrl:headImgUrl
				}
	return info
}
export {splitMerchantInfo,splitUserInfo}

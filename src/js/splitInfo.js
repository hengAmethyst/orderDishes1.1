function splitMerchantInfo(url){
	var tableId = getURLParam("tableId",url)
	var merchantId = getURLParam("merchantId",url)
	var info = {
				tableId:tableId,
				merchantId:merchantId
				}
	return info
}
function splitUserInfo(url){
	var openId = getURLParam("openId",url)
	var nickName = getURLParam("nickName",url)
		nickName = decodeURI(nickName)
	var headImgUrl = getURLParam("headimgurl",url)
	
	var info = {
				openId:openId,
				nickName:nickName,
				headImgUrl:headImgUrl
				}
	return info
}
function getURLParam(strParamName, url) {
	    var strReturn = ""
	    var strHref = url
	    if (strHref.indexOf("?") > -1) {
	        var strQueryString = strHref.substr(strHref.indexOf("?") + 1)
	        var aQueryString = strQueryString.split("&")
	        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
	            if (aQueryString[iParam].indexOf(strParamName + "=") > -1) {
	                var aParam = aQueryString[iParam].split("=")
	                strReturn = aParam[1]
	                if(strReturn.indexOf('#')){
	                		strReturn = strReturn.split('#')[0]
	                }
	                break;
	            }
	        }
	    }
	    return strReturn;
	}

export {splitMerchantInfo,splitUserInfo,getURLParam,request}

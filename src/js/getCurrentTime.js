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
export {getCurrentTime}

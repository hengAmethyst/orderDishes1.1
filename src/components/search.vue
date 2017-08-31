<template>
	<!--头部-->
	<div class="search">
		<div class="searchBox">
			<el-input placeholder="   请输入菜名/拼音首字母" class="input" @focus="iFlag=false" @blur="iFlag=true" v-model="search"></el-input>
			<a href="javascript:" onclick="history.back()">
			<span>取消</span>
			</a>
			<i class='iconfont icon-search icon' v-show="iFlag"></i>
		</div>
		<div class="inner"  v-if="dateLen">
			<img src="../assets/icons/搜索失败@3x.png"/>
			<p>哎呦~这里空空如野</p>
		</div>
		<div class="goods">
			<ul>
				<li v-for="(item,index) in searchData" @click="selectFood(item,index)">
					<p>
						<img :src="item.picUrl"/>
					</p>
					<p>
						<span>{{item.name}}</span>
						<span>{{item.sellNum}}</span>
						<span>￥{{item.price}}</span>
						<span>会员价:￥{{item.memberPrice}}</span>
					</p>
					<p @click.stop.prevent="">
						<numControl :food="item"></numControl>			
					</p>
				</li>
			</ul>
		</div>
		<detailPage class="detail" :food="temp" ref="food"></detailPage>
	</div>
</template>
<script>
import detailPage from './order/buy/detailPage.vue'
	export default{
		data(){
			return{
				iFlag:true,
				foods:[],
				//用来存放input框中输入的字符
				search:null,
				//search显示与隐藏的开关
				searchToggle:false,
				temp:{},
				dateLen:0
			}	
		}
		,
		components:{
			detailPage
		}
		,
		methods:{
           	selectFood(target,index){
	    			this.$refs.food.show()
	    			this.temp = this.searchData[index]
    			}
		}
		,
		created(){
			this.foods = this.$store.state.originList
		},
		computed:{
		 	//计算得出输入的信息后得到的检索信息展示
		    searchData(){
		    		var tempData = []
		    		if(this.search){
		    			this.search = this.search.toLowerCase()
		    		}
			    for(let i=0;i<this.$store.state.originList.length;i++){
				    	if(this.$store.state.originList[i].shortcutCode){
				      	if(this.$store.state.originList[i].name.indexOf(this.search)>-1|this.$store.state.originList[i].shortcutCode.indexOf(this.search)>-1){
				      		tempData.push(this.$store.state.originList[i])
				    		}
				      }
				    	else{
				    		if(this.$store.state.originList[i].name.indexOf(this.search)>-1){
				    			tempData.push(this.$store.state.originList[i])
				    		}
				    	}
			    }
			    return tempData
		    },
		   	dateLen(){
		   		return this.searchData.length
		   	}
		},
		watch:{
			search(){
				if(this.search.length<1){
					this.search = null
				}
			}
		}
	}
</script>
<style lang="scss">
.search{
	position:fixed;
	top:0;
	left:0;
	display: flex;
	flex-direction: column;
	width:100%;
	height:100%;
	background:white;
	z-index:2000;
	 /*头部*/
	.headers{
		position:relative;
		display:flex;
		justify-content:center;
		align-items:center;
		width:100%;
		height:0.44rem;
		background:#1B1A1F;
		color:#fff;
		font-size:0.18rem;
		font-family:PingFangSC-Regular ;
			 .h-s1{
			 	position:absolute;
			 	left:0.15rem;
			 	top:32%;
			 	.icon-zuojiantou{
			 		color:#fff;
			 		font-size:0.2rem
			 		}
			 	};
	}
	.searchBox{
		position:relative;
		width:100%;
		height:0.6rem;
		background: #fff;
		line-height:0.6rem;
		border-bottom:1px solid #f9f9f9;
		.input{
			width:3.12rem;
			height:0.26rem;
			margin-left:0.15rem;
			color: #B4B4B4;
			input{
				line-height: 0.26rem;
				padding-left:0.25rem;
				padding-top:0.05rem;
				color: #282828;
				border: 1px solid #E4E4E4;
			}
			/*修改placeholder字体的颜色*/
			::-webkit-input-placeholder{ 
				color: #B4B4B4; 
			} 
		}
		span{
			font-size:0.14rem;
			color: #282828;
		}
		.icon{
			position:absolute;
			top:1%;
			left:6%;
			font-size:0.24rem;
			color:#ccc;
		}
	}
	.inner{
		flex:1;
		background:white;
		img{
			position:absolute;
			left:50%;
			transform: translateX(-50%);
			width:1.5rem;
			height:1.5rem;
			margin-top:0.3rem;
		}
		p{
			position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%); 
			font-size:0.2rem;
			color:#eee;
		}
	}
	/*搜索商品列表*/
	.goods{
		height:100%;
		overflow: scroll;
		/*苹果滚动*/
		-webkit-overflow-scrolling : touch;
		ul{
			li{
				position:relative;
				display:flex;
				align-items:center;
				width:100%;
				height:1rem;
				border-bottom:1px solid #eee;
				p:nth-child(1){
					margin-left:0.15rem;
					img{
						width:0.65rem;
						height:0.65rem;
					}
				}
				p:nth-child(2){
					display:flex;
					flex-direction:column;
					justify-content:space-between;
					height:0.65rem;
					margin-left:0.1rem;
					span:nth-child(1){
						font-size: 0.18rem;
						color: #282828;
					}
					span:nth-child(2){
						color: #B4B4B4;
					}
					span:nth-child(3){
						font-size: 0.16rem;
						color: #282828;
					}
					span:nth-child(4){
						font-size:0.13rem;
						color:#FF2C2C;
					}
				}
				p:nth-child(3){
					position:absolute;
					right:0rem;
					bottom:0.18rem;
				}
			}
		}
	} 
}
</style>
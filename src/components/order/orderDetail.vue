<template>
	<div class='orderDetail'>
		<serve></serve>
		<orderTab @child-say="parentNow"></orderTab>
		<alert :showMsg="showMsg" v-if="this.$store.state.showAlert"></alert>
	</div>
</template>
<script>
import orderTab from './order-tab.vue'
	export default{
		data(){
			return{
				index:true,
				showMsg:'已经有人下单了'
			}
		},
		methods:{
			parentNow:function(test){
				this.index = test
			}
		}
		,
		components:{
			orderTab
		}
	}
</script>
<style lang='scss'>
	.orderDetail{
		display:flex;
		flex-direction: column;
		overflow: hidden;
		height:100%;
	}
</style>
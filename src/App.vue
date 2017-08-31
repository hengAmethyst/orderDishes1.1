<template>
	<!--<transition name="view">-->
		<keep-alive>
			<router-view v-show="true"></router-view>
		</keep-alive>
	<!--</transition>-->
</template>
<script>
export default{
	data(){
		return{
			isView:true
		}
	}
}
</script>
<style lang="scss">
		.view-enter-active{
			transition:all 0.3s ease;
		}
		.view-enter{
			transform: translate3d(100px,50px,-50px);
		}
</style>
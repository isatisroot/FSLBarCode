<template>
	<div id="app">
		<!-- <barcode></barcode> -->
		<router-view></router-view>

	</div>
</template>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script>
	// import barcode from './components/barcode.vue'

	export default {
		name: 'App',
// 		components: {
// 			barcode
// 		},

	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
</style>

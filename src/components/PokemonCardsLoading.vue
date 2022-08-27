<script setup>
	import PokemonCardLoading from "./PokemonCardLoading.vue";
</script>
<template>
	<ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		<li v-for="i in 15" :key="i" class="relative">
			<PokemonCardLoading />
		</li>
	</ul>
</template>

<script setup>
	import PokemonCard from "./PokemonCard.vue";
	defineProps({
		pokemons: {
			type: Array,
			default: [],
		},
	});
</script>
<template>
	<ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
		<li v-for="(pokemon, index) in pokemons" :key="pokemon.name" class="relative">
			<PokemonCard :pokemon="pokemon" :index="index + 1" />
		</li>
	</ul>
</template>

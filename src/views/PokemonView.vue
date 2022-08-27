<script setup>
	import { ref } from "vue";
	import { useFetch } from "../composables/useFetch";
	import config from "../config";
	import PokemonCardLoading from "../components/PokemonCardLoading.vue";
	import PokemonCard from "../components/PokemonCard.vue";
	const props = defineProps({
		name: {
			type: String,
		},
	});

	const error = ref(null);
	const isLoading = ref(false);
	const pokemon = ref(null);

	async function fetchPokemon(name) {
		error.value = null;
		isLoading.value = true;
		try {
			const response = await useFetch(`${config.POKE_API}/${props.name}`);
			pokemon.value = response;
		} catch (e) {
			error.value = e.message;
		} finally {
			isLoading.value = false;
		}
	}

	fetchPokemon(props.name);
</script>
<template>
	<div class="py-6 px-4 sm:px-6 md:px-8">
		<div class="py-5 flex justify-between flex-wrap">
			<router-link :to="{ name: 'pokemons' }" class="flex gap-2 items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 dark:text-gray-300"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
				<span class="dark:text-gray-300 text-sm font-semibold">Voltar</span>
			</router-link>
		</div>
		<div class="max-w-7xl mx-auto">
			<PokemonCardLoading v-if="isLoading" />
			<div
				v-else-if="error"
				class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 dark:bg-gray-800"
			>
				<div class="flex items-center justify-center">
					{{ error }}
				</div>
			</div>
			<PokemonCard v-else :pokemon="pokemon" :index="pokemon.id" />
		</div>
	</div>
</template>

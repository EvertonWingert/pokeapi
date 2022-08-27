<script setup>
	import { onMounted, ref, watch } from "vue";
	import Button from "../components/Button.vue";
	import DarkModeButton from "../components/DarkModeButton.vue";
	import Input from "../components/Input.vue";
	import { useFetch } from "../composables/useFetch";
	import PokemonCardsLoading from "../components/PokemonCardsLoading.vue";
	import PokemonCards from "../components/PokemonCards.vue";
	import config from "../config";
	import { useRouter } from "vue-router";

	const router = useRouter();

	const pokemons = ref([]);
	const nextURL = ref(config.POKE_API);
	const isLoadingPokemons = ref(false);
	const pokemonName = ref(null);

	async function fetchPokemons(url) {
		isLoadingPokemons.value = true;
		const response = await useFetch(url);
		nextURL.value = response.next;
		pokemons.value = [...pokemons.value, ...response.results];
		isLoadingPokemons.value = false;
	}

	async function searchPokemon(event) {
		const form = new FormData(event.target);
		const pokemon = form.get("search-pokemon")?.toLocaleLowerCase();

		await router.push({
			name: "pokemon",
			params: {
				name: pokemon,
			},
		});
	}

	onMounted(() => {
		fetchPokemons(nextURL.value);
	});
</script>
<template>
	<main class="relative">
		<div class="py-6 px-4 sm:px-6 md:px-8">
			<div class="py-5 flex justify-between flex-wrap">
				<h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">Pokedex</h1>
				<div class="flex items-center gap-2 mt-5 sm:mt-0">
					<form @submit.prevent="searchPokemon">
						<Input type="search" placeholder="Busque um pokemon" name="search-pokemon" />
					</form>
					<DarkModeButton />
				</div>
			</div>
			<div class="max-w-7xl mx-auto">
				<PokemonCardsLoading v-if="!pokemons.length && isLoadingPokemons" />
				<PokemonCards v-else :pokemons="pokemons" @selected-pokemon="(e) => (pokemonName = e)" />
			</div>
		</div>
		<div
			class="pointer-events-none absolute -inset-x-2.5 -bottom-2.5 h-[11.6%] bg-gradient-to-t from-white to-white/25 dark:from-gray-900 dark:to-gray-800/5 sm:h-[10.3%]"
		></div>
	</main>

	<div class="pointer-events-none relative z-10 -mt-5 flex justify-center py-5">
		<Button @click="fetchPokemons(nextURL)" :disabled="isLoadingPokemons">
			<svg
				v-if="isLoadingPokemons"
				class="w-5 h-5 text-white animate-spin dark:text-gray-900 mr-2"
				v-bind="$attrs"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<span> {{ isLoadingPokemons ? "Buscando..." : "Buscar mais..." }} </span>
		</Button>
	</div>
</template>

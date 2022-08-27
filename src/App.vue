<script setup>
	import { onMounted, ref, watch } from "vue";
	import Button from "./components/Button.vue";
	import PokemonList from "./components/PokemonList.vue";
	import PokemonListLoading from "./components/PokemonListLoading.vue";
	import DarkModeButton from "./components/DarkModeButton.vue";
	import Input from "./components/Input.vue";
	import MainLayout from "./layouts/MainLayout.vue";
	import { useFetch } from "./composables/useFetch";
	import Pokemon from "./components/Pokemon.vue";
	import PokemonLoading from "./components/PokemonLoading.vue";

	const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

	const pokemons = ref([]);
	const nextURL = ref(BASE_URL);
	const isLoadingPokemons = ref(false);
	const pokemonName = ref(null);
	const currentPokemon = ref(null);
	const isLoadingSearch = ref(false);

	async function fetchPokemons(url) {
		isLoadingPokemons.value = true;
		const response = await useFetch(url);
		nextURL.value = response.next;
		pokemons.value = [...pokemons.value, ...response.results];
		isLoadingPokemons.value = false;
	}

	async function searchPokemon(name) {
		isLoadingSearch.value = true;
		const response = await useFetch(`${BASE_URL}/${name}`);
		currentPokemon.value = response;
		isLoadingSearch.value = false;
	}

	watch(pokemonName, () => {
		if (pokemonName.value) {
			searchPokemon(pokemonName.value?.toLowerCase());
		}
	});

	onMounted(() => {
		fetchPokemons(nextURL.value);
	});
</script>
<template>
	<MainLayout>
		<main class="relative">
			<div class="py-6 px-4 sm:px-6 md:px-8">
				<div class="py-5 flex justify-between flex-wrap">
					<h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">Pokedex</h1>
					<div class="flex items-center gap-2 mt-5 sm:mt-0">
						<Input
							type="search"
							placeholder="Busque um pokemon"
							name="search-pokemon"
							v-model="pokemonName"
						/>
						<DarkModeButton />
					</div>
				</div>
				<div class="max-w-7xl mx-auto">
					<div v-if="pokemonName && currentPokemon">
						<div v-if="isLoadingSearch">
							<PokemonLoading />
						</div>
						<div v-else>
							<Pokemon :pokemon="currentPokemon" :index="currentPokemon.id" />
						</div>
					</div>
					<div v-else>
						<PokemonListLoading v-if="!pokemons.length && isLoadingPokemons" />
						<PokemonList v-else :pokemons="pokemons" @selected-pokemon="(e) => (pokemonName = e)" />
					</div>
				</div>
			</div>
			<div
				v-if="!pokemonName"
				class="pointer-events-none absolute -inset-x-2.5 -bottom-2.5 h-[11.6%] bg-gradient-to-t from-white to-white/25 dark:from-gray-900 dark:to-gray-800/5 sm:h-[10.3%]"
			></div>
		</main>

		<div v-if="!pokemonName" class="pointer-events-none relative z-10 -mt-5 flex justify-center py-5">
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
	</MainLayout>
</template>

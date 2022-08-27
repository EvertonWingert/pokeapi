<script setup>
	defineProps({
		pokemon: {
			type: Object,
		},
		index: {
			type: Number,
			default: 1,
		},
	});
</script>
<template>
	<router-link :to="{ name: 'pokemon', params: { name: pokemon.name } }">
		<div
			class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden dark:focus-within:ring-offset-gray-900 dark:focus-within:ring-indigo-300"
		>
			<img
				:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`"
				:alt="`${pokemon.name}`"
				class="object-cover pointer-events-none group-hover:opacity-75"
			/>
			<button type="button" class="absolute inset-0 focus:outline-none">
				<span class="sr-only">View details for {{ pokemon.name }}</span>
			</button>
		</div>
		<p
			class="mt-2 block text-sm font-medium capitalize text-gray-900 dark:text-gray-50 truncate pointer-events-none"
		>
			{{ pokemon.name }}
		</p>
	</router-link>
</template>

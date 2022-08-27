import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("../views/PokemonsView.vue"),
		name: "pokemons",
	},
	{
		path: "/:name",
		component: () => import("../views/PokemonView.vue"),
		name: "pokemon",
		props: true,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;

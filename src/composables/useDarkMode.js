import { ref, computed, onMounted } from "vue";

export function useDarkMode() {
	const isDarkMode = ref(JSON.parse(localStorage.getItem("dark-mode")));

	function toggle() {
		if (isDarkMode.value) {
			isDarkMode.value = false;
			document.documentElement.classList.remove("dark");
			localStorage.setItem("dark-mode", false);
		} else {
			isDarkMode.value = true;
			document.documentElement.classList.add("dark");
			localStorage.setItem("dark-mode", true);
		}
	}

	onMounted(() => {
		if (isDarkMode.value) {
			document.documentElement.classList.add("dark");
		}
	});

	return {
		isDarkMode: computed(() => isDarkMode.value),
		toggle,
	};
}

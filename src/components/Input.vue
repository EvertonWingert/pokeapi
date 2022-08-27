<script setup>
	defineProps(["modelValue"]);
	defineEmits(["update:modelValue"]);
</script>
<template>
	<input
		v-bind="$attrs"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		class="dark:bg-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-gray-50 py-3 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-900 dark:focus-within:ring-indigo-300 bg-gray-50 border px-2 dark:border-gray-600"
	/>
</template>

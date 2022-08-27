<script>
	export default {
		inheritAttrs: false,
	};
</script>
<script setup>
	defineProps(["modelValue"]);
	defineEmits(["update:modelValue"]);
</script>
<template>
	<div :class="[$slots['left-addon'] || $slots['right-addon'] ? 'relative' : '', 'rounded-md shadow-sm']">
		<div v-if="$slots['left-addon']" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
			<slot name="left-addon" />
		</div>

		<input
			v-bind="$attrs"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			class="dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-gray-50 py-3 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-900 dark:focus-within:ring-indigo-300 bg-gray-50 border px-2 dark:border-gray-600"
			:class="[$slots['left-addon'] ? 'pl-10' : $slots['right-addon'] ? 'pr-10' : '']"
		/>
		<div v-if="$slots['right-addon']" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
			<slot name="right-addon" />
		</div>
	</div>
</template>

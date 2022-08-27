const cache = new Map();

export async function useFetch(url) {
	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);
	const json = await response.json();

	cache.set(url, json);

	return json;
}

const cache = new Map();

export async function useFetch(url) {
	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Request failed");
	}

	const json = await response.json();
	cache.set(url, json);

	return json;
}

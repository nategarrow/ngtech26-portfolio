export const stringToKebabCase = (str?: string) => {
	if (!str) {
		return '';
	}

	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
};

export const stringToRandomNumber = (str?: string) => {
	if (!str) {
		return '';
	}

	let hash = 0;
	if (str.length === 0) return hash;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}

	return Math.abs(hash);
};

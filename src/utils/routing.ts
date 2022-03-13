export function makePath(pathname: string) {
	const pathComponents = pathname.replaceAll(' ', '').split('/').slice(2);
	const path = pathComponents[0];
	if (path == null || path.length === 0) return '/';
	return `/${path}`;
}

export function getParamObject<T extends object = Record<string, never>>(
	params: string
) {
	return params.split('&').reduce((acc, keyValue) => {
		const splittedKeyValue = keyValue.split('=');
		if (splittedKeyValue.length !== 2) return acc;
		return { ...acc, [splittedKeyValue[0]]: splittedKeyValue[1] };
	}, {} as T);
}

export default { makePath, getParamObject };

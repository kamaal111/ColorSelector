function makeAppStoreTagContent(tag: Element) {
	let hasChanges = false;
	const appStoreTagContent: string[] = [];

	const contentArray = tag.getAttribute('content')?.split(',') ?? [];
	for (let index = 0; index < contentArray.length; index += 1) {
		const value = contentArray[index];
		const keyValue = value.trim().split('=');
		if (keyValue.length !== 2) continue;

		let itemsToPush;
		const [key] = keyValue;
		if (key === 'app-argument') {
			const { href } = window.location;
			if (href !== keyValue[1]) hasChanges = true;
			itemsToPush = [key, href];
		} else {
			itemsToPush = keyValue;
		}
		appStoreTagContent.push(itemsToPush.join('='));
	}

	return { hasChanges, appStoreTagContent };
}

export function setAppStoreTag() {
	const appStoreTag = document.querySelector('meta[name="apple-itunes-app"]');
	if (appStoreTag == null) return;

	const { hasChanges, appStoreTagContent } = makeAppStoreTagContent(appStoreTag);

	if (!hasChanges) return;
	appStoreTag.setAttribute('content', appStoreTagContent.join(', '));
}

export default { setAppStoreTag };

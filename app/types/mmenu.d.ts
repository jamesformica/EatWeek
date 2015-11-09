interface JQuery {
	mmenu({}): void;
}

interface MmenuControls {
	open(): void;
	close(): void;
	bind(eventName: string, callback: () => void)
}
interface JQuery {
	vgrid(options: VGridOptions): void;
}

interface VGridOptions {
	easing: string;
	time: number;
	delay: number;
	fadeIn: VGridFadeOptions;
}

interface VGridFadeOptions {
	time: number;
	delay: number;
}
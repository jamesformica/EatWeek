interface JQuery {
	vgrid(options: VGridOptions): VGridObject;
}

interface VGridObject {
	vgrefresh(): void;
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
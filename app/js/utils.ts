module eatweek.utils {
	"use strict";

	export function ReplaceAll(text: string, find: string, replace: any): string {
		return text.split(find).join(replace);
	}
}
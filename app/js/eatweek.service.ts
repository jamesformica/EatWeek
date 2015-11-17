module eatweek.service {
	"use strict";

	export enum Method {
		GET,
		POST
	}

	var callCounter = 0;
	var $loader: JQuery = undefined;

	export function SendRequest<T>(method: Method, url: string, data: Object, showLoader: boolean = true): JQueryPromise<T> {
		ShowLoader(showLoader);

		var realMethod = method === Method.GET ? "GET" : "POST";

		var call = $.ajax({
			method: realMethod,
			url: url,
			data: data
		});

		call.always(() => {
			HideLoader();
		});

		return call;
	}

	function ShowLoader(showLoader: boolean): void {
		if ($loader === undefined) {
			$loader = $('.ui-loader').first();
		}

		if (showLoader && callCounter === 0) {
			$loader.show();
		}

		callCounter++;
	}

	function HideLoader(): void {
		callCounter--;

		if (callCounter === 0) {
			$loader.fadeOut(200);
		}
	}
}
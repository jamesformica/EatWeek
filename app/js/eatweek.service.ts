module eatweek.service {
	"use strict";

	export enum Method {
		GET,
		POST
	}

	export function SendRequest<T>(method: Method, url: string, data: Object): JQueryPromise<T> {
		var realMethod = method === Method.GET ? "GET" : "POST";

		return $.ajax({
			method: realMethod,
			url: url,
			data: data
		});
	}
}
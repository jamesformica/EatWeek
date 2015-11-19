module eatweek.RecipeService {
	"use strict";

	interface IAddRecipe {
		day_index: number;
		recipe_id: string;
		description: string;
		image_url: string;
		rank: number;
	}

	export function SearchForRecipe(value: string): JQueryPromise<RecipeSearchResult> {
		var data = {
			text: value
		};
		return eatweek.service.SendRequest<RecipeSearchResult>(eatweek.service.Method.GET, "/searchrecipe", data);
	}

	export function AddRecipe(dayIndex: number, recipeID: string, description: string, imageUrl: string, rank: number): JQueryPromise<any> {
		var callData: IAddRecipe = {
			day_index: dayIndex,
			recipe_id: recipeID,
			description: description,
			image_url: imageUrl,
			rank: rank
		};

		return eatweek.service.SendRequest<any>(eatweek.service.Method.POST, "/addrecipe", callData);
	}

	export function GetThisWeek(date: string = undefined): JQueryPromise<string> {
		var data = {
			date: date
		};
		return eatweek.service.SendRequest<string>(eatweek.service.Method.GET, "/thisweek", data);
	}
}
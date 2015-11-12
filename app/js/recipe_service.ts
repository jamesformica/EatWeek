module eatweek.RecipeService {
	"use strict";

	interface IAddRecipe {
		day_index: number;
		recipe_id: string;
		description: string;
		image_url: string;
	}

	export function SearchForRecipe(value: string): JQueryPromise<RecipeSearchResult> {
		return $.ajax({
			method: "GET",
			url: "/searchrecipe",
			data: { text: value }
		});
	}

	export function AddRecipe(dayIndex: number, recipeID: string, description: string, imageUrl: string): JQueryPromise<any> {
		var callData: IAddRecipe = {
			day_index: dayIndex,
			recipe_id: recipeID,
			description: description,
			image_url: imageUrl
		};

		return $.ajax({
			method: "POST",
			url: "/addrecipe",
			data: callData
		});
	}
}
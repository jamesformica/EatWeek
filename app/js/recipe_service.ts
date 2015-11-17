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
		return $.ajax({
			method: "GET",
			url: "/searchrecipe",
			data: { text: value }
		});
	}

	export function AddRecipe(dayIndex: number, recipeID: string, description: string, imageUrl: string, rank: number): JQueryPromise<any> {
		var callData: IAddRecipe = {
			day_index: dayIndex,
			recipe_id: recipeID,
			description: description,
			image_url: imageUrl,
			rank: rank
		};

		return $.ajax({
			method: "POST",
			url: "/addrecipe",
			data: callData
		});
	}

	export function GetThisWeek(date: string = undefined): JQueryPromise<string> {
		return $.ajax({
			method: "GET",
			url: "/thisweek",
			data: {
				date: date
			}
		});
	}
}
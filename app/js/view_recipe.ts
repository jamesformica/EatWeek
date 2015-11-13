/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/food2fork.d.ts" />

module eatweek.recipe {
	"use strict";

	export function InitiliseViewRecipe($container: JQuery): void {

		var recipeID: string = $container.find('.ui-hidden-recipeid').val().toString();
		var $ingredients = $container.find('.ui-ingredients');

		$.ajax({
			method: "GET",
			url: "/getrecipe",
			data: {
				recipe_id: recipeID
			}
		}).done((recipe) => {
			DisplayRecipe(recipe.recipe, $ingredients);
		}).fail(() => {
			alert("nuuuuuu");
		});
	}

	function DisplayRecipe(recipe, $ingredients: JQuery): void {

		for (var i = 0; i < recipe.ingredients.length; i++) {
			var $ingredient = $("<li>").text(recipe.ingredients[i]);
			$ingredients.append($ingredient);
		}
	}
}
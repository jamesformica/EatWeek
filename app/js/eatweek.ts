/// <reference path="../types/jquery.d.ts" />

module eatweek {
	"use strict";

	export var $today: JQuery;
	export var $thisWeek: JQuery;

	export function InitialiseEatWeek($container: JQuery): void {

		var $hamburger = $container.find('.ui-hamburger');

		eatweek.$thisWeek = $container.find('.ui-this-week');
		eatweek.$today = $container.find('.ui-today');

		var $addRecipe = $container.find('.ui-add-recipe');

		var mmenu = new eatweek.mmenu.Mmenu($hamburger);

		eatweek.utils.HeightToBottom($thisWeek);
		eatweek.utils.HeightToBottom($today);

		$addRecipe.click(() => {
			eatweek.popup.ShowInPopup("/addrecipe", "Add Recipe");
		});

		eatweek.$thisWeek.on("click", '.ui-thisweek-card', (e) => {
			ViewRecipe($(e.currentTarget));
		});
	}

	function ViewRecipe($element: JQuery): void {
		var recipeID: string = $element.data("recipeid").toString();

		var data = {
			recipe_id: recipeID
		};

		eatweek.popup.ShowInPopup("/recipe", "", false, data);
	}

	export function ReloadThisWeek(): void {
		eatweek.RecipeService.GetThisWeek().done((html) => {
			eatweek.$thisWeek.html(html);
		});
	}

}
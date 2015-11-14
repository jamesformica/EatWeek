/// <reference path="../types/jquery.d.ts" />

module eatweek {
	"use strict";

	export var $thisWeek: JQuery;

	export function InitialiseEatWeek($container: JQuery): void {

		var $hamburger = $container.find('.ui-hamburger');

		eatweek.$thisWeek = $container.find('.ui-this-week');

		var $addRecipe = $container.find('.ui-add-recipe');

		var mmenu = new eatweek.mmenu.Mmenu($hamburger);

		eatweek.utils.HeightToBottom($thisWeek);

		$addRecipe.click(() => {
			eatweek.popup.ShowInPopup({
				Url: "/addrecipe",
				Title: "Add Recipe",
				Size: popup.PopupSize.Large,
				Data: {},
				ShowHeading: true
			});
		});

		eatweek.$thisWeek.on("click", '.ui-thisweek-card', (e) => {
			ViewRecipe($(e.currentTarget));
		});
	}

	function ViewRecipe($element: JQuery): void {
		var id: string = $element.data("id").toString();

		eatweek.popup.ShowInPopup({
			Url: "/recipe",
			Title: "",
			Size: popup.PopupSize.Medium,
			Data: {
				id: id
			},
			ShowHeading: false
		});
	}

	export function ReloadThisWeek(): void {
		eatweek.RecipeService.GetThisWeek().done((html) => {
			eatweek.$thisWeek.html(html);
		});
	}

}
/// <reference path="../types/jquery.d.ts" />

module eatweek {
	"use strict";

	export var $thisWeek: JQuery;

	export function InitialiseEatWeek($container: JQuery): void {

		var $pageHeader = $container.find('.ui-page-header');
		var $hamburger = $pageHeader.find('.ui-hamburger');
		var $addRecipe = $pageHeader.find('.ui-add-recipe');
		var mmenu = new eatweek.mmenu.Mmenu($hamburger);

		eatweek.$thisWeek = $container.find('.ui-this-week');
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

		$pageHeader.on("click", '.ui-prev-week', (e) => {
			var $prev = $(e.currentTarget);
			ReloadThisWeek($prev.data("date").toString());
		});

		$pageHeader.on("click", '.ui-next-week', (e) => {
			var $next = $(e.currentTarget);
			ReloadThisWeek($next.data("date").toString());
		});

		eatweek.utils.HeightToBottom(eatweek.$thisWeek.find('.ui-week-column'));
	}

	export function ViewRecipe($element: JQuery): void {
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

	export function ReloadThisWeek(date: string = undefined): void {
		eatweek.RecipeService.GetThisWeek(date).done((html) => {
			eatweek.$thisWeek.html(html);
		});
	}

}
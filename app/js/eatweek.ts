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

		yToBottom($thisWeek);
		yToBottom($today);

		$addRecipe.click(() => {
			eatweek.popup.ShowInPopup("", "Add Recipe");
		});
	}

	function yToBottom($element: JQuery): void {
		var pos = $element.offset();
		var windowH = $(window).height();
		$element.css("height", windowH - pos.top);
		$element.css("overflow-y", "auto");
	}

	export function ReloadThisWeek(): void {
		eatweek.RecipeService.GetThisWeek().done((html) => {
			eatweek.$thisWeek.html(html);
		});
	}

}
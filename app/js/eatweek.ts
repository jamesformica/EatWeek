/// <reference path="../types/jquery.d.ts" />

module eatweek {
	"use strict";

	export function InitialiseEatWeek($container: JQuery): void {

		var $hamburger = $container.find('.ui-hamburger');

		var $thisWeek = $container.find('.ui-this-week');
		var $today = $container.find('.ui-today');

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

}
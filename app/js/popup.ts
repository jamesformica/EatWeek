/// <reference path="../types/jquery.d.ts" />

module eatweek.popup {
	"use strict";

	export function ShowInPopup(url: string, title: string): void {

		var $popup = BuildPopup(title);

		AttachPopupEvents($popup);		


		$.ajax({
			method: "GET",
			url: "/addrecipe"
		})
		.done(function(html) {
			$popup.find('.ui-content').html(html);

			$('body').prepend($popup);
		});

	}

	function BuildPopup(title: string): JQuery {

		var $popupBackdrop = $("<div>")
		.addClass("popup-backdrop ui-popup-backdrop");

		var $popup = $("<div>")
		.addClass("popup ui-popup");

		var $loading = $("<i>")
		.addClass("fa fa-spinner fa-spin loader ui-loader hidden");

		var $header = $("<header>")
		.text(title);

		var $close = $("<i>")
		.addClass("fa fa-times ui-close");

		$header.append($close);

		var $content = $("<section>")
		.addClass("content ui-content");

		$popup.append($loading);
		$popup.append($header);
		$popup.append($content);

		$popupBackdrop.append($popup);

		return $popupBackdrop;

	}

	function AttachPopupEvents($popup: JQuery): void {
		$popup.find('.ui-close').click((e: JQueryEventObject) => {
			ClosePopup($(e.currentTarget));
		});
	}

	export function ClosePopup($element: JQuery): void {
		$element.closest('.ui-popup-backdrop').remove();
	}

	export function ShowLoader($element: JQuery): void {
		ToggleLoader($element, false);
	}

	export function HideLoader($element: JQuery): void {
		ToggleLoader($element, true);
	}

	function ToggleLoader($element: JQuery, state: boolean): void {
		$element.closest('.ui-popup').find('.ui-loader').first().toggleClass("hidden", state);
	}


}
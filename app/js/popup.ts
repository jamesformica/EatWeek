/// <reference path="../types/jquery.d.ts" />

module eatweek.popup {
	"use strict";

	export interface IPopupSettings {
		Url: string;
		Title: string;
		Data: {};
		Size: PopupSize;
		ShowHeading: boolean;
	}

	export enum PopupSize {
		Medium,
		Large
	}

	export function ShowInPopup(settings: IPopupSettings): void {
		var $popup = BuildPopup(settings.Title, settings.Size, settings.ShowHeading);

		AttachPopupEvents($popup);

		$.ajax({
			method: "GET",
			url: settings.Url,
			data: settings.Data
		})
		.done(function(html) {
			$popup.find('.ui-content').html(html);

			$('body').prepend($popup);
		});
	}

	function BuildPopup(title: string, size: PopupSize, showHeading: boolean = true): JQuery {

		var $popupBackdrop = $("<div>")
		.addClass("popup-backdrop ui-popup-backdrop");

		var $popup = $("<div>")
		.addClass("popup ui-popup");

		if (size === PopupSize.Medium) {
			$popup.addClass("medium");
		}

		var $header = $("<header>")
		.text(title);

		if (!showHeading) {
			$header.addClass("invisible");
		}

		var $close = $("<i>")
		.addClass("fa fa-times ui-close");

		$header.append($close);

		var $content = $("<section>")
		.addClass("content ui-content");

		$popup.append($header);
		$popup.append($content);
		$popupBackdrop.append($popup);

		return $popupBackdrop;

	}

	function AttachPopupEvents($popup: JQuery): void {
		$popup.find('.ui-close').click((e: JQueryEventObject) => {
			ClosePopup($(e.currentTarget));
		});

		// clicking the backdrop of the popup
		$popup.click((e) => {
			ClosePopup($(e.currentTarget));
		}).children().click((e) => {
			e.stopPropagation();
		});
	}

	export function ClosePopup($element: JQuery): void {

		var $popup: JQuery;

		if ($element.hasClass('ui-popup-backdrop')) {
			$popup = $element;
		} else {
			$popup = $element.closest('.ui-popup-backdrop');
		}

		$popup.fadeOut(200, () => {
			$popup.remove();
		});
	}

	function ToggleLoader($element: JQuery, state: boolean): void {
		$element.closest('.ui-popup').find('.ui-loader').first().toggleClass("hidden", state);
	}


}
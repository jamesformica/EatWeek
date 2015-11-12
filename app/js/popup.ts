/// <reference path="../types/jquery.d.ts" />

module eatweek.popup {
	"use strict";

	export interface IPopupSettings {
		Url: string;
		Title: string;
		ShowHeader: boolean;
		Data: {};
		Size: PopupSize
	}

	export enum PopupSize {
		Medium,
		Large
	}

	export function ShowInPopup(settings: IPopupSettings): void {
		var $popup = BuildPopup(settings.Title, settings.ShowHeader, settings.Size);

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

	function BuildPopup(title: string, showHeader: boolean, size: PopupSize): JQuery {

		var $popupBackdrop = $("<div>")
		.addClass("popup-backdrop ui-popup-backdrop");

		var $popup = $("<div>")
		.addClass("popup ui-popup");

		var $loading = $("<i>")
		.addClass("fa fa-spinner fa-spin loader ui-loader hidden");

		$popup.append($loading);

		if (showHeader) {
			var $header = $("<header>")
			.text(title);

			var $close = $("<i>")
			.addClass("fa fa-times ui-close");

			$header.append($close);
			$popup.append($header);
		} else {
			$popup.addClass("headless");
		}

		var $content = $("<section>")
		.addClass("content ui-content");

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
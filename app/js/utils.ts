

module eatweek.utils {
	"use strict";

	export enum NotificationType {
		Success,
		Warning,
		Error
	}

	export function HeightToBottom($element: JQuery): void {
		var pos = $element.offset();
		var windowH = $(window).height();
		$element.css("height", windowH - pos.top);
		$element.css("overflow-y", "auto");
	}

	export function ReplaceAll(text: string, find: string, replace: any): string {
		return text.split(find).join(replace);
	}

	export function BuildNotification(type: NotificationType, header: string, message: string): JQuery {
		var $header = $("<span>").addClass("header").text(header || "Popcorn");
		var $message = $("<p>").addClass("message").text(message);
		var $notification = $("<div>").addClass("notification").append($header).append($message);

		if (type === NotificationType.Error) {
			$notification.addClass("error");
		} else if (type === NotificationType.Warning) {
			$notification.addClass("warning");
		} else {
			$notification.addClass("success");
		}

		return $notification;
	}
}
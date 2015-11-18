/// <reference path="../types/jquery.d.ts" />

module eatweek {
	"use strict";

	export var EatWeekInstance: EatWeek;

	export function InitialiseEatWeek($container: JQuery): void {
		eatweek.EatWeekInstance = new EatWeek($container);
	}

	export class EatWeek {

		private $pageHeader: JQuery;
		private $hamburger: JQuery;
		private $addRecipe: JQuery;
		private $thisWeek: JQuery;

		private mmenu: eatweek.mmenu.Mmenu;

		constructor(private $container: JQuery) {
			this.$pageHeader = this.$container.find('.ui-page-header');
			this.$hamburger = this.$pageHeader.find('.ui-hamburger');
			this.$addRecipe = this.$pageHeader.find('.ui-add-recipe');
			this.$thisWeek = this.$container.find('.ui-this-week');

			this.SetupEatWeek();
		}
		
		private SetupEatWeek(): void {
			this.SetupMmenu();
			this.AttachEvents();

			eatweek.utils.HeightToBottom(this.$thisWeek);
			eatweek.utils.HeightToBottom(this.$thisWeek.find('.ui-week-column'));
		}

		private SetupMmenu(): void {
			this.mmenu = new eatweek.mmenu.Mmenu(this.$hamburger);
		}

		private AttachEvents(): void {
			this.$addRecipe.click(() => {
				eatweek.popup.ShowInPopup({
					Url: "/addrecipe",
					Title: "Add Recipe",
					Size: eatweek.popup.PopupSize.Large,
					Data: {},
					ShowHeading: true
				});
			});

			this.$thisWeek.on("click", '.ui-thisweek-card', (e) => {
				this.ViewRecipe($(e.currentTarget));
			});

			this.$pageHeader.on("click", '.ui-prev-week', (e) => {
				var $prev = $(e.currentTarget);
				var date = $prev.data("date").toString();
				this.ReloadDateControls(this.$pageHeader, date);
				this.ReloadThisWeek(date);
			});

			this.$pageHeader.on("click", '.ui-next-week', (e) => {
				var $next = $(e.currentTarget);
				var date = $next.data("date").toString();
				this.ReloadDateControls(this.$pageHeader, date);
				this.ReloadThisWeek(date);
			});
		}

		ReloadThisWeek(date: string = undefined): void {
			eatweek.RecipeService.GetThisWeek(date).done((html) => {
				this.$thisWeek.fadeOut(200, () => {
					this.$thisWeek.html(html);
					this.$thisWeek.show();
				});
			});
		}

		ReloadDateControls($header: JQuery, date: string): void {
			var data = {
				date: date
			};

			eatweek.service.SendRequest<string>(eatweek.service.Method.GET, "/datecontrols", data, false).done((html) => {
				$header.find('.ui-date-controls').replaceWith($.parseHTML(html));
			});
		}

		ViewRecipe($element: JQuery): void {
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
	}

}
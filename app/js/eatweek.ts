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
		private $thisWeek: JQuery;

		private mmenu: eatweek.mmenu.Mmenu;

		constructor(private $container: JQuery) {
			this.$pageHeader = this.$container.find('.ui-page-header');
			this.$hamburger = this.$pageHeader.find('.ui-hamburger');
			this.$thisWeek = this.$container.find('.ui-this-week');

			this.SetupEatWeek();
		}
		
		private SetupEatWeek(): void {
			this.SetupMmenu();
			this.AttachEvents();
			this.PutTodayInCentre();

			eatweek.utils.HeightToBottom(this.$thisWeek);
		}

		private SetupMmenu(): void {
			this.mmenu = new eatweek.mmenu.Mmenu(this.$hamburger);
		}

		private PutTodayInCentre(): void {
			var $activeColumn = this.$thisWeek.find('.ui-week-column header.active').first();
			var c_width = $activeColumn.outerWidth();
			var c_left = $activeColumn.offset().left;
			var w_width = $(window).width();
			
			var whereTheColumnIs = c_left + c_width;

			var scrollLength = c_left + (c_width / 2) - (w_width / 2);
			
			this.$thisWeek.animate({
				scrollLeft: scrollLength
			}, 200);
		}

		private AttachEvents(): void {
			this.$thisWeek.on("click", '.ui-add-recipe', (e) => {
				eatweek.popup.ShowInPopup({
					Url: "/addrecipe",
					Title: "Add Recipe",
					Size: eatweek.popup.PopupSize.Large,
					Data: {
						date: $(e.currentTarget).data("date")
					},
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
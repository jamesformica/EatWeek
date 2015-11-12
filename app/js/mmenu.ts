/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/mmenu.d.ts" />

module eatweek.mmenu {
	"use strict";

	export class Mmenu {

		$mmenu: JQuery;
		mmenuControls: MmenuControls;

		constructor(private $hamburger: JQuery) {
			this.SetMmenu();
			this.Initialise();

			this.$hamburger.click(() => {
				this.mmenuControls.open();
			});

			this.mmenuControls.bind("opening", function() {
				$hamburger.addClass("active");
			});

			this.mmenuControls.bind("closing", function() {
				$hamburger.removeClass("active");
			});
		}

		private SetMmenu(): void {
			this.$mmenu = $('#mmenu');
		}

		private Initialise(): void {
			this.$mmenu.mmenu({
				extensions: [
					"theme-white",
					"pageshadow"
				],
				navbar: {
					title: "Eat Week"
				}
			});

			this.SetMmenu();

			this.mmenuControls = <any>this.$mmenu.data('mmenu');
		}
	}
}
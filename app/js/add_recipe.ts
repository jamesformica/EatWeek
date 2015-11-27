/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/vgrid.d.ts" />
/// <reference path="../types/food2fork.d.ts" />
/// <reference path="../types/waitforimages.d.ts" />

module eatweek.recipe {
	"use strict";

	export function InitiliseAddRecipe($container: JQuery): void {
		new AddRecipe($container);
	}

	class AddRecipe {

		$form: JQuery;
		$searchInput: JQuery;
		$recipeContainer: JQuery;
		$cloneCard: JQuery;
		$dayOfWeekContainer: JQuery;

		constructor(private $container: JQuery) {
			this.$form = this.$container.find('.ui-form');
			this.$searchInput = this.$form.find('.ui-search-criteria');
			this.$dayOfWeekContainer = this.$form.find('.ui-day-of-week');
			this.$cloneCard = this.$container.find('.ui-clone-card');
			this.$recipeContainer = this.$container.find('.ui-recipes');

			// automaitcally select the input so the keyboard popups up
			this.$searchInput.focus();
			this.$searchInput.select();

			this.AttachEvents();
		}

		private AttachEvents(): void {
			// set the day to add the recipe to
			this.$dayOfWeekContainer.on("click", "span", (e: JQueryEventObject) => {
				var $day = $(e.currentTarget);

				// clear current active day and set new active day
				$day.parent().find('span').removeClass("active");
				$day.addClass("active");
			});

			this.$searchInput.click(() => {
				this.$searchInput.select();
			});

			// searching for recipes
			this.$form.submit(() => {
				this.SearchForRecipe();
				return false;
			});

			// selecting a recipe
			this.$recipeContainer.on("click", '.ui-recipe-card', (e: JQueryEventObject) => {
				this.AddRecipe($(e.currentTarget));
			});
		}

		private SearchForRecipe(): void {
			// clear the existing recipes if any
			this.$recipeContainer.empty();

			eatweek.RecipeService.SearchForRecipe(this.$searchInput.val())
			.done((recipes) => {
				this.DisplayRecipes(recipes);
			})
			.fail(() => {
				this.$recipeContainer.append(eatweek.utils.BuildNotification(utils.NotificationType.Error, "Oopsies", "Something went wrong trying to find recipes."));
			});
		}

		private DisplayRecipes(recipes: RecipeSearchResult): void {
			var count = recipes.count;

			if (count > 0) {
				for (var i = 0; i < recipes.recipes.length; i++) {
					var recipe = recipes.recipes[i];

					// get the html as a string so we can replce the fun bits
					var newCloneCard: string = this.$cloneCard.clone().prop("outerHTML");

					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "hidden", "");
					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "{imageUrl}", recipe.image_url);
					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "{description}", recipe.title);
					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "{publisher}", recipe.publisher);
					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "{recipe_id}", recipe.recipe_id);
					newCloneCard = eatweek.utils.ReplaceAll(newCloneCard, "{rank}", Math.round(recipe.social_rank));

					this.$recipeContainer.append($.parseHTML(newCloneCard));
				}

				// use Vgrid to make it look all "pintrest" like
				var vgrid = this.$recipeContainer.vgrid({
					easing: "easeOutQuint",
					time: 500,
					delay: 20,
					fadeIn: {
						time: 300,
						delay: 50
					}
				});

				// after each image load, refresh vgrid
				this.$recipeContainer.waitForImages().progress(() => {
					vgrid.vgrefresh();
				});

			} else {
				this.$recipeContainer.append(eatweek.utils.BuildNotification(utils.NotificationType.Warning, "No recipes found", "Please try a different search and make sure everything is spelt correctly."));
			}
		}

		private AddRecipe($recipe: JQuery): void {
			var recipeID = $recipe.data("recipeid").toString();
			var description = $recipe.data("description").toString();
			var imageUrl = $recipe.data("imageurl").toString();
			var date = this.$dayOfWeekContainer.find(".active").first().data("date").toString();
			var rank = Number($recipe.data("rank"));

			eatweek.RecipeService.AddRecipe(date, recipeID, description, imageUrl, rank)
			.done(() => {
				eatweek.popup.ClosePopup(this.$container);
				eatweek.EatWeekInstance.ReloadThisWeek();
			})
			.fail(() => {
				alert("nooooo");
			});
		}
	}
}
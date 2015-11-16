/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/food2fork.d.ts" />

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
			eatweek.popup.ShowLoader(this.$container);

			// clear the existing recipes if any
			this.$recipeContainer.empty();

			eatweek.RecipeService.SearchForRecipe(this.$searchInput.val())
			.done((recipes) => {
				eatweek.popup.HideLoader(this.$container);

				this.DisplayRecipes(recipes);
			})
			.fail(() => {
				eatweek.popup.HideLoader(this.$container);

				this.$recipeContainer.append(eatweek.utils.BuildNotification(utils.NotificationType.Warning, "Oopsies", "Something went wrong trying to find recipes."));
			});
		}

		private DisplayRecipes(recipes: RecipeSearchResult): void {
			var count = recipes.count;

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
		}

		private AddRecipe($recipe: JQuery): void {
			var recipeID = $recipe.data("recipeid").toString();
			var description = $recipe.data("description").toString();
			var imageUrl = $recipe.data("imageurl").toString();
			var dayIndex = Number(this.$dayOfWeekContainer.find(".active").first().data("dayindex"));
			var rank = Number($recipe.data("rank"));

			eatweek.RecipeService.AddRecipe(dayIndex, recipeID, description, imageUrl, rank)
			.done(() => {
				eatweek.popup.ClosePopup(this.$container);
				eatweek.ReloadThisWeek();
			})
			.fail(() => {
				alert("nooooo");
			});
		}
	}
}
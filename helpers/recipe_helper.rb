class RecipeHelper

	def self.get_weekly_recipes(date_in_week)

		# calculate the dates for the start and end of the week
		week_start_day = date_in_week - date_in_week.wday
		week_end_day = date_in_week + (6 - date_in_week.wday)

		# retrieve all recipes within those dates
		recipes = Recipe.where(assigned_date: week_start_day.beginning_of_day..week_end_day.end_of_day)

		# group the recipes by their assigned dates
		grouped_recipes = {}
		recipes.each do |recipe|

			recipe_day_index = recipe.assigned_date.wday

			if grouped_recipes[recipe_day_index] == nil
				grouped_recipes[recipe_day_index] = []
			end

			grouped_recipes[recipe_day_index].push(recipe)

		end

		return grouped_recipes
	end

end
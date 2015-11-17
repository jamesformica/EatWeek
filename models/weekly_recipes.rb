class WeeklyRecipes

	attr_accessor :today, :grouped_recipes

	def initialize(date = nil)
		if (date.nil?)
			@today = Date.today
		else
			@today = Date.parse(date)
		end

		@grouped_recipes = RecipeHelper.get_weekly_recipes(@today)
	end

	def get_week_dates
		return (@today.at_beginning_of_week..@today.at_end_of_week).map
	end

end
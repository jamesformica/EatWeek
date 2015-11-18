require 'securerandom'
require 'open-uri'

class RecipeHelper

	def self.get_weekly_recipes(date_in_week)

		# retrieve all recipes within those dates
		recipes = Recipe.where(assigned_date: date_in_week.beginning_of_week..date_in_week.end_of_week)

		# group the recipes by their assigned dates
		grouped_recipes = {}
		recipes.each do |recipe|
			day_index = recipe.assigned_date.wday

			grouped_recipes[day_index] ||= []

			grouped_recipes[day_index].push(recipe)
		end

		return grouped_recipes
	end

	def self.add_recipe_from_params(params)
		# get all the info from params
		day_index = params["day_index"].to_i
		recipe_id = params["recipe_id"]
		description = params["description"]
		image_url = params["image_url"]
		rank = params["rank"].to_i

		# generate a guid for the image and save it to the public folder
		image_guid = SecureRandom.uuid
		public_path = File.join("recipe_images", "#{image_guid}.png")
		path = File.join("app", public_path)

		open(path, 'wb') do |image|
			image << open(image_url).read
		end

		# calculate the actual date from the selected date's index
		today = Date.today
		index_diff = day_index - today.wday
		date = today + index_diff

		new_recipe = Recipe.new(recipe_id: recipe_id, description: description, image_path: public_path, assigned_date: date, rank: rank)

		return new_recipe.save

	end

end
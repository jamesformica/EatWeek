require 'unirest'

class Food2ForkHelper

	def self.api_key
		"7e110811cf0df3c6c089462aede9beca"
	end

	def self.search_for_recipes(text)
		response = Unirest.get "http://food2fork.com/api/search",
		parameters: {
			"key" => api_key,
			"q" => text,
			"sort" => "r"
		}

		return response
	end

	def self.get_recipe(recipe_id)
		response = Unirest.get "http://food2fork.com/api/get",
		parameters: {
			"key" => api_key,
			"rId" => recipe_id
		}
		
		return response
	end

	private_class_method :api_key

end
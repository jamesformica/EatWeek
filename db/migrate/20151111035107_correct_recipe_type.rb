class CorrectRecipeType < ActiveRecord::Migration
	def change
		change_column :recipes, :recipe_id, :string
	end
end

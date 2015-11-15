class AddRankColumnToRecipes < ActiveRecord::Migration
	def change
		add_column :recipes, :rank, :integer
	end
end

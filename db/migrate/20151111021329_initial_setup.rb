class InitialSetup < ActiveRecord::Migration
	def change
		create_table :recipes do |t|
			t.decimal :recipe_id
			t.string :description
			t.string :img_url
			t.datetime :assigned_date

			t.timestamps null: false
		end
	end
end

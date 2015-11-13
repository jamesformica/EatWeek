class ChangeImgUrlColumn < ActiveRecord::Migration
	def change
		rename_column :recipes, :img_url, :image_path
	end
end

class Recipe < ActiveRecord::Base
	validates :recipe_id, presence: true
	validates :description, presence: true
	validates :image_path, presence: true
	validates :assigned_date, presence: true
end
class User < ActiveRecord::Base
	validates :name, presence: true
	validates :email, presence: true
	validates :email, uniqueness: true
	validates :img_url, presence: true
	validates :google_id_token, presence: true
end
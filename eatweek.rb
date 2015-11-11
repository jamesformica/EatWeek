require 'sinatra'
require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/json'
require 'sass'
require 'slim'
require 'unirest'
require "sinatra/activerecord"

require_relative 'helpers/container_helper'
require_relative 'helpers/recipe_helper'

# The main class that will run the web application
# It contains some asset configuration and then the routes
class App < Sinatra::Base

	# load and require all model classes
	(Dir['./models/*.rb'].sort).each do |file|
		require file
	end

	set :sessions => true
	
	set :root, File.dirname(__FILE__)
	set :public_folder, File.dirname(__FILE__) + '/app/'
	
	register Sinatra::AssetPack
	register Sinatra::ActiveRecordExtension

	App.helpers ContainerHelper
	
	# ASSET CONFIGURATION - define the assets that will be accessible #
	assets do

		js_compression  :jsmin
		css_compression :sass

		# define js variable to contain the collated and minified javascript files
		js :main, '/js/main.js', [
			'/js/dist/*.js',
		]

		# define a css variable to contain the converted and minified css files
		css :main, [
			'/css/*.css'
		]

		css :vendor, [
			'/css/vendor/**/*.css'
		]

	end
	
	get '/' do
		@today = Date.today

		@grouped_recipes = RecipeHelper.get_weekly_recipes(@today)

		puts @grouped_recipes

		slim :index
	end

	get '/addrecipe' do
		@today = Date.today
		slim :"add-recipe", layout: false
	end

	post '/addrecipe' do

		day_index = params["day_index"].to_i
		recipe_id = params["recipe_id"]
		description = params["description"]
		image_url = params["image_url"]

		today = Date.today
		today_index = today.wday
		index_diff = day_index - today_index

		date = today + index_diff

		newRecipe = Recipe.new(recipe_id: recipe_id, description: description, img_url: image_url, assigned_date: date)

		if newRecipe.save
			status 200
		else
			status 500
		end
	end


	get '/searchrecipe' do

		response = Unirest.get "http://food2fork.com/api/search",
		parameters:{
			"key" => "7e110811cf0df3c6c089462aede9beca",
			"q" => params['text'],
			"sort" => "r"
		}

		json response.body

	end

end
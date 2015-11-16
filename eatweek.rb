require 'sinatra'
require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/json'
require 'sass'
require 'slim'
require 'unirest'
require 'open-uri'
require 'sinatra/activerecord'

require_relative 'helpers/container_helper'
require_relative 'helpers/date_helper'
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
		slim :index
	end

	get '/thisweek' do
		slim :this_week, layout: false, :locals => { model: AddRecipe.new }
	end

	get '/addrecipe' do
		@today = Date.today
		slim :add_recipe, layout: false
	end

	post '/addrecipe' do
		if RecipeHelper.add_recipe_from_params(params)
			status 200
		else
			status 500
		end
	end

	get '/searchrecipe' do
		response = Unirest.get "http://food2fork.com/api/search",
		parameters: {
			"key" => "7e110811cf0df3c6c089462aede9beca",
			"q" => params['text'],
			"sort" => "r"
		}

		json response.body
	end

	get '/getrecipe' do
		response = Unirest.get "http://food2fork.com/api/get",
		parameters: {
			"key" => "7e110811cf0df3c6c089462aede9beca",
			"rId" => params["recipe_id"]
		}

		json response.body
	end

	get '/recipe' do
		@recipe = Recipe.find(params["id"].to_i)
		slim :view_recipe, layout: false
	end

end
require 'sinatra'
require 'sinatra/assetpack'
require 'sinatra/json'
require 'sinatra/activerecord'
require "sinatra/reloader"
require 'sass'
require 'slim'

class App < Sinatra::Base

	(Dir['./models/*.rb'].sort).each do |file|
		require file
	end

	(Dir['./helpers/*.rb'].sort).each do |file|
		require file
	end

	register Sinatra::AssetPack
	register Sinatra::ActiveRecordExtension

	App.helpers ContainerHelper

	set :root, File.dirname(__FILE__)
	set :public_folder, File.dirname(__FILE__) + '/app/'
	set :sessions => true

	configure :development do
		register Sinatra::Reloader
	end
	
	assets do
		js_compression  :jsmin
		css_compression :sass

		js :main, '/js/main.js', [
			'/js/dist/*.js',
		]

		css :main, [
			'/css/*.css'
		]

		css :vendor, [
			'/css/vendor/**/*.css'
		]
	end
	
	get '/' do
		@today = Date.today
		slim :index
	end

	get '/thisweek' do
		slim :this_week, layout: false, :locals => { model: WeeklyRecipes.new(params["date"]) }
	end

	get '/datecontrols' do
		slim :controls, layout: false, :locals => { date: Date.parse(params["date"]) }
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
		response = Food2ForkHelper.search_for_recipes(params['text'])
		json response.body
	end

	get '/getrecipe' do
		response = Food2ForkHelper.get_recipe(params["recipe_id"])
		json response.body
	end

	get '/recipe' do
		@recipe = Recipe.find(params["id"].to_i)
		slim :view_recipe, layout: false
	end

end
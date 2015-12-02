require 'sinatra'
require 'sinatra/assetpack'
require 'sinatra/json'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require 'sinatra/base'
require 'sinatra/cookies'
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
	helpers Sinatra::Cookies

	App.helpers ContainerHelper

	set :root, File.dirname(__FILE__)
	set :public_folder, File.dirname(__FILE__) + '/app/'
	set :sessions => true
	set :cookie_options do
		{ expires: Time.now + 3600*24 }
	end

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

	before '/' do
		
		if @auth_user.nil?

			auth_cookie = cookies[:eatweek_auth]

			if auth_cookie.nil?
				if request.path_info != '/login'
					puts "redirecting back to login"
					redirect to('/login')
				end
			else
				@auth_user = User.find(auth_cookie)
			end
		end
	end
	
	get '/' do
		puts "index"
		@today = Date.today
		slim :index
	end

	get '/login' do
		slim :login
	end

	get '/thisweek' do
		slim :this_week, layout: false, :locals => { model: WeeklyRecipes.new(params["date"]) }
	end

	get '/datecontrols' do
		slim :controls, layout: false, :locals => { date: Date.parse(params["date"]) }
	end

	get '/addrecipe' do
		@today = Date.parse(params["date"])
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

	post '/adduser' do
		user = UserHelper.add_user_from_params(params)
		if !user.nil?
			cookies[:eatweek_auth] = user.id
			status 200
		else
			status 500
		end
	end

end
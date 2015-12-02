require 'unirest'

class UserHelper
	def self.add_user_from_params(params)
		name = params["name"]
		email = params["email"].downcase
		img_url = params["img_url"]
		id_token = params["id_token"]

		# check with google that the token provided is valid
		response = Unirest.get "https://www.googleapis.com/oauth2/v3/tokeninfo",
		parameters: {
			"id_token" => id_token
		}

		# if so, create a new user
		if response.code == 200

			user = User.find_by(email: email)

			if !user.nil?
				puts "found user"
				user.google_id_token = id_token
			else
				puts "new user"
				user = User.new(name: name, email: email, img_url: img_url, google_id_token: id_token)
			end

			if user.save
				return user
			end
		end

		return nil
	end
end
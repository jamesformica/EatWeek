function OnSignIn(googleUser: any): void {
	
	var profile = googleUser.getBasicProfile();

	var data = {
		name: profile.getName(),
		email: profile.getEmail(),
		img_url: profile.getImageUrl(),
		id_token: googleUser.getAuthResponse().id_token
	};

	eatweek.service.SendRequest<boolean>(eatweek.service.Method.POST, "/adduser", data).done(() => {
		location.href = '/'
	});
}
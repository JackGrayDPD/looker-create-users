const { createUser, createUserCredentials } = require('./createUserHelpers');

/* createFullUser(user) expects:
{
		"first_name": "Zulfikar",
		"last_name": "Ali",
		"email": "zulfikar.ali@dpdgroup.co.uk",
		"is_disabled": "false",
		"locale": "en"
}
*/
module.exports.createFullUser = (user) => {
	//user = {first_name, last_name, email, is_disabled, locale}
	const { first_name, last_name, email, is_disabled, locale } = user;
	return new Promise((resolve, reject) => {
		createUser({ first_name, last_name, is_disabled, locale })
			.then(new_user => {
				createUserCredentials(new_user.id, email)
					.then(new_user_email => {
						resolve({ display_name: new_user.display_name, email: new_user_email });
					})
					.catch(err => {
						reject(err);
					})
			})
			.catch(err => {
				reject(err);
			})
	})
}
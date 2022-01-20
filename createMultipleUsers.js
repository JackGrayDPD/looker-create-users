const { createUser, createUserCredentials } = require('./createUserHelpers');

/* createMultipleUsers(user_array) expects:
{
		"user_array": [
				{
						"first_name": "Jack",
						"last_name": "Test6",
						"email": "jack.graytest6@dpdgroup.co.uk",
						"is_disabled": "false",
						"locale": "en"
				},
				{
						"first_name": "Jack",
						"last_name": "Test7",
						"email": "jack.graytest7@dpdgroup.co.uk",
						"is_disabled": "false",
						"locale": "en"
				}
		]
}
*/
module.exports.createMultipleUsers = (user_array) => {
	let new_users = [];
	let waiting = user_array.length;
	return new Promise((resolve, reject) => {
		user_array.forEach(user => {
			const { first_name, last_name, email, is_disabled, locale } = user;
			createUser({ first_name, last_name, is_disabled, locale })
				.then(new_user => {
					createUserCredentials(new_user.id, email)
						.then(new_user_email => {
							new_users.push({ display_name: new_user.display_name, email: new_user_email.email });
							waiting--;
							if (waiting == 0) {
								resolve(new_users);
							}
						})
						.catch(err => {
							reject(err);
						})
				})
				.catch(err => {
					reject(err);
				});
		});
	})
}
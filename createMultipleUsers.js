const { createUser, createUserCredentials } = require('./helpers');

module.exports.createMultipleUsers = (user_array, disabled) => {
	let new_users = [];
	let waiting = user_array.length;
	return new Promise((resolve, reject) => {
		user_array.forEach(user => {
			const { first_name, last_name, email } = user;
			createUser({ first_name, last_name, disabled })
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
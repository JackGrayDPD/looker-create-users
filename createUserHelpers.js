const sdk = require('./looker/sdk');

const createUser = (user) => {
	return new Promise((resolve, reject) => {
		sdk.ok(sdk.create_user({
			first_name: user.first_name,
			last_name: user.last_name,
			is_disabled: user.is_disabled,
			locale: user.locale
		}))
			.then(new_user => {
				resolve(new_user);
			})
			.catch(err => {
				reject(err)
			})
	})
}
const createUserCredentials = (user_id, user_email) => {
	return new Promise((resolve, reject) => {
		sdk.ok(sdk.create_user_credentials_email(user_id, { email: user_email }))
			.then(new_user_email_credentials => {
				resolve({ email: new_user_email_credentials.email });
			})
			.catch(err => {
				reject(err);
			})
	})
}
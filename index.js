const yargs = require('yargs');
const fs = require('fs');
const createMultipleUsers = require('./createMultipleUsers');

const args = yargs(process.argv.slice(2))
	.options({
		'filename': {
			alias: ['f'],
			demandOption: false,
			default: 'users',
			describe: '[Optional] The name of the .json file that holds the users to be created. Do not include the ".json" extension. Must be placed in the root of the project. Defaults to "users.json"',
			type: 'string'
		},
		'disable': {
			alias: ['d'],
			demandOption: false,
			default: false,
			describe: 'Optional. Using this flag will create the new user(s) as disabled.',
			type: 'boolean'
		}
	})
	.parse();
const { filename, disable } = args;

function main() {
	const new_user_array = JSON.parse(fs.readFileSync(`${filename}.json`));
	createMultipleUsers(new_user_array, disable)
		.then(new_users => {
			console.log('New users created!');
			console.log(new_users);
		})
		.catch(err => {
			console.log('Error:');
			console.error(err);
		})
}

main();
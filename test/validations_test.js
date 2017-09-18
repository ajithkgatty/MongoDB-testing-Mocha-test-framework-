const assert = require('assert');
const User = require('../src/user');
describe('validations for user model', () =>{

	it('fails without a user name',() => {
		const user = new User({ name: undefined });
		const validationResults = user.validateSync();
		//const message = validationResults.errors.name.message;
		const { message } = validationResults.errors.name;
		assert(message === 'Name is required!');
	});

	it('fails if user\'s name is less than 3 character',() => {
		const user = new User({ name: 'Aj'});
		const validationResults = user.validateSync();
		//const message = validationResults.errors.name.message;
		const { message } = validationResults.errors.name;
		assert(message === 'Name must be longer than 2 character!');
	});

	it('fails to save user if validation fails', () => {
		const user = new User({ name: 'Aj'});
		user.save()
			 .catch(( validationResults ) => {
			 	const { message } = validationResults.errors.name;
			 	assert(message === 'Name must be longer than 2 character!');
			 });
	});
});
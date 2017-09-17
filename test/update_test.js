const assert = require('assert');
const User = require('../src/user');


describe('updating a user', () => {
	let joe;

	beforeEach(( done ) => {
		joe = new User({ name: 'Joe'});
		joe.save()
			.then( () => { done();});

	});

	function checkAssertion(operator, done)
	{
		operator
		.then (() => { User.find();})
			.then(( users ) => { 
				assert( users.length === 1 );
				assert( users[0].name = 'Ajith');
			});
		done();
	}

	it(' updating a user with set', ( done ) => {
		joe.set('name', 'Ajith');
		checkAssertion(joe.save(), done);
	});

	it(' updating a user with class method update', ( done ) => {
		checkAssertion(joe.update({'name':'Ajith'}), done);
	});
});
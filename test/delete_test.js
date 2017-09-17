const assert = require('assert');
const User = require('../src/user');


describe('removing user from db', () => {
	let joe;
	beforeEach(( done ) => {
		joe = new User({ name: 'Joe'});
		joe.save()
			.then( () => { done();});

	});

	function assertCheck( operator, done ){
		operator
		.then(() => { User.findOne({ name : 'Joe'})})
			.then(( user ) => { assert( user === null )});
		done();
	}

	it(' removing a user with model instance', ( done ) => {
		assertCheck( joe.remove(), done);
	});

	it(' removing a user with class ', ( done ) => {
		assertCheck( User.remove({ name : 'Joe'}), done);
	});

	it(' removing a user with class method findOneAndRemove ', ( done ) => {
		assertCheck( User.findOneAndRemove({ name : 'Joe'}), done);
	});

	it(' removing a user with class method findByIdAndRemove ', ( done ) => {
		assertCheck( User.findByIdAndRemove( joe._id ), done);
	});

});
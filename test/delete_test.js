const assert = require('assert');
const User = require('../src/user');


describe('removing user from db', () => {
	let joe;
	beforeEach(( done ) => {
		joe = new User({ name: 'Joe'});
		joe.save()
			.then( () => { done();});

	});

	it(' removing a user with model instance', ( done ) => {
		joe.remove()
			.then(() => { User.findOne({ name : 'Joe'})})
			.then(( user ) => { assert( user === null )});
		done();
	});

	it(' removing a user with class ', ( done ) => {
		User.remove({ name : 'Joe'})
			.then(() => { User.findOne({ name : 'Joe'})})
			.then(( user ) => { assert( user === null )});
		done();
	});

	it(' removing a user with class method findOneAndRemove ', ( done ) => {
		User.findOneAndRemove({ name : 'Joe'})
			.then(() => { User.findOne({ name : 'Joe'})})
			.then(( user ) => { assert( user === null )});
		done();
	});

	it(' removing a user with class method findByIdAndRemove ', ( done ) => {
		User.findByIdAndRemove( joe._id )
			.then(() => { User.findOne({ name : 'Joe'})})
			.then(( user ) => { assert( user === null )});
		done();
	});

});
const assert = require('assert');
const User = require('../src/user');

describe(' Searching the users with different wild cards', () => {

	let joe;
	beforeEach(( done ) =>{
		joe = new User({ name : "Joe mathews"});
		joe.save()
			.then(() => done());
	});

	it('find a document which starts with Joe', ( done) => {
		User.find({ 'name' : /^Joe/})
		.then((user) => {
				assert(user.length === 1);
				done();
		});
	});	

	it('find a document which starts with contains math', ( done) => {
		User.find({ 'name' : /math/})
		.then((user) => {
			assert( user.length === 1 );
			done();
		});
	});

	it('find a document which ends with contains mathews', ( done) => {
		User.find({ 'name' : /mathews$/})
		.then((user) => {
			assert( user.length === 1 );
			done();
		});
	});	

	it('no records should be found for John', ( done) => {
		User.find({ 'name' : /John	/})
		.then((user) => {
			assert( user.length === 0 );
			done();
		});
	});				
});
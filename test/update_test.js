const assert = require('assert');
const User = require('../src/user');


describe('updating a user', () => {
	let joe;

	beforeEach(( done ) => {
		joe = new User({ name: 'Joe', likes: 0});
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

	it(' updating a user with instance method update', ( done ) => {
		checkAssertion(joe.update({'name':'Ajith'}), done);
	});

	it(' updating a user with class method update', ( done ) => {
		checkAssertion(User.update({'name':'Joe'}, {'name':'Ajith'}), done);
	});

	it(' updating a user with class method findOneAndUpdate', ( done ) => {
		checkAssertion(User.findOneAndUpdate({'name':'Joe'}, {'name':'Ajith'}), done);
	});

	it(' updating a user with class method findByIdAndUpdate', ( done ) => {
		checkAssertion(User.findByIdAndUpdate( joe._id, {'name':'Ajith'}), done);
	});

	it(' incrementing user post count by 1', ( done ) => { 
		User.update({ 'name': 'Joe'}, { $inc: { 'likes': 1 }})
		.then(() => User.findOne({'name': 'Joe'}))
		.then((user) => {
			assert(user.likes === 1);
			done();	
		});
		
	});
});
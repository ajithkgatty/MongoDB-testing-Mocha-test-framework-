const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments testing',() => {
	it('user can have a post', (done) => {
		const joe = new User({ 'name': 'Joe', posts: [{ 'title': 'first post'}]});
		joe.save()
		.then(() =>  User.findOne({name: 'Joe'}))
		.then((user) => {
			console.log(user);
			assert( user.posts[0].title === 'first post');
		 	done();
		});
	});

	it('User can delete a post,  remove from subdocument', (done) => {
		const joe = new User({ 'name': 'Joe', posts: [{ 'title': 'first post'}]});
		joe.save()
		.then(() =>  User.findOne({name: 'Joe'}))
		.then((user) => {
			const post = user.posts[0];
			post.remove();
			return user.save();
		})
		.then(() =>  User.findOne({name: 'Joe'}))
		.then((user) => { 
				assert(user.posts.length === 0);
				done();
		});
		

	});
});
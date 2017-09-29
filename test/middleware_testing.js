const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Testing the middleware', () => {
let joe, blogPost, comment;
	beforeEach((done) => {
		joe = new User({ name: 'Joe'});
		blogPost = new BlogPost({ title: 'Adding a blog post', content: 'yesss.. we are really adding a blog post !!'});
		comment = new Comment({ content: 'This is a comment'});
		joe.blogPosts.push(blogPost);
		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	});

	it.only('removes respective blogpposts once the user is deleted', (done) => {
		joe.remove()
		.then(() =>  User.find({}))
		.then((user) => {
			console.log(user);
			done();
		});
	});
});
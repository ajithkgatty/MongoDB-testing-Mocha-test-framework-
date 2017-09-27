const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');


describe('Association tests',() => {
	let joe, blogPost, comment;
	beforeEach((done) => {
		joe = new User({ name: 'Joe'});
		blogPost = new BlogPost({ title: 'Adding a blog post', content: 'yesss.. we are really adding a blog post !!'});
		comment = new Comment({ content: 'This is a comment'});
		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});


	it('testing the saved object with relationships', (done) =>{
		User.findOne({name: 'Joe'})
		.populate({
			path: 'blogPosts',
			populate: {
				path: 'comments',
				model: 'comment',
				populate:{
					path: 'user',
					model: 'user'
				}
			}
		})
		.then((user) => {
			assert(user.name === 'Joe');	
			assert(user.blogPosts[0].comments[0].content === 'This is a comment');
			assert(user.blogPosts[0].title === 'Adding a blog post');
			assert(user.blogPosts[0].content === 'yesss.. we are really adding a blog post !!');
			assert(user.blogPosts[0].comments[0].user.name === 'Joe');
			done();
		});
	});

});
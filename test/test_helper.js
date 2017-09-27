 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise;

before (( done ) => {
	mongoose.connect('mongodb://localhost/users_test');
 	mongoose.connection
 	.once('open', () => { console.log('Good to go !!'); done(); })
 	.on('error', (error) => {
 		console.warn('Waiting', error)
 	});
})


 beforeEach(( done ) => {
 	const { users, comments, blogposts } = mongoose.connection.collections;
 	users.drop(() => {
 		blogposts.drop(() => {
 			comments.drop(() => {
 				done();
 			});
 		});
 	});
 });
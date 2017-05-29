import React, { Component } from 'react';
import logo from './logo.svg';
import InputArea from './/components/InputArea.js';
import Button from './components/Button.js';
import Post from './components/Post.js';
import './App.css';

//this is the container for the entire page, contains the sear
var App = React.createClass( {
	getInitialState:function(){
		return {
			posts:[],
			text:'hahahahahah',
			//reaction:"bored",
			//file:""
		};
	},
	
	//for changes in inputarea of a new post
	handleChange: function (newText) {
		this.setState({text: newText});
	},
	//for posting new posts
	handleClick: function () {
		var newPost = {
			text: this.state.text,
			commentText: "",
			comments: [],
			showComment: false,
			index: this.state.posts.length
		};
		this.setState((prevState) => 
		({posts: prevState.posts.concat(newPost),text: ''}));	
	},
	
	//for showing comment section of posts[postI]
	showComment: function (postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].showComment = true;
		this.setState(stateCopy);
	},
	//for changes in inputarea of a new comment
	onChangeComment: function (changedText, postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].commentText = changedText;
		this.setState(stateCopy);
	},
	//for posting a new comment
	postComment: function (newComments, postI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = newComments;
		stateCopy.posts[postI].commentText ="";
		this.setState(stateCopy);
	},
	
	//for showing reply section of posts[postI][comI]
	showReply: function (postI,comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].showReply = true;
		this.setState(stateCopy);
	},
	//for changes in inputarea of a new reply
	onChangeReply: function (changedReply, postI, comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].replyText = changedReply;
		this.setState(stateCopy);
	},
	//for posting a new reply
	postReply: function (newReplies, postI, comI) {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.posts = stateCopy.posts.slice();
		stateCopy.posts[postI] = Object.assign({}, stateCopy.posts[postI]);
		stateCopy.posts[postI].comments = stateCopy.posts[postI].comments.slice();
		stateCopy.posts[postI].comments[comI] = Object.assign({}, stateCopy.posts[postI].comments[comI]);
		stateCopy.posts[postI].comments[comI].replies = newReplies;
		stateCopy.posts[postI].comments[comI].replyText = "";
		this.setState(stateCopy);
	},
	
	render: function() {
		var posts = [];
		for(var i=0; i<this.state.posts.length; i++){
			posts.push(<Post postItem={this.state.posts[i]} onClickCom={this.postComment} onClickRep={this.postReply} 
						onChangeComment={this.onChangeComment} onChangeReply={this.onChangeReply}
						showComments={this.showComment} showReplies={this.showReply}/>);	
		}
		
		return (
		  <div className="App">
			<div className="App-header">
			  <InputArea onChange={this.handleChange} value={this.state.text}/>
			  <Button onClick={this.handleClick} type="Post"/>
			</div>
			 {posts}
		  </div>
		);
	}
});

export default App;
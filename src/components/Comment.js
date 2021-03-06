import React from 'react';
import Button from './Button.js';
import InputArea from './InputArea.js'
import '../App.css';

var Comment = React.createClass({
	showLike: function () {
		this.props.handleLikes (this.props.commentItem.index);
	},
	
	showReplies: function() {
		this.props.showReplies(this.props.commentItem.index);
	},
	handleClick: function () {
		var newReply = {
			text: this.props.commentItem.replyText
		};
		var itemCopy =Object.assign({}, this.props.commentItem);
		itemCopy.replies = itemCopy.replies.slice();
		itemCopy.replies.push(newReply);
		this.props.onClick(itemCopy.replies, this.props.commentItem.index);
	},
	handleChange: function (newText) {
		this.props.onChange(newText, this.props.commentItem.index);
	},
	
	render: function() {
		var replies = [];
		var enableReply;
		for(var i=0; i<this.props.commentItem.replies.length; i++){
			replies.push(<p>{this.props.commentItem.replies[i].text}</p>);
		}
		//if there is no reply, then don't show anything
		if(this.props.commentItem.showReply === true){
			enableReply = (<div className="Reply-Collection">
						   <InputArea onChange={this.handleChange} value={this.props.commentItem.replyText}/>
						   <Button onClick={this.handleClick} type="Post Reply"/>
						   {replies}
						  </div>);
		}else{
			enableReply = null;
		}
		//for likes
		var buttonText;
		if(this.props.commentItem.liked === true){
			buttonText = "Liked";
		}else{
			buttonText = "Hated";
		}	
		return(
			<div className="Comments-Collection">
				<p>{this.props.commentItem.text}<Button onClick={this.showReplies} type="Reply"/><Button onClick={this.showLike} type={buttonText}/></p>
				{enableReply}
			</div>
		);
	}
});

export default Comment;
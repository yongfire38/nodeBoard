const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//댓글 모델(관계형에서의 테이블) 정의
const commentSchema = new Schema({
    contents : String,
    author : String,
    comment_date : {type : Date, default : Date.now()}
});

//메인 글 모델 정의
const boardSchema = new Schema({
    title: String,
    contents: String,
    author: String,
    board_date: {type: Date, default: Date.now()},
    comments : [{type: Schema.Types.ObjectId, ref: 'Comments'}]
});

mongoose.model('Comments',commentSchema);

module.exports = mongoose.model('board', boardSchema);
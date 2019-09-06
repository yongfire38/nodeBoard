const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//댓글 모델(관계형에서의 테이블) 정의
const commentSchema = new Schema({
    contents : String,
    author : String,
    comment_date : {type : Date, default : Date.now()}
});

module.exports = mongoose.model('comment', commentSchema);
const express = require('express');
const router = express.Router();

//생성해 놓은 스키마(모델) 임포트
const Board = require('../schema/board');
const Comment = require('../schema/comment');

//메인 페이지
router.get('/', (req, res, next) => {
    Board.find({},(err, board) =>{
        res.render('index', {title : 'Main 화면', board : board});
    });
});

//글 상세보기(아이디로 찾는다)
router.get('/board/:id', (req, res) => {
    Board.findOne({_id : req.params.id}).populate('comments').exec((err, board) => {
        res.render('board', {title : '상세보기 및 댓글쓰기', board : board});
        console.log(board);
    });
})

/*
router.get('/board/:id', (req, res) => {
    Board.findOne({_id : req.params.id}, (err, board, comment) => {
        res.render('board', {title : '상세보기 및 댓글쓰기', board : board, comment : comment});
    });
})
*/


//댓글 쓰기
router.post('/board/comment/write/:id', (req, res) => {   
    
    const board = Board.findOne({_id : req.body.id});
    const comments = new Comment();   

    comments.contents = req.body.contents;
    comments.author = req.body.author;   

        board.updateOne({_id : req.body.id}, { $push: { comments:  comments} } , {upsert : true}, (err) =>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            
            console.log(comments);
            res.redirect('/');
        });
    

});

//글 쓰기 페이지 이동
router.get('/write', (req, res, next) => {
    res.render('write', {title : '글쓰기'});
});

//insert 
router.post('/board/write', (req, res) => {
    const board = new Board();
    board.title = req.body.title;
    board.contents = req.body.contents;
    board.author = req.body.author;

    board.save(err => {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;
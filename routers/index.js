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
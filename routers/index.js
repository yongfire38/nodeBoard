const express = require('express');
const router = express.Router();

//생성해 놓은 스키마(모델) 임포트
const Board = require('../schema/board');

//메인 페이지
router.get('/', (req, res, next) => {
    Board.find({},(err, board) =>{
        res.render('index', {title : 'Main 화면', board : board});
    });
});

//글 상세보기(아이디로 찾는다)
 router.get('/board/:id', (req, res) => {
    Board.findOne({_id : req.params.id}).exec((err, board) => {
        res.render('board', {title : '상세보기 및 댓글쓰기', board : board});
        console.log(board);
    });
}) 


//댓글 쓰기
router.post('/board/comment/write/:id', (req, res) => {   
    
const board = Board.findOne({_id : req.body.id});

        board.updateOne({_id : req.body.id},  { $push: { comments:  {contents : req.body.contents, author : req.body.author } } }, {upsert : true}, (err) =>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
                       
            res.redirect('/');
        });
        
    

});

//글 쓰기 페이지 이동
router.get('/write', (req, res, next) => {
    res.render('write', {title : '글쓰기'});
});

//글 수정 페이지 이동
router.get('/update/:id', (req, res, next) => {

    Board.findOne({_id : req.params.id}).exec((err, board) => {
        res.render('update', {title : '글 수정', board : board});
        console.log(board);
    });
})

//insert 
router.post('/write/writeContents', (req, res) => {
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

//update
router.post('/update/updateContents/:id', (req, res) => {

    const board = Board.findOne({_id : req.body.id});

    board.updateOne({_id : req.body.id},  { $set: { title : req.body.title, contents : req.body.contents, author : req.body.author  } }, (err) =>{

        if(err){
            console.log(err);
            res.redirect('/');
        }
                   
        res.redirect('/');
    });

    
    
}) 


module.exports = router;
var wechat_cfg = require('../config/wechat.cfg');
var cache = require('memory-cache');
var sha1 = require('sha1'); //签名算法
var signature = require('../sign/signature');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.get('/stat',function(req,res){
	res.render('stat');
});

router.get('/ar',function(req,res){
	res.render('ar');
});

router.post('/sign',function(req,res){
	//var url = req.protocol + '://' + req.host + req.path;
	// var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
	signature.sign(req.body.url,function(signatureMap){
		signatureMap.appId = wechat_cfg.appid;
		signatureMap.url = req.body.url;
		res.send(signatureMap);
	});
});

router.post("/addStat", function(req, res){
	var user = new User({
        device: req.body.device,
	    time: req.body.time,
	    duration: req.body.duration,
	    network: req.body.network,
	    score: req.body.score
	});
  	console.log(req.body)
    user.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: "user profile is updated"})
    })
});

router.get("/getStat", function(req, res){
    User.find({},function (err, user) {
        if (err)
            res.send(err);
        else
        	res.json(user)
    })
});

router.get("/getRank", function(req, res){
    User.find({},function (err, user) {
        if (err)
            res.send(err);
        else{
        	var scoreList = []
        	for(index in user){
        		scoreList.push(user[index].score)
        	}
        	var rank = scoreList.sort(function(a, b){
        		return b-a
        	}).indexOf(parseInt(req.query.score))
        	res.json({"rank": rank, "total":scoreList.length})
        }
    })
});

router.get('/count',function(req,res){
	var total
	res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
	})
	
	setInterval(function () {
		User.find({},function (err, user) {
			total = user;
	    })
		res.write("data: " + JSON.stringify(total) + "\n\n");
    }, 1000);
});

module.exports = router;
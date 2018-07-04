var screenRatio = 1157 / 750;
var loadCanvas = document.getElementById("loadCanvas");
var playCanvas = document.getElementById("playCanvas");
$("#loadCanvas").on("touchstart", function(e){
	e.preventDefault()
})

var PIXEL_RATIO = (function () {
  var ctx = document.createElement('canvas').getContext('2d'),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
})();

playCanvas.height = window.innerHeight*PIXEL_RATIO;
playCanvas.width = window.innerHeight*PIXEL_RATIO / screenRatio;
playCanvas.getContext('2d').setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);

loadCanvas.height = window.innerHeight*PIXEL_RATIO;
loadCanvas.width = window.innerHeight*PIXEL_RATIO / screenRatio;
loadCanvas.getContext('2d').setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);

var networkType = "unknown"
var stage = new createjs.Stage(loadCanvas);

var h = stage.canvas.height;
var w = stage.canvas.width;
var scaleY = h / 1157;
const MALE_x = 223, legWidth = 272;

var intervalId, timeoutId;
var steps = 0;

var pageUrl = window.location.href.split('#')[0];
var stats = {};
stats.time = new Date();
stats.device = navigator.userAgent;

//Leg width
var totalLegWidth = 0, gap = 0;

if (navigator.userAgent.indexOf("iPhone") < 0 && navigator.userAgent.indexOf("Android") < 0) {
	w = h / screenRatio
	var windowWidth = window.innerWidth;
	$('.game-board').css("left", (windowWidth - w) / 2)
} else if (window.innerHeight < window.innerWidth) {
	alert("竖着玩姿势更帅！")
	window.location.href = location.href + '?time=' + ((new Date()).getTime());
} else {
	w = stage.canvas.width;
	$('.game-board').css({
		"width": "100%",
		"height": "100%"
	})
}

var loadResource = function(role, name, x, y, scaleX, scaleY, isVisiable) {
	role.scaleX = scaleX;
	role.scaleY = scaleY;
	role.x = x;
	role.y = y;
	role.name = name;
	role.visible = isVisiable;
	stage.addChild(role)
}

function configureSharing(shareTitle){
	$.ajax({
	type: "POST",
	url: "/researchgame/sign",
	data: {
		url: pageUrl
	},
	success: function(data) {
		console.log(data)

		var shareImage = "http://research-h5.lenovo.com/researchgame/_assets/art/icon.png";
		var shareContent = "吐血推荐！一个只想准点下班的宝宝的“身”路历程！"

		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.noncestr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareQZone',
					'getNetworkType'
				] // 必填，需要使用的JS接口列表，
		});

		wx.ready(function() {

			wx.getNetworkType({
				success: function(res) {
					networkType = res.networkType; //stats defined in game.js
				}
			});

			wx.onMenuShareTimeline({
				title: shareTitle, // 分享标题
				link: pageUrl,
				imgUrl: shareImage // 分享图标
			});
			// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
			wx.onMenuShareAppMessage({
				title: shareTitle,
				desc: shareContent,
				link: pageUrl,
				imgUrl: shareImage,
				type: 'link', // 分享类型,music、video或link，不填默认为link
			});

			wx.onMenuShareQQ({
			    title: shareTitle, // 分享标题
			    desc: shareContent, // 分享描述
			    link: pageUrl, // 分享链接
			    imgUrl: shareImage, // 分享图标
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			       // 用户取消分享后执行的回调函数
			    }
			});

			wx.onMenuShareQZone({  
	            title: shareTitle, // 分享标题  
	            desc: shareContent, // 分享描述  
	            link: pageUrl, // 分享链接  
	            imgUrl: shareImage, // 分享图标  
	            success: function () {   
	               // 用户确认分享后执行的回调函数  
	            },  
	            cancel: function () {   
	               // 用户取消分享后执行的回调函数  
	            }  
        	});

		});

		wx.error(function(res) {
			JSON.stringify(res)
		});

	},

	error: function(err) {
		console.log(err)
			//请求出错处理
	}
	});
}

configureSharing("为了不加班，西二旗某公司员工竟然和老板XXX")


function init() {
	var preManifest = [{
		src: "load_bar.png",
		id: "load_bar"
	},{
		src: "load_bar2.png",
		id: "load_bar2"
	},{
		src: "load_cloud.png",
		id: "load_cloud"
	},{
		src: "load_text.png",
		id: "load_text"
	},{
		src: "load_warning.png",
		id: "load_warning"
	},{
		src: "open_rch.png",
		id: "open_rch"
	},{
		src: "open_resea.png",
		id: "open_resea"
	},{
		src: "male_walk.png",
		id: "male_walk"
	},{
		src: "audio/research.mp3",
		id: "research"
	},{
		src: "audio/success.mp3",
		id: "success"
	},{
		src: "audio/fail.mp3",
		id: "fail"
	},{
		src: "audio/result.mp3",
		id: "result"
	},{
		src: "audio/bgm.mp3",
		id: "bgm"
	}]

		var manifest = [{
		src: "open_guide.png",
		id: "open_guide"
	},{
		src: "open_mask.png",
		id: "open_mask"
	},{
		src: "clock.png",
		id: "clock"
	},{
		src: "desk.png",
		id: "desk"
	},{
		src: "boss.png",
		id: "boss"
	},{
		src: "spray.png",
		id: "spray"
	},{
		src: "ac1.png",
		id: "ac1"
	},{
		src: "ac2.png",
		id: "ac2"
	},{
		src: "ac3.png",
		id: "ac3"
	},{
		src: "score.png",
		id: "score"
	},{
		src: "arrow.png",
		id: "arrow"
	},{
		src: "board.png",
		id: "board"
	},{
		src: "male_leg.png",
		id: "male_leg"
	},{
		src: "male_leg_v.png",
		id: "male_leg_v"
	},{
		src: "male_fall.png",
		id: "male_fall"
	},{
		src: "male_foot1.png",
		id: "male_foot1"
	},{
		src: "male_foot2.png",
		id: "male_foot2"
	},{
		src: "male_foot3.png",
		id: "male_foot3"
	},{
		src: "male_length.png",
		id: "male_length"
	},{
		src: "male_walk.png",
		id: "male_walk"
	},{
		src: "male_stretch.png",
		id: "male_stretch"
	},{
		src: "male_stand.png",
		id: "male_stand"
	},{
		src: "male_body.png",
		id: "male_body"
	},{
		src: "female_leg.png",
		id: "female_leg"
	},{
		src: "female_leg_v.png",
		id: "female_leg_v"
	},{
		src: "female_fall.png",
		id: "female_fall"
	},{
		src: "female_foot1.png",
		id: "female_foot1"
	},{
		src: "female_foot2.png",
		id: "female_foot2"
	},{
		src: "female_foot3.png",
		id: "female_foot3"
	},{
		src: "female_length.png",
		id: "female_length"
	},{
		src: "female_walk.png",
		id: "female_walk"
	},{
		src: "female_stretch.png",
		id: "female_stretch"
	},{
		src: "female_stand.png",
		id: "female_stand"
	},{
		src: "female_body.png",
		id: "female_body"
	},{
		src: "result_copyright.png",
		id: "result_copyright"
	},{
		src: "result_bg.png",
		id: "result_bg"
	},{
		src: "result_mask.png",
		id: "result_mask"
	},{
		src: "result_rank.png",
		id: "result_rank"
	},{
		src: "result_reply.png",
		id: "result_reply"
	},{
		src: "result_share.png",
		id: "result_share"
	},{
		src: "result_share2.png",
		id: "result_share2"
	},{
		src: "result_text.png",
		id: "result_text"
	},{
		src: "cloud.png",
		id: "cloud"
	}];

	var preLoader = new createjs.LoadQueue(false);
	preLoader.installPlugin(createjs.Sound);
	preLoader.loadManifest(preManifest, true, "_assets/art/");
	preLoader.addEventListener("complete", function() {
		
		var openRchSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preLoader.getResult("open_rch")],
			"frames": {
				"regX": 0,
				"height": 90,
				"count": 0,
				"regY": 0,
				"width": 170
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"play": [0, 74, null, 1]
			}
		});

		var openRch = new createjs.Sprite(openRchSheet);
		var openResea = new createjs.Bitmap(preLoader.getResult("open_resea"));

		var loadBar = new createjs.Bitmap(preLoader.getResult("load_bar"));
		var loadBar2 = new createjs.Bitmap(preLoader.getResult("load_bar2"));
		var loadCloud = new createjs.Bitmap(preLoader.getResult("load_cloud"));
		var loadText = new createjs.Bitmap(preLoader.getResult("load_text"));
		var loadWarning = new createjs.Bitmap(preLoader.getResult("load_warning"));

		var maleWalkSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [preLoader.getResult("male_walk")],
			"frames": {
				"regX": 0,
				"height": 299,
				"count": 0,
				"regY": 0,
				"width": 148
			},
			"animations": {
				"play": [0, 10, null, 1]
			}
		});
		var maleWalk = new createjs.Sprite(maleWalkSheet);

		//show lenovo research logo
		openResea.alpha = 0
		loadResource(openResea, "openResea", 100*scaleY, 400*scaleY, scaleY, scaleY, true)
		createjs.Tween.get(openResea).to({alpha:1}, 1000, createjs.Ease.linear)
		.call(function(){
			
			//createjs.Sound.play("research");

			loadResource(openRch, "openRch", 451*scaleY, 452*scaleY, scaleY, scaleY, true)
			openRch.play();
			openRch.addEventListener("animationend", function(){
				openRch.gotoAndStop(74)
				createjs.Tween.get(openRch).to({alpha:0}, 600, createjs.Ease.linear)
				createjs.Tween.get(openResea).to({alpha:0}, 600, createjs.Ease.linear)
				.call(function(){
					//show loading page

					$("#loadCanvas").css("background", "#232539")
					
					loadResource(loadWarning, "loadWarning", 156*scaleY, 174*scaleY, scaleY, scaleY, true)
					loadResource(loadCloud, "loadCloud", 530*scaleY, 500*scaleY, scaleY, scaleY, true)
					loadResource(loadText, "loadText", 296*scaleY, 840*scaleY, scaleY, scaleY, true)
					loadResource(loadBar, "loadBar", 70*scaleY, 800*scaleY, scaleY, scaleY, true)
					loadResource(maleWalk,"maleWalk", 70*scaleY, 650*scaleY, scaleY/2,scaleY/2, true)
					loadResource(loadBar2, "loadBar2", 76*scaleY, 804*scaleY, 0, scaleY, true)
					maleWalk.play()
					var loader = new createjs.LoadQueue(false);
					loader.loadManifest(manifest, true, "_assets/art/");
					loader.installPlugin(createjs.Sound);

					loader.on("progress", function(event) {
						loadBar2.scaleX =  scaleY * loader.progress
						maleWalk.x = 610*scaleY* loader.progress 
					});
					loader.addEventListener("complete", function() {
						//detect the orientation of mobile device
						// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
						// 	if (window.orientation === 90 || window.orientation === -90) {
						// 		alert("竖着玩姿势更帅！")
						// 	}
						// }, false);

					
						createjs.Sound.play("bgm");
						
						stage = new createjs.Stage(playCanvas);
						$("#loadCanvas").hide();
						$("#playCanvas").show();

						startGame(loader)

					})
					
				})
			})
		})
	})

	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	createjs.Ticker.framerate = 30;
	createjs.Ticker.on("tick", tick);

	function tick() {
		stage.update();
	}
}

var startGame = function(loader){
	var bgm = createjs.Sound.play("bgm", {
		loop: -1
	});
	bgm.volume = bgm.volume * 0.7;
	
	// Declare sprite element
		var maleStretchSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("male_stretch")],
			"frames": {
				"regX": 0,
				"height": 436,
				"count": 0,
				"regY": 0,
				"width": 619
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var maleStandSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("male_stand")],
			"frames": {
				"regX": 0,
				"height": 308,
				"count": 0,
				"regY": 0,
				"width": 561
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var maleWalkSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("male_walk")],
			"frames": {
				"regX": 0,
				"height": 299,
				"count": 0,
				"regY": 0,
				"width": 148
			},
			"animations": {
				"play": [0, 10, null, 1]
			}
		});

		var femaleStretchSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("female_stretch")],
			"frames": {
				"regX": 0,
				"height": 383,
				"count": 0,
				"regY": 0,
				"width": 593
			},
			"animations": {
				"play": [0, 10, null, 1]
			}
		});

		var femaleStandSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("female_stand")],
			"frames": {
				"regX": 0,
				"height": 312,
				"count": 0,
				"regY": 0,
				"width": 463
			},
			"animations": {
				"play": [0, 10, null, 1]
			}
		});

		var femaleWalkSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("female_walk")],
			"frames": {
				"regX": 0,
				"height": 300,
				"count": 0,
				"regY": 0,
				"width": 134
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var spraySheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("spray")],
			"frames": {
				"regX": 0,
				"height": 100,
				"count": 0,
				"regY": 0,
				"width": 100
			},
			"animations": {
				"play": [0, 99, "play", 1]
			}
		});

		var bossSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("boss")],
			"frames": {
				"regX": 0,
				"height": 85,
				"count": 0,
				"regY": 0,
				"width": 98
			},
			"animations": {
				"play": [0, 1, "play", 0.05]
			}
		});

		var scoreSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("score")],
			"frames": {
				"regX": 0,
				"height": 84,
				"count": 0,
				"regY": 0,
				"width": 70
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var rankSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("result_rank")],
			"frames": {
				"regX": 0,
				"height": 23,
				"count": 0,
				"regY": 0,
				"width": 19
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var resultTextSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("result_text")],
			"frames": {
				"regX": 0,
				"height": 100,
				"count": 0,
				"regY": 0,
				"width": 460
			},
			"animations": {
				"play": [0, 9, null, 1]
			}
		});

		var cloudSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("cloud")],
			"frames": {
				"regX": 0,
				"height": 50,
				"count": 0,
				"regY": 0,
				"width": 50
			},
			"animations": {
				"play": [0, 7]
			}
		});

		// Initiate element

		var openGuide = new createjs.Bitmap(loader.getResult("open_guide"))
		var openMask = new createjs.Bitmap(loader.getResult("open_mask"))

		var clock = new createjs.Bitmap(loader.getResult("clock"));
		var desk = new createjs.Bitmap(loader.getResult("desk"));
		var arrow = new createjs.Bitmap(loader.getResult("arrow"));
		var board = new createjs.Bitmap(loader.getResult("board"));
		var ac1 = new createjs.Bitmap(loader.getResult("ac1"));
		var ac2 = new createjs.Bitmap(loader.getResult("ac2"));
		var ac3 = new createjs.Bitmap(loader.getResult("ac3"));
		
		var resultBg = new createjs.Bitmap(loader.getResult("result_bg"));
		var resultMask = new createjs.Bitmap(loader.getResult("result_mask"));
		var resultReply = new createjs.Bitmap(loader.getResult("result_reply"));
		var resultShare = new createjs.Bitmap(loader.getResult("result_share"));
		var resultShare2 = new createjs.Bitmap(loader.getResult("result_share2"));
		var resultText = new createjs.Sprite(resultTextSheet);
		var resultCopyright = new createjs.Bitmap(loader.getResult("result_copyright"));

	var getGender =  function(){
			var randomNum = Math.random()
			if(randomNum>0.5){
				return "male"
			}else{
				return "female"
			}
		}

		var gender = getGender()
		console.log(gender)

		var peopleLeg, peopleLeg_v, peopleFall, peopleBody, peopleLength, peopleFoot1, peopleFoot2, peopleFoot3,
			peopleStretch, peopleStand, peopleWalk;

		var peopleLegX, peopleLegY, peopleFoot1X, peopleFoot1Y, peopleLeg_vX, peopleLeg_vY, peopleFoot3X, peopleFoot3Y ;

		// male sources
		if(gender == "male"){
			peopleLeg = new createjs.Bitmap(loader.getResult("male_leg"));
			peopleLeg_v = new createjs.Bitmap(loader.getResult("male_leg_v"));
			peopleFall = new createjs.Bitmap(loader.getResult("male_fall"));
			peopleBody = new createjs.Bitmap(loader.getResult("male_body"));
			peopleLength = new createjs.Bitmap(loader.getResult("male_length"));
			peopleFoot1 = new createjs.Bitmap(loader.getResult("male_foot1"));
			peopleFoot2 = new createjs.Bitmap(loader.getResult("male_foot2"));
			peopleFoot3 = new createjs.Bitmap(loader.getResult("male_foot3"));
			peopleStretch = new createjs.Sprite(maleStretchSheet);
			peopleStand = new createjs.Sprite(maleStandSheet);
			peopleWalk = new createjs.Sprite(maleWalkSheet);
			peopleLegX = 201; peopleLegY = 425; peopleFoot1X = 195; peopleFoot1Y = 424; peopleLeg_vX = 436; peopleLeg_vY = 669; peopleFoot3X = 435; peopleFoot3Y = 663;
		}else if(gender == "female"){
			// female sources
			peopleLeg = new createjs.Bitmap(loader.getResult("female_leg"));
			peopleLeg_v = new createjs.Bitmap(loader.getResult("female_leg_v"));
			peopleFall = new createjs.Bitmap(loader.getResult("female_fall"));
			peopleBody = new createjs.Bitmap(loader.getResult("female_body"));
			peopleLength = new createjs.Bitmap(loader.getResult("female_length"));
			peopleFoot1 = new createjs.Bitmap(loader.getResult("female_foot1"));
			peopleFoot2 = new createjs.Bitmap(loader.getResult("female_foot2"));
			peopleFoot3 = new createjs.Bitmap(loader.getResult("female_foot3"));
			peopleStretch = new createjs.Sprite(femaleStretchSheet);
			peopleStand = new createjs.Sprite(femaleStandSheet);
			peopleWalk = new createjs.Sprite(femaleWalkSheet);
			peopleLegX = 208; peopleLegY = 476; peopleFoot1X = 200; peopleFoot1Y = 476; peopleLeg_vX = 425; peopleLeg_vY = 676; peopleFoot3X = 424; peopleFoot3Y = 668;
		}
		
		var spray = new createjs.Sprite(spraySheet, "play");
		var score = new createjs.Sprite(scoreSheet);
		var score2 = new createjs.Sprite(scoreSheet);
		var score3 = new createjs.Sprite(scoreSheet);
		var rank = new createjs.Sprite(rankSheet);
		var rank2 = new  createjs.Sprite(rankSheet);
		var boss = new createjs.Sprite(bossSheet,"play");
		var cloud = new createjs.Sprite(cloudSheet,"play");

		loadResource(clock, "clock", 430*scaleY, 900*scaleY,scaleY,scaleY,true);
		loadResource(arrow, "arrow", (w-arrow.getBounds().width*scaleY)/2,130*scaleY,scaleY,scaleY,true);
		loadResource(board, "board", (w-board.getBounds().width*scaleY)/2,140*scaleY,scaleY,scaleY,true);

		loadResource(peopleStretch,"peopleStretch",0,h-(460+peopleStretch.getBounds().height)*scaleY,scaleY,scaleY,false);
		loadResource(peopleStand,"peopleStand", 0,h-(460+peopleStand.getBounds().height)*scaleY,scaleY,scaleY,false);
		loadResource(peopleWalk,"peopleWalk",0,h-(460+peopleWalk.getBounds().height)*scaleY,scaleY,scaleY,true);
		//initialize the walking to the point
		peopleWalk.play();

		loadResource(spray,"spray",185*scaleY,1015*scaleY,scaleY,scaleY,true);

		loadResource(score,"score",(w-score.getBounds().width*scaleY)/2,30*scaleY,scaleY,scaleY,true);
		loadResource(score2, "score2", 310*scaleY, 30*scaleY, scaleY, scaleY, false)
		loadResource(score3, "score3", 266*scaleY, 30*scaleY, scaleY, scaleY, false)

		loadResource(boss,"boss", 300*scaleY,1010*scaleY,scaleY,scaleY,true);
		loadResource(desk, "desk", (w-desk.getBounds().width*scaleY)/2,
			h-desk.getBounds().height*scaleY,scaleY,scaleY,true);

		peopleWalk.addEventListener("animationend", function(){
			peopleWalk.gotoAndStop(0);
			peopleWalk.visible=false;
			peopleStretch.visible=true;
		})

		//create a list for AC
		var ACList = [ac1, ac2, ac3];
		var preAC = ac1, postAC = ac2;

		// if the AC has been switched, the actor has started to walk, is walking
		var started= 0;
		var tempScale = scaleY;

		loadResource(preAC, "preAC", 0, 695*scaleY,scaleY,scaleY,true);
		loadResource(postAC, "postAC", w-(postAC.getBounds().width+20)*scaleY, 695*scaleY,scaleY,scaleY,true);

		//gap = w-(postAC.getBounds().width+20)*scaleY-preAC.getBounds().width*scaleY
		gap = (postAC.x - MALE_x*scaleY)
		console.log(postAC.x)


		//walking to the position of stretching legs
		peopleWalk.addEventListener("change", function(){
			var ratio = peopleWalk.currentFrame / 9
			peopleWalk.x = (MALE_x-80)*scaleY*ratio
		})

		if(!localStorage.hasGuide){
			loadResource(openMask, "openMask", 0, 0, scaleY, scaleY, true);
			loadResource(openGuide,"openGuide", 260*scaleY, 594*scaleY, scaleY, scaleY, true);
			localStorage.hasGuide = true;
		}

		var moveAC = function(){
			var offset = postAC.x;
			createjs.Tween.get(preAC).to({x:preAC.x-offset}, 500, createjs.Ease.linear)
			createjs.Tween.get(postAC).to({x:0}, 500, createjs.Ease.linear)
			createjs.Tween.get(peopleStand).to({x:peopleStand.x-offset}, 500, createjs.Ease.linear)
			.call(function(){
				peopleStand.visible=false;
				peopleStand.x = 0
				peopleWalk.visible= true;
				peopleWalk.play();

				var postACIndex = parseInt(Math.random()*2)+1;

				//swap AC for next round
				preAC = postAC
				stage.removeChild(stage.getChildByName("preAC"))
				loadResource(preAC, "preAC", 0, 695*scaleY,tempScale,scaleY,true);
				// console.log("width",MALE_x, "width2", preAC.getBounds().width*tempScale)

				var preACWidth = preAC.getBounds().width*tempScale
				//judge if the AC width is smaller than the gap, if so, move forward
				var ACPosOffset = MALE_x*scaleY-preACWidth
				if(ACPosOffset > 0)
					createjs.Tween.get(preAC).to({x:ACPosOffset}, 10*1000/30, createjs.Ease.linear)
				
				postAC = ACList[postACIndex].clone()
				stage.removeChild(stage.getChildByName("postAC"))

				if(steps<5){
					tempScale = scaleY/(1+Math.random()*0.5)
				}
				else if(steps >= 5 && steps <10){
					tempScale = scaleY/(1.3+Math.random()*0.7)
				}
				else if(steps >= 10 && steps < 20){
					tempScale = scaleY/(1.7+Math.random()*0.8)
				}
				else if(steps >= 20 && steps < 30){
					tempScale = scaleY/(2.2+Math.random()*0.8)
				}
				else if(steps >= 30 && steps < 50){
					tempScale = scaleY/(2.5+Math.random()*1)
				}
				else if(steps >= 50){
					tempScale = scaleY/(4+Math.random()*1)
				}

				
				loadResource(postAC, "postAC", w, 695*scaleY,tempScale,scaleY,true);
				
				createjs.Tween.get(postAC).to({x:w-postAC.getBounds().width*tempScale-(30+Math.random()*70)}, 200, createjs.Ease.linear)
				.call(function(){
					gap = (postAC.x - MALE_x*scaleY)
				})
				started=0
				length = 0;
			})

		}

		peopleStand.addEventListener("animationend", function(){
			peopleStand.gotoAndStop(9);
			moveAC()
		})

		//after stretching legs
		peopleStretch.addEventListener("change", function(){
			if(peopleStretch.currentFrame==9){
				peopleStretch.gotoAndStop(0);
				peopleStretch.visible=false;
				loadResource(peopleLength,"peopleLength",0,h-(460+peopleStretch.getBounds().height)*scaleY,scaleY,scaleY,true);
				peopleLeg.rotation = 0;
				peopleLeg.visible = true

				loadResource(peopleLeg,"peopleLeg", peopleLegX*scaleY,peopleLegY*scaleY,scaleY,scaleY,true);

				intervalId = setInterval(function(){
					if(length<450){
						length++;
						peopleLeg.scaleY = -length
						loadResource(peopleFoot1,"peopleFoot1", peopleFoot1X*scaleY,peopleFoot1Y*scaleY-length-peopleFoot1.getBounds().height*scaleY,scaleY,scaleY,true);
					}
				},1)
			}
		})

		var press =  function(e){
			e.preventDefault();
			if(started==0){
				started =1;
				peopleStretch.play();
				timeoutId = setTimeout(function(){
					started = 2
				},9*1000/30)
			}
		}

		var release = function(e){
			console.log("total: ", totalLegWidth, "gap", gap, "scale", scaleY)
			e.preventDefault();
			clearInterval(intervalId)
			clearTimeout(timeoutId)
			console.log("status:",started)
			if(started==2){
				started = 3;
				totalLegWidth = length + 255*scaleY;
				peopleLeg.visible = false;
				stage.removeChild(stage.getChildByName("peopleLength"))
				stage.removeChild(stage.getChildByName("peopleFoot1"))

				//Left foot: 208px, 667px; right foot:443px,670px; male:228px, 468px;
				loadResource(peopleFoot2,"peopleFoot2", (210+5)*scaleY,667*scaleY,scaleY,scaleY,true);
				loadResource(peopleLeg_v,"peopleLeg_v", (peopleLeg_vX+5)*scaleY+length,peopleLeg_vY*scaleY,-length,scaleY,true)
				loadResource(peopleFoot3,"peopleFoot3", (peopleFoot3X+5)*scaleY+length,peopleFoot3Y*scaleY,scaleY,scaleY,true);

				// judge if the leg is long enough to cross the gap
				//success
				if(totalLegWidth>=gap && totalLegWidth <= gap+postAC.getBounds().width*tempScale){
					//update score
					steps++;
					createjs.Tween.get(arrow).to({y: arrow.y-5*scaleY},200)
					.call(function(){
						createjs.Sound.play("success")
						console.log(score2.visible)
						arrow.y += 5*scaleY;
				 		if(steps<10){
                            score.gotoAndStop(steps)
                        }else if(steps >= 10 && steps<100){
                            if(!score2.visible){
                                score2.visible = true
                                score.x = 390*scaleY;
                            }
                            var tens = Math.floor(steps/10),
                                ones = steps%10;
                            score2.gotoAndStop(tens)
                            score.gotoAndStop(ones)
                        }else if(steps >= 100 && steps<1000){
                            if(!score3.visible){
                                score3.visible = true
                                score2.x = 344*scaleY;
                                score.x = 421*scaleY
                            }
                            var tens = Math.floor((steps%100)/10),
                                ones = steps%10;
                                hundreds = Math.floor(steps/100)
                            score3.gotoAndStop(hundreds)
                            score2.gotoAndStop(tens)
                            score.gotoAndStop(ones)
                        }
						
					})
					
					console.log("long enough", started)
					//add male body
					loadResource(peopleBody,"peopleBody", (MALE_x+5)*scaleY,468*scaleY,scaleY,scaleY,true);

					cloud.addEventListener("animationend", function(){
						stage.removeChild(cloud);
					})

					loadResource(cloud,"cloud", peopleFoot3X*scaleY+length,(peopleFoot3Y+25)*scaleY,scaleY,-scaleY,true);

					createjs.Tween.get(peopleBody,{onComplete:finish})
					.to({x:(MALE_x+5)*scaleY+length}, 300, createjs.Ease.linear)
					.on("change", function(e){
						var ratio = e.target.position/300
						peopleLeg_v.scaleX = -length*(1-ratio)
						peopleFoot2.x = (MALE_x-18+5)*scaleY + ratio*length
					})
					function finish(){
						peopleLeg_v.visible = false
						peopleBody.visible=false;
						peopleFoot2.visible=false;
						peopleFoot3.visible=false;

						//move forward by the distance which is equal to the length of grown leg 
						peopleStand.x += length*scaleY; 
						peopleStand.visible = true;
						peopleStand.play();
					}
					//createjs.Tween.get(peopleFoot2).to({x:(MALE_x-20)*scaleY+length}, 300, createjs.Ease.cubicOut)
				}
				//faliure
				else{
					$("#playCanvas").off("touchstart");
					$("#playCanvas").off("touchend");
					$("#playCanvas").off("mousedown");
					$("#playCanvas").off("mouseup");
					peopleStretch.visible=false;
					
					bgm.stop()
					//create a container for holding the falling body
					createjs.Sound.play("fail")
				 	var legContainer = new createjs.Container();
				 	loadResource(peopleFall,"maleFall", 228*scaleY,468*scaleY,scaleY,scaleY,true);
				 	legContainer.addChild(peopleFoot2, peopleFall, peopleLeg_v, peopleFoot3);
				 	loadResource(legContainer, "legContainer", 0, 0, 1, 1, true)

				 	//transformation for the falling container
					legContainer.x = MALE_x*scaleY;
					legContainer.regX = MALE_x*scaleY;
					legContainer.y += 700*scaleY;
					legContainer.regY = 700*scaleY;

					createjs.Tween.get(legContainer).to({rotation:90}, 1000, createjs.Ease.elasticOut)
					.wait(500)
					.call(function(){

					    stats.duration = new Date().getDate() - stats.time.getDate();
					    network = networkType;
					    stats.score = steps;

						$.ajax({
							url: '/researchgame/addStat',
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify(stats),
							dataType: 'json',
							success: function(res) {
								//console.log(stats)
							},
							error: function() {
								//console.log(stats);
								console.log("writing error!");
							}
						});

						// show result page
						loadResource(resultMask, "resultMask", 0, 0, scaleY, scaleY, true)
						loadResource(resultBg, "resultBg", 125*scaleY, 180*scaleY, scaleY, scaleY, true)
						loadResource(resultText, "resultText", 137*scaleY, 517*scaleY, scaleY, scaleY, true)
						loadResource(resultReply,"resultReply", 200*scaleY, 700*scaleY, scaleY, scaleY, true)
						loadResource(resultShare, "resultShare", 430*scaleY, 700*scaleY, scaleY, scaleY, true)
						loadResource(resultCopyright, "resultCopyright", 488*scaleY, 1124*scaleY, scaleY, scaleY, true)

						if(score.visible){
							var resultScore = score.clone()
							resultScore.y = 340*scaleY
							stage.addChild(resultScore)
						}
						if(score2.visible){
							var resultScore2 = score2.clone()
							resultScore2.y = 340*scaleY
							stage.addChild(resultScore2)
						}
						if(score3.visible){
							var resultScore3 = score.clone()
							resultScore3.y = 340*scaleY
							stage.addChild(resultScore3)
						}
					
						var calLevel = function(score) {
							
							//get rank info
							$.ajax({
								url: '/researchgame/getRank?score='+score,
								type: 'GET',
								contentType: 'application/json',
								dataType: 'json',
								success: function(res) {
									//configureSharing(res);

									var rankNum = (1-(res.rank/res.total).toFixed(2))*100

									//show rank info
									loadResource(rank,"rank", 350*scaleY,457*scaleY,scaleY,scaleY,true);
									loadResource(rank2, "rank2", 336*scaleY, 457*scaleY, scaleY, scaleY, false)

									if (rankNum >= 0 && rankNum <= 20) {
										resultText.gotoAndStop(0)
										configureSharing("为了不加班，跨过"+steps+"个坎，超越"+rankNum+"%的玩家。 好气哦！非酋附体惹!");
									} else if (rankNum > 20 && rankNum <= 50) {
										resultText.gotoAndStop(1)
										configureSharing("为了不加班，跨过"+steps+"个坎，超越"+rankNum+"%的玩家。 wei suo发育！别浪！")
									} else if (rankNum > 50 && rankNum <= 70) {
										resultText.gotoAndStop(2);
										configureSharing("为了不加班，跨过"+steps+"个坎，超越"+rankNum+"%的玩家。加油！SSSSR等你召唤！")
									} else if (rankNum > 70 && rankNum <= 90) {
										resultText.gotoAndStop(3);
										configureSharing("为了不加班，跨过"+steps+"个坎，超越"+rankNum+"%的玩家。哇！再跨一个boss你就超神啦！")
									} else if (rankNum > 90) {
										resultText.gotoAndStop(4);
										configureSharing("为了不加班，跨过"+steps+"个坎，超越"+rankNum+"%的玩家。走！一起去吃鸡！")
									}

									if(rankNum<10){
			                            rank.gotoAndStop(rankNum)
			                        }else if(rankNum >= 10 && rankNum<100){
		                                rank2.visible = true
		                                rank.x = 359*scaleY;
			                          
			                            var tens = Math.floor(rankNum/10),
			                                ones = rankNum%10;
			                            rank2.gotoAndStop(tens)
			                            rank.gotoAndStop(ones)
			                        }

								},
								error: function() {
									console.log("writing error!");
								}
							});
						}

						calLevel(steps)

						createjs.Sound.play("result")

						//restart game
						resultReply.addEventListener("click", function(){
							steps = 0;
							totalLegWidth = 0;
							gap = 0;
							length = 0;
							stage.removeAllChildren();
							startGame(loader);
						})

						resultShare.addEventListener("click", function(){
							stage.removeChild(resultBg, resultText, resultReply, resultShare, resultScore, resultScore2, resultScore3);
							stage.removeChild(rank, rank2);
							loadResource(resultShare2, "resultShare2", 106*scaleY, 30*scaleY, scaleY, scaleY, true)
						})
					})


				}
			}
			else if(started==1){
				console.log("too short", started)
				peopleStretch.gotoAndStop(0);
				started=0;
			}
		}

		$("#playCanvas").on({
			//For mobile device
			touchstart: function(e){
				press(e)
				if(localStorage.hasGuide){
					openGuide.visible = false;
					openMask.visible = false;
				}
			},

			touchend: function(e){
				release(e)
			},

			//For PC device
			mousedown: function(e){
				press(e)
				if(localStorage.hasGuide){
					openGuide.visible = false;
					openMask.visible = false;
				}
			},
			mouseup: function(e){
				release(e)
			}
		})
}
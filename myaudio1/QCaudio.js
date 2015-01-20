
function getObject(o) {
		return document.querySelector(o);
	}



MPlayer = {

		_player : null,
		
		conf : {},
		
		musicMode : 'list',
		
		musicIndex: 1,
		
		audiodur : null,

		play : function(data){
			
			var src = data.musicURL;
			
			if(MPlayer._player.src == src){
				
				MPlayer._player.play();
				
				MPlayer.audiodur=MPlayer._player.duration;
				
			}else{
				
				MPlayer._player.src = src;
				
				MPlayer._player.play();
				
				MPlayer.audiodur=MPlayer._player.duration;
			}
		    
			if(data.avatarURL){
				
				getObject('.cover').innerHTML='<img src="'+data.avatarURL+'" alt="'+data.musicAlbum+'">';
				
			}else{
				
				getObject('.cover').innerHTML='<img src="avatar/yinyue1hao.jpg" alt="音乐1号">';
				
		    }
		
			getObject('.tag').innerHTML='<strong>'+data.musicName+'</strong><span class="artist">'+data.artist+'</span><span id="Musictime" class="album">'+data.musicTime+'</span>';	
		
			getObject('.playback').className+=' playing';
		
			getObject('.playback').onclick=function(){
			
				getObject('.playback').className='playback icon';
			
				MPlayer._player.pause();

			}
		
		if(audio.duration!=""){
			
			function objtimer(){
				
		    var currentSec=parseInt(audio.currentTime%60)<10 ?'0'+parseInt(audio.currentTime%60): parseInt(audio.currentTime%60);
			
			var ratio=audio.currentTime/audio.duration*100;

		    document.getElementById("pace").style.width=ratio+"%";
			
			document.getElementById("Musictime").innerHTML=parseInt(audio.currentTime/60)+':'+currentSec;

			}
			
			timer=setInterval(objtimer,1000);
			
		  }
			
		},
		
		pause : function(){
			
			MPlayer._player.pause();
			
			getObject('.playback').className='playback icon';
			
			getObject('.playback').onclick=function(){
				
			getObject('.playback').className='playback icon playing';
			
			MPlayer._player.pause();
			
			}		
			
		},
		
		toggle : function(){
			
			var player = MPlayer._player;
			
			if( player.ended || player.paused ){
				
				if( player.ended ){
					
					player.currentTime = 0;
				}
				player.play();
				
			}else{
				
				player.pause();
				
			}
		},
		
		init : function(conf){
			//var audioDom = document.getElementById('audio');
			
			MPlayer.conf = conf||{};
			
			if( true ){
				
				var MP= MPlayer;
				
				  if(document.getElementById("player")){
					  
					  document.getElementById("player").innerHTML="";
					  
					  document.body.removeChild(document.getElementById("player"));
					  
				   }
				
				  var oplayer=document.createElement("div");
				 
				  oplayer.setAttribute("id","player");
				  	
				  document.body.appendChild(oplayer)||document.documentElement.appendChild(oplayer);
				 
				  document.getElementById("player").innerHTML=
				   '<div class="cover"><img src="avatar/yinyue1hao.jpg" alt="音乐1号"></div>'+
		           '<div class="yctrl">'+
			       '<div class="tag" style="margin-left:95px;">'+
				   '<strong class="conthide">Title</strong>'+
				   '<span class="artist conthide">Artist</span>'+
				   '<span id="Musictime" class="album conthide">Album</span>'+
			       '</div>'+
			       '<div class="control">'+
				   '<div class="left">'+
				   '<div  id="prev" class="rewind icon" ></div>'+
					'<div id="playback" class="playback icon"></div>'+
					'<div id="next" class="fastforward icon" > </div>'+
					'<div class="mute icon left1"></div>'+
					'<div class="volume_wrap hidden">'+
					'<div class="volume_bar">'+
						'<div class="volume_now" ></div>'+
					'</div>'+
				'</div>'+
				'<ul id="option_mode">'+
				    '<li class="list" title="顺序播放" ></li>'+
				'</ul>'+
				'</div>'+
				'<div style="dislpay:none; visibility:hidden; height:0px; width:0px;" class="volume right">'+
					'<div class="mute icon left"></div>'+
					'<div class="slider left">'+
						'<div class="pace"></div>'+
					 '</div>'+
				'</div>'+
			 '</div>'+
			'<div class="progress">'+
				'<div class="slider" id="proslider">'+
					'<div class="loaded"></div>'+
					'<div class="pace" id="pace"></div>'+
				'</div>'+
				'<div style="dislpay:none; visibility:hidden; height:0px; width:0px;" class="timer left">0:00</div>'+
				'<div class="right" style="dislpay:none; visibility:hidden; height:0px; width:0px;">'+
					'<div class="repeat icon"></div>'+
					'<div class="shuffle icon"></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<audio src="" id="audio"></audio>';
		
		function changeMusicMode(){
			
		var liMode=document.getElementById("option_mode").getElementsByTagName("li")[0];
		
		    liMode.onclick=function(){
				
			 if(liMode.className!==""){
				 
				 switch(liMode.className){
					 
				 case  "list":
				 
				 MPlayer.musicMode=liMode.className="shuffle";
				 
				 liMode.setAttribute("title","随机播放");
				 
				 break;
					
				 case "shuffle":
				 
				 MPlayer.musicMode=liMode.className="repeat";
				 
				 liMode.setAttribute("title","单曲循环");
				 
				 break;
				 
				 case "repeat":
				 
				 MPlayer.musicMode=liMode.className="list";
				 
				 liMode.setAttribute("title","顺序播放");
				 
				 break;	 	 
					 
				  }
				
			    }else{
				return false;
                }
			  }
			
		}
		
		function adjustVolume(){
			
			
			
			
			
			
			
			}
		
		
		function playAction(){
			
			document.getElementById("prev").onclick=function(){ playMusicMode('prev');}
			
		    document.getElementById("next").onclick=function(){ playMusicMode('next');}
			
			
			}
		
		function playMusicMode(action){
			
		var musicNum =$('#J_playTracksList>.ui-row-item').length;

		var index =MPlayer.musicIndex;

		if (MPlayer.musicMode == 'list' ) {
			if (action == 'prev') {
				if (index == 1) { 
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next' || action == 'ended') {
				if (index == musicNum) {
					index = 1;
				}
				else{
					index += 1;
				}
			}
		}
		if (MPlayer.musicMode == 'repeat') {
			if (action == 'prev') {
				if (index == 1) { 
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next') {
				if (index == musicNum) {
					index = 1;
				}
				else{
					index += 1;
				}
			}else if(action=='ended'){
				
				index=index;
					
			}
		}
		if (MPlayer.musicMode == 'shuffle') {
			var randomIndex = parseInt(musicNum * Math.random());
			index = randomIndex + 1;
			if (index == MPlayer.musicIndex) {
				index += 1;
			};
		};
		 MPlayer.musicIndex=index;
            $('#J_playTracksList>.ui-row-item').each(function(){
                $(this).removeClass('ui-track-current');
            });
            var itemObj=document.getElementById('J_playTracksList').getElementsByClassName('ui-row-item')[index-1];
                itemObj.className='ui-row-item ui-track-item ui-track-current';
                itemObj.getElementsByTagName('em')[0].className='yinlv';
            //$('.ui-row-item:eq(index)').attr('class','ui-row-item ui-track-item ui-track-current');
            //$('.ui-row-item:eq(index) .ui-track-sort').children('em').attr('class','yinlv');
            //document.getElementById('play_song_'+(index-1)).className='ui-row-item ui-track-item ui-track-current';
           //document.getElementById('play_song_'+(index-1)).getElementsByTagName('em')[0].className='yinlv';
            var musicSrc=itemObj.id;
           var music_Index=parseInt(musicSrc.substring(10,11));
		 MPlayer.play(playList[music_Index]);

			
       }
	   
		changeMusicMode();
		
		playAction();		
		
		var audio = document.getElementById('audio');
		
				audio.addEventListener('play',function(e){
					
					if(typeof MPlayer.conf.playCb == 'function'){
						
						MPlayer.conf.playCb(e);
					}
				}, false);

				audio.addEventListener('ended',function(e){
					
					if(typeof MPlayer.conf.endedCb == 'function'){
						
						MPlayer.conf.endedCb(e);

						 playMusicMode('ended');

						
					}
				}, false);

				audio.addEventListener('pause',function(e){

					if(typeof MPlayer.conf.pauseCb == 'function'){
						
						MPlayer.conf.pauseCb(e);
					}
				}, false);
				
				audio.addEventListener('canplay', function(e){
					
					if(typeof MPlayer.conf.canplayCb == 'function'){
						
						MPlayer.conf.canplayCb(e);
					}
					
					}, false);
					
			 	audio.addEventListener('loadedmetadata', function(e){
					
					if(typeof MPlayer.conf.loadedmetadataCb == 'function'){
						
						MPlayer.conf.loadedmetadataCb(e);
					}
					
					},false );
					
				audio.addEventListener('timeupdate',function(e){
					
					if(typeof MPlayer.conf.timeupdateCb == 'function'){
						
						MPlayer.conf.timeupdateCb(e);
					}
				}, false);
				
				MP._player = audio;
			}
		}
	}
	
	document.addEventListener("DOMContentLoaded", function(){
		
		MPlayer.init({
			
			playCb : function(e){
				
			getObject('.playback').className='playback icon playing';
			
			getObject('.playback').onclick=function(){
				
			getObject('.playback').className='playback icon ';
			
			MPlayer._player.pause();
			
			 }
				
			},
			
			pauseCb : function(e){
				
				getObject('.playback').className=' playback icon';
		
				getObject('.playback').onclick=function(){
			
				getObject('.playback').className='playback icon playing ';
				
				MPlayer._player.play();
				
                }
			
			},
			
			endedCb : function(e){
				
				audio.currentTime=0;
				
					
			},
			
			canplayCb: function(e){
				
			durtimer=setInterval(function(){
			var bufferIndex = audio.buffered.length;
			if (bufferIndex > 0 && audio.buffered != undefined){
			
			if (Math.abs(audio.duration - audio.buffered.end(bufferIndex-1)) <1){
			
						clearInterval(durtimer);
			    }
								
			    }
			},500);
				 	
			},
			
			loadedmetadataCb: function(e) {
				
   				//console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
				
    			 MPlayer._player.play();
					
					
			 },
					
			timeupdateCb : function(event){
				
	            var audio = document.getElementById('audio');
				
				document.getElementById("proslider").onclick=function(){
					
				function adjustPorgress(dom,event){
					
		   		var ClientX=event.clientX || window.event.clientX;
	
				var progressX = ClientX - dom.getBoundingClientRect().left;
				
				var progressScreenWidth=document.body.clientWidth||document.documentElement.clientWidth;	
	
				audio.currentTime = parseInt(progressX/(progressScreenWidth*0.7)*audio.duration);
				
				MPlayer._player.play();
				
	  				}		
				adjustPorgress(this,event);			
				
				}	
			},
      })
   })
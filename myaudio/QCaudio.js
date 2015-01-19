
function $(o) {
		return document.querySelector(o);
	}

function $$(o) {
		return document.querySelectorAll(o);
	
}


MPlayer = {

		_player : null,
		
		conf : {},
		
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
				
				$('.cover').innerHTML='<img src="'+data.avatarURL+'" alt="'+data.musicAlbum+'">';
				
			}else{
				
				$('.cover').innerHTML='<img src="avatar/yinyue1hao.jpg" alt="音乐1号">';
				
		    }
		
			$('.tag').innerHTML='<strong>'+data.musicName+'</strong><span class="artist">'+data.artist+'</span><span id="Musictime" class="album">'+data.musicTime+'</span>';	
		
			$('.playback').className+=' playing';
		
			$('.playback').onclick=function(){
			
				$('.playback').className='playback icon';
			
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
			
			$('.playback').className='playback icon';
			
			$('.playback').onclick=function(){
				
			$('.playback').className='playback icon playing';
			
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
			       '<div class="tag">'+
				   '<strong class="conthide">Title</strong>'+
				   '<span class="artist conthide">Artist</span>'+
				   '<span id="Musictime" class="album conthide">Album</span>'+
			       '</div>'+
			       '<div class="control">'+
				   '<div class="playerleft">'+
				   '<div class="rewind icon" style="dislpay:none; visibility:hidden; height:0px; width:0px;"></div>'+
					'<div class="playback icon"></div>'+
					'<div class="fastforward icon"style="dislpay:none; visibility:hidden; height:0px; width:0px;"> </div>'+
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
				'<div class="playerright" style="dislpay:none; visibility:hidden; height:0px; width:0px;">'+
					'<div class="repeat icon"></div>'+
					'<div class="shuffle icon"></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<audio src="" id="audio"></audio>';
		
		var audio = document.getElementById('audio');
		
				audio.addEventListener('play',function(e){
					
					if(typeof MPlayer.conf.playCb == 'function'){
						
						MPlayer.conf.playCb(e);
					}
				}, false);

				audio.addEventListener('ended',function(e){
					
					if(typeof MPlayer.conf.endedCb == 'function'){
						
						MPlayer.conf.endedCb(e);
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
				
			$('.playback').className='playback icon playing';
			
			$('.playback').onclick=function(){
				
			$('.playback').className='playback icon ';
			
			MPlayer._player.pause();
			
			 }
				
			},
			
			pauseCb : function(e){
				
				$('.playback').className=' playback icon';
		
				$('.playback').onclick=function(){
			
				$('.playback').className='playback icon playing ';
				
				MPlayer._player.play();
				
                }
			
			},
			
			endedCb : function(e){
				
				audio.currentTime=0;
				
				MPlayer._player.play();
					
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
				
   				console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
				
    			 MPlayer._player.play();
					
					
			 },
					
			timeupdateCb : function(event){
				
			//var audio = e.currentTarget;
	            var audio = document.getElementById('audio');
				
				document.getElementById("proslider").onclick=function(){
					
				function adjustPorgress(dom,event){
					
		   		var ClientX=event.clientX || window.event.clientX;
	
				var progressX = ClientX - dom.getBoundingClientRect().left;
				
				var progressScreenWidth=document.body.clientWidth||document.documentElement.clientWidth;	
	
				audio.currentTime = parseInt(progressX/progressScreenWidth*audio.duration);
				
				MPlayer._player.play();
				
	  				}		
				adjustPorgress(this,event);			
				
				}	
			},
      })
   })
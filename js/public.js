/*pictureTurn*/
var index_pic_num	= 0;
var index_pic_cont	= null;
var index_pic_itemW	= 1038;
var index_pic_index	= 0;
var index_pic_item = null;
var _int = null;

function picTurn(){};

picTurn.prototype = {
	init : function(){
		var self	= this;
		var ox ,oy 	= 0;
		var img =$("#roll_img_cc");
		
		index_pic_num=$(".roll_img_kk").length;
		
		index_pic_cont	= $("#portal_block_500_content");
		index_pic_item  = $("#portal_block_500_content  .roll_img_kk");
                $(".roll").hide();
                $('.roll_opacity').hide();
                $('.box1').mouseenter(function(){
                    var now_index = $('.roll_small_signimg_div .current_con').index();
                    roll_title	= '<a target="_blank" href="'+$(".roll_img_kk").eq(now_index).attr('rurl')+'">'+$(".roll_img_kk").eq(now_index).attr('alt')+'</a>';
                    $(".roll_title").html(roll_title);
                    $('.roll_opacity').show();
                    $('.roll').show();  
                });
                $('.box1').mouseleave(function(){
                    $('.roll_opacity').hide();
                    $('.roll').hide();
                });

                
		// 生成缩略图
		for(k=0; k<index_pic_num; k++){
			this.pic_image(k);
		}
		
		try{
			img.addEventListener('touchstart', function(event) {
				event.preventDefault();
				try{
					self.ox = event.touches[0].pageX;
					self.oy = event.touches[0].pageY;
				}catch(e){
					try{
					self.ox = event.targetTouches[0].pageX;
					self.oy = event.targetTouches[0].pageY;
					}catch(e){}
				}
				
				try{
					event.stopPropagation();
				}catch(e){
					try{
						window.event.cancelBubble	= true;
					}catch(e){}
				}
				
			}, false);
			img.addEventListener('touchend', function(event) {
				event.preventDefault();
				try{
					nx = event.changedTouches[0].pageX;
					ny = event.changedTouches[0].pageY;
				}catch(e){
					nx = event.targetTouches[0].pageX;
					ny = event.targetTouches[0].pageY;
				}
				if( self.ox-nx>=100 ){	// 左移动
					clearTimeout(_int);
					picTurn.prototype.picSwitch();
				}else if( self.ox-nx<=-100 ){	// 右移动
					self.previous_page();
				}
				
				self.ox	= 0;
				self.oy	= 0;
				
					try{
						event.stopPropagation();
					}catch(e){
						try{
							window.event.cancelBubble	= true;
						}catch(e){}
					}
			}, false);
		}catch(e){}
		
		
		// 按下前翻
		$(".leftbtn_picturn").click(function(){
			self.previous_page();
		});
		// 按下后翻
		$(".rightbtn_picturn").click(function(){
			clearTimeout(_int);
			picTurn.prototype.picSwitch();						 
		});	
	},
	previous_page : function (){	// 上一页， （前翻）
		index_pic_index--;
		index_pic_index--;
		if(index_pic_index<0){
				index_pic_index	= index_pic_num-1;
		}
		clearTimeout(_int);
		picTurn.prototype.picSwitch();
	},
	pic_image : function (i){	// 显示image图片
		try{
               var current_con = ''; 
               if(i == 0) current_con = 'current_con';
			src 	= $(".roll_img_kk").eq(i).attr("src");
			html	= '<img class="roll_small_signimg '+current_con+' " width="50" height="29" src="'+src+'">';
			$(".roll_small_signimg_div").append(html);
		}catch(e){}
		
	},
	picSwitch : function(){
		if(index_pic_index==index_pic_num){
			index_pic_index = 0;
		}
		
		left 	=  parseInt( 0- (index_pic_index * 686) ,10); 
		leftpx 	= left + 'px';

		$(".roll_img .roll_img_cc").animate({left:leftpx}, 400);

		roll_title	= '<a target="_blank" href="'+$(".roll_img_kk").eq(index_pic_index).attr('rurl')+'">'+$(".roll_img_kk").eq(index_pic_index).attr('alt')+'</a>';
		$(".roll_title").html(roll_title);
		
		$(".roll_small_signimg").eq(index_pic_index).addClass("current_con").siblings().removeClass("current_con");
		index_pic_index++;
		clearTimeout(_int);
		_int = setTimeout("picTurn.prototype.picSwitch()",3000);
	},
	picControl : function(){
		
	    this.init();
		var that = this;

		picTurn.prototype.picSwitch();

		
		//点击进度条时，控制动画效果 mouseover
		$(".roll_small_signimg").click(function(){
			var overIndex = $(this).index(".roll_small_signimg");
			if(index_pic_index == Number(overIndex+1)){return false;}
			clearTimeout(_int);
			index_pic_index = overIndex;
			picTurn.prototype.picSwitch();
		});

		$("#portal_block_500_content").hover(function(){
			clearTimeout(_int);
		},function(){
			_int = setTimeout("picTurn.prototype.picSwitch()",3000);
		});
	}
                
};

function new_zhuanji()
{
		var oTTSlider=document.getElementById('TTSlider');
		var oTTSlider1=document.getElementById('TTSlider1');
		var oTTSliderTitle=getByClass('TTSliderTitle',oTTSlider,'div')[0];
		var aSubNav=oTTSliderTitle.getElementsByTagName('li');
		var oTTSliderPrevBtn=document.getElementById('TTSliderPrevBtn');
		var oTTSliderNextBtn=document.getElementById('TTSliderNextBtn');
		var oTTSliderPrevBtn1=document.getElementById('TTSliderPrevBtn1');
		var oTTSliderNextBtn1=document.getElementById('TTSliderNextBtn1');
		var oTTSliderPicList=getByClass('TTSliderPicList',oTTSlider,'div')[0];
		var oTTSliderPicList1=getByClass('TTSliderPicList',oTTSlider1,'div')[0];
		var aItem=oTTSliderPicList.getElementsByTagName('ul');
		var aItem1=oTTSliderPicList1.getElementsByTagName('ul');
		var len=aItem.length;
		var showIndex=aItemImgWidth=iNow=0;
		var aEle=[];
     
		for(var i=0;i<len;i++)
		{  
			var aItemImgs=aItem[i].getElementsByTagName('li');
			if(!aItemImgWidth)
			{
				aItemImgWidth=aItemImgs[0].offsetWidth;
			}
			aEle.push(aItemImgs);	//存入数组,考虑到有多个轮播,且每个轮播里面的图片个数可能不一致.


			aSubNav[i].index=i;
			aSubNav[i].onclick=function()//切换
			{
				var index=showIndex=this.index;  
				for(var j=0;j<len;j++)
				{
					if(j!=index)
					{
							aItem[j].className='';
							aSubNav[j].className='';
					}
				}
				aSubNav[index-1] && (aSubNav[index-1].className='noneBorRight' );
				if(index>0)
				{
					(aSubNav[0].getElementsByTagName('div')[0].style.borderLeft='1px solid #C3C5C7');
				}
				else
				{
					aSubNav[0].getElementsByTagName('div')[0].style.borderLeft='1px solid #C3C5C7';
				}
				
				aSubNav[index].className='cur';
				aItem[index].className='show';
			}
		}


		for(var i=0;i<len;i++)
		{
			var num=aEle[i].length;
			if(aItem[i].className=='show')
			{
				showIndex=i;
			}
			aItem[i].style.width=num*(aItemImgWidth)+'px'
		}

        aItem1[0].style.width=(aItem1[0].getElementsByTagName('li').length)*(aItem1[0].getElementsByTagName('li')[0].offsetWidth)+'px'

		oTTSliderNextBtn1.onclick=function()
		{
			var maxNum=aItem1[0].getElementsByTagName('li').length-1;
			aItem1[0].insertBefore(aItem1[0].getElementsByTagName("li")[maxNum],aItem1[0].getElementsByTagName("li")[0]);
			aItem1[0].style.left=-aItemImgWidth+'px';
			doMove(aItem1[0],0);
		}

		oTTSliderPrevBtn1.onclick=function()
		{
			doMove(aItem1[0],-(aItemImgWidth),function(){
				aItem1[0].style.left=0;
				aItem1[0].appendChild(aItem1[0].getElementsByTagName("li")[0]);
			});
		}
		
		oTTSliderNextBtn.onclick=function()
		{
			var maxNum=aEle[showIndex].length-1;
			aItem[showIndex].insertBefore(aEle[showIndex][maxNum],aEle[showIndex][0]);
			aItem[showIndex].style.left=-aItemImgWidth+'px';
			doMove(aItem[showIndex],0);
		}

		oTTSliderPrevBtn.onclick=function()
		{
			doMove(aItem[showIndex],-(aItemImgWidth),function(){
				aItem[showIndex].style.left=0;
				aItem[showIndex].appendChild(aEle[showIndex][0]);
			});
		}

		function doMove(o,t,fn)
		{
			clearInterval(o.timer);
			o.timer=setInterval(function(){
				var is= (t-getStyle(o,'left'))/8;
				is= is>0?Math.ceil(is):Math.floor(is);
				if(t==o.offsetLeft)
				{
					clearInterval(o.timer);
					(typeof fn==='function') && fn();
				}
				else
				{
					o.style.left=o.offsetLeft+is+'px';
				}

			},30)
		}

		function getStyle(o,a)
		{
			return o.currentStyle ? parseFloat(o.currentStyle[a]) : parseFloat(getComputedStyle(o,false)[a]);
		}

		function getByClass(s,p,e)
		{
			var reg=new RegExp('(\\b)'+s+'(\\b)');
			var aElement=(p||document).getElementsByTagName(e||'*');
			var aResult=[];
			for(var i=0;i<aElement.length;i++)
			{
				reg.test(aElement[i].className) && aResult.push(aElement[i]);
			}
			return aResult;
		}
}

	function setTab(m,n){
	var menu=document.getElementById("tab"+m).getElementsByTagName("li");  
	var showdiv=document.getElementById("tablist"+m).getElementsByTagName("div");  
	for(i=0;i<menu.length;i++)
	{
   		menu[i].className=i==n?"now":""; 
   		showdiv[i].style.display=i==n?"block":"none"; 
		}
	}
	
	
	
	/*var oPlaylist=document.getElementById('playlist');
	alert(oPlaylist);
	var oPlayer=document.getElementById("player");
	var oLi=oPlaylist.getElementsByTagName("li");
	for(i=0; i<oLi.length;i++){
		oLi[i].index=i;
		
		oLi[i].onmouseover=function(){
		
		var nowindex=this.index;
			
		oPlayer.style.top=nowindex*50+"px";
		
		oPlayer.style.display="block";
		 
		/*$("#player>.cover").html('<img src="'+playList[nowindex].avatarURL+'" alt="'+playList[nowindex].musicAlbum+'">');
		 
		$("#player>.yctrl>.tag").html('<strong>'+playList[nowindex].musicName+'</strong><span class="artist">'+playList[nowindex].artist+'</span><span id="Musictime" class="album">'+playList[nowindex].musicTime+'</span>');
			
			}

		}
	*/
	
	
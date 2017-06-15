function vhaHide(){
	$('.plate-zoom-car a.plate .vha').each(function(){
		var par=$(this);
		var maxHeight=0;
		var chAll=$(this).find('span');
		chAll.css('height','auto');
		var ch=$(this).find('span:first-child');
		maxHeight=$(ch).outerHeight();
		var i=$(par).find('span.cost i');
		if(maxHeight!=0){
			$(chAll).add(i).css('height',maxHeight);
		}
	});
}
function getDecimal(num){
	return num-Math.floor(num);
}
function initProCarousel(){
	$('.pro-car-out').each(function(){
		var carP=$(this);
		var car=carP.find('.pro-carousel');
		var carouselType=+car.attr('data-type');
		var slideBox=car.find('.slide-box');
		var outerW=carP.outerWidth();
		var slide=car.find('.slide');
		slide.removeAttr('style');
		slide.add(slideBox).removeAttr('style');
		var slideL=slide.length;
		var left=0;
		switch(carouselType){
			case 6:
				var slideOnPage=1;
				var activePag=0;
				carP.css('max-width',$(document).outerWidth());
				$(slide).attr('style','');
				var slideWM=$(slide).outerWidth(true);
				var slideW=$(carP).find('.slide:first-child').outerWidth();
				if(slideL>1){
					if(slideL<5){
						$(slide[1]).addClass('active');
						activePag=2;
					}else{
						$(slide[2]).addClass('active');
						activePag=3;
					}
				}else{
					$(slide[0]).addClass('active');
					activePag=1
				}
				var slideAW=$(carP).find('.slide.active').outerWidth();
				var freeMargin=0;
				//if((outerW/(slideW*slideL))<1){
				if(slideL>1){
					var sum=+slideAW;
					for(var i=0; i<slideL; i++){
						sum=sum+slideW;
						if(sum<outerW){
							slideOnPage+=1;
						}
					}
				}
				if(slideL<=slideOnPage){
					$(slide).removeClass('active');
					$(carP).find('.pag').css('display','none');
					$(carP).find('.arrow').css('display','none');
					$(car).find('.slide').css({'margin-right':0,'margin-left':0});
					freeMargin=Math.round(outerW-(slideL*slideW));
					$(car).find('.slide').css({
						"margin-right":(freeMargin/slideL/2)+'px',
						"margin-left":(freeMargin/slideL/2)+'px'
					});
				}else{
					$(car).find('.slide').css({'margin-right':0,'margin-left':0});
					//РёС‰РµРј С†РµРЅС‚СЂР°Р»СЊРЅС‹Р№ СЃР»Р°Р№Рґ
					if(slideOnPage>1){
						if(slideOnPage>=slideL){
							freeMargin=Math.round((((outerW-((slideOnPage)*slideW))/(slideOnPage-1))));
						}else{
							freeMargin=Math.round((((outerW-(((slideOnPage-1)*slideW)+slideAW))/(slideOnPage-1))));
						}
						$(car).find('.slide').css("margin-right",freeMargin+'px');
					}else{
						//if(slideOnPage>=slideL){
						freeMargin=Math.round(outerW-slideW);
						if(getDecimal(freeMargin/2)){
							$(car).find('.slide').css({
								"margin-left":(Math.floor(freeMargin/2)+1)+'px',
								"margin-right":Math.floor(freeMargin/2)+'px'
							});
						}else{
							$(car).find('.slide').css({
								"margin-left":Math.floor(freeMargin/2)+'px',
								"margin-right":Math.floor(freeMargin/2)+'px'
							});
						}
						//}
					}
					slideWM=$(slide).outerWidth(true);
					/*С€РёСЂРёРЅР° Р±Р»РѕРєР° СЃ РјР°СЂР¶РёРЅРѕРј СЃРїСЂР°РІР°*/
					$(car).find('.slide-box').css({width:(slideL*slideWM+5)*2});
					/*РєРЅРѕРїРєРё*/
					var pag=$(carP).find('ul.pag');
					var isAnimated=false;
					$(carP).find('a.arrow').unbind('click').on('click',function(e){
						e.stopPropagation();
						if(isAnimated) return false;
						var actPag=pag.find('li.active');
						var activeS=$(carP).find('.slide.active');
						if($(this).hasClass('left')){
							if(actPag.index()!=0){
								isAnimated=true;
								var clone=$(carP).find('.slide:last-child').clone(true);
								$(carP).find('.slide:last-child').remove();
								$(carP).find('.slide-box').css({'left':-slideWM+'px'}).prepend(clone);
								activeS.removeClass('active');
								pag.find('li').removeClass('active');
								$(carP).find('.slide-box').animate({'left':0},500,function(){
									activeS.prev().addClass('active');
									pag.find('li:nth-child('+$(carP).find('.slide.active').data('id')+')').addClass('active');
									isAnimated=false;
								});
							}
						}else{
							if(!(actPag.index()==slideL-1)){
								isAnimated=true;
								var clone2=$(carP).find('.slide:first-child').clone(true);
								activeS.removeClass('active');
								pag.find('li').removeClass('active');
								$(carP).find('.slide-box').animate({'left':-slideWM+'px'},500,function(){

									activeS.next().addClass('active');
									pag.find('li:nth-child('+$(carP).find('.slide.active').data('id')+')').addClass('active');
									$(carP).find('.slide:first-child').remove();
									$(carP).find('.slide-box').css({'left':0}).append(clone2);
									isAnimated=false;
								});
							}
						}
						return false;
					});
					/*pag*/
					pag.children().remove();
					for(var i=0; i<slideL; i++){
						pag.append('<li>&nbsp;</li>');
					}
					pag.find('li:nth-child('+($('.discount-carousel .slide.active').index()+1)+')').addClass('active');
					pag.find('li').click(function(){
						if(isAnimated)return false;
						var id=$(this).index()+1;
						var active=$(carP).find('ul.pag li.active');
						var activeId=active.index()+1;
						active.removeClass('active');
						$(this).addClass('active');
						$(carP).find('.slide').removeClass('active');
						//if(slideOnPage>4){
						$(carP).find('.slide[data-id='+id+']').addClass('active');
						//}
						var shift=id-activeId;
						var back=false;
						if(shift==0){
							return false;
						}
						if(shift<0){
							back=true;
							shift= -shift;
						}
						var interval=setInterval(function(){
							if(shift){
								if(back){
									/*LEFT*/
									isAnimated=true;
									var clone=$(carP).find('.slide:last-child').clone(true);
									$(carP).find('.slide:last-child').remove();
									$(carP).find('.slide-box').css({'left':-slideWM+'px'}).prepend(clone);
									$(carP).find('.slide-box').animate({'left':0},300,function(){
										isAnimated=false;
									});
									shift--;
								}else{
									/*RIGHT*/
									isAnimated=true;
									var clone2=$(carP).find('.slide:first-child').clone(true);
									$(carP).find('.slide-box').animate({'left':-slideWM+'px'},300,function(){
										$(carP).find('.slide:first-child').remove();
										$(carP).find('.slide-box').css({'left':0}).append(clone2);
										isAnimated=false;
									});
									shift--;
								}
							}else{
								clearInterval(interval);
							}
						},350);
					});
					var position=0;
					var startE={};
					var endE={};
					var fAnim=false;
					$(carP)[0].addEventListener("touchstart",function(e){
						startE=e;
						endE=e;
					},false);
					$(carP)[0].addEventListener("mousedown",function(e){
						startE=e;
						endE=e;
					},false);
					$(carP)[0].addEventListener("touchmove",function(e){
						endE=e;
					},false);
					$(carP)[0].addEventListener("mousemove",function(e){
						endE=e;
					},false);
					$(carP)[0].addEventListener("touchend",function(e){
						checkDirection(startE,endE);
					},false);
					$(carP)[0].addEventListener("mouseup",function(e){
						checkDirection(startE,endE);
					},false);
					setInterval(function(){
						checkDirection(startE,endE);
					},30);
					var checkDirection=function(sE,eE){
						if(sE!={}){
							var x1,y1,x2,y2;
							if(sE.touches!=undefined){
								x1=sE.touches[0].clientX;
								y1=sE.touches[0].clientY;
								x2=eE.touches[0].clientX;
								y2=eE.touches[0].clientY;
							}else{
								x1=sE.clientX;
								y1=sE.clientY;
								x2=eE.clientX;
								y2=eE.clientY;
							}
							if(Math.abs(y1-y2)<10){
								if(Math.abs(x1-x2)>4){
									startE={};
									if(x1>x2){
										//left
										handleStart('left');
									}else{
										//right
										handleStart('right');
									}
								}
							}
						}

					};

					function handleStart(direction){
						if(fAnim==false){
							fAnim=true;
							switch(direction){
								case 'right':
									$(carP).find('a.arrow.left').click();
									break;
								case 'left':
									$(carP).find('a.arrow.right').click();
									break;
							}
							setTimeout(function(){
								fAnim=false;
							},300);
						}

					}
					carP.addClass('ready');
				}
				break;
			case 7:
				var slideOnPage=1;
				var activePag=0;
				carP.css('max-width',$(document).outerWidth());
				$(slide).attr('style','');
				var slideWM=$(slide).outerWidth(true);
				var slideW=$(carP).find('.slide:first-child').outerWidth();
				if(slideL>1){
					if(slideL<5){
						$(slide[1]).addClass('active');
						activePag=2;
					}else{
						$(slide[2]).addClass('active');
						activePag=3;
					}
				}else{
					$(slide[0]).addClass('active');
					activePag=1
				}
				var slideAW=$(carP).find('.slide.active').outerWidth();
				var freeMargin=0;
				//if((outerW/(slideW*slideL))<1){
				if(slideL>1){
					var sum=+slideAW;
					for(var i=0; i<slideL; i++){
						sum=sum+slideW;
						if(sum<outerW){
							slideOnPage+=1;
						}
					}
				}
				if(slideL<=slideOnPage){
					$(slide).removeClass('active');
					$(carP).find('.pag-box').css('display','none');
					$(carP).find('.arrow').css('display','none');
					$(car).find('.slide').css({'margin-right':0,'margin-left':0});
					freeMargin=Math.round(outerW-(slideL*slideW));
					$(car).find('.slide').css({
						"margin-right":(freeMargin/slideL/2)+'px',
						"margin-left":(freeMargin/slideL/2)+'px'
					});
				}else{
					$(car).find('.slide').css({'margin-right':0,'margin-left':0});
					//РёС‰РµРј С†РµРЅС‚СЂР°Р»СЊРЅС‹Р№ СЃР»Р°Р№Рґ
					if(slideOnPage>1){
						if(slideOnPage>=slideL){
							freeMargin=Math.round((((outerW-((slideOnPage)*slideW))/(slideOnPage-1))));
						}else{
							freeMargin=Math.round((((outerW-(((slideOnPage-1)*slideW)+slideAW))/(slideOnPage-1))));
						}
						$(car).find('.slide').css("margin-right",freeMargin+'px');
					}else{
						//if(slideOnPage>=slideL){
						freeMargin=Math.round(outerW-slideW);
						if(getDecimal(freeMargin/2)){
							$(car).find('.slide').css({
								"margin-left":(Math.floor(freeMargin/2)+1)+'px',
								"margin-right":Math.floor(freeMargin/2)+'px'
							});
						}else{
							$(car).find('.slide').css({
								"margin-left":Math.floor(freeMargin/2)+'px',
								"margin-right":Math.floor(freeMargin/2)+'px'
							});
						}
						//}
					}
					slideWM=$(slide).outerWidth(true);
					var margin=slideWM-slideW;
					/*С€РёСЂРёРЅР° Р±Р»РѕРєР° СЃ РјР°СЂР¶РёРЅРѕРј СЃРїСЂР°РІР°*/
					$(car).find('.slide-box').css({width:(slideL*slideWM+5)+5});
					//РѕР±СЂР°Р±РѕС‚РєР° РєРѕСЃР°РЅРёСЏ
					var position=0;
					var startE={};
					var endE={};
					var fAnim=false;
					$(carP)[0].addEventListener("touchstart",function(e){
						startE=e;
						endE=e;
					},false);
					$(carP)[0].addEventListener("mousedown",function(e){
						startE=e;
						endE=e;
					},false);
					$(carP)[0].addEventListener("touchmove",function(e){
						endE=e;
					},false);
					$(carP)[0].addEventListener("mousemove",function(e){
						endE=e;
					},false);
					$(carP)[0].addEventListener("touchend",function(e){
						checkDirection(startE,endE);
					},false);
					$(carP)[0].addEventListener("mouseup",function(e){
						checkDirection(startE,endE);
					},false);
					setInterval(function(){
						checkDirection(startE,endE);
					},30);
					var checkDirection=function(sE,eE){
						if(sE!={}){
							var x1,y1,x2,y2;
							if(sE.touches!=undefined){
								x1=sE.touches[0].clientX;
								y1=sE.touches[0].clientY;
								x2=eE.touches[0].clientX;
								y2=eE.touches[0].clientY;
							}else{
								x1=sE.clientX;
								y1=sE.clientY;
								x2=eE.clientX;
								y2=eE.clientY;
							}
							if(Math.abs(y1-y2)<10){
								if(Math.abs(x1-x2)>4){
									startE={};
									if(x1>x2){
										//left
										handleStart('left');
									}else{
										//right
										handleStart('right');
									}
								}
							}
						}

					};

					function handleStart(direction){
						if(fAnim==false){
							fAnim=true;
						switch(direction){
							case 'right':
								position--;
								if(position<0){
									position=0;
								}
								break;
							case 'left':
								position++;
								if(position>=slideL-1-(slideOnPage-1)){
									position=slideL-1-(slideOnPage-1);
								}
								break;
						}


							$(car).find('.slide-box').css('left',position*(-1)*slideWM);
							var pagStep=$(carP).find('.pag-box li:first-child').outerWidth();
							$(carP).find('.pag-box .drag').css('left',position*10);
							setTimeout(function(){
								fAnim=false;
							},300);
						}

					}

					/*Pag*/
					var pag=$(carP).find('ul.pag-x');

					/*pag*/
					pag.children().remove();
					for(var i=0; i<slideL+3; i++){
						pag.append('<li></li>');
					}
					carP.addClass('ready');
				}
				break;
		}
	});
}
function proCarouselStart(car){
	if(car==undefined){
		car=$('.pro-carousel');
	}
	if(car.length){
		car.each(function(){
			var carStart=$(this);
			if(carStart.next().hasClass('pag')){
				carStart.add(carStart.next()).wrapAll("<div class='pro-car-out'> </div>");
			}else{
				carStart.wrap("<div class='pro-car-out'> </div>");
			}
			carStart.children().wrapAll("<div class='slide-box'> </div>");
			/*
			 1 - РєРѕРЅРїРєРё
			 2- РїР°РіРёРЅР°С†РёСЏ
			 3- 1+2
			 4-С‡РёСЃР»РѕРІР°СЏ+СЃС‚СЂРµР»РєРё
			 */

			if(carStart.attr('data-controls')==1){
				carStart.parent().append('<a href="#" class="arrow left">&nbsp;</a><a href="#" class="arrow right">&nbsp;</a>');
			}else{
				if(carStart.attr('data-controls')==2){
					carStart.parent().append('<ul class="pag std2">&nbsp;</ul>');
				}else{
					if(carStart.attr('data-controls')==3){
						carStart.parent().append('<a href="#" class="arrow left">&nbsp;</a><a href="#" class="arrow right">&nbsp;</a><ul class="pag std2">&nbsp;</ul>');
					}else{
						if(carStart.attr('data-controls')==4){
							carStart.parent().append('<div class="controls"><a href="#" class="arrow left">&nbsp;</a><div><span class="current">1</span>/<span class="all">&nbsp;</span></div><a href="#" class="arrow right">&nbsp;</a></div>');
						}else{
							if(carStart.attr('data-controls')==5){
								carStart.parent().append('<div class=center"><div class="pag-box"><ul class="pag-x std2"></ul><div class="drag">&nbsp;</div></div></div>');
							}
						}
					}
				}
			}
		});
		setTimeout(initProCarousel,500);
	}
}
$(document).ready(function(){
	if($('.pro-carousel').length){
		proCarouselStart();
		$(window).resize(function(){
			setTimeout(initProCarousel,300);
		});
	}
	/*imgs-slider*/
	$('.close-imgs-sloder .close-ico, .close-imgs-sloder').unbind('click').click(function(){
		$('.imgs-slider').removeClass('show');
	});
	$('.open-imgs-slider').unbind('click').click(function(){
		var group=$(this).data('group');
		$('#imgs-slider-box').children().remove();
		$('#imgs-slider-box').append('<div class="pro-carousel" data-type="2" data-controls="1"></div>');
		var clones=$(this).find('img').clone();
		var clones2=$('#hidden-imgs img[data-group='+group+']').clone();
		var clonesOut=clones.add(clones2);
		var cloneT=$('#hidden-imgs .desc[data-group='+group+']').children().clone();
		$('#imgs-slider-box .pro-carousel').append(clonesOut);
		$('.imgs-slider .desc').children().remove();
		$('.imgs-slider .desc').append(cloneT);
		$('#imgs-slider-box .pro-carousel img').each(function(){
			$(this).wrap('<div class="img slide"></div>');
		});
		proCarouselStart($('#imgs-slider-box .pro-carousel'));
		$('#imgs-slider-box img').unbind('click').click(function(){
			$('.imgs-slider .img-out').css('background-image','url('+$(this).attr('src')+')');
		});
		$('#imgs-slider-box .img.slide:first-child img').click();
		$('.imgs-slider').addClass('show');
	});
});
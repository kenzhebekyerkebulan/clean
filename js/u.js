var text={};
text.in='в';
text.month=['января','февраля',"марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
var scrollTopMain=0;
/*var costs={
 costByRoom:5000,
 costByBathroom:2000,
 cleanTypeCost:{
 1:1000,
 2:1000,
 3:1000
 },
 cleanPeriodDiscount:[10,15,20,0],
 extraServiceCosts:{},
 dryCleanCost:{}
 };*/
jQuery(function($){
	$.datepicker.regional['ru']={
		closeText:'Закрыть',
		prevText:'&#x3c;Пред',
		nextText:'След&#x3e;',
		currentText:'Сегодня',
		monthNames:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		dayNames:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort:['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader:'Нед',
		dateFormat:'yy-mm-dd',
		firstDay:1,
		isRTL:false,
		showMonthAfterYear:false,
		yearSuffix:''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});

function updateDeclation(){
	$('[data-decl]').each(function(){
		var elem=$(this);
		var expressions=elem.attr('data-decl').split(',');
		var parts=+elem.attr('data-decl-num');
		var result;
		var count=parts%100;
		if(count>=5&&count<=20){
			result=expressions['2'];
		}else{
			count=count%10;
			if(count==1){
				result=expressions['0'];
			}else if(count>=2&&count<=4){
				result=expressions['1'];
			}else{
				if(expressions['2']==undefined){
					result=expressions['1'];
				}else{
					result=expressions['2'];
				}
			}
		}
		elem.text(result);
	});
}
//function setCosts(){
//	var id,cost;
//	$('.l5-extra.selected-blocks .count-block input').each(function(){
//		id=$(this).attr('data-id');
//		cost= +$(this).attr('data-cost');
//		costs.extraServiceCosts[id]=cost;
//	});
//	$('.l6-dry-clean.selected-blocks .count-block input').each(function(){
//		id=$(this).attr('data-id');
//		cost= +$(this).attr('data-cost');
//		costs.dryCleanCost[id]=cost;
//	});
//}
/*имя ключа это id элемента*/
var today=new Date();

(function($){
	$.fn.tabs=function(){
		$(this).each(function(){
			var parent=$(this);
			var ind=0;
			if(parent.hasClass('inner-pa')){
				if(parent.attr('data-tab')!=undefined){
					ind=+parent.attr('data-tab');
				}
			}
			$(parent).find(".tab-item").not(":first").hide();
			$(parent).find(".tabs-head .tab").show().click(function(){
				ind=$(this).index();
				$(parent).find(".tabs-head .tab").removeClass("active").eq(ind).addClass("active");
				$(parent).find(".tab-item").hide().eq(ind).fadeIn();
				return false;
			}).eq(ind).addClass("active");
			$(parent).find(".tabs-head .tab.active").click();
		});
	};
})(jQuery);
(function($){
	$.fn.vha=function(){
		var e=$(this);
		e.removeAttr('style');
		var maxH=0;
		e.each(function(){
			var h=$(this).outerHeight();
			if(maxH<h){
				maxH=h;
			}
		});
		e.css('height',maxH);
	}
})(jQuery);

function closeAllWin(){
	$("div.close-layer,.select-box").removeClass("show open");
}
function closeUp(){
	$("div.close-layer").addClass("show");
}
/*POPUP start version 3*/
/*POPUP start*/
/*центрирование блока*/
function popupCenter(){
	var wh=Math.round($(window).height()/2);
	var box=$("div#popup ");
	var pop=$("div#popup .inner>*.show");
	box.find('.popup-clayer').removeAttr('style');
	scrollTopMain=$(document).scrollTop();
	//box.find('.popup-clayer').css({'height':$(pop).outerHeight(true),"overflow":"hidden"});
	if(pop.outerHeight()<wh*2){
		//$('#wrapper').css({'height':wh,"overflow":"hidden"});
		if($(box).is(":visible")){
			$(pop).css("margin-top",wh-($(pop).height()/2));
		}
	}else{

	}
}
var popupsTop;
/*открыть всп окно по указателю*/
function popupOpen(sel,type){
	$("div#popup").add(sel).addClass('show');
	if(type!=undefined){
		sel.find('*').removeClass('show');
		sel.find('[data-id='+type+']').addClass('show');
	}
	popupCenter();
	/*автоматическое скрытие*/
	if(sel.hasClass('autoclose')){
		setTimeout(popupClose,3000);
	}
	return false;
}
/*закрываем окно*/
function popupClose(){
	$("div#popup,div#popup .inner>*").removeClass('show');
	$('#wrapper').removeAttr('style');
	$(document).scrollTop(scrollTopMain);
	return false;
}
/*POPUP end*/
function toMonthName(num){
	return text.month[num-1];
}
function updateOutInfo(groupType,noRBar){
	var rSideOut=$('#r-side-out');
	switch(groupType){
		/*rooms and bathrooms*/
		case 1:
			var rooms=$('form.step1').find('input[name="rooms"]').attr('value');
			var bathrooms=$('form.step1').find('input[name="bathrooms"]').attr('value');
			rSideOut.find('.rooms-count-out .rooms').html(rooms);
			rSideOut.find('.rooms-count-out .rooms+[data-decl-num]').attr('data-decl-num',rooms);
			rSideOut.find('.rooms-count-out .bathrooms').html(bathrooms);
			rSideOut.find('.rooms-count-out .bathrooms+[data-decl-num]').attr('data-decl-num',bathrooms);
			updateDeclation();
			break;
		case 2:
			var value=$('#inp-clean-date').prop('value').split('-');
			var time=$('#inp-clean-time').attr('value');
			if((value[2]==undefined)||(value[1]==undefined)||(value[0]==undefined)){
				return false;
			}
			var out=value[2]+' '+toMonthName(+value[1])+' '+value[0]+' '+text.in+' '+time+':00';
			rSideOut.find('.date-clean-out').html(out);
			break;
		case 3:
			var value=+$('.l3-clean-period input').attr('value');
			var title=$('.l3-clean-period input').attr('data-title');
			var out=rSideOut.find('.out-clean-period').html(title);
			break;
		case 4:
			var value=+$('.l2-clean-type input').attr('value');
			var title=$('.l2-clean-type input').attr('data-title');
			var out=rSideOut.find('.out-clean-type').html(title);
			break;
	}
	countFullSum();
}
function updateOutInfo2(groupType){
	switch(groupType){
		/*rooms and bathrooms*/
		case 2:
			var value=$('#inp-clean-date2').prop('value').split('-');
			if((value[2]==undefined)||(value[1]==undefined)||(value[0]==undefined)){
				return false;
			}
			break;
	}
	countFullSum();
}
/********************************ACTIVATESELECT********************************/
function activateSelect(){
	$('.myselect').unbind('click').click(function(){
		$(this).toggleClass('open')
	});
	$('.myselect .myoptions span').unbind('click').click(function(){
		var selElem=$(this);
		var type=selElem.parents('.myselect').attr('data-type');
		selElem.parents('.add-events').find('.add-event-time').addClass('show');
		selElem.parents('.myselect').removeClass('open');
		selElem.parents('.myselect').find('span.current').text(selElem.text()).attr('data-value',selElem.attr('data-value'));
		selElem.parents('.myselect').find('input.out').attr('value',selElem.attr('data-value'));
		//на вывод
		if(selElem.parents('.myselect').find('input.out').hasClass('clean-time')){
			updateOutInfo(2);
		}
		return false;
	});
}
function activateSelect2(){
	$('.myselect.f2').unbind('click').click(function(){
		$(this).toggleClass('open')
	});
	$('.myselect.f2 .myoptions span').unbind('click').click(function(){
		var selElem=$(this);
		var type=selElem.parents('.myselect2').attr('data-type');
		selElem.parents('.add-event').find('.add-event-time').addClass('show');
		selElem.parents('.myselect').removeClass('open');
		selElem.parents('.myselect').find('span.current').text(selElem.text()).attr('data-value',selElem.attr('data-value'));
		selElem.parents('.myselect').find('input.out').attr('value',selElem.attr('data-value'));
		return false;
	});
}
/*обновление значений в скрытых*/
function checkSelectBlocks(){
	$('#r-side-out').find('.extra-out .x-line').remove();
	$('#r-side-out').find('.dry-clean-out .x-line').remove();
	var totalCost=0;
	var out='';
	$('.calc-page.main .selected-blocks').find('.count-block.active').each(function(){
		var box=$(this).parents('.selected-blocks');
		var input=$(this).find('input');
		var id=input.attr('data-id');
		var value=input.attr('value');
		var title=$(this).find('>p').text();
		var cost=0;
		var unit=input.attr('data-unit');
		totalCost=+totalCost+(+cost* +value);
		cost=costs.extraServiceCosts[id];
		cost=parseInt(cost);
		out+=id+':'+value+' ';
		//забиваем вывод
		if($('#r-side-out').length){
			if($(box).hasClass('l5-extra')){
				$('#r-side-out').find('.extra-out').append('<div class="x-line table"><span class="td">'+title+' </span>	<span class="td">'+(cost*parseInt(value))+' ��. </span></div>');
			}
			if($(box).hasClass('l6-dry-clean')){
				$('#r-side-out').find('.dry-clean-out').append('<div class="x-line table"><span class="td">'+title+' </span>	<span class="td">'+(cost*parseInt(value))+' ��. </span></div>');
			}
		}
		box.find('input.m-out').attr('value',out);
	});
	if(!$('.calc-page.main').length){
		$('.calc-page:not(.main) .selected-blocks').find('.count-block.active').each(function(){
			var box=$(this).parents('.selected-blocks');
			var input=$(this).find('input');
			var id=input.attr('data-id');
			var value=input.attr('value');
			if((value==undefined)||isNaN(value)){
value=1;
			}
			var title=$(this).find('>p').text();
			var cost=0;
			var unit=input.attr('data-unit');
			totalCost=+totalCost+(+cost* +value);
			cost=costs.extraServiceCosts[id];
			cost=parseInt(cost);
			out+=id+':'+value+' ';
			box.find('input.m-out').attr('value',out);
		});
		$("input#total-services").attr("value",out);
	}
	var discount=$("div.clean-period-radio div.radio.active").data("discount");
	var discountCost=totalCost-totalCost*discount/100;
	$("div.result-cost span.full").html("").html(totalCost);
	console.log(discountCost);
	$("div.result-cost span.real").html("").html(Math.round(discountCost));
	countFullSum();
}
//использовать при добавлении адресов
function changeMainAddressInit(){
	$('.pa-address-table .controls a').click(
			function(){
				var par=$(this).parents('div.table');
				var id=+par.attr('data-id');
				if($(this).hasClass('remove')){
					if(!par.hasClass('active')){
						//отправка запроса
						par.remove();
					}
				}
				if($(this).hasClass('to-main')){
					//отправка запроса
					if(!par.hasClass('active')){
						$('.pa-address-table .table').removeClass('active');
						par.addClass('active');
					}
				}
				return false;
			});
}

function countFullSum(){
	//получение данных
	var rooms=+$('input[name="rooms"]').attr('value');
	var bathrooms=+$('input[name="bathrooms"]').attr('value');
	var cleanType=+$('input[name="clean-type"]').attr('value');
	var cleanPeriod=+$('input[name="clean-period"]').attr('value');
	var extraService=$('input[name="extra"]').attr('value');
	if(extraService!=undefined&&extraService!=''&&extraService!=' '){
		extraService=extraService.split(' ');
	}
	var dryCleanService=$('input[name="dry-clean"]').attr('value');
	if(dryCleanService!=undefined&&dryCleanService!=''&&dryCleanService!=' '){
		dryCleanService=dryCleanService.split(' ');
	}
	//проверяем данные
	if(rooms==undefined||isNaN(rooms)||rooms===' '){
		return false;
	}else{
		if(bathrooms==undefined||isNaN(bathrooms)||bathrooms===' '){
			return false;
		}else{
			if(cleanType==undefined||isNaN(cleanType)||cleanType===' '){
				return false;
			}else{
				if(cleanPeriod==undefined||isNaN(cleanPeriod)||cleanPeriod===' '){
					return false;
				}
			}
		}
	}
	// расчет
	var discount=costs.cleanPeriodDiscount[cleanPeriod];
	var calcOut=costs.cleanTypeCost[cleanType]+(rooms-1)*costs.costByRoom[cleanType]
			+(bathrooms-1)*costs.costByBathroom[cleanType];
	$('.selected-blocks .count-block.active input').each(function(){
		var costNum=parseInt($(this).attr('value'));
		var id=$(this).attr('data-id');
		var box=$(this).parents('.selected-blocks');
		var costX=costs.extraServiceCosts[id];
		costX=parseInt(costX);
		if((costNum!=undefined)&&(costX!=undefined)){
			calcOut+=costX*costNum;
		}
	});
	var calcOut2=calcOut;
	if(discount>0){
		calcOut2=calcOut2-(calcOut2*discount/100);
	}
	//вывод
	if(calcOut!='undefined'&&calcOut2!='undefined'){
		$('#r-side-out .result-cost .real').html(Math.round(calcOut2));
		if(calcOut==calcOut2){
			$('#r-side-out .result-cost .full').html(' ');
		}else{
			$('#r-side-out .result-cost .full').html(Math.round(calcOut));
		}
		$('#cost-btn-out').html(Math.round(calcOut2));
	}
}


$(document).ready(function(){
	//setCosts();
	$('.moreinfo').unbind('click').click(function(){
		var id=+$(this).attr('data-id');
		popupClose();
		popupOpen($('#popup .pop-info'),id);
		return false;
	});
	activateSelect();
	//Close-layer
	$(".close-layer").unbind('click').click(closeAllWin);
	//select-box
	$(".select-box").each(function(){
		var selB=$(this);
		selB.find('span.cur').unbind('click').click(function(){
			var elem=$(this);
			if(selB.hasClass('open')){
				closeAllWin();
			}else{
				closeUp();
				selB.addClass('open');
			}
			return false;
		});
		selB.find('ul .tar').unbind('click').click(function(){
			closeAllWin();
			var elem=$(this);
			var id=elem.attr('data-id');
			var title=elem.text();
			selB.find('span.cur').text(title).attr('data-id',id);
			selB.find('input').attr('value',id);
			return false;
		});
	});
	//input number
	$('.input-num').each(function(){
		var box=$(this);
		var input=box.find('input[type="text"]');
		var outNum=box.find('.num-out');
		var outNum2=box.find('.num-out2');
		input=box.find('input');
		var unit=input.data("unit");

		box.find('span.up').unbind('click').click(function(e){
			var val=+parseInt($(this).siblings('input').attr('value'));
			input.attr('value',val+1);
			if(outNum.length){
				outNum.html(val+1);
			}
			if(outNum2.length){
				outNum2.attr('value',val+1);
			}
			box.find('[data-decl-num]').attr('data-decl-num',val+1);
			updateDeclation();
			//на вывод
			if(box.hasClass('c-inp-rooms')||box.hasClass('c-inp-bathrooms')){
				updateOutInfo(1);
			}
			checkSelectBlocks();
			return false;
		});
		box.find('span.down').unbind('click').click(function(){
			var val=+parseInt($(this).siblings('input').attr('value'));
			if(val>1){
				input.attr('value',val-1);
				if(outNum.length){
					outNum.html(val-1);
				}
				if(outNum2.length){
					outNum2.attr('value',val-1);
				}
				box.find('[data-decl-num]').attr('data-decl-num',val-1);
				updateDeclation();
			}
			//на вывод
			if(box.hasClass('c-inp-rooms')||box.hasClass('c-inp-bathrooms')){
				updateOutInfo(1);
			}
			checkSelectBlocks();
			return false;
		});
		box.find('input[type="text"]').keyup(function(){
			var val=Number($(this).prop('value'));
			if((val<=0)||(val=="undefined")||isNaN(val)){
				val=$(this).prop('value',1);
				box.find('[data-decl-num]').attr('data-decl-num',1);
				updateDeclation();
			}
		});
	});
	$('.tabs').tabs();
	$("a[href='#readfullinfo']").unbind('click').click(function(){
		var link=$(this).attr('href');
		$("html, body").animate({
			scrollTop:$(link).offset().top-80
		},1000);
		return false;
	});
	if($(".accordion").length){
		var line=$(".acc-line");
		$(this).find(line).each(function(){
			$(this).find(".acc-head").click(function(){
				$(this).parent().toggleClass("active");
				$(this).parent().find(".acc-content").slideToggle();
				return false;
			});
		});
	}
	/*popup start*/
	$('[data-popup]').unbind('click').on('click',function(e){
		var elem=$(this);
		elem.parents('form').trigger('reset');
		var switchSel=elem.attr('data-popup');
		var popup=$('.'+switchSel);
		if(switchSel=='inf-product'){
			var id=elem.attr('data-id');
			var clone=$('#hidden-materias [data-id='+id+']').children().clone();
			var outBox=$('#popup .inf-product .out-box');
			outBox.children().remove();
			outBox.append(clone);
		}
		if(switchSel=='pop-review'){
			var src=elem.find('img').attr('src');
			var name=elem.find('span.name').text();
			var desc=elem.find('p').text();
			var outBox=$('#popup .pop-review');
			outBox.find('img').attr('src',src);
			outBox.find('span.name').text(name);
			outBox.find('p').text(desc);
		}
		if(elem.hasClass("change")){
			//ToDo написать ajax-запрос на получение данных и отправку на сервер
			var id=elem.data("id");
			var type=elem.data("popup");
			var form="";
			if(type=="f-change-order1"){
				form=$("form.f-change-order1");
				$.ajax({
					method:"POST",
					url:"?getOrderInfo&type=1",
					data:"id="+id,
					cache:false,
					success:function(result){
						var res=result.split("||");
						if(res[0]=="OK"){
							form.find("input#order-id").attr("value",id);
							form.find("input#inp-clean-date2").attr("value",res[1]);
							form.find("input#inp-clean-time2").attr("value",res[2]);
							form.find("span.time-sel").attr("data-value",res[2]).html(res[2]+":00");
							popupOpen(form);
						}
					}
				});
			}
			if(type=="f-change-order2"){
				form=$("form.f-change-order2");
				$.ajax({
					method:"POST",
					url:"?getOrderInfo&type=2",
					data:"id="+id,
					cache:false,
					success:function(result){
						var res=result.split("||");
						if(res[0]=="OK"){
							form.find("input#order-id").attr("value",id);
							form.find("div.c-inp-rooms span.num-out").html("").html(+res[1]);
							form.find("input[name=\"rooms\"]").attr("value",+res[1]);
							form.find("div.c-inp-bathrooms span.num-out").html("").html(+res[2]);
							form.find("input[name=\"baths\"]").attr("value",+res[1]);
							form.find("div.clean-type-radio div.radio").removeClass("active");
							form.find("div.clean-type-radio div.radio").each(function(){
								var type=$(this);
								if(type.attr("data-title")==res[3]){
									type.addClass("active");
									if((type.attr("data-value")!='')&&(type.attr("data-value")!=undefined)){
										form.find("input[name=\"clean-type\"]").attr("value",+type.attr("data-value"));
									}else{
										form.find("input[name=\"clean-type\"]").attr("value",1);
									}
								}
							});
							form.find("div.clean-period-radio div.radio").removeClass("active");
							form.find("div.clean-period-radio div.radio").each(function(){
								var type=$(this);
								console.log(type.data("title")+" = "+res[4]);
								if(type.data("title")==res[4]){
									type.addClass("active");
									if((type.attr("data-value")!='')&&(type.attr("data-value")!=undefined)){
										form.find("input[name=\"clean-period\"]").attr("value",+type.attr("data-value"));
									}else{
										form.find("input[name=\"clean-period\"]").attr("value",1);
									}
								}
							});
							form.find("div.count-blocks-all").html("").html(res[5]);
							var box=form.find("div.count-blocks-all");
							box.find('.count-block').click(function(){
								var elem=$(this);
								//проверка активности
								if(elem.hasClass('active')){
									elem.removeClass('active');
								}else{
									elem.addClass('active');
								}
								checkSelectBlocks();
							});
							//где-то тут скопировал не то или не может найти то, что нужно
							$('.input-num').each(function(){
								var box=$(this);
								var input=box.find('input[type="text"]');
								input.attr('value',1);
								var outNum=box.find('.num-out');
								var outNum2=box.find('.num-out2');
								input=box.find('input');
								input.attr('value',1);
								var unit=input.data("unit");

								box.find('span.up').unbind('click').click(function(e){
									var val=+parseInt($(this).siblings('input').attr('value'));
									if((val==undefined)||(isNaN(val))){
										val=0;
									}
									input.attr('value',val+1);
									if(outNum.length){
										outNum.html(val+1);
									}
									if(outNum2.length){
										outNum2.attr('value',val+1);
									}
									box.find('[data-decl-num]').attr('data-decl-num',val+1);
									updateDeclation();
									//на вывод
									if(box.hasClass('c-inp-rooms')||box.hasClass('c-inp-bathrooms')){
										updateOutInfo(1);
									}
									checkSelectBlocks();
									return false;
								});
								box.find('span.down').unbind('click').click(function(){
									var val=+parseInt($(this).siblings('input').attr('value'));
									if((val==undefined)||(isNaN(val))){
										val=1;
									}
									if(val>1){
										input.attr('value',val-1);
										if(outNum.length){
											outNum.html(val-1);
										}
										if(outNum2.length){
											outNum2.attr('value',val-1);
										}
										box.find('[data-decl-num]').attr('data-decl-num',val-1);
										updateDeclation();
									}
									//на вывод
									if(box.hasClass('c-inp-rooms')||box.hasClass('c-inp-bathrooms')){
										updateOutInfo(1);
									}
									checkSelectBlocks();
									return false;
								});
								box.find('input[type="text"]').keyup(function(){
									var val=Number($(this).prop('value'));
									if((val<=0)||(val=="undefined")||isNaN(val)){
										val=$(this).prop('value',1);
										box.find('[data-decl-num]').attr('data-decl-num',1);
										updateDeclation();
									}
								});
							});
							popupOpen(form);
						}
					}
				});
			}
			if(type=="f-change-order3"){
				form=$("form.f-change-order3");
				$.ajax({
					method:"POST",
					url:"?getOrderInfo&type=3",
					data:"id="+id,
					cache:false,
					success:function(result){
						var res=result.split("||");
						if(res[0]=="OK"){
							form.find("input#order-id").attr("value",id);
							form.find("input#f-step2-street").attr("value",res[1]);
							form.find("input#f-step2-home").attr("value",res[2]);
							form.find("input#f-step2-apartment").attr("value",res[3]);
							form.find("input#f-step2-phone").attr("value",res[4]);
							popupOpen(form);
						}
					}
				});
			}
		}


		popupOpen(popup);
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$("div#popup .popup-clayer,div#popup a.popup-close").unbind('click').click(function(e){
		popupClose();
		return false;
	});
	/*popup end*/

	$('.radio-box').each(function(){
		var box=$(this);
		box.find('.radio').unbind('click').click(function(){
			if(box.hasClass('off')){
				return false;
			}
			var radioE=$(this);
			var value=radioE.attr('data-value');
			if(box.hasClass('clean-type-radio')){
				if(value==3){
					$('.clean-period-radio .radio[data-value="4"]').click();
					$('.clean-period-radio').addClass('off');
				}else{
					$('.clean-period-radio').removeClass('off');
				}
			}
			box.find('.radio').removeClass('active');
			radioE.addClass('active');
			var title=radioE.attr('data-title');
			box.find('input.out').attr('value',value).attr('data-title',title);
			//на вывод
			if(box.hasClass('clean-period-radio')){
				updateOutInfo(3);
			}
			if(box.hasClass('clean-type-radio')){
				updateOutInfo(4);
			}
		});
	});

	$('.datepicker').each(function(){
		$(this).datepicker({});
		var format='yy-mm-dd';
		//$(this).datepicker("setDate","dateFormat",format);
	});
	//на вывод
	$('#inp-clean-date').change(function(){
		updateOutInfo(2);
	});
	$('#inp-clean-date2').change(function(){
		updateOutInfo2(2);
	});
	//рабочие часы


	$('.selected-blocks').each(function(){
		var box=$(this);
		box.find('.count-block').click(function(){
			var elem=$(this);
			//проверка активности
			if(elem.hasClass('active')){
				elem.removeClass('active');
			}else{
				elem.addClass('active');
			}
			checkSelectBlocks();
		})
	});
	new Clipboard('.clipboard-btn');
	function updateOutEmails(){
		var outText='';
		$('#share-box').find('.line input').each(function(){
			outText+=$(this).val()+'|';
		});
		$('#f-step4-emails').attr('value',outText).prop('value',outText);
	}

	$('#share-box .main .plus').unbind('click').click(function(){
		$('#share-box').append(''+
		'<div class="line new">'+
		'<div class="input-box">'+
		'<input type="email" required="required"/>'+
		'<span class="minus"></span>'+
		'</div>'+
		'</div>');
		$('#share-box .line.new .minus').unbind('click').click(function(){
			$(this).parents('.line.new').remove();
		});
	});
	$('#f-step4,#f-share').submit(updateOutEmails);

	var mapShift=0;
	if($(document).width()>767){
		mapShift= -0.08;
	}

	var myMap;
	if($('#map').length){
		function init(){
			// Создание экземпляра карты и его привязка к созданному контейнеру.
			myMap=new ymaps.Map('map',{
				center:[43.27880830,( 76.95045050+mapShift)],zoom:12,behaviors:['default','scrollZoom'],controls:[]
			},{
				searchControlProvider:'yandex#search'
			});
			myMap.behaviors.disable('scrollZoom');
			var myPlacemarks=new ymaps.Placemark([43.27880830,76.95045050],{},{
				closeButton:false,
				hideIconOnBalloonOpen:false,
				iconImageHref:'/images/map-mark.png',
				iconImageSize:[64,100],
				iconImageOffset:[-32,-100],
				balloonShadow:false,
				balloonPanelMaxMapArea:0,
				iconLayout:'default#image'
			});
			//забираем значения из ссылки
			myMap.geoObjects.add(myPlacemarks);
		}

		ymaps.ready(init);
	}


	$('.rating span').click(function(){
		$(this).addClass('checked').siblings('span').removeClass('checked');
		var val=$(this).attr('data-value');
		$(this).siblings('input').attr('value',val);
		/*выводи окно*/
	});

	$('.rating-out').each(function(){
		var par=$(this);
		var child=par.children();
		if(!isNaN($(par).attr('data-checked'))){
			var num=5-(+$(par).attr('data-checked'));
			child.eq(num).addClass('checked');
		}
	});


	changeMainAddressInit();
	/*if($('.calc-page').length){
		$('.calc-page .radio.active').click();
		countFullSum();
	}*/

	$('.btn-open-cost').unbind('click').click(function(){
		$('#r-side-out').addClass('open');
		$(this).addClass('hide');
	});
	$('#r-side-out .close-it').unbind('click').click(function(){
		$('#r-side-out').removeClass('open');
		$('.btn-open-cost').removeClass('hide');
	});

	updateDeclation();
	//$("#product").mask("99/99/9999",{placeholder:" "});

	if($("input[data-mask]").length){
		$("input[data-mask]").each(function(){
			var mask=$(this).attr('data-mask');
			$(this).mask(mask);
			//$(this).mask("+7 (999) 999-99-99");
		});
	}

	$('.header .open-it').unbind('click').click(function(){
		var btn=$(this);
		if(btn.hasClass('active')){
			btn.removeClass('active');
			$('.header-desc').removeClass('show');
		}else{
			btn.addClass('active');
			$('.header-desc').addClass('show');

		}
	});
	//console.log(globalPrices);
	function fixedRightBar(){
		if($('#r-side-out').length){
			var elem=$('.two-sides div.r-side');
			var shiftTop=elem.offset().top;
			var curScroll=0;
			var blockH=elem.outerHeight();
			var maxscroll=$('.content').outerHeight()-blockH;
			var outScroll=0;
		}
		var header=$('.header.t2');
		var headerH=header.height();
		var sTop=0;
		$(document).resize(function(){
			if($('.calc-page').length){
				shiftTop=elem.offset().top;
			}
		});
		$(document).scroll(function(){
			sTop=$(document).scrollTop();
			if($('#r-side-out').length){
				if(curScroll>sTop){
					//up
					if(shiftTop<sTop){
						outScroll=sTop-80;
					}else{
						outScroll=0
					}
				}else{
					//down
					if(shiftTop<sTop){
						if(shiftTop==0){
							outScroll=sTop-120;
						}else{
							outScroll=sTop-120;
						}
					}else{
						outScroll=0
					}
				}
				if(outScroll>maxscroll){
					outScroll=maxscroll;
				}
				elem.css({
					'top':outScroll
				});
				curScroll=sTop;
			}
			if((sTop-headerH>0)&&(!header.hasClass('show'))){
				header.addClass('show');
			}else{
				if(sTop-headerH<0){
					header.removeClass('show');
				}
			}
		});
	}


	fixedRightBar();

	$("a.add-review").unbind("click").on("click",function(){
		var id=$(this).data("id");
		$.ajax({
			method:"POST",
			url:"?getMemberInfo",
			data:"id="+id,
			cache:false,
			success:function(result){
				var res=result.split("||");
				if(res[0]=="OK"){
					$("div.img.t1 img").attr("src","/i/Members/"+id+"_rp.jpg");
					$("p.fio strong").html(res[1]);
					$("input[name=\"master\"]").attr("value",id);
					popupOpen($("form#f-pop-review"));
				}
			}
		});
		return false;
	});
	$("form#f-pop-review").submit(function(){
		var form=$(this);
		$.ajax({
			method:"POST",
			cache:false,
			url:form.attr("action"),
			data:form.serialize(),
			success:function(result){
				if(result=="OK"){
					$("div.popup-message h4").remove();
					$("div.popup-message p").text("").text("Спасибо, Ваш отзыв будет рассмотрен нами в ближайшее время");
					popupOpen($("div.popup-message"));
					setTimeout(function(){
						popupClose($("div.popup-message"));
					},5000);
				}
			}
		});
		return false;
	});
	$('#select-e-time').each(function(){
		var box=$(this);
		var def=+box.attr('data-def');
		var period=box.attr('data-period').split(':');
		for(var i=+period[0]; i<= +period[1]; i++){
			box.find('.myoptions').append('<span data-value='+i+'>'+i+':00</span>');
		}
		$('#select-e-time span.time-sel').attr('data-value',def).html(def+':00');
		$('#inp-clean-time').attr('value',def);
		activateSelect();
		box.find('.myoptions span[data-value='+def+']').click();
	});
	$('.vha').each(function(){
		$(this).children().vha();
	});

	if($('div.m1-intro').length){
		if(window.innerHeight>560){
			$('div.m1-intro').css('height',window.innerHeight);
		}
	}
	$(window).resize(function(){
		if(window.innerHeight>560){
			$('div.m1-intro').css('height',window.innerHeight);
		}
	});

	//обработчики изменения заказа
	$('#select-e-time2').each(function(){
		var box=$(this);
		var def=+box.attr('data-def');
		var period=box.attr('data-period').split(':');
		for(var i=+period[0]; i<= +period[1]; i++){
			box.find('.myoptions').append('<span data-value='+i+'>'+i+':00</span>');
		}
		$('#select-e-time2 span.time-sel').attr('data-value',def).html(def+':00');
		$('#inp-clean-time2').attr('value',def);
		activateSelect2();
	});
	//check coupon
	if($("a#set-coupon").length){
		var id=$("a#set-coupon").data("id");
		//что подставить сюда вместо атрибута и св-ва, как сериализовать одно только поле?
		var coupon=$("input#f-step3-coupon").prop("value");
		var message=$("p#coupon-message");
		$("a#set-coupon").unbind("click").on("click",function(){
			$.ajax({
				method:"POST",
				cache:false,
				data:"id="+id+"&coupon="+coupon+"",
				url:"?checkCoupon&ajax",
				success:function(response){
					var result=response.split("||");
					if(result[0]=="ERROR"){
						message.text(result[1]).addClass("error");
					}else if(result[0]=="SUCCESS"){
						message.text(result[1]).addClass("success");
						$("div.result-cost span.real").text("").text(message[2]);
					}
					setTimeout(function(){
						message.removeClass().text("");
					},3000)
				}
			});
			return false;
		});
	}
	//change city
	$("form#change-city, form#change-city-mobile").each(function(){
		var city=$(this).find("select option:selected").attr("value");
		if(city==2){
			$("select#f-step2-city option[value=2]").prop("selected",true);
		}
	});
	$("form#change-city, form#change-city-mobile").change(function(){
		var city=$(this).find("select option:selected").attr("value");
		var date=new Date(new Date().getTime()+7*24*60*60*1000);
		if(city==2){
			document.cookie="astana=1; path=/; expires="+date.toUTCString();
			document.location="http://www.wowservice.kz/astana/";
		}else{
			document.cookie="astana=0; path=/; expires="+date.toUTCString();
			document.location="http://www.wowservice.kz/";
		}
	});
});
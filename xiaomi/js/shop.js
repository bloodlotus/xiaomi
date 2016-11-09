$(function(){
	
	
	var str = $.cookie("goods");
	var arr = eval(str);
	
	
	$.ajax({
		url: "../json/water.json",
		type: "GET",
		success: function(chat){
			for(var i = 0; i < arr.length; i++){
			var id = arr[i].id;
			var num = arr[i].num;
			
			$(".cart_con").append("<div class = 'trade' id = "+chat[id].id+"><div class = 'tr1'><input type = 'checkbox'></div><div class = 'tr2'><img src = "+ chat[id].imgb +"></div><div class = 'tr3'>"+ chat[id].namea + " " + chat[id].editiona + "</div><div class = 'tr4'>"+chat[id].price+"</div><div class = 'tr5' id = "+chat[id].id+"><span class = 'span_left'>" + "-" + "</span><p>" + num + "</p><span class = 'span_right'>"+ "+" +"</span></div><div class = 'tr6'>"+ parseInt(chat[id].price) * num +"元起"+"</div><div class = 'tr7'>×</div></div>");
			
			}
			
			//显示几件
			var n = arr.length;
			$(".span_a").html(n);
			
			//小添加
			$(".span_right").click(function(){
				var sum = $(this).parent().attr("id");
				newAdd(sum);
			});
				
			//小减少
			$(".span_left").click(function(){
				var sum = $(this).parent().attr("id");
				newLow(sum);
			});
				
			//大删除
			$(".tr7").click(function(){
				var sum =$(this).parent().find(".tr5").attr("id");
				 n = $(".span_a").html();
				Remove(sum, n);
			});
			
			
			
			
			
			
			
			
			
			//删除函数
			function Remove(sum, n){
				var sc_str = $.cookie("goods");
				if(sc_str){
					var sc_arr = eval(sc_str);
					for(var i in sc_arr){
						if(sc_arr[i].id == sum){
							sc_arr.splice(i, 1);
							var cookieStr = JSON.stringify(sc_arr);
							$.cookie("goods", cookieStr, {expires: 7});
							$(".trade[id='"+sum+"']").remove();
							n--;
							$(".span_a").html(n);
						}
					}
					
				}
			}
			
			
			
			//添加函数	
			function newAdd(sum){
				var sc_str = $.cookie("goods");
				if(sc_str){
				var sc_arr = eval(sc_str);
				var sc_num = 0; //累加
				for(var i in sc_arr){
					if(sc_arr[i].id == sum){
						sc_arr[i].num++;
						for (var j = 0; j < chat.length; j++) {
							if(chat[j].id == sum){
								$(".trade[id='"+sum+"']").find(".tr6").html(parseInt(chat[j].price) * sc_arr[i].num + "元起");
								
							}
						}
						var cookieStr = JSON.stringify(sc_arr);
						$.cookie("goods", cookieStr, {expires: 7});
						$(".trade[id='"+sum+"']").find(".tr5 p").html(sc_arr[i].num);
						}
					}
				}
			}
				
			//减少函数
			function newLow(sum){
				var sc_str = $.cookie("goods");
				if(sc_str){
				var sc_arr = eval(sc_str);
				var sc_num = 0; //累加
				for(var i in sc_arr){
					if(sc_arr[i].id == sum){
						sc_arr[i].num--;
						
						for(var j = 0; j < chat.length; j++){
							if(chat[j].id == sum){
						if(sc_arr[i].num < 1){
							sc_arr[i].num = 1;
							var cookieStr = JSON.stringify(sc_arr);
							$.cookie("goods", cookieStr, {expires: 7});
							$(".trade[id='"+sum+"']").find(".tr5 p").html(sc_arr[i].num);
						}else{
							var cookieStr = JSON.stringify(sc_arr);
							$.cookie("goods", cookieStr, {expires: 7});
							$(".trade[id='"+sum+"']").find(".tr5 p").html(sc_arr[i].num);
							}
						
						$(".trade[id='"+sum+"']").find(".tr6").html(parseInt(chat[j].price) * sc_arr[i].num + "元起");
						}
						
						}
						
						
						}
					}
				}
			}
				
			
		}
	});
	
	
})

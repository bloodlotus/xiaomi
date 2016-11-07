$(function(){
	//获取id值
	var id = location.search.substr(1).split("=")[1];
	
	//加载商品数据
	$.ajax({
		url: "../json/water.json",
		type: 'GET',
		success: function(good){
			$(".good_left").append("<img src = " + good[id].imgb + ">");
			$(".good_da").append("<img src = " + good[id].imgb + ">");
			$(".right_title").append("<span> " + good[id].nameb + " </span><span class = 'span_tit'>" + good[id].price + "</sapn>");
			$(".con_a").append("<span>" + good[id].explain + "</span>");
			$(".con_b ul").append("<li>" + good[id].editiona + "</li><li>" + good[id].editionb + "</li>");
			$(".con_d ul").append("<li>" + good[id].colora + "</li><li>"+ good[id].colorb +"</li>");
			$(".result").append("<p>" + good[id].namea + " " + good[id].editiona + "</p>");
			$(".good_right").append("<div class = 'good_btn' id = " + good[id].id + ">加入购物车</div>");
			
			//变色
			$(".good_btn").hover(function(){
				$(this).css("background", "#FF6700");
				$(this).css("color", "white");
			},function(){
				$(this).css("background", "white");
				$(this).css("color", "#FF6700");
			});
			
			//放大镜
			var Xiao = document.getElementsByClassName("good_xiao")[0];
			var Da = document.getElementsByClassName("good_da")[0];
			var Mark = document.getElementsByClassName("good_mark")[0];
			var Box = document.getElementsByClassName("good_left")[0];
			var Right =  document.getElementsByClassName("good_bg")[0];
			Mark.onmouseover = function(){
				Xiao.style.display = "block";
				Right.style.display = "block";
			}
			Mark.onmouseout = function(){
				Xiao.style.display = "none";
				Right.style.display = "none";
			}
			Mark.onmousemove = function(event){
				var evt = event || window.event;
				var left = evt.offsetX - Xiao.offsetWidth/2;
				var top = evt.offsetY - Xiao.offsetHeight/2;
				
				if(left < 0){
					left = 0;
				}else if(left > Box.offsetWidth - Xiao.offsetWidth){
					left = Box.offsetWidth - Xiao.offsetWidth;
				}
				Xiao.style.left = left + "px";
				
				if(top < 0){
					top = 0;
				}else if(top > Box.offsetHeight - Xiao.offsetHeight){
					top =  Box.offsetHeight - Xiao.offsetHeight;
				}
				Xiao.style.top = top + "px";
				
				var scaleX = left/(Box.offsetWidth - Xiao.offsetWidth);
				var scaleY = top/(Box.offsetHeight - Xiao.offsetHeight);
				
				Da.style.left = -scaleX * (Da.offsetWidth - Right.offsetWidth) + "px";
				Da.style.top = -scaleY * (Da.offsetHeight - Right.offsetHeight) + "px";
			}
			
			
			
			
			
			
		}
	});
})


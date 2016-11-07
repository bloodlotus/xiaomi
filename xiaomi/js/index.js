$(function(){
	//点亮topnav
	$(".topnav-left").find("a").hover(function(){
		$(this).css("color", "white");
	}, function(){
		$(this).css("color", "#B0B0B0");
	});
	
	$(".topnav-middle").find("a").hover(function(){
		$(this).css("color", "white");
	}, function(){
		$(this).css("color", "#B0B0B0");
	});
	
	//购物小图
	$(".topnav-right").hover(function(){
		$(".shop-cat").css("display", "block");
		$(this).css("background", "white");
		$(this).find("a").css("color", "orange");
		$(this).find("span").css("color", "orange");
		$(this).find(".img").attr("src", "img/home/smallpic/1_021.jpg");
	}, function(){
		$(".shop-cat").css("display", "none");
		$(this).css("background", "#424242");
		$(this).find("a").css("color", "#B0B0B0");
		$(this).find("span").css("color", "#B0B0B0");
		$(this).find(".img").attr("src", "img/home/smallpic/1_02.jpg");
	});
	
	//动感导航条
	$.ajax({
		url: "json/daohang.json",
		type: "GET",
		success: function(data){
			for(var i = 0; i < data.length; i++){
				$(".navul").append("<li class = 'navtou'><a href = '#' class = 'navtitle'>" + data[i].title + "</a><div class = 'nav_child'></div></li>");
				for(var j = 0; j < data[i].child.length; j++){
					$(".navul").find(".nav_child").eq(i).append("<li class = 'li_child'><div class = 'nav_bao'><img src= " + data[i].child[j].img + " /><div><p class = 'nav_p1'>" + data[i].child[j].title + "</p><p class='nav_p2'>" + data[i].child[j].price + "</div></div></li>");
				}
			}
			$(".navul").find(".navtou").hover(function(){
				$(this).find("a").css("color", "orange");
				if($(this).index() == 7 || $(this).index() == 8){
				}else{
					$(".nav_child").css("border-top", "1px solid #EEEEEE");
					$(".nav_child").eq($(this).index()).stop().animate({height: 204});
				}
			},function(){
				$(this).find("a").css("color", "black");
				$(".nav_child").eq($(this).index()).stop().animate({height: 0}, function(){
					$(".nav_child").css("border-top", "0");
				});
			});
		}
	});
	
	//轮播图
	$.ajax({
		url: "json/lunbo.json",
		type: "GET",
		success: function(roll){
			var html = "";
			for(var i = 0; i < roll.length; i++){
				$(".trun .lun_ul").append("<li class = 'li_lun'><a href = '#'><img src = "+ roll[i].img +" class = 'img_lun'/></li>");
			}
			
			var aBtn = $(".trun").find("ol").find("li");
			var oUl = $(".trun").find("ul");
			var Img = oUl.find(".img_lun");
			
			var iNow = 0;
			var timer = 0;
			aBtn.click(function(){
				iNow = $(this).index();
				tab();
			})
			Img.eq(0).css("opacity", "1");
			timer = setInterval(timerInner, 5000);
			
			function timerInner(){
				iNow++;
				iNow %= aBtn.size();
				tab();
			}
			
			Img.hover(function(){
				clearInterval(timer);
			},function(){
				clearInterval(timer);
				timer = setInterval(timerInner, 5000);
			})
			
			function tab(){
				aBtn.attr("class", "");
				aBtn.eq(iNow).attr("class", "active");
				Img.css("opacity", "0");
				Img.eq(iNow).css("opacity", "1")
				if(iNow == aBtn.size()){
					Img.eq(0).css("opacity", "1");
				}
			}
			function tabb(iNow){
				aBtn.attr("class", "");
				aBtn.eq(iNow).attr("class", "active");
				Img.css("opacity", "0");
				Img.eq(iNow).css("opacity", "1")
				if(iNow == aBtn.size()){
					Img.eq(0).css("opacity", "1");
				}
			}
			//大于小于
			
			$(".left").hover(function(){
				var num = iNow;
				$(this).css("color", "white").css("background", "#666666");
				clearInterval(timer);
				$(this).click(function(){
					num--;
					if(num < 0){
						num = aBtn.size()-1;
						tabb(num);
					}else{
						tabb(num);
					}
				})
			},function(){
				$(this).css("color" , "#EEEEEE").css("background", "");
				clearInterval(timer);
				timer = setInterval(timerInner, 5000);
			})
			
			$(".right").hover(function(){
				var nmm = iNow;
				$(this).css("color", "white").css("background", "#666666");
				clearInterval(timer);
				
				
				$(this).click(function(){
					nmm++;
					if(nmm > 4){
						nmm = 0;
						tabb(nmm);
					}else{
						tabb(nmm);
					}
				})
			},function(){
				$(this).css("color" , "#D5D6D6").css("background", "");
				clearInterval(timer);
				timer = setInterval(timerInner, 5000);
			})
		}
	});
	
	//右边栏
	$.ajax({
		url: "json/sidebar.json",
		type: "GET",
		success: function(side){
			for(var i = 0; i < side.length; i++){
				$(".sidebar .side_ul").append("<li class = 'side_li'><div class = 'side_left'>" + side[i].title + "</div><span>" + side[i].dayu + "</span><div class = 'side_div'></div></li>");
				
				for(var j = 0; j < side[i].child.length; j++){
					$(".side_div").eq(i).append("<li class = 'img_li'><img src = " + side[i].child[j].img + "><p class = 'img_p'>" +side[i].child[j].title + "</p></li>");
					if(side[i].child[j].button == "true"){
						$(".side_div").eq(i).find(".img_li").eq(j).append("<a>选购</a>");
					}
				}
			}
			
			$(".sidebar .side_ul").find(".side_li").hover(function(){
				$(this).css("background", "red");
				$(".side_div").eq($(this).index()).stop().animate({width : 300});
			},function(){
				$(this).css("background", "black");
				$(".side_div").eq($(this).index()).stop().animate({width : 0});
			});
			
			$(".side_div").find(".img_p").hover(function(){
				$(this).css("color", "orange");
			},function(){
				$(this).css("color", "black");
			});
			
			$(".side_div").find("a").hover(function(){
				$(this).css("background", "orange").css("color", "#FFFFFF");
			},function(){
				$(this).css("background", "#FFFFFF").css("color", "orange");;
			});
			
			//链接
			$(".sidebar .side_ul").find(".side_li").eq(0).click(function(){
				window.open("html/waterfall.html");
			})
		}
	});
	
	//小图标左
	$.ajax({
		url: "json/xiaotu.json",
		type: "GET",
		success: function(samllpic){
			for(var i = 0; i < samllpic.length; i++){
				if(i < 3){
					$(".adleftshang ul").append("<li><div class = 'samll_shang'><img src = "+ samllpic[i].img+"><p>"+ samllpic[i].title +"</p></div></li>");
				}else{
					$(".adleftxia ul").append("<li><div class = 'samll_xia'><img src = "+ samllpic[i].img+"><p>"+ samllpic[i].title +"</p></div></li>");
				}
			}
			$(".adleftshang ul").find("li").find(".samll_shang").hover(function(){
				$(this).find("p").eq($(this).index()).css("color", "#FFFFFF");
			},function(){
				$(this).find("p").eq($(this).index()).css("color", "#E0DEDD");
			});
			
			$(".adleftxia ul").find("li").find(".samll_xia").hover(function(){
				$(this).find("p").eq($(this).index()).css("color", "#FFFFFF");
			},function(){
				$(this).find("p").eq($(this).index()).css("color", "#E0DEDD");
			});
		}
	});
	
	//小图标右
	$.ajax({
		url: "json/shop.json",
		type: "GET",
		success: function(shop){
			for(var i = 0; i < shop.length; i++){
				$(".adright ul").append("<li><img src = " + shop[i].img + "></li>");
			}
			$(".adright ul").find("li").hover(function(){
				$(this).stop().animate({top: 5});
				$(this).css("box-shadow", "2px 2px 2px #888888");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
		}
	});
	
	//小米明星单品
	$.ajax({
		url: "json/daoliu.json",
		type: "GET",
		success: function(dao){
/**/			for(var i = 0; i < dao.length; i++){
			$(".star_bd ul").append("<li><div class = 'dao_div'><img src = "+ dao[i].img +"><h3>"+ dao[i].title +"</h3><p class = 'dao_t'>"+ dao[i].trait +"</p><p class = 'dao_p'>"+ dao[i].price+"</p></div></li>");
			}
			
			$(".starda").hover(function(){
				clearInterval(timea);
				$(".starda").click(function(){
					$(".star_bd ul").stop().animate({left: -1226});
				});
			},function(){
				clearInterval(timea);
				timea = setInterval(timerInner, 1000);
			});
			
			$(".starxiao").hover(function(){
				clearInterval(timea);
				$(".starxiao").click(function(){
					$(".star_bd ul").stop().animate({left: 0});
				});
			},function(){
				clearInterval(timea);
				timea = setInterval(timerInner, 1000);
			});
			
			
			var timea = 0;
		 	timea = setInterval(timerInner, 1000);
		 	$(".starxiao").css("color", "black");
			function timerInner(){
				$(".star_bd ul").delay(6000).animate({left: -1226},
				function(){
					$(".starda").css("color", "black");
					$(".starxiao").css("color", "#AFB2BB");
				}).delay(7000).animate({left: 0},
				function(){
					$(".starda").css("color", "#AFB2BB");
					$(".starxiao").css("color", "black");
				});
			}
		}
	});
	
	//智能硬件
	$.ajax({
		url: "json/yingjian.json",
		type: "GET",
		success: function(hard){
			for(var k = 0; k < hard.length; k++){
				if(k == 0){
					$(".shop_left ul").append("<li><img src = " + hard[k].img + "></li>");
				}else{
					$(".shop_right ul").append("<li><p class = 'p_sub'>"+ hard[k].subtitle+"</p><img src = " + hard[k].img + "><p class = 'p_tit'>"+ hard[k].title +"</p><p class = 'p_exp'>"+ hard[k].explain +"</p><span class = 's_sal'>" + hard[k].saleprice + "</span><span class = 's_pr'>"+ hard[k].price +"</span></li>");
				}
			}
			$(".hard_right a").hover(function(){
				$(this).css("color", "orange");
			},function(){
				$(this).css("color", "black")
			});
			
			$(".p_sub").eq(4).css("background", "white");
			$(".p_sub").eq(5).css("background", "white");
			$(".p_sub").eq(6).css("background", "orange");
			$(".p_sub").eq(7).css("background", "orange");
			
			$(".shop_left ul").find("li").hover(function(){
				$(this).animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
			$(".shop_right ul").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
		}
	});
	
	//搭配
	$(".mat_left ul").find("li").hover(function(){
		$(this).stop().animate({top: -3});
		$(this).css("box-shadow", "2px 2px 2px #999999");
	},function(){
		$(this).stop().animate({top: 0});
		$(this).css("box-shadow", "");
	});
	
	//加载
	$.ajax({
		url: "json/dapei.json",
		type: "GET",
		success: function(ma){
			for(var i = 0; i < ma.length; i++){
				$(".match_right ul").append("<li class = 'match_all'><span>" + ma[i].title + "</span><div class = 'mat_right'></div></li>");
				for(var j = 0; j < ma[i].child.length; j++){
					$(".mat_right").eq(i).append("<li><p class = 'ma_sub'>" + ma[i].child[j].subtitle + "</p><img src = "+ ma[i].child[j].img +"><p class = 'ma_tit'>" + ma[i].child[j].title + "<p><p class = 'ma_pre'>" + ma[i].child[j].price + "</p><p class = 'ma_eva'>" + ma[i].child[j].evaluate + "</p><div class = 'ma_ping'><p class='ping_a'>" + ma[i].child[j].appraise + "</p><p class = 'ping_b'>" + ma[i].child[j].estimate + "</p></div></li>")
				}
			}
			
			//做最小的2个div
			$(".mat_right").eq(0).append("<div class = 'mat_two'><div class = 'two_a'></div><div class = 'two_b'></div></div>");
			$(".two_a").eq(0).append("<p class = 'two_aa'>"+ " 小钢炮蓝牙音箱 " +"</p><a class = 'two_pp'>"+"99元"+"</a><img src = "+ " img/home/match/ma8.jpg" +">");
			
			$(".two_b").eq(0).append("<p class = 'two_cc'>"+ " 浏览更多 " +"</p><a class = 'two_dd'>"+"热门"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			
			$(".mat_right").eq(1).append("<div class = 'mat_two'><div class = 'two_a'></div><div class = 'two_b'></div></div>");
			$(".two_a").eq(1).append("<p class = 'two_aa'>"+ " 车载睿米蓝牙 " +"</p><a class = 'two_pp'>"+"59元"+"</a><img src = "+ " img/home/match/ma16.jpg" +">");
			
			$(".two_b").eq(1).append("<p class = 'two_cc'>"+ " 浏览更多 " +"</p><a class = 'two_dd'>"+"耳机音箱"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			//去效果
			$(".mat_right").eq(1).find(".ma_sub").css("background", "white");
			$(".mat_right").eq(0).css("display", "block");
			$(".ma_sub").eq(1).css("background", "white");
			$(".ma_sub").eq(2).css("background", "white");
			$(".ma_sub").eq(5).css("background", "white");
			$(".ma_sub").eq(6).css("background", "white");
			
			//滑动效果
			$(".match_right ul").find(".match_all").hover(function(){
				$(".match_right ul").find(".mat_right").css("display", "none");
				$(this).find(".mat_right").css("display", "block");
				$(this).css("border-bottom", "2px solid orange");
				$(this).find("span").css("color", "orange");
			},function(){
				$(this).css("border-bottom", "0");
				$(this).find("span").css("color", "black");
			});
			
			
			//浮动效果 评价框
			$(".mat_right").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
				$(this).find(".ma_ping").animate({top: 220, opacity: 1});
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
				$(this).find(".ma_ping").animate({top: 300, opacity: 0});
			});
			
			$(".two_a").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
			$(".two_b").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
		}
	});
	
	
	//配件
	
	$(".par_left ul").find("li").hover(function(){
		$(this).stop().animate({top: -3});
		$(this).css("box-shadow", "2px 2px 2px #999999");
	},function(){
		$(this).stop().animate({top: 0});
		$(this).css("box-shadow", "");
	});
	
	
	
	$.ajax({
		url: "json/parts.json",
		type: "GET",
		success: function(par){
			for(var i = 0; i < par.length; i++){
				$(".parts_right ul").append("<li class = 'parts_all'><span>" + par[i].title + "</span><div class = 'par_right'></div></li>");
				for(var j = 0; j < par[i].child.length; j++){
					$(".par_right").eq(i).append("<li><p class = 'pa_sub'>" + par[i].child[j].subtitle + "</p><img src = "+ par[i].child[j].img +"><p class = 'pa_tit'>" + par[i].child[j].title + "<p><p class = 'pa_pre'>" + par[i].child[j].price + "</p><p class = 'pa_eva'>" + par[i].child[j].evaluate + "</p><div class = 'pa_ping'><p class='pin_a'>" + par[i].child[j].appraise + "</p><p class = 'pin_b'>" + par[i].child[j].estimate + "</p></div></li>")
				}
			}
			
			//做最小的2个div
			$(".par_right").eq(0).append("<div class = 'par_two'><div class = 'the_a'></div><div class = 'the_b'></div></div>");
			$(".the_a").eq(0).append("<p class = 'the_aa'>"+ " 小米5 智能翻盖 " +"</p><a class = 'the_pp'>"+"49元"+"</a><img src = "+ " img/home/parts/s8.jpg" +">");
			
			$(".the_b").eq(0).append("<p class = 'the_cc'>"+ " 浏览更多 " +"</p><a class = 'the_dd'>"+"热门"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			
			$(".par_right").eq(1).append("<div class = 'par_two'><div class = 'the_a'></div><div class = 'the_b'></div></div>");
			$(".the_a").eq(1).append("<p class = 'two_aa'>"+ " 平板2保护套 " +"</p><a class = 'two_pp'>"+"69元"+"</a><img src = "+ " img/home/parts/s16.jpg" +">");
			
			$(".the_b").eq(1).append("<p class = 'the_cc'>"+ " 浏览更多 " +"</p><a class = 'the_dd'>"+"保护套"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			//去效果
			$(".par_right").eq(1).find(".pa_sub").css("background", "white");
			$(".par_right").eq(0).css("display", "block");
			$(".pa_sub").eq(1).css("background", "white");
			$(".pa_sub").eq(2).css("background", "white");
			$(".pa_sub").eq(3).css("background", "white");
			$(".pa_sub").eq(4).css("background", "white");
			$(".pa_sub").eq(5).css("background", "white");
			$(".pa_sub").eq(6).css("background", "white");
			
			//滑动效果
			$(".parts_right ul").find(".parts_all").hover(function(){
				$(".parts_right ul").find(".par_right").css("display", "none");
				$(this).find(".par_right").css("display", "block");
				$(this).css("border-bottom", "2px solid orange");
				$(this).find("span").css("color", "orange");
			},function(){
				$(this).css("border-bottom", "0");
				$(this).find("span").css("color", "black");
			});
			
			
			//浮动效果 评价框
			$(".par_right").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
				$(this).find(".pa_ping").animate({top: 220, opacity: 1});
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
				$(this).find(".pa_ping").animate({top: 300, opacity: 0});
			});
			
			$(".the_a").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
			$(".the_b").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
		}
	});
	
	
	//周边
	$(".ri_left ul").find("li").hover(function(){
		$(this).stop().animate({top: -3});
		$(this).css("box-shadow", "2px 2px 2px #999999");
	},function(){
		$(this).stop().animate({top: 0});
		$(this).css("box-shadow", "");
	});
	
	
	$.ajax({
		url: "json/zhoubian.json",
		type: "GET",
		success: function(rim){
			for(var i = 0; i < rim.length; i++){
				$(".rim_right ul").append("<li class = 'rim_all'><span>" + rim[i].title + "</span><div class = 'ri_right'></div></li>");
				for(var j = 0; j < rim[i].child.length; j++){
					$(".ri_right").eq(i).append("<li><p class = 'ri_sub'>" + rim[i].child[j].subtitle + "</p><img src = "+ rim[i].child[j].img +"><p class = 'ri_tit'>" + rim[i].child[j].title + "<p><p class = 'ri_pre'>" + rim[i].child[j].price + "</p><p class = 'ri_eva'>" + rim[i].child[j].evaluate + "</p><div class = 'ri_ping'><p class='r_a'>" + rim[i].child[j].appraise + "</p><p class = 'r_b'>" + rim[i].child[j].estimate + "</p></div></li>")
				}
			}
			
			//做最小的2个div
			$(".ri_right").eq(0).append("<div class = 'ri_two'><div class = 'san_a'></div><div class = 'san_b'></div></div>");
			$(".san_a").eq(0).append("<p class = 'san_aa'>"+ " 变形金刚特别版 " +"</p><a class = 'san_pp'>"+"169元"+"</a><img src = "+ " img/home/rim/r8.jpg" +">");
			
			$(".san_b").eq(0).append("<p class = 'san_cc'>"+ " 浏览更多 " +"</p><a class = 'san_dd'>"+"热门"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			
			$(".ri_right").eq(1).append("<div class = 'ri_two'><div class = 'san_a'></div><div class = 'san_b'></div></div>");
			$(".san_a").eq(1).append("<p class = 'san_aa'>"+ " 小米短袖T恤  " +"</p><a class = 'san_pp'>"+"69元"+"</a><img src = "+ " img/home/rim/r16.jpg" +">");
			
			$(".san_b").eq(1).append("<p class = 'san_cc'>"+ " 浏览更多 " +"</p><a class = 'san_dd'>"+"服装"+"</a><img src = "+ " img/home/smallpic/1_15.jpg" +">");
			
			//去效果
			$(".ri_right").eq(1).find(".ri_sub").eq(5).css("background", "white");
			$(".ri_right").eq(1).find(".ri_sub").eq(6).css("background", "white");
			$(".ri_right").eq(0).css("display", "block");
			$(".ri_sub").eq(4).css("background", "white");
			$(".ri_sub").eq(6).css("background", "white");
			
			//滑动效果
			$(".rim_right ul").find(".rim_all").hover(function(){
				$(".rim_right ul").find(".ri_right").css("display", "none");
				$(this).find(".ri_right").css("display", "block");
				$(this).css("border-bottom", "2px solid orange");
				$(this).find("span").css("color", "orange");
			},function(){
				$(this).css("border-bottom", "0");
				$(this).find("span").css("color", "black");
			});
			
			
			//浮动效果 评价框
			$(".ri_right").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
				$(this).find(".ri_ping").animate({top: 220, opacity: 1});
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
				$(this).find(".ri_ping").animate({top: 300, opacity: 0});
			});
			
			$(".san_a").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
			$(".san_b").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
			
		}
	});
	
	
	//为你推荐
	$.ajax({
		url: "json/recommend.json",
		type: "GET",
		success: function(recom){
			for(var i = 0; i < recom.length; i++){
				$(".recomm_con ul").append("<li><img src = " + recom[i].img + "><p class = 'recom_tit'>" + recom[i].title + "</p><p class = 'recom_pr'>" + recom[i].price + "</p><p class = 'recom_eva'>" + recom[i].evaluate + "</p></li>")
			}
			
			//移动
			$(".recomm_xiao").click(function(){
				$(".recomm_con ul").animate({left: 0});
				
			});
			
			$(".recomm_da").click(function(){
				$(".recomm_con ul").animate({left: -1226});
			});
		}
	});
	
	//热评产品
	$.ajax({
		url: "json/product.json",
		type: "GET",
		success: function(prod){
			for(var i = 0; i < prod.length; i++){
				$(".prod_con ul").append("<li><img src = " + prod[i].img + "><p class = 'prod_tit'>" + prod[i].title + "</p><p class = 'prod_eva'>" +prod[i].evaluate + "</p><div class = 'prod_div'><span>" + prod[i].name + "</span><span class = 'prod_shu'>" + "|" + "</span><span class = 'pord_span'>" + prod[i].price + "</span></div></li>");
			}
			$(".prod_con ul").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
		}
	});
	
	//内容
	$.ajax({
		url: "json/content.json",
		type: "GET",
		success: function(con){
			for(var i = 0; i < con.length; i++){
				$(".cont_con ul").append("<li class = 'con_lia'><p class = 'con_tit'>" + con[i].title + "</p><div class = 'con_div'></div></li>");
				$(".con_lia").eq(i).append("<div class = 'con_xiao'>"+ "&lt;"+"</div><div class = 'con_da'>"+ "&gt;"+"</div>");
				$(".con_lia").eq(i).append("<ol class = 'con_ol'><li></li><li></li><li></li><li></li></ol>")
				for(var j = 0; j < con[i].child.length; j++){
					$(".con_div").eq(i).append("<li class = 'con_lib'><p class = 'con_name'>" + con[i].child[j].name + "</p><p class = 'con_state'>" + con[i].child[j].state +"</p><img src = " + con[i].child[j].img + "></li>");
				}
			}
			//浮动效果
			$(".cont_con ul").find(".con_lia").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
				$(this).find(".con_xiao").css("display", "block");
				$(this).find(".con_da").css("display", "block");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
				$(this).find(".con_xiao").css("display", "none");
				$(this).find(".con_da").css("display", "none");
			});
			
			//滚动事件
			
			$(".con_ol").eq(0).find("li").eq(0).css("background", "white").css("border", "2px solid orange");
			$(".con_ol").eq(1).find("li").eq(0).css("background", "white").css("border", "2px solid orange");
			$(".con_ol").eq(2).find("li").eq(0).css("background", "white").css("border", "2px solid orange");
			$(".con_ol").eq(3).find("li").eq(0).css("background", "white").css("border", "2px solid orange");
			
			var num = 0;
			var iNum = 0;
			$(".con_lia").hover(function(){
				iNum = $(this).index();
				num = 0;
			},function(){
				iNum = null;
			});
			
			$(".con_xiao").click(function(){
				num--;
				if(num < 0){
					num = 0;
					move(iNum, num);
				}else{
					move(iNum, num);
				}
			});
			
			$(".con_da").click(function(){
				num++;
				if(num > 3){
					num = 3;
					move(iNum, num);
				}else{
					move(iNum, num);
				}
				
			});
			
			function move(iNum, num){
				$(".con_div").eq(iNum).find(".con_lib").stop().animate({left: -300*num});
				
				$(".con_ol").eq(iNum).find("li").css("background", "#B0B0B0").css("border", "");
				$(".con_ol").eq(iNum).find("li").eq(num).css("background", "white").css("border", "2px solid orange");
			}
		}
	});
	
	
	//视屏
	$.ajax({
		url: "json/view.json",
		type: "GET",
		success: function(vie){
			for(var i = 0; i < vie.length; i++){
				$(".view_con ul").append("<li><img src = " + vie[i].img + "><p class = 'vie_tit'>" + vie[i].title + "</p><p class = 'vie_exp'> " + vie[i].explain + " </p></li>");
			}
			
			//浮动
			$(".view_con ul").find("li").hover(function(){
				$(this).stop().animate({top: -3});
				$(this).css("box-shadow", "2px 2px 2px #999999");
			},function(){
				$(this).stop().animate({top: 0});
				$(this).css("box-shadow", "");
			});
		}
	});
})

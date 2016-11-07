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
		$(this).find(".img").attr("src", "../img/home/smallpic/1_021.jpg");
	}, function(){
		$(".shop-cat").css("display", "none");
		$(this).css("background", "#424242");
		$(this).find("a").css("color", "#B0B0B0");
		$(this).find("span").css("color", "#B0B0B0");
		$(this).find(".img").attr("src", "../img/home/smallpic/1_02.jpg");
	});
	
	//动感导航条
	$.ajax({
		url: "../json/daohang.json",
		type: "GET",
		success: function(data){
			for(var i = 0; i < data.length; i++){
				$(".navul").append("<li class = 'navtou'><a href = '#' class = 'navtitle'>" + data[i].title + "</a><div class = 'nav_child'></div></li>");
				for(var j = 0; j < data[i].child.length; j++){
					$(".navul").find(".nav_child").eq(i).append("<li class = 'li_child'><div class = 'nav_bao'><img src= ../" + data[i].child[j].img + " /><div><p class = 'nav_p1'>" + data[i].child[j].title + "</p><p class='nav_p2'>" + data[i].child[j].price + "</div></div></li>");
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
	
	
	//小导航
	$(".navn").find("li").eq(0).css("color", "#FF6700");
	$(".navn").find("li").hover(function(){
		$(this).css("color", "#FF6700");
	},function(){
		$(this).css("color", "black");
		$(".navn").find("li").eq(0).css("color", "#FF6700");
	})
	
	//商品
	$.ajax({
		url: "../json/water.json",
		type: "GET",
		success: function(war){
			for(var i = 0; i < war.length; i++){
				$(".shop ul").append("<li><div class = 'shop_shang'><img src = " + war[i].imga + "></div><div class = 'shop_xia'><div class = 'shop_left'><span class = 'shop_na'>" + war[i].namea + "</span><span class = 'shop_nb'>" + war[i].price + "</span><p>" + war[i].introduce + "</p></div><div class = 'shop_right'><div class = 'shop_right'><div class = 'shop_but' id = " + war[i].id + ">立即购买</div></div></li>")
			}
			
			//滑动事件
			$(".shop_but").hover(function(){
				$(this).css("background", "#FF6700");
				$(this).css("color", "white");
			},function(){
				$(this).css("background", "white");
				$(this).css("color", "#FF6700");
			});
			
			//打开窗口
			$(".shop_but").click(function(){
				window.open("details.html?id=" + $(this).attr('id')+ "");
			});
		}
	});
	
})
$(function(){
	var name = $.cookie("username");
	var code = $.cookie("password");
	
	$(".join").click(function(){
		if($(".ce_p").val() == name && $(".ce_pa").val() == code){
			window.open("../index.html");
		}else{
			alert("信息有误");
		}
	})
})

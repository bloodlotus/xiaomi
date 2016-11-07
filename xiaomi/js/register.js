$(function(){
	//手机号
	//失去焦点
	var flag = true;
	$(".box_text").blur(function(){
		if($(this).val() == ""){
			$(".span_a").html("请输入手机号");
			$(".span_a").css("color", "#F56600");
			$(".box_phone").css("border", "1px solid #F56600");
		}else if(/^[1][358][0-9]{9}$/.test($(this).val())){
			$(".span_a").html("输入正确");
			$(".span_a").css("color", "green");
			flag = true;
		}else{
			$(".span_a").html("输入格式不正确");
			$(".span_a").css("color", "#F56600");
			$(".box_phone").css("border", "1px solid #F56600");
			flag = false;
		}
	});
	
	//获得焦点
	$(".box_text").focus(function(){
		if($(this).val() == ""){
			$(".span_a").html("");
			$(".span_a").css("color", "");
			$(".box_phone").css("border", "1px solid #E8E8E8");
			$(this).css("color", "black");
		}
	});
	
	
	//密码
	//获得焦点
	$(".box_password").focus(function(){
		if($(this).val() == ""){
			$(".span_b").html("建议使用字母,数字,符号,两种及两种以上来组合,6-20位")
			$(".span_b").css("color", "red");
			$(".box_pass").css("border", "1px solid #E8E8E8");
			$(this).css("color", "black");
		}
	});
	
	//失去焦点
	$(".box_password").blur(function(){
		var passa = $(".box_password").val();
		if(passa == ""){
			$(".span_b").html("请输入密码");
			$(".span_b").css("color", "#F56600");
			$(".box_pass").css("border", "1px solid #F56600");
		}
		else if(passa.length >= 6 && passa.length <= 20){
			if(/\d/.test(passa) && /[a-z]/.test(passa) && /[A-Z]/.test(passa)){
				$(".span_b").html("密码等级强").css("color", "green");
			}else if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(passa)){
				$(".span_b").html("密码等级中").css("color", "orange");
			}else{
				$(".span_b").html("密码等级弱").css("color", "red");
			}
			flag = true;
		}else{
			$(".span_b").html("长度在6-20之间").css("color", "#F56600");
			$(".box_pass").css("border", "1px solid #F56600");
			flag = false;
		}
		
		
		
	});
	
	//确认密码
	//获得焦点
	$(".box_passdd").focus(function(){
		if($(this).val() == ""){
			$(this).css("color", "black");
			$(".span_c").html("");
			$(".box_padd").css("border", "1px solid #E8E8E8");
		}
	});
	//失去焦点
	$(".box_passdd").blur(function(){
		
		if($(this).val() == $(".box_password").val()){
			$(".span_c").html("输入正确").css("color", "green");
			flag = true;
		}else {
			$(".span_c").html("输入有误,请重新输入").css("color", "#F56600");
			$(".box_padd").css("border", "1px solid #F56600");
			flag = false;
		}
		
		if($(this).val() == "" || $(".box_password").val() == ""){
			$(".span_c").html("请输入密码");
			$(".span_c").css("color", "#F56600");
			$(".box_padd").css("border", "1px solid #F56600");
		}
	});
	
	//验证码
	$(".val_right").html(testCode(5));
	
	$(".val_right").click(function(){
		$(this).html(testCode(5));
	});
	
	
	$(".val_left").blur(function(){
		if($(this).val() == ""){
			$(".span_d").html("输入验证码 点击图片更换验证码");
			$(".span_d").css("color", "#F56600");
			$(this).css("border", "1px solid #F56600");
		}else if($(this).val() == $(".val_right").html()){
			$(".span_d").html("输入正确").css("color", "green");
			$(this).css("border", "1px solid #E8E8E8");
			flag = true;
		}else{
			$(".span_d").html("输入错误").css("color", "#F56600");
			$(this).css("border", "1px solid #F56600");
			flag = false;
		}
	});
	
	
	$(".val_left").focus(function(){
		if($(this).val() == ""){
			$(this).css("color", "black");
			$(".span_d").html("验证码区分大小写").css("color", "red");
			$(this).css("border", "1px solid #E8E8E8");
		}
	});
	
	//点击
	$(".ce").click(function(){
		if($(".box_text").val() == "" || $(".box_password").val() == "" || $(".box_passdd").val() == "" || $(".val_left").val() == ""){
			alert("信息不完整");
		}else if(flag == false){
			alert("信息有误");
		}else{
			alert("成功注册");
			$.cookie("username", $(".box_text").val(), {expires: 5});
			$.cookie("password", $(".box_password").val(), {expires: 5});
			window.open("enter.html");
		}
	})
	
	
	function testCode(n){
		var arr = [];
		for(var i = 0 ; i < n; i++){
			var num = parseInt(Math.random() * 100);
			if( num >= 0 && num <= 9){
				arr.push(num);
			}else if(num >= 10 && num <= 35){
				var charStr = String.fromCharCode(num + 87);
				arr.push(charStr);
			}else if(num >= 65 && num <= 90){
				var charStr = String.fromCharCode(num);
				arr.push(charStr);
			}else{
				i--;
			}
		}
		return arr.join("");
	}
	
})

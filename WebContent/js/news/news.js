$(document).ready(function() {
	//获取全部新闻
	getAllNews();
});
//定义当前页初始值
var currentPage = 1;
//初始化分页对象
var newsInfoVO = null;
//获取全部新闻
function getAllNews(){
	var formData = new FormData();
	formData.append("currentPage",currentPage);
	$.ajax({
		type:'POST',
		data:formData,
		url:'/exhibitionsystem/news/news_queryNewsByPage',
		cache: false,  
	    processData: false,  
	    contentType: false,
	    success:function(result){
	    	newsInfoVO = JSON.parse(result);
	    	putNewsInfo(newsInfoVO);
	    }
	})
}
//放入新闻信息
function putNewsInfo(newsInfoVO){
	var newsInfo = newsInfoVO.list;
	var str = '';
	var localtion= document.querySelector("#soManyNews");// 定位放入的位置
	var newsLength = newsInfo.length;
	console.log("newsLength:"+newsLength);
	for(var i=0;i<newsLength;i++){
		var href = newsInfo[i].newsLink;
		if(href.length>50){
			href = href.sub(0,50)+"...";
		}
		str+='<tr>'+
		    		'<td style="text-align:center;"><input type="checkbox" name="item" lay-skin="primary" lay-filter="choose" value="'+newsInfo[i].newsId+'"/></td>'+
		    		'<td><a>'+href+'</a></td>'+
		    		'<td><a class="layui-btn layui-btn-danger layui-btn-mini news_del" onclick="deleteNews(this)" data_id="'+newsInfo[i].newsId+'" ><i class="layui-icon">&#xe640;</i> 删除</a></td>'+
		    '</tr>'
	}
	localtion.innerHTML=str;// 插入标签
	//layui再次渲染
	layui.use('form', function(){
		var form = layui.form; 
		form.render();
	});
}
//首页
function firstPage() {
	if (currentPage <= 1) {
		toastr.error("已经是第一页了哦!");
	} else {
		currentPage = 1;
		putNewsInfo(newsInfoVO);
	}
}
//上一页
function prePage() {
	if (currentPage <= 1) {
		toastr.error("已经是第一页了哦!");
	} else {
		currentPage = --currentPage;
		putNewsInfo(newsInfoVO);
	}
}
//下一页
function nextPage() {
	if (currentPage >= newsInfoVO.totalPage) {
		toastr.error("没有下一页了哦!");
	} else {
		currentPage = ++currentPage ;
		putNewsInfo(newsInfoVO);
	}
}
//跳页
function goPage() {
	var totalPage=newsInfoVO.totalPage;
	if ($("#go_input").val() <= totalPage && $("#go_input").val() >= 1) {
		currentPage = $("#go_input").val();
		putNewsInfo(newsInfoVO);
	} else {
		toastr.error("不存在这一页！");
	}
}
//尾页
function lastPage() {
	if (currentPage >= newsInfoVO.totalPage) {
		toastr.error("没有下一页了哦!");
	} else {
		currentPage = newsInfoVO.totalPage;
		putNewsInfo(newsInfoVO);
	}
}
//全选
function chooseAllNews(){
	var checkbos=document.getElementsByName("item");
	for(i=0;i<checkbos.length;i++){
		var checkbo=checkbos[i];
		if($("#allChoose").prop("checked")){
			checkbo.checked="checked";
		}else{
			checkbo.checked=null;
		}
	}
}
//删除单个作品
function deleteNews(object_i){
		layer.confirm('确定删除此作品信息？',{icon:3, title:'提示信息'},function(index){
			var newsId=$(object_i).attr('data_id');//定义id
			var formData = new FormData;
			formData.append("ids", newsId);
			//var arid=JSON.parse(ar);		//转换成json对象
				$.ajax({
					url:'/exhibitionsystem/news/news_batchDelete',
					type:"post",
					data :formData,
					//报错请加入以下三行，则ajax提交无问题
			        cache: false,  
			        processData: false,  
			        contentType: false,
					success:function(result){
						var deleteResult = JSON.parse(result);
						if(deleteResult=="deleteSuccess"){
							toastr.success("删除成功!");
							setTimeout(function(){
								location.href="http://localhost:8080/exhibitionsystem/skip/skip_intoNewsList";
							},1000);
						}else{
							toastr.error("删除失败!");
						}}
				});
			})
}
//批量删除作品
function batchDeleteNews(vals){
		layer.confirm('确定删除此条资讯？',{icon:3, title:'提示信息'},function(index){
			var formData = new FormData;
			formData.append("ids", vals);
			//var arid=JSON.parse(ar);		//转换成json对象
				$.ajax({
					url:'/exhibitionsystem/news/news_batchDelete',
					type:"post",
					data :formData,
					//报错请加入以下三行，则ajax提交无问题
			        cache: false,  
			        processData: false,  
			        contentType: false,
					success:function(result){
						var deleteResult = JSON.parse(result);
						if(deleteResult=="deleteSuccess"){
							toastr.success("删除成功!");
							setTimeout(function(){
								location.href="http://localhost:8080/exhibitionsystem/skip/skip_intoNewsList";
							},1000);
						}else{
							toastr.error("删除失败!");
						}}
				});
			})
}
//批量删除
function deleteMore(){
	var arr = new Array();
    $.each($('input:checkbox:checked'),function(i){
        arr[i] = $(this).val();
    });
    var vals = arr.join(",");
    batchDeleteNews(vals);
}

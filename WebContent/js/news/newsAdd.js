//添加新闻
function addNews(){
	var formData = new FormData();
	formData.append("news.newsLink",document.getElementById("newsAdd").value);
	$.ajax({
		type:'POST',
		data:formData,
		url:'/exhibitionsystem/news/news_addNews',
		cache: false,  
	    processData: false,  
	    contentType: false,
	    success:function(result){
	    	var addResult = JSON.parse(result);
	    	if(addResult=="success"){
				toastr.success("添加成功!");
				setTimeout(function(){
					location.reload();
				},500);
			}else{
				toastr.error("添加失败!");
			}
	    }
	})
}
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
	var putLocaltion= document.querySelector("#allNews");// 定位放入的位置
	var newsLength = newsInfo.length;
	console.log("newsLength:"+newsLength);
	for(var i=0;i<newsLength;i++){
		var introduction = newsInfo[i].introduction;
		var title = newsInfo[i].title;
		var picture = newsInfo[i].picture;
		if(introduction==null||introduction==""){
			introduction="暂无信息";
		}
		if(title==null||title==""){
			title="无法获取该文章标题，点击查看文章";
		}
		if(introduction.length>60){
			introduction = introduction.substr(0,60)+"...";
		}
		if(picture==null||picture==""){
			picture="timg[1].jpg";
		}
		str+='<li> <a href="'+newsInfo[i].newsLink+'"><img src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='+picture+'"   width="90" height="90" alt="'+title+'"/></a>'+
        '<div class="newslist"> <a href="'+newsInfo[i].newsLink+'" title="'+title+'">'+title+'</a> <span>UPTATED:'+newsInfo[i].newsCreationtime+'</span>'+
          '<p>'+introduction+'</p>'+
        '</div>'+
      '</li>';
	}
	putLocaltion.innerHTML=str;// 插入标签
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

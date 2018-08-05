var marginleft = 0;
var currentType = 0;
var vo = null;
var dto = null;
var pr_name = new Array();
var pr_type = new Array();
var pr_author = new Array();
var pr_createtime = new Array();
var pr_description = new Array();
var pr_img = [];

var str1 = new Array();
var str2 = new Array();
var str3 = new Array();
var str4 = new Array();
var str5 = new Array();
$(document).ready(function() {
	getProductionTypeInfo();
	//show_scrolList(currentType);
	//list6production_ajax(currentType);
	show_More10Production ();
//	fixedshow_six();
	//获取最新资讯
	getNewsInfo();
});

// 首页查询分类信息
function getProductionTypeInfo() {
	jQuery
			.ajax({
				type : 'POST',
				url : '/exhibitionsystem/carouselManagement/carouselManagement_querryCarousel',
				cache : false,
				processData : false,
				contentType : false,
				success : function(result) {
					// console.log(result);
					var listCarouselDTO = JSON.parse(result);
					putProductionTypeInfo(listCarouselDTO);
					countwidth();
					putCarouselInfo(listCarouselDTO);
				}
			})
}
// 将获取到的分类信息放到首页相应位置
function putProductionTypeInfo(listCarouselDTO) {
	var str = "";// 初始化中间层li
	var strStart = '<li class="first-item">网站建设</li>';// 定义第一个li
	var strOver = '<li class="last-item">网站设计</li>';// 定义最后一个li
	var typeInfo = document.querySelector("#li-list");// 定位放入的位置
	var length = listCarouselDTO.length;
	// 遍历result
	for (var i = 0; i < length; i++) {
		var logo = listCarouselDTO[i].type.production_type_logo;// 获取logo
		var typename = listCarouselDTO[i].type.production_type_name;// 获取分类名称
		str = str
				+ '<li style="background-image: url(/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
				+ logo + ');">' + typename + '</li>';// 生成中间层菜单
	}
	var strAll = strStart + str + strOver;// 拼接三层li
	typeInfo.innerHTML = strAll;// 插入标签
}
// 插入轮播图信息
function putCarouselInfo(listCarouselDTO) {
	var str = "";// 初始化li
	var typeInfo = document.querySelector("#banner_img");// 定位放入的位置
	var display = "";// 标签显示
	var length = listCarouselDTO.length;
	// 遍历result
	for (var i = 0; i < length; i++) {
		// 判断该分类是否有轮播图
		if (listCarouselDTO[i].listcarouselpicture.length > 0) {
			if (i == 0) {
				str = str
						+ '<li style="background-image:url(/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
						+ listCarouselDTO[i].listcarouselpicture[0].carousel_picture
						+ '); display:block;">';
			} else {
				str = str
						+ '<li style="background-image:url(/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
						+ listCarouselDTO[i].listcarouselpicture[0].carousel_picture
						+ '); display:none;">';
			}
			str += '<div class="wrapper">'
					+ '<div class="ad_txt">'
					+ '<h2>'
					+ listCarouselDTO[i].type.production_type_title
					+ '</h2>'
					+ '<p>'
					+ listCarouselDTO[i].type.production_type_discription
					+ '</p>'
					+ '</div>'
					+ '<div class="ad_img"> <img src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
					+ listCarouselDTO[i].type.production_type_picture
					+ '"  width="506" height="404" alt="" /> </div>' + '</div>'
					+ '</li>';// 生成中间层菜单
		}
	}
	typeInfo.innerHTML = str;// 插入标签
}
// 计算类型栏宽度
function countwidth() {
	var lii = document.getElementById("li-list").getElementsByTagName("li");
	var Nli = lii.length - 2; // 图标个数
	var nbanner_ctr = document.getElementById("banner_ctr");
	var NliWidth = nbanner_ctr.offsetWidth / Nli;
	var ulWidth = Nli * 115 + 20 * 2;
	marginleft = (960 - ulWidth) / 2;
	document.getElementById("li-list").style.width = ulWidth + "px";
	document.getElementById("banner_ctr").style.width = ulWidth + "px";
	document.getElementById("dudu").style.marginLeft = marginleft + "px";
	document.getElementById("drag_ctr").style.left = marginleft + 20 + "px";
	document.getElementById("drag_arrow").style.left = marginleft + 20 + "px";
}
$("header>div>nav>ul>li>a").hover(function() {
	$(this).parent().stop(false, true).animate({
		"background-position-x" : "6px",
		opacity : "0.7"
	}, {
		duration : "normal",
		easing : "easeOutElastic"
	});
}, function() {
	$(this).parent().stop(false, true).animate({
		"background-position-x" : "10px",
		opacity : "1"
	}, {
		duration : "normal",
		easing : "easeOutElastic"
	});
});
/* <!--- 首页 ----> */
$('.ad_img,#banner_ctr,#client').pngFix();
/*$(window).scroll(function() {
	$(this).scrollTop() > 80 ? $("#navbg").stop(false, true).animate({
		opacity : "1"
	}, "normal") : $("#navbg").stop(false, true).animate({
		opacity : "0.8"
	}, "normal");
});*/
// Banner Start
var curIndex = 0;
var time = 800;
var slideTime = 5000;
var adTxt = $("#banner_img>li>div>.ad_txt");
var adImg = $("#banner_img>li>div>.ad_img");
var int = setInterval("autoSlide()", slideTime);

$("#banner_ctr>#dudu>ul")
		.click(
				function(event) {
					if (event.target.class != 'first-item'
							&& event.target.class != 'ast-item') {
						show($(event.target)
								.index(
										"#banner_ctr>#dudu>ul>li[class!='first-item'][class!='last-item']"));
						window.clearInterval(int);
						int = setInterval("autoSlide()", slideTime);
					}
				});

function autoSlide() {
	curIndex + 1 >= $("#banner_img>li").size() ? curIndex = -1 : false;
	show(curIndex + 1);

}
function show(index) {
	$.easing.def = "easeOutQuad";
	$("#drag_ctr,#drag_arrow").stop(false, true).animate({
		left : index * 115 + marginleft + 20
	}, 300);
	currentType = index;
	var lis = document.getElementById("li-list").getElementsByTagName("li");
	$("#banner_img>li").eq(curIndex).stop(false, true).fadeOut(time);
	adTxt.eq(curIndex).stop(false, true).animate({
		top : "340px"
	}, time);
	adImg.eq(curIndex).stop(false, true).animate({
		right : "120px"
	}, time);
	setTimeout(function() {
		$("#banner_img>li").eq(index).stop(false, true).fadeIn(time);
		adTxt.eq(index).children("p").css({
			paddingTop : "50px",
			paddingBottom : "50px"
		}).stop(false, true).animate({
			paddingTop : "0",
			paddingBottom : "0"
		}, time);
		adTxt.eq(index).css({
			top : "0",
			opacity : "0"
		}).stop(false, true).animate({
			top : "170px",
			opacity : "1"
		}, time);
		adImg.eq(index).css({
			right : "-50px",
			opacity : "0"
		}).stop(false, true).animate({
			right : "10px",
			opacity : "1"
		}, time);
	}, 200)
	curIndex = index;
	// show_scrolList(currentType);
	//show_ten(currentType);
	//list6production_ajax(currentType);
	//show_six(currentType);
}
// Banner End
// Cases Start
$("#cases>ul").hover(function() {
	if ($.support.transition) {
		$("#cases>ul>li").hover(function() {
			$("img", this).stop(false, true).transition({
				perspective : '300px',
				rotateY : '180deg',
				opacity : '0'
			});
			$("p", this).css({
				display : 'block',
				opacity : '0',
				rotateY : '-180deg'
			}).stop(false, true).transition({
				perspective : '300px',
				rotateY : '0deg',
				opacity : '1'
			});
		}, function() {
			$("img", this).show().stop(false, true).transition({
				perspective : '300px',
				rotateY : '0deg',
				opacity : '1'
			});
			$("p", this).stop(false, true).transition({
				perspective : '300px',
				rotateY : '180deg',
				opacity : '0'
			});
		});
	} else {
		$("#cases>ul>li").hover(function() {
			$("img", this).stop(false, true).slideUp("fast");
			$("p", this).stop(false, true).slideDown("fast");
		}, function() {
			$("img", this).stop(false, true).slideDown("fast");
			$("p", this).stop(false, true).slideUp("fast");
		});
	}
})
$("#cases>ul>li>img").lazyload({
	effect : "fadeIn",
	failurelimit : 10
});
$("#gotop").click(function() {
	$('body,html').animate({
		scrollTop : 0
	}, 500);
})

// 展示10条分类作品信息
function show_scrolList(currentType) {
	var formData = new FormData();
	formData.append("showAll", 0);
	jQuery
			.ajax({
				url : "/exhibitionsystem/productionManagement/productionManagement_showPicturesVO", // 数据传输的目的地址，将在这里对前台数据进行操作
				type : "post",
				data : formData, // 这里是前台传到后台的数据
				cache : false,
				processData : false,
				contentType : false,
				success : function(result) {
					if (result.success = true) {
						vo = JSON.parse(result);
						//console.log("10=========="+result);
						show_ten(currentType);
					} else {
						console.log("传值失败");
					}
				}
			});
}
//// 展示十条
//function show_ten(currentType) {
//	// 显示article信息列表
//	var card_table_info = document.querySelector("#productionList"); // 获取文档元素
//	var str = "";
//	var prinfol = vo.list[currentType].listPictureInfoDTO.length;
//	//console.log("vo=="+vo.list[currentType].listPictureInfoDTO.length);
//	// 遍历json集合
//	for (var j = 0; j < prinfol; j++) {
//		// 得到每条数据
//		var object = vo.list[currentType].listPictureInfoDTO[j];// DTO[0,1,2]分别为类型1,2,3的图片集合
//		// 得到各条数据的某个信息
//		// 得到各条数据的某个信息
//		if ('Propicture' in vo.list[currentType].listPictureInfoDTO[j]) {
//			var kaige = vo.list[currentType].listPictureInfoDTO[j].Propicture.production_pictures_name;
//		} else {
//			var kaige = "";
//		}
//		str += ''
//		var kaig = vo.list[currentType].listPictureInfoDTO[j];
//		if (kaig.Proinfo.production_info_discription.length > 45) {
//			kaig.Proinfo.production_info_discription = kaig.Proinfo.production_info_discription
//					.substr(0, 45)
//					+ "...";
//		}
//		// 遍历是把article_id的值传给checkbox的value(为后期的批量删除)
//		str += '<li><img src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
//				+ kaige
//				+ '"   width="240" height="152" alt="'
//				+ kaig.Proinfo.production_info_name
//				+ '"/>'
//				+ '<p> <strong>'
//				+ kaig.Proinfo.production_info_name
//				+ '</strong>'
//				+ kaig.Proinfo.production_info_discription
//				+ '<br/>'
//				+ '<a href="/exhibitionsystem/ProductionDetail.html?data_id='+kaig.Proinfo.production_info_id+'" data_id="'+kaig.Proinfo.production_info_id+'" class="btn_blue">查看作品详情</a>'
//				+ '</p>' + '</li>';
//
//		card_table_info.innerHTML = str;
//	}
//}

// 展示6条分类作品信息
function list6production_ajax(currentType) {
	jQuery
			.ajax({
				url : "/exhibitionsystem/productionManagement/productionManagement_querrySixProduction", // 数据传输的目的地址，将在这里对前台数据进行操作
				type : "post",
				data : "", // 这里是前台传到后台的数据
				processData : false,
				contentType : false,
				success : function(data) {
					if (data.success = true) {
//						console.log("data========="+data);
						dto = JSON.parse(data);
						show_six(currentType);
					}
				}
			})
}
//// 展示六条
//function show_six(currentType) {
////	console.log("currentType=="+ dto[0].listPictureInfoDTO.length);
//	var prlength = dto[currentType].listPictureInfoDTO.length;
//	var href_base = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName=";
//	//console.log(jQuery('#myiframe').contents().find('.card').length);
//	jQuery('#myiframe').contents().find('.ppap').each(function(i, elt) {
//		if (i < prlength) {
//			jQuery('#myiframe').contents().find(".card__title").eq(i).html(dto[currentType].listPictureInfoDTO[i].Proinfo.production_info_name);
//			//console.log("555555555555"+dto[currentType].listPictureInfoDTO[0].Proinfo.production_info_name);
//			jQuery('#myiframe').contents().find(".card__subtitle").eq(i).html(dto[currentType].type.production_type_name);
//			jQuery('#myiframe').contents().find(".meta__author").eq(i).html(dto[currentType].listPictureInfoDTO[i].Proinfo.production_info_author);
//			jQuery('#myiframe').contents().find(".meta__date").eq(i).html(dto[currentType].listPictureInfoDTO[i].Proinfo.production_info_creationtime);
//			jQuery('#myiframe').contents().find(".pr_description").eq(i).html( dto[currentType].listPictureInfoDTO[i].Proinfo.production_info_discription);
//			jQuery('#myiframe').contents().find(".card__subtitle").eq(i).html(dto[currentType].type.production_type_name);
//			jQuery(elt).attr('href',href_base+dto[currentType].listPictureInfoDTO[i].Propicture.production_pictures_name).parents('.card').show();
//		}else{
//			jQuery(elt).parents('.card').hide();
//		}
//	});
//}

//获取数组中的随机值函数
function rand(arr){
    var num = parseInt(Math.random()*(arr.length));
    return arr[num];
}
 
//随机展示六条
//function fixedshow_six() {
//	var formData=new FormData();
//	formData.append("showAllVO.pageIndex","1");
//	jQuery
//	.ajax({
//		url : "/exhibitionsystem/productionManagement/productionManagement_querrySixMoreVO", // 数据传输的目的地址，将在这里对前台数据进行操作
//		type : "post",
//		data : formData, // 这里是前台传到后台的数据
//		processData : false,
//		contentType : false,
//		success : function(data) {
//			if (data.success = true) {
//			//console.log("11data========="+data);
//				var dto6 = JSON.parse(data);	//总数组
//				//console.log("22data========="+dto6);
//				show_six(dto6)
//			}
//		}
//	})
//}	
	
//展示六条
//function show_six(dto6) {
//	//console.log("currentType=="+ JSON.stringify(dto6));
//	var href_base = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName=";
//	 $("#myiframe").load(function(){
//	 console.log("查找iframe中的元素=="+jQuery('#myiframe').contents().find('.card__title').length);
//	 //var svgDemo= document.getElementById("card__image1"); 
//	 jQuery('#myiframe').contents().find('.ppap').each(function(i, elt) {
//			if (i < 6) {
//					jQuery('#myiframe').contents().find(".card__title").eq(i).html(dto6.listInfoTypePhotoDTO[i].info.production_info_name);
//					//console.log("555555555555"+dto[currentType].listPictureInfoDTO[0].Proinfo.production_info_name);
//					jQuery('#myiframe').contents().find(".card__subtitle").eq(i).html(dto6.listInfoTypePhotoDTO[i].type.production_type_name);
//					jQuery('#myiframe').contents().find(".meta__author").eq(i).html(dto6.listInfoTypePhotoDTO[i].info.production_info_author);
//					jQuery('#myiframe').contents().find(".meta__date").eq(i).html(dto6.listInfoTypePhotoDTO[i].info.production_info_creationtime);
//					jQuery('#myiframe').contents().find(".pr_description").eq(i).html( dto6.listInfoTypePhotoDTO[i].info.production_info_discription);
//					jQuery(elt).attr('href',href_base+dto6.listInfoTypePhotoDTO[i].picture.production_pictures_name).parents('.card').show();
//			}else{
//				jQuery(elt).parents('.card').hide();
//			}
//		});
//	    });
//}

function show_More10Production (){
	var pr_paginationQueryAjax = {
			"showAllVO.pageIndex" : "1",	//showAllVO.pageIndex
		}
	//console.log("pr_currentpageQuery="+JSON.stringify(pr_currentpageQuery));
	jQuery.ajax({
		url : "/exhibitionsystem/productionManagement/productionManagement_querryTenMoreVO",		//数据传输的目的地址，将在这里对前台数据进行操作
		type : "post",
		data :	pr_paginationQueryAjax ,				//这里是前台传到后台的数据
		success : function(result) {
			if(result.success=true){
				//console.log("prinfo---"+result);
				var prinfo = JSON.parse(result);
				show_ten(prinfo)
			}
	}
	});
}

//展示十条
function show_ten(prinfo) {
	// 显示article信息列表
	var card_table_info = document.querySelector("#productionList"); // 获取文档元素
	var str = "";
	//console.log("vo=="+prinfo.list[currentType].listPictureInfoDTO.length);
	// 遍历json集合
	for (var j = 0; j < 10; j++) {
		// 得到每条数据
		// 得到各条数据的某个信息
		if ('picture' in prinfo.listInfoTypePhotoDTO[j]) {
			var kaige = prinfo.listInfoTypePhotoDTO[j].picture.production_pictures_name;
		} else {
			var kaige = "";
		}
		str += ''
		var kaig = prinfo.listInfoTypePhotoDTO[j];
		if (kaig.info.production_info_discription.length > 45) {
			kaig.info.production_info_discription = kaig.info.production_info_discription
					.substr(0, 45)
					+ "...";
		}
		// 遍历是把article_id的值传给checkbox的value(为后期的批量删除)
		str += '<li><img src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName='
				+ kaige
				+ '"   width="240" height="152" alt="'
				+ kaig.info.production_info_name
				+ '"/>'
				+ '<p> <strong>'
				+ kaig.info.production_info_name
				+ '</strong>'
				+ kaig.info.production_info_discription
				+ '<br/>'
				+ '<a href="/exhibitionsystem/ProductionDetail.html?data_id='+kaig.info.production_info_id+'" data_id="'+kaig.info.production_info_id+'" class="btn_blue">查看作品详情</a>'
				+ '</p>' + '</li>';

		card_table_info.innerHTML = str;
	}
}
//获取最新资讯
function getNewsInfo(){
	console.log("走了这里？")
	jQuery.ajax({
		url : "/exhibitionsystem/news/news_getNewsInfo",		//数据传输的目的地址，将在这里对前台数据进行操作
		type : "post",
		cache : false,
		processData : false,
		contentType : false,
		success : function(result) {
			if(result.success=true){
				//console.log("prinfo---"+result);
				var newsInfo = JSON.parse(result);
				putnewsInfo(newsInfo);
			}
	}
	});
}
//放入最新资讯
function putnewsInfo(newsInfo){
	var str = '';
	var putLocaltion= document.querySelector("#newsList");// 定位放入的位置
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
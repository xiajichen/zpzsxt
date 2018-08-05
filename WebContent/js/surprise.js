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
var str7 = new Array();
$(document).ready(function() {
	fixedshow_six()
});

 
//随机展示六条
function fixedshow_six() {
	var formData=new FormData();
	formData.append("showAllVO.pageIndex","1");
	jQuery
	.ajax({
		url : "/exhibitionsystem/productionManagement/productionManagement_querrySixMoreVO", // 数据传输的目的地址，将在这里对前台数据进行操作
		type : "post",
		data : formData, // 这里是前台传到后台的数据
		processData : false,
		contentType : false,
		success : function(data) {
			if (data.success = true) {
				var dto6 = JSON.parse(data);	//总数组
				show_six(dto6)
			}
		}
	})
}	

function show_six(dto6){
	var href_base = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName=";
//	jQuery(elt).attr('href',href_base+dto6.listInfoTypePhotoDTO[i].picture.production_pictures_name).parents('.card').show();
	//添加图片标签
//	console.log("dto6dto6==="+JSON.stringify(dto6));
	
	str1[0]=dto6.listInfoTypePhotoDTO[15].info.production_info_name;
	str1[1]=dto6.listInfoTypePhotoDTO[5].info.production_info_name;
	str1[2]=dto6.listInfoTypePhotoDTO[6].info.production_info_name;
	str1[3]=dto6.listInfoTypePhotoDTO[7].info.production_info_name;
	str1[4]=dto6.listInfoTypePhotoDTO[11].info.production_info_name;
	str1[5]=dto6.listInfoTypePhotoDTO[3].info.production_info_name;
	
	str2[0]=dto6.listInfoTypePhotoDTO[15].type.production_type_name;
	str2[1]=dto6.listInfoTypePhotoDTO[5].type.production_type_name;
	str2[2]=dto6.listInfoTypePhotoDTO[6].type.production_type_name;
	str2[3]=dto6.listInfoTypePhotoDTO[7].type.production_type_name;
	str2[4]=dto6.listInfoTypePhotoDTO[11].type.production_type_name;
	str2[5]=dto6.listInfoTypePhotoDTO[3].type.production_type_name;
	
	str3[0]=dto6.listInfoTypePhotoDTO[15].info.production_info_author;
	str3[1]=dto6.listInfoTypePhotoDTO[5].info.production_info_author;
	str3[2]=dto6.listInfoTypePhotoDTO[6].info.production_info_author;
	str3[3]=dto6.listInfoTypePhotoDTO[7].info.production_info_author;
	str3[4]=dto6.listInfoTypePhotoDTO[11].info.production_info_author;
	str3[5]=dto6.listInfoTypePhotoDTO[3].info.production_info_author;
	
	str4[0]=dto6.listInfoTypePhotoDTO[15].info.production_info_creationtime;
	str4[1]=dto6.listInfoTypePhotoDTO[5].info.production_info_creationtime;
	str4[2]=dto6.listInfoTypePhotoDTO[6].info.production_info_creationtime;
	str4[3]=dto6.listInfoTypePhotoDTO[7].info.production_info_creationtime;
	str4[4]=dto6.listInfoTypePhotoDTO[11].info.production_info_creationtime;
	str4[5]=dto6.listInfoTypePhotoDTO[3].info.production_info_creationtime;
	
	str5[0]=dto6.listInfoTypePhotoDTO[15].info.production_info_discription;
	str5[1]=dto6.listInfoTypePhotoDTO[5].info.production_info_discription;
	str5[2]=dto6.listInfoTypePhotoDTO[6].info.production_info_discription;
	str5[3]=dto6.listInfoTypePhotoDTO[7].info.production_info_discription;
	str5[4]=dto6.listInfoTypePhotoDTO[11].info.production_info_discription;
	str5[5]=dto6.listInfoTypePhotoDTO[3].info.production_info_discription;
	
//	str7[0]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[15].picture.production_pictures_name+"" />';
//	str7[1]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[5].picture.production_pictures_name+"" />';
//	str7[2]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[6].picture.production_pictures_name+"" />';
//	str7[3]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[7].picture.production_pictures_name+"" />';
//	str7[4]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[11].picture.production_pictures_name+"" />';
//	str7[5]='<img class="meta__avatar" src="/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[3].picture.production_pictures_name+"" />';
		for(i=0;i<6;i++){
		pr_name[i] = document.querySelectorAll(".card__title")[i]
		pr_type[i] = document.querySelectorAll(".card__subtitle")[i]
		pr_author[i] = document.querySelectorAll(".meta__author")[i] 
		pr_createtime[i] = document.querySelectorAll(".meta__date")[i] 
		pr_description[i] = document.querySelectorAll(".pr_description")[i] 
		pr_img[i] = document.querySelectorAll(".ppap")[i];
//		pr_img[i].setAttribute("preserveAspectRatio","none"); 
		pr_name[i].innerHTML=str1[i];
		pr_type[i].innerHTML=str2[i];
		pr_author[i].innerHTML=str3[i];
		pr_createtime[i].innerHTML=str4[i];
		pr_description[i].innerHTML=str5[i];
		//pr_img[i].setAttribute("preserveAspectRatio","none");
	}
		pr_img[0].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[15].picture.production_pictures_name+""; //关键一句，设置image的url图片，要用image.href.baseVal
		pr_img[1].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[5].picture.production_pictures_name+"";
		pr_img[2].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[6].picture.production_pictures_name+"";
		pr_img[3].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[7].picture.production_pictures_name+"";
		pr_img[4].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[11].picture.production_pictures_name+"";
		pr_img[5].href.baseVal = "/exhibitionsystem/productionManagement/productionManagement_IoReadImage?fileFileName="+dto6.listInfoTypePhotoDTO[3].picture.production_pictures_name+"";
		

}
	


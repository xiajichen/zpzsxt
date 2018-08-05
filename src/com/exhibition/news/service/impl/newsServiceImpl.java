package com.exhibition.news.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.exhibition.domain.News;
import com.exhibition.domain.production_info;
import com.exhibition.news.dao.newsDao;
import com.exhibition.news.service.newsService;
import com.exhibition.production.VO.QueryByPageVO;

import util.CatchPictrue;
import util.ImgCompress;
import util.TimeUtil;

public class newsServiceImpl implements newsService{
	
	private newsDao newsDao;
	public newsDao getNewsDao() {
		return newsDao;
	}
	public void setNewsDao(newsDao newsDao) {
		this.newsDao = newsDao;
	}
	@Override
	public List<News> getNewsInfo() {
		//首先清空img文件夹下的图片
		File scFileDir = new File("C:\\img\\");
        File TrxFiles[] = scFileDir.listFiles();
        for(File curFile:TrxFiles ){
            curFile.delete();  
        }
		// TODO Auto-generated method stub
		List<News> news = newsDao.getNewsInfo();
		//遍历news
		for(News oneNew:news) {
			try {
				Document doc = Jsoup.connect(oneNew.getNewsLink()).get();
				String title = doc.title();
				Elements Allcontent = doc.getElementsByTag("p");
				//实例化stringbuffer
				StringBuffer buffer =new StringBuffer();
				//遍历所有p标签内容
				for(Element el:Allcontent) {
					//将文本内容提取出来
					buffer.append(el.text().trim());
				}
				String introduction = buffer.toString().trim();
				oneNew.setTitle(title);
				oneNew.setIntroduction(introduction);
				//获取图片
				CatchPictrue catchPic = new CatchPictrue();
				catchPic.setWebUrl(oneNew.getNewsLink());
				try {
					String picname = catchPic.catchPics();
					String littlePic = "little"+picname;
					//压缩图片
					ImgCompress imgCom = new ImgCompress("C:\\img\\"+picname);
					imgCom.setPictrueName(littlePic);
					imgCom.resizeFix(90, 90);
					oneNew.setPicture(littlePic);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return news;
	}
	@Override
	public String addNews(News news) {
		String result = null;
		// TODO Auto-generated method stub
		news.setNewsId(UUID.randomUUID().toString());
		news.setNewsCreationtime(TimeUtil.getStringSecond());
		news.setNewsIsdelete(0);
		try {
			newsDao.saveOrUpdateObject(news);
			result = "success";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result = "error";
			e.printStackTrace();
		}
		return result;
	}
	@Override
	public QueryByPageVO queryNewsByPage(int pagesize,int currentPage) {
		//计算总记录数
		int count = newsDao.countNews();
		int totalPage = QueryByPageVO.countTotalPage(pagesize, count);
		int offset = QueryByPageVO.countOffset(pagesize, currentPage);
		int length = pagesize; // 每页记录数
		int currentpage = QueryByPageVO.countCurrentPage(currentPage);
		List<News> news = newsDao.getNewsInfoByPage(offset,length);
		//遍历news
		for(News oneNew:news) {
			try {
				Document doc = Jsoup.connect(oneNew.getNewsLink()).get();
				String title = doc.title();
				Elements Allcontent = doc.getElementsByTag("p");
				//实例化stringbuffer
				StringBuffer buffer =new StringBuffer();
				//遍历所有p标签内容
				for(Element el:Allcontent) {
					//将文本内容提取出来
					buffer.append(el.text().trim());
				}
				String introduction = buffer.toString().trim();
				oneNew.setTitle(title);
				oneNew.setIntroduction(introduction);
				//获取图片
				CatchPictrue catchPic = new CatchPictrue();
				catchPic.setWebUrl(oneNew.getNewsLink());
				try {
					String picname = catchPic.catchPics();
					String littlePic = "little"+picname;
					//压缩图片
					ImgCompress imgCom = new ImgCompress("C:\\img\\"+picname);
					imgCom.setPictrueName(littlePic);
					imgCom.resizeFix(90, 90);
					oneNew.setPicture(littlePic);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		QueryByPageVO queryByPageVO = new QueryByPageVO();
		queryByPageVO.setAllRow(count);
		queryByPageVO.setCurrentPage(currentpage);
		queryByPageVO.setList(news);
		queryByPageVO.setPageSize(pagesize);
		queryByPageVO.setTotalPage(totalPage);
		queryByPageVO.init();
		return queryByPageVO;
	}
	@Override
	public String batchDelete(String ids) {
		String result = null;
		if (ids != null && ids.trim().length() > 0) {
			/**
			 * 将多个对象id去掉分隔符转化为数组
			 */
			String[] deleteIdList = ids.split(",");
			for (String id : deleteIdList) {
				News news = newsDao.getNewsById(id);
				if (news != null) {
					news.setNewsIsdelete(1);
					news.setNewsModifytime(TimeUtil.getStringSecond());
					newsDao.saveOrUpdateObject(news);
					result = "deleteSuccess";
				} else {
					result = "error";
				}
			}
		} else {
			result = "error";
		}
		return result;
	}

}

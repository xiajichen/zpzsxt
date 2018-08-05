package com.exhibition.news.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.exhibition.domain.News;
import com.exhibition.news.service.newsService;
import com.exhibition.production.VO.QueryByPageVO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opensymphony.xwork2.ActionSupport;

public class newsAction extends ActionSupport implements ServletResponseAware, ServletRequestAware{
	
	/**
	 * 实现request以及response
	 */
	private HttpServletResponse response;

	private HttpServletRequest request;
	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	private newsService newsService;
	private News news;
	private QueryByPageVO queryByPageVO;
	private int currentPage;
	private String ids;

	public newsService getNewsService() {
		return newsService;
	}

	public void setNewsService(newsService newsService) {
		this.newsService = newsService;
	}
	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	public QueryByPageVO getQueryByPageVO() {
		return queryByPageVO;
	}

	public void setQueryByPageVO(QueryByPageVO queryByPageVO) {
		this.queryByPageVO = queryByPageVO;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	//查询新闻信息
	public void getNewsInfo() {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();// 格式化json数据
		Gson gson = gsonBuilder.serializeNulls().create();
		response.setContentType("text/html;charset=utf-8");
		List<News> news = newsService.getNewsInfo();
		try {
			response.getWriter().write(gson.toJson(news));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//添加新闻
	public void addNews() {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();// 格式化json数据
		Gson gson = gsonBuilder.create();
		response.setContentType("text/html;charset=utf-8");
		String result = newsService.addNews(news);
		try {
			response.getWriter().write(gson.toJson(result));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//分页查询
	public void queryNewsByPage() {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();// 格式化json数据
		Gson gson = gsonBuilder.serializeNulls().create();
		response.setContentType("text/html;charset=utf-8");
		QueryByPageVO queryResult = newsService.queryNewsByPage(10,currentPage);
		try {
			response.getWriter().write(gson.toJson(queryResult));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//批量删除
	public void batchDelete() {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();// 格式化json数据
		Gson gson = gsonBuilder.create();
		response.setContentType("text/html;charset=utf-8");
		String result = newsService.batchDelete(ids);
		try {
			response.getWriter().write(gson.toJson(result));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

package com.exhibition.news.service;

import java.util.List;

import com.exhibition.domain.News;
import com.exhibition.production.VO.QueryByPageVO;

public interface newsService {

	List<News> getNewsInfo();

	String addNews(News news);

	QueryByPageVO queryNewsByPage(int pagesize,int currentPage);

	String batchDelete(String ids);

}

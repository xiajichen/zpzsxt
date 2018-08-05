package com.exhibition.news.dao;

import java.util.List;

import com.exhibition.domain.News;

public interface newsDao {
	
	public void saveOrUpdateObject(Object obj);
	public List<News> getNewsInfo();
	public int countNews();
	public List<News> getNewsInfoByPage(int offset, int length);
	public News getNewsById(String id);
}

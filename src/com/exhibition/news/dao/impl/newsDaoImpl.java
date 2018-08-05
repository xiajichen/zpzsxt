package com.exhibition.news.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.exhibition.domain.News;
import com.exhibition.news.dao.newsDao;

public class newsDaoImpl implements newsDao{
	/**
	 * session注入
	 */
	private SessionFactory sessionFactory;

	public Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public void saveOrUpdateObject(Object obj) {
		Session session = getSession();
		session.saveOrUpdate(obj);
		session.flush();
	}
	
	@Override
	public List<News> getNewsInfo() {
		// TODO Auto-generated method stub
		Session session = getSession();
		String hql = "from News where newsIsdelete ='0' order by newsCreationtime desc";
		Query query = session.createQuery(hql).setMaxResults(4);
		List<News> news = (List<News>) query.list();
		return news;
	}

	@Override
	public int countNews() {
		// TODO Auto-generated method stub
		Session session = getSession();
		String hql = "select count(*) from News where newsIsdelete ='0'";
		Query query = session.createQuery(hql);
		return Integer.parseInt(query.list().get(0).toString());
	}

	@Override
	public List<News> getNewsInfoByPage(int offset, int length) {
		Session session = getSession();
		String hql = "from News where newsIsdelete ='0' order by newsCreationtime desc";
		Query query = session.createQuery(hql);
		query.setFirstResult(offset);
		query.setMaxResults(length);
		List<News> news = (List<News>) query.list();
		return news;
	}

	@Override
	public News getNewsById(String id) {
		Session session = getSession();
		String hql = "from News where newsIsdelete ='0' and newsId = '"+id+"'";
		Query query = session.createQuery(hql);
		News news = (News) query.uniqueResult();
		return news;
	}
}

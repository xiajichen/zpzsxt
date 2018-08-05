package com.exhibition.productiontype.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.exhibition.domain.carousel;
import com.exhibition.domain.production_type;
import com.exhibition.productiontype.DTO.TypeCarouselDTO;
import com.exhibition.productiontype.dao.ProductionTypeDao;

/**
 * 作品类型管理Dao层实现层
 * 
 * @author LL
 * @date 2018/07/18
 *
 */
public class ProductionTypeDaoImpl implements ProductionTypeDao {
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

	/**
	 * session注入结束
	 */

	/**
	 * 保存、更新对象
	 * 
	 * @author ll
	 * @date 2018/07/16
	 * @param obj
	 * @modify ll 2018/07/16
	 */
	@Override
	public void saveOrUpdateObject(Object obj) {
		Session session = getSession();
		session.saveOrUpdate(obj);
		session.flush();
	}

	/**
	 * 分页获取对象，这里是获取一页中的数据
	 * 
	 * @param hql
	 * @param offset
	 *            当前页
	 * @param length
	 *            获取每页记录数
	 * @return
	 */
	@Override
	public List<?> queryForPage(String hql, int offset, int length) {
		Session session = getSession();
		Query query = session.createQuery(hql);
		query.setFirstResult((offset - 1) * length);
		query.setMaxResults(length);
		List<?> list = query.list();
		session.clear();
		return list;
	}

	/**
	 * 获取对象总数量
	 * 
	 * @param hql
	 * @return
	 */
	@Override
	public int getCount(String hql) {
		Session session = getSession();
		Query query = session.createQuery(hql);
		if (query.list().size() > 0) {
			return Integer.parseInt(query.list().get(0).toString());
		} else {
			return 0;
		}
	}

	/**
	 * 移除对象
	 */
	@Override
	public int removeObject(Object obj) {
		getSession().delete(obj);
		return 1;
	}

	/**
	 * 获取对象列表
	 */
	@Override
	public List<?> listObject(String hql) {
		Session session = getSession();
		Query query = session.createQuery(hql);
		List<?> list = query.list();
		session.clear();
		return list;
	}
/**
 * 根据id查询作品类型
 */
	@Override
	public production_type getTypeById( String trim) {
		production_type type = new production_type();
		Session session = getSession();
		String hql ="from production_type where production_type_isdelete='0' and production_type_id= :ID";
		Query query = session.createQuery(hql);
		query.setParameter("ID", trim);
		type =(production_type) query.uniqueResult();
		 return type;
	}
	/**
	 * 根据类型id查询轮播图
	 */
	@Override
	public carousel getCarouselById(String trim) {
		carousel carousel = new carousel();
		Session session = getSession();
		String hql = "from carousel where  carousel_isdelete='0' and carousel_belong= :ID";
		Query query = session.createQuery(hql);
		query.setParameter("ID", trim);
		carousel = (carousel) query.uniqueResult();
		return carousel;
	}
	/**
	 * 根据类型id查询轮播图
	 */
	@Override
	public TypeCarouselDTO getNewCarouselById(String trim) {
		TypeCarouselDTO typeCarouselDTO = new TypeCarouselDTO();
		Session session = getSession();
		String hql = "select new com.exhibition.productiontype.DTO.TypeCarouselDTO(carousel,type) from carousel carousel, production_type type where carousel_isdelete='0' and carousel_belong=production_type_id and production_type_id= :ID";
		Query query = session.createQuery(hql);
		query.setParameter("ID", trim);
		typeCarouselDTO = (TypeCarouselDTO) query.uniqueResult();
		return typeCarouselDTO;
	}
	/*/exhibitionsystem/src/com/exhibition/productiontype/DTO/TypeCarouselDTO.java*/
}

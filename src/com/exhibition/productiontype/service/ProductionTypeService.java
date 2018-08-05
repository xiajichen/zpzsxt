package com.exhibition.productiontype.service;

import java.util.List;

import com.exhibition.domain.carousel;
import com.exhibition.domain.production_type;
import com.exhibition.productiontype.DTO.TypeCarouselDTO;

/**
 * 作品类型管理Service层
 * 
 * @author LL
 * @date 2018/07/18
 *
 */
public interface ProductionTypeService {
	/**
	 * 添加作品类型
	 * 
	 * @param productionType
	 * @param carousel
	 * @return
	 */
	/*
	 * public production_type addProductionType(production_type productionType,
	 * List<carousel> ListCarousel);
	 */

	String addProductionType(production_type productionType, carousel carousel);

	/**
	 * 批量删除类型
	 * 
	 * @param idList
	 * @return
	 */
	public String deleteProductionType(String idList);

	/**
	 * 修改类型
	 * 
	 * @param productionType
	 * @return
	 */

	public String updateProductionType(production_type productionType);

	public TypeCarouselDTO querryProductionType(production_type productionType);

	String addCarousel1(carousel carousel);

	String addProductionType1(production_type productionType);

	String updateType(production_type productionType);

	String updateCarousel(carousel carousel);
	
	//得到单个类型
	public production_type production_type(String production_type_id);
	
	//得到轮播图类型
	public carousel carousel(String carousel_id);


}

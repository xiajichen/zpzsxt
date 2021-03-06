package com.exhibition.production.VO;

import java.util.List;

import com.exhibition.production.DTO.InfoTypePhotoDTO;
import com.exhibition.production.DTO.PicTypeInfoDTO;
import com.exhibition.production.DTO.ProductionDTO;

/**
 * 显示作品的VO
 * @author Administrator
 *
 */
public class ShowAllproductionVO {
/**
 * 类型信息图片DTO
 */
	private List<PicTypeInfoDTO> listPicTypeInfoDTO;
	
	private List<ProductionDTO> listProductionDTO;
	
	private List<InfoTypePhotoDTO> listInfoTypePhotoDTO;

	/**
	 * 总记录条数
	 */
	private int totalRecords = 0;
	/**
	 * 当前页
	 */
	private int pageIndex = 1;
	/**
	 * 页数
	 */
	private int pageSize = 16;
	/**
	 * 总页数
	 */
	private int totalPages = 1;
	/**
	 * 模糊查询关键字
	 */
	private String search;
	/**
	 * 上一页
	 */
	private boolean havePrePage = false;
	/**
	 * 下一页
	 */
	private boolean haveNextPage = false;
	public List<PicTypeInfoDTO> getListPicTypeInfoDTO() {
		return listPicTypeInfoDTO;
	}
	public void setListPicTypeInfoDTO(List<PicTypeInfoDTO> listPicTypeInfoDTO) {
		this.listPicTypeInfoDTO = listPicTypeInfoDTO;
	}
	public List<ProductionDTO> getListProductionDTO() {
		return listProductionDTO;
	}
	public void setListProductionDTO(List<ProductionDTO> listProductionDTO) {
		this.listProductionDTO = listProductionDTO;
	}
	public int getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public boolean isHavePrePage() {
		return havePrePage;
	}
	public void setHavePrePage(boolean havePrePage) {
		this.havePrePage = havePrePage;
	}
	public boolean isHaveNextPage() {
		return haveNextPage;
	}
	public void setHaveNextPage(boolean haveNextPage) {
		this.haveNextPage = haveNextPage;
	}
	
	public List<InfoTypePhotoDTO> getListInfoTypePhotoDTO() {
		return listInfoTypePhotoDTO;
	}
	public void setListInfoTypePhotoDTO(List<InfoTypePhotoDTO> listInfoTypePhotoDTO) {
		this.listInfoTypePhotoDTO = listInfoTypePhotoDTO;
	}
	@Override
	public String toString() {
		return "ShowAllproductionVO [listPicTypeInfoDTO=" + listPicTypeInfoDTO + ", listProductionDTO="
				+ listProductionDTO + ", listInfoTypePhotoDTO=" + listInfoTypePhotoDTO + ", totalRecords="
				+ totalRecords + ", pageIndex=" + pageIndex + ", pageSize=" + pageSize + ", totalPages=" + totalPages
				+ ", search=" + search + ", havePrePage=" + havePrePage + ", haveNextPage=" + haveNextPage + "]";
	}
}

package com.exhibition.domain;

/**
 * News entity. @author MyEclipse Persistence Tools
 */

public class News implements java.io.Serializable {

	// Fields

	private String newsId;
	private String newsLink;
	private String newsCreationtime;
	private String newsModifytime;
	private Integer newsIsdelete;
	private String title;
	private String introduction;
	private String picture;

	// Constructors

	/** default constructor */
	public News() {
	}

	/** minimal constructor */
	public News(String newsLink) {
		this.newsLink = newsLink;
	}

	/** full constructor */
	public News(String newsLink, String newsCreationtime,
			String newsModifytime, Integer newsIsdelete) {
		this.newsLink = newsLink;
		this.newsCreationtime = newsCreationtime;
		this.newsModifytime = newsModifytime;
		this.newsIsdelete = newsIsdelete;
	}

	// Property accessors

	public String getNewsId() {
		return this.newsId;
	}

	public void setNewsId(String newsId) {
		this.newsId = newsId;
	}

	public String getNewsLink() {
		return this.newsLink;
	}

	public void setNewsLink(String newsLink) {
		this.newsLink = newsLink;
	}

	public String getNewsCreationtime() {
		return this.newsCreationtime;
	}

	public void setNewsCreationtime(String newsCreationtime) {
		this.newsCreationtime = newsCreationtime;
	}

	public String getNewsModifytime() {
		return this.newsModifytime;
	}

	public void setNewsModifytime(String newsModifytime) {
		this.newsModifytime = newsModifytime;
	}

	public Integer getNewsIsdelete() {
		return this.newsIsdelete;
	}

	public void setNewsIsdelete(Integer newsIsdelete) {
		this.newsIsdelete = newsIsdelete;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "News [newsId=" + newsId + ", newsLink=" + newsLink + ", newsCreationtime=" + newsCreationtime
				+ ", newsModifytime=" + newsModifytime + ", newsIsdelete=" + newsIsdelete
				+ ", title=" + title + ", introduction=" + introduction + ", picture=" + picture + "]";
	}


}
package com.golovko.tasksystem.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;


@Entity
@Table(name="Task")
public class Task extends BaseModel implements Serializable {
	private String text;

	public Task() {	}
	
	public Task(String text) {
		super();
		this.text = text;
	}

	public String getText() {
		return text;
	}
	
	public void setText(String name) {
		this.text = name;
	}

	@Override
	public String toString() {
		return " {\"id\":\"" + id + "\",\"name\":\"" + text + "\"}";
	}
}

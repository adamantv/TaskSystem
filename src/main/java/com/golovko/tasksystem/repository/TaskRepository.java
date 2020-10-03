package com.golovko.tasksystem.repository;

import com.golovko.tasksystem.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}

package com.golovko.tasksystem.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.golovko.tasksystem.model.Task;
import com.golovko.tasksystem.repository.TaskRepository;


@RestController
@RequestMapping("api/")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = "tasks", method = RequestMethod.GET)
    public List<Task> list() {
        return taskRepository.findAll();
    }

    @RequestMapping(value = "tasks", method = RequestMethod.POST)
    public Task create(@RequestBody Task task) {
        return taskRepository.saveAndFlush(task);
    }

    @RequestMapping(value = "tasks/{id}", method = RequestMethod.GET)
    public Task get(@PathVariable Long id) {
        return taskRepository.findOne(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "tasks/{id}", method = RequestMethod.PUT)
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        Task existingTask = taskRepository.findOne(id);
        BeanUtils.copyProperties(task, existingTask);
        return taskRepository.saveAndFlush(existingTask);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "tasks/{id}", method = RequestMethod.DELETE)
    public Task delete(@PathVariable Long id) {
        Task existingTask = taskRepository.findOne(id);
        taskRepository.delete(existingTask);
        return existingTask;
    }
}

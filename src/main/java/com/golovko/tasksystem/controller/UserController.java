package com.golovko.tasksystem.controller;

import com.golovko.tasksystem.model.User;
import com.golovko.tasksystem.repository.UserRepository;
import com.golovko.tasksystem.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("api/")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	UserService userService;

	@RequestMapping(value = "users", method = RequestMethod.GET)
	public List<User> list() {
	        return userRepository.findAll();
	}

	@RequestMapping(value = "users", method = RequestMethod.POST)
	public User create(@RequestBody User user) {
		user.setPassword(user.getPassword());
		return userRepository.saveAndFlush(user);
	}

	@RequestMapping(value = "users/{id}", method = RequestMethod.GET)
	public User get(@PathVariable Long id) {
		return userRepository.findOne(id);
	}

	@RequestMapping(value = "users/{id}", method = RequestMethod.PUT)
	public User update(@PathVariable Long id, @RequestBody User user) throws NotFoundException {
		User existingUser = userRepository.findOne(id);
		BeanUtils.copyProperties(user, existingUser, "password");
		return userRepository.saveAndFlush(existingUser);
	}

	@RequestMapping(value = "users/{id}", method = RequestMethod.DELETE)
	public User delete(@PathVariable Long id) {
		User existingUser = userRepository.findOne(id);
		if (existingUser.getId() == userService.getCurrentUser().getId())
			throw new RuntimeException("Запрещено удалять текущего пользователя");
		userRepository.delete(existingUser);
		return existingUser;
	}
		




}

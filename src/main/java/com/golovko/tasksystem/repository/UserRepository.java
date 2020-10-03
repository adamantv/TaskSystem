package com.golovko.tasksystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golovko.tasksystem.model.User;

//@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findOneByEmail(String email);
	public User findOneByUsername(String username);

}
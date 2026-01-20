package io.hjmoons.devops.todo.repository;

import io.hjmoons.devops.todo.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}

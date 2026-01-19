package com.example.demo.todo.service;

import com.example.demo.todo.domain.dto.TodoCreateRequest;
import com.example.demo.todo.domain.dto.TodoUpdateRequest;
import com.example.demo.todo.domain.entity.Todo;
import com.example.demo.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(TodoCreateRequest todoCreateRequest) {
        Todo todo = Todo.builder()
                .title(todoCreateRequest.getTitle())
                .completed(false)
                .build();
        return todoRepository.save(todo);
    }

    public Optional<Todo> getTodo(Long id) {
        return todoRepository.findById(id);
    }

    public List<Todo> getTodoList() {
        return todoRepository.findAll();
    }

    public Todo updateTodo(Long id, TodoUpdateRequest todoUpdateRequest) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        todo.setTitle(todoUpdateRequest.getTitle());

        return todoRepository.save(todo);
    }

    public Todo updateToggleTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        todo.setCompleted(!todo.isCompleted());

        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));
        todoRepository.delete(todo);
    }
}

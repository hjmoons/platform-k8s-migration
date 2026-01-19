package com.example.demo.exception;

public class RegisterFailedException extends RuntimeException {
    public RegisterFailedException(String message) {
        super(message);
    }
}

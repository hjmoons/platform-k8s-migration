package io.hjmoons.devops.exception;

public class RegisterFailedException extends RuntimeException {
    public RegisterFailedException(String message) {
        super(message);
    }
}

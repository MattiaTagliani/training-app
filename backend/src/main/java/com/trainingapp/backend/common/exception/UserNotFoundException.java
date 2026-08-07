package com.trainingapp.backend.common.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(UUID userId){
        super("User with id " + userId + " was not found.");
    }

    public UserNotFoundException(String email){
        super("User with email " + email + " was not found.");
    }
}

package com.trainingapp.backend.common.exception;

public class UserNotDeletedException extends RuntimeException{

    public UserNotDeletedException(String email){
        super("User with email " + email + " is not deleted");
    }
}

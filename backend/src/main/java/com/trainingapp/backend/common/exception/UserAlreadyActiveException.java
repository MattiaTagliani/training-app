package com.trainingapp.backend.common.exception;

public class UserAlreadyActiveException extends RuntimeException{

    public UserAlreadyActiveException(String email){
        super("User with email " + email +" is not deleted");
    }
}

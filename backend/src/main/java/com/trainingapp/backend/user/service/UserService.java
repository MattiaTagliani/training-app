package com.trainingapp.backend.user.service;

import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.UserStatus;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponse create(CreateUserRequest request);
    UserResponse restore(String email);

    UserResponse findById(UUID userId);

    List<UserResponse> getAll();
    List<UserResponse> getAll(UserStatus status);
    void delete(UUID userId);
}

package com.trainingapp.backend.user.service;

import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponse create(CreateUserRequest request);

    UserResponse findById(UUID userId);

    List<UserResponse> getAll();

    void delete(UUID userId);
}

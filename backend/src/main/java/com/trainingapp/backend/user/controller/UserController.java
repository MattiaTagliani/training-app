package com.trainingapp.backend.user.controller;

import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.RestoreUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.UserStatus;
import com.trainingapp.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public UserResponse create(
            @Valid
            @RequestBody CreateUserRequest request) {

        return service.create(request);
    }

    @PostMapping("/restore")
    public UserResponse restore(
            @Valid
            @RequestBody RestoreUserRequest request){
        return service.restore(request.email());
    }

    @GetMapping("/{userId}")
    public UserResponse findById(
            @PathVariable UUID userId) {

        return service.findById(userId);
    }

    @GetMapping
    public List<UserResponse> findAll(
            @RequestParam(required = false)UserStatus status){

        if(status == null){
            return service.getAll();
        }


        return service.getAll(status);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID userId){

        service.delete(userId);
    }




}

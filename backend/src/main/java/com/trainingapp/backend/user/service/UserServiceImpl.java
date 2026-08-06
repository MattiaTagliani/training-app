package com.trainingapp.backend.user.service;

import com.trainingapp.backend.common.exception.UserNotFoundException;
import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.User;
import com.trainingapp.backend.user.entity.UserStatus;
import com.trainingapp.backend.user.mapper.UserMapper;
import com.trainingapp.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    public UserResponse create(CreateUserRequest request) {

//        User user = mapper.toEntity(request);
//        User savedUser = repository.save(user);
//        return mapper.toResponse(savedUser);

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .status(UserStatus.ACTIVE)
                .build();

        repository.save(user);

        return mapper.toResponse(user);
    }

    @Override
    public UserResponse findById(UUID userId) {

        User user = repository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return mapper.toResponse(user);
    }

    @Override
    public List<UserResponse> getAll() {

        return repository.findAll()
                .stream()
                .filter(user -> user.getStatus() == UserStatus.ACTIVE)
                .map(mapper::toResponse)
                .toList();

    }

    @Override
    public void delete(UUID userId) {

        User user = repository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        user.setStatus(UserStatus.DELETED);

        repository.save(user);

    }
}

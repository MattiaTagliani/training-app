package com.trainingapp.backend.user.service;

import com.trainingapp.backend.common.exception.EmailAlreadyExistsException;
import com.trainingapp.backend.common.exception.UserAlreadyActiveException;
import com.trainingapp.backend.common.exception.UserNotDeletedException;
import com.trainingapp.backend.common.exception.UserNotFoundException;
import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.User;
import com.trainingapp.backend.user.entity.UserStatus;
import com.trainingapp.backend.user.mapper.UserMapper;
import com.trainingapp.backend.user.repository.UserRepository;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository repository;
    private final UserMapper mapper;

    @Override
    public UserResponse create(CreateUserRequest request) {

        Optional<User> existing = repository.findByEmail(request.email());

        if(existing.isPresent()){
            throw new EmailAlreadyExistsException(request.email());
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .status(UserStatus.ACTIVE)
                .build();

        User savedUser = repository.save(user);

        return mapper.toResponse(savedUser);
    }

    @Override
    public UserResponse restore(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if(user.getStatus() != UserStatus.DELETED){
            throw new UserNotDeletedException(email);
        }

        user.setStatus(UserStatus.ACTIVE);

        User restoredUser = repository.save(user);

        return mapper.toResponse(restoredUser);
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
    public List<UserResponse> getAll(UserStatus status) {

        return repository.findAllByStatus(status)
                .stream()
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

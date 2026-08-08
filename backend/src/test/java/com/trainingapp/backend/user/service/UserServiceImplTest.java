package com.trainingapp.backend.user.service;


import com.trainingapp.backend.common.exception.EmailAlreadyExistsException;
import com.trainingapp.backend.common.exception.UserNotDeletedException;
import com.trainingapp.backend.common.exception.UserNotFoundException;
import com.trainingapp.backend.user.dto.CreateUserRequest;
import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.User;
import com.trainingapp.backend.user.entity.UserStatus;
import com.trainingapp.backend.user.mapper.UserMapper;
import com.trainingapp.backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository repository;
    @Mock
    private UserMapper mapper;
    @InjectMocks
    private UserServiceImpl service;

    @Test
    void create_shouldCreateUser_whenEmailDoesNotExist(){

        CreateUserRequest request = new CreateUserRequest(
                "ciao",
                "betti",
                "ciao.betti@gmail.com",
                "ciaobettipsw"
        );

        User user = User.builder()
                .firstName("ciao")
                .lastName("betti")
                .email("ciao.betti@gmail.com")
                .password("ciaobettipsw")
                .status(UserStatus.ACTIVE)
                .build();

        UserResponse response = mock(UserResponse.class);

        //when creating with this email, pretend it doesn't exists
        when(repository.findByEmail(request.email()))
                .thenReturn(Optional.empty());

        //when saving any user, return the user i built before
        when(repository.save(any(User.class)))
                .thenReturn(user);

        //when using the mapper, return a UserResponse.class
        when(mapper.toResponse(user))
                .thenReturn(response);

        //run the actual service
        UserResponse result = service.create(request);
        //after running the service, the result need to be a UserResponse.class
        assertSame(response, result);

        //check if the service actually tried to save the user
        verify(repository).findByEmail(request.email());
        verify(repository).save(any(User.class));
        verify(mapper).toResponse(user);

    }


    @Test
    void create_shouldThrowException_whenEmailAlreadyExists(){

        CreateUserRequest request = new CreateUserRequest(
                "ciao2",
                "betti2",
                "ciao.betti2@gmail.com",
                "ciaobetti2psw"
        );

        User existingUser = User.builder()
                .firstName("ciao2")
                .lastName("betti2")
                .email("ciao.betti2@gmail.com")
                .password("ciaobettiesistente")
                .status(UserStatus.ACTIVE)
                .build();

        //when looking for email, find one already
        when(repository.findByEmail(request.email()))
                .thenReturn(Optional.of(existingUser));

        //throws the appropriate exception
        assertThrows(
            EmailAlreadyExistsException.class,
                () -> service.create(request)
        );

        //check that it never saved any user
        verify(repository).findByEmail(request.email());
        verify(repository, never())
                .save(any(User.class));

    }


    @Test
    void findById_shouldReturnUser_whenUserExists(){

        UUID userId = UUID.randomUUID();

        User user = User.builder()
                .firstName("ciao")
                .lastName("betti")
                .email("ciao.betti@gmail.com")
                .password("ciaobettipsw")
                .status(UserStatus.ACTIVE)
                .build();

        UserResponse response = mock(UserResponse.class);

        when(repository.findById(userId))
                .thenReturn(Optional.of(user));

        when(mapper.toResponse(user))
                .thenReturn(response);

        UserResponse result = service.findById(userId);

        assertSame(response, result);

        verify(repository).findById(userId);
        verify(mapper).toResponse(user);

    }


    @Test
    void findById_shouldThrowException_whenUserDoesNotExists(){

        UUID userId = UUID.randomUUID();

        when(repository.findById(userId))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> service.findById(userId)
        );

        verify(repository).findById(userId);
        verify(mapper, never()).toResponse(any(User.class));

    }

    @Test
    void delete_shouldSetStatusDeleted() {

        UUID userId = UUID.randomUUID();

        User user = User.builder()
                .userId(userId)
                .firstName("ciao")
                .lastName("betti")
                .email("ciao.betti@gmail.com")
                .password("ciaobettipsw")
                .status(UserStatus.ACTIVE)
                .build();


        when(repository.findById(userId))
                .thenReturn(Optional.of(user));

        service.delete(userId);

        assertEquals(UserStatus.DELETED, user.getStatus());

        verify(repository).findById(userId);
        verify(repository).save(user);
    }


    @Test
    void restore_shouldSetStatusActive_whenUserIsDeleted() {

        String email = "ciao.betti@gmail.com";

        User user = User.builder()
                .userId(UUID.randomUUID())
                .firstName("ciao")
                .lastName("betti")
                .email(email)
                .password("ciaobettipsw")
                .status(UserStatus.DELETED)
                .build();

        UserResponse response = mock(UserResponse.class);

        when(repository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(repository.save(user))
                .thenReturn(user);

        when(mapper.toResponse(user))
                .thenReturn(response);

        UserResponse result = service.restore(email);

        assertEquals(UserStatus.ACTIVE, user.getStatus());
        assertSame(response, result);

        verify(repository).findByEmail(email);
        verify(repository).save(user);
        verify(mapper).toResponse(user);
    }


    @Test
    void restore_shouldThrowException_whenUserIsNotDeleted() {

        String email = "ciao.betti@gmail.com";

        User user = User.builder()
                .userId(UUID.randomUUID())
                .firstName("John")
                .lastName("Doe")
                .email(email)
                .password("password")
                .status(UserStatus.ACTIVE)
                .build();

        when(repository.findByEmail(email))
                .thenReturn(Optional.of(user));

        assertThrows(
                UserNotDeletedException.class,
                () -> service.restore(email)
        );

        verify(repository).findByEmail(email);

        verify(repository, never())
                .save(any(User.class));
    }

}

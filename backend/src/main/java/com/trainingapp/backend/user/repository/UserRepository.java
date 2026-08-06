package com.trainingapp.backend.user.repository;

import com.trainingapp.backend.user.entity.User;
import com.trainingapp.backend.user.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserIdAndStatus(UUID userId, UserStatus status);

    List<User> findAllByStatus(UserStatus status);

    boolean existsByEmail(String email);
}

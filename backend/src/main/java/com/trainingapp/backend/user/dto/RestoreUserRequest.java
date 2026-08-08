package com.trainingapp.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RestoreUserRequest(

        @Email(message = "Email must be valid")
        @NotBlank(message = "Email is required")
        String email
) {
}

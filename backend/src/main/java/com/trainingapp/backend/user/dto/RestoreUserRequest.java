package com.trainingapp.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RestoreUserRequest(

        @NotBlank
        @Email
        String email
) {
}

package com.trainingapp.backend.user.mapper;

import com.trainingapp.backend.user.dto.UserResponse;
import com.trainingapp.backend.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);
}

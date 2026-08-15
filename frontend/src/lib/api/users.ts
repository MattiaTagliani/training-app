import { apiFetch } from "@/lib/api/client";
import type { User } from "@/types/user";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RestoreUserRequest {
  email: string;
}

export function getUsers(): Promise<User[]> {
  return apiFetch<User[]>("/api/users");
}

export function getUser(userId: string): Promise<User> {
  return apiFetch<User>(`/api/users/${userId}`);
}

export function createUser(request: CreateUserRequest): Promise<User> {
  return apiFetch<User>("/api/users", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function updateUser(
  userId: string,
  request: UpdateUserRequest,
): Promise<User> {
  return apiFetch<User>(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(request),
  });
}

export function deleteUser(userId: string): Promise<void> {
  return apiFetch<void>(`/api/users/${userId}`, {
    method: "DELETE",
  });
}

export function restoreUser(request: RestoreUserRequest): Promise<User> {
  return apiFetch<User>("/api/users/restore", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

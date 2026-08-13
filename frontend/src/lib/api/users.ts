import { apiFetch } from "@/lib/api/client";
import type { User } from "@/types/user";

export function getUsers(): Promise<User[]> {
  return apiFetch<User[]>("/api/users");
}

export function getUser(): Promise<User> {
  return apiFetch<User>(`/api/users/${userId}`);
}

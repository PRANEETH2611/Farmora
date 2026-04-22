export type FarmoraRole = "user" | "creator" | "guest";

export function persistSelectedRole(role: FarmoraRole) {
  window.localStorage.setItem("farmora:selected-role", role);
  window.sessionStorage.setItem("farmora:active-role", role);
}

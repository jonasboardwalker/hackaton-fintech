export {};

export type Role = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  }
  interface UserPublicMetadata {
    role?: Role;
  }
}

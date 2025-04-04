export {};

export type Role = "admin";

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

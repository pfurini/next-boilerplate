export const rolesAsObject = {
  admin: "admin",
  user: "user",
} as const

export const resetPasswordExpiration = 1000 * 60 * 60 * 24 // 24 hours
export const resendResetPasswordExpiration = 1000 * 60 * 5 // 5 minutes
export const emailVerificationExpiration = 1000 * 60 * 60 * 24 * 3 // 3 days
export const resendEmailVerificationExpiration = 1000 * 60 * 5 // 5 minutes

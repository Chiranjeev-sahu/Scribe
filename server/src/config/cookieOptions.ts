const baseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as
    | 'none'
    | 'lax',
};

export const accessTokenCookieOptions = {
  ...baseOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
  ...baseOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

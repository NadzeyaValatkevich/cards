export enum sortDir {
  asc = '0',
  desc = '1',
}

export enum AppRoutes {
  ROOT = '/',
  PROFILE = '/profile',
  SIGN_IN = '/login',
  SIGN_UP = '/registration',
  REC_PASSWORD = '/forgot',
  CHECK_EMAIL = '/check-email',
  SET_NEW_PASSWORD = '/set-new-password/:resetPasswordToken',
  PACKS = '/packs',
  CARDS = '/cards/card',
  LEARN = '/learn',
  Page_Not_Found = '*',
}

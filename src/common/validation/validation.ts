const REQUIRED_FIELD = 'Field is required'

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length <= 6) {
      return 'Password must be more than 7 characters...'
    }

    return true
  },
}

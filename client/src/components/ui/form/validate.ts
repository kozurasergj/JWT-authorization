import { IAuthFormValues } from '../../../models/IForm'

export const validateForm = (values: IAuthFormValues) => {
  const errors = {} as IAuthFormValues
  const passwordLength = 6

  if (!validateEmail(values.email)) {
    errors.email = `Please enter correct email address`
  }

  if (!validatePassword(values.password)) {
    errors.password = 'The password must contain letters and numbers'
  }

  if (!values.email) {
    errors.email = 'Enter your email'
  }

  if (!values.password) {
    errors.password = 'Enter the password'
  }

  if (values.password?.length < passwordLength) {
    errors.password = `Password length must be at least ${passwordLength} characters`
  }

  return errors
}

export const validateEmail = (email: string) => {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(String(email).toLowerCase())
}

export const validatePassword = (password: string) => {
  const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]+)$/
  return re.test(password)
}

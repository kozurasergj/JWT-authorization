import { IUser } from './IUser'

export interface IAuthFormValues extends Pick<IUser, 'email'> {
  password: string
}

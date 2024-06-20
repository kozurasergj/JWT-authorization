import { AxiosResponse } from 'axios'
import $api from '../http'
import { AuthResponse } from '../types/response/authResponse'

export default class AuthService {
  static login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password })
  }

  static registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password })
  }

  static logout(): Promise<void> {
    return $api.post('/logout')
  }
}

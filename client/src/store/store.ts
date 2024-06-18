import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/authResponse'
import AuthService from '../services/AuthService'

export default class Store {
  user = {} as IUser
  isAuth: boolean = false
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try {
      const res = await AuthService.login(email, password)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  async registration(email: string, password: string) {
    try {
      const res = await AuthService.registration(email, password)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (err) {
      console.log(err)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const res = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_API_URL}/refresh`,
        {
          withCredentials: true,
        }
      )
      console.log(res)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err) {
      console.log(err)
    } finally {
      this.setLoading(false)
    }
  }
}

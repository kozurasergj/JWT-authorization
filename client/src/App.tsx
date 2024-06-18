import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import { IUser } from './models/IUser'
import UserService from './services/UserService'

const App = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  const getUsers = async () => {
    try {
      const res = await UserService.fetchUsers()
      console.log(res)
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (store.isLoading) {
    return <CircularProgress />
  }

  if (!store.isAuth) {
    return (
      <div className='flex flex-col gap-8 items-center min-h-full'>
        <h1 className='mb-8 text-2xl'>
          {store.isAuth
            ? `User ${store.user.email} is authorized`
            : 'You is NOT authorized'}
        </h1>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8 items-center min-h-full'>
      <h1 className='mb-8 text-2xl'>
        {store.isAuth
          ? `User ${store.user.email} is authorized`
          : 'You is NOT authorized'}
      </h1>
      <Button onClick={() => store.logout()} variant='contained'>
        Logout
      </Button>
      <Button onClick={getUsers} variant='contained'>
        List all users
      </Button>
      <List>
        {users.map((user: IUser) => (
          <ListItem disablePadding key={user.id}>
            <ListItemButton>
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default observer(App)

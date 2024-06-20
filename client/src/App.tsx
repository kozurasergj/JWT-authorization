import { Button, CircularProgress } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import ListUser from './components/ListUser'
import Form from './components/ui/form/Form'
import { Context } from './main'
import UserService from './services/UserService'
import { IUser } from './types/IUser'

const App = observer(() => {
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
        <Form />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8 items-center min-h-full'>
      <h1 className='mb-2 text-2xl'>
        {store.isAuth
          ? `User ${store.user.email} is authorized`
          : 'You is NOT authorized'}
      </h1>
      <h1 className='mb-8 text-2xl'>
        {store.user.isActivated ? `Account verified` : 'CONFIRM YOUR ACCOUNT!!!!'}
      </h1>
      <Button onClick={() => store.logout()} variant='contained'>
        Logout
      </Button>
      <Button onClick={getUsers} variant='contained'>
        List all users
      </Button>
      <ListUser users={users} />
    </div>
  )
})

export default App

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Context } from '../main'

const LoginForm = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      className='flex flex-col items-center gap-5 mx-auto w-[200px] sm:w-auto'
    >
      <TextField
        id='filled-basic'
        label='Email'
        variant='filled'
        className='bg-slate-400 w-full'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <FormControl variant='filled' className='bg-slate-400 w-full'>
        <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
        <FilledInput
          id='filled-adornment-password'
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className='flex flex-col sm:flex-row items-stretch justify-between gap-5'>
        <Button onClick={() => store.login(email, password)} variant='contained'>
          Login
        </Button>
        <Button onClick={() => store.registration(email, password)} variant='contained'>
          Registration
        </Button>
      </div>
    </Box>
  )
}

export default observer(LoginForm)

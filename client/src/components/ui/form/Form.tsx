import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Context } from '../../../main'
import { IAuthFormValues } from '../../../models/IForm'
import { validateForm } from './validate'

const Form = observer(() => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { store } = useContext(Context)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values: IAuthFormValues) => {
        const errors = validateForm(values)
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center gap-5 mx-auto w-[200px] sm:w-[400px]'
        >
          <div className='w-full'>
            <TextField
              label='Email'
              variant='filled'
              className='bg-slate-400 w-full'
              type='text'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={false}
            />
            <p className='text-sm text-red'>
              {' '}
              {errors.email && touched.email && errors.email}
            </p>
          </div>
          <div className='w-full'>
            <FormControl variant='filled' className='bg-slate-400 w-full'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <FilledInput
                id='filled-adornment-password'
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name='password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handlerShowPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className='text-sm !text-[#ff0000]'>
              {errors.password && touched.password && errors.password}
            </p>
          </div>
          <div className='flex flex-col sm:flex-row items-stretch justify-between gap-5'>
            <Button
              onClick={() => store.login(values.email, values.password)}
              variant='contained'
              type='submit'
              disabled={isSubmitting}
            >
              Login
            </Button>
            <Button
              onClick={() => store.registration(values.email, values.password)}
              variant='contained'
              type='submit'
              disabled={isSubmitting}
            >
              SignUp
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
})

export default Form

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { IUser } from '../types/IUser'

interface IListUser {
  users: IUser[]
}

const ListUser = ({ users }: IListUser) => {
  return (
    <List>
      {users.map((user: IUser, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton>
            <ListItemText primary={user.email} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default ListUser

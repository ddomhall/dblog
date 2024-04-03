import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'

export default function Search() {
  const [users, setUsers] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users?search=${searchParams.get('search')}`).then(res => res.json()).then(res => setUsers(res))
  },[])

  return (
    <div className='w-80 m-auto'>
      {users == [] ? 'no users found' : users.map(u => <a href={'/users/' + u._id}><section>{u.username}</section></a>)}
    </div>
  )
}

import {useParams, Link} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'
import PostListItem from './PostListItem.jsx'

export default function Profile() {
  const [edit, setEdit] = useState(false)
  const [viewer, setViewer] = useState({following: []})
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const {id}= useParams()
  const {session} = useContext(SessionContext)


  useEffect(() => {
    if (session) {
    fetch(`http://localhost:3000/users/${session}`).then(res => res.json()).then(res => setViewer(res))
    }
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json()).then(res => setUser(res))
    fetch(`http://localhost:3000/users/${id}/posts`).then(res => res.json()).then(res => setPosts(res))
  },[])

  async function editUser(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
      })
    }).then(window.location.reload())
  }

  async function deleteUser() {
    if (window.confirm(`you are deleting the account "${user.username}"`))
    fetch(`http://localhost:3000/users/${id}/delete`, {method: 'DELETE'}).then(Cookies.remove('session')).then(document.location.replace('/'))
  }

  async function followUser() {
    fetch(`http://localhost:3000/users/${id}/follow`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: viewer._id
      })
    }).then(window.location.reload())
  }

  async function unfollowUser() {
    fetch(`http://localhost:3000/users/${id}/unfollow`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: viewer._id
      })
    }).then(window.location.reload())
  }

  function messageUser() {
    fetch('http://localhost:3000/conversations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body : JSON.stringify({
        recipient: id
      })
    }).then(res => res.json()).then(res => window.location.replace('/conversations/' + res._id))
  }

  return(
    <div className='w-96 m-auto'>
      <div className='flex justify-between'>
        {edit ?
          <form onSubmit={editUser} className='flex gap-2'>
            <input name='username' placeholder='username' className='w-[187px] rounded-xl px-2'/>
            <input type='submit' value='edit' className='ring ring-white rounded-xl px-2'/>
          </form> :
          <h1>{user.username}</h1>
        }
        {session ? 
          <div>
            {session == id ?
              <div className='flex gap-3'>
                {edit ?
                  <button onClick={() => setEdit(false)} className='ring ring-white rounded-xl px-2'>cancel</button> : 
                  <button onClick={() => setEdit(true)} className='ring ring-white rounded-xl px-2'>edit</button>
                }
                <button onClick={deleteUser} className='ring ring-white rounded-xl px-2'>delete</button>
              </div> :
              <div className='flex gap-3'>
                <button onClick={messageUser} className='ring ring-white rounded-xl px-2'>message</button>
                {viewer.following.includes(id) ?
                  <button onClick={unfollowUser} className='ring ring-white rounded-xl px-2'>unfollow</button> :
                  <button onClick={followUser} className='ring ring-white rounded-xl px-2'>follow</button>
                }
              </div>
            }
          </div> : ''
        }
      </div>
      <div className='flex gap-6 flex-col mt-6'>
        {posts.map(p => <PostListItem key={p._id} post={p} />)}
      </div>
    </div>
  )
}

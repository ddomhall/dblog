import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import PostListItem from './PostListItem.jsx'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const {session} = useContext(SessionContext)

  useEffect(() => {
    if (session) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts?id=${session}`).then(res => res.json()).then(res => setPosts(res))
    } else {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`).then(res => res.json()).then(res => setPosts(res))
    }
  }, [])

  return (
    <div className='flex flex-col gap-6 w-96 m-auto'>
      {posts.length ? posts.map(p => <PostListItem post={p} key={p._id} />) : <p className='text-center'>Follow users to see posts here</p>}
    </div>
  )
}

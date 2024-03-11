import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import PostListItem from './PostListItem.jsx'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const {session} = useContext(SessionContext)

  useEffect(() => {
    if (session) {
    fetch(`http://localhost:3000/posts?id=${session}`).then(res => res.json()).then(res => setPosts(res))
    } else {
    fetch(`http://localhost:3000/posts`).then(res => res.json()).then(res => setPosts(res))
    }
  }, [])

  return (
    <div className='flex flex-col gap-6 w-96 m-auto'>
      {posts.length ? posts.map(p => <PostListItem post={p} key={p._id} />) : 'Follow users to see posts here'}
    </div>
  )
}

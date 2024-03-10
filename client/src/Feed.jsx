import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link} from 'react-router-dom'

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

  function formattedDate(date) {
    date = new Date(date)
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    return  `${date.getHours()}:${date.getSeconds()}-${day}/${month}/${date.getFullYear()}`
  }

  return (
    <div className='flex flex-col gap-6 w-96 m-auto'>
      {posts.map(p => {
        return(
          <section key={p._id}>
            <Link to={'/posts/' + p._id}>
              <p>{p.content}</p>
            </Link>
            <Link to={'/users/' + p.author._id}>
              <p>{p.author.username}</p>
            </Link>
            <p>{formattedDate(p.date)}</p>
            <button onClick={() => console.log(p)}>test</button>
          </section>
        )
      })}
    </div>
  )
}

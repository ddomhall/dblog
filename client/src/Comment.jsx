import {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import {SessionContext} from './SessionContext.jsx'

export default function Comment() {
  const [comment, setComment] = useState({content: '', author: {username: ''}, date: ''})
  const [edit, setEdit] = useState(false)
  const {id} = useParams()
  const {session} = useContext(SessionContext)

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${id}`).then(res => res.json()).then(res => setComment(res))
  })

  async function editComment(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/comments/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
      })
    }).then(window.location.reload())
  }

  async function deleteComment() {
    fetch(`http://localhost:3000/comments/${id}/delete`, {method: 'DELETE'}).then(location.href= document.referrer)
  }

  return (
    <div className='w-96 m-auto'>
      <section>
        {!edit ? 
          <div>
            <p>{comment.content}</p>
            <Link to={'/users/' + comment.author._id}>{comment.author.username}</Link>
            <p>{comment.date}</p>
          </div> :
          <form onSubmit={editComment} className='flex flex-col'>
            <input name='content' placeholder='content' />
            <input type='submit' value='comment' />
          </form>
        }
        {session == comment.author._id ?
          <div className='flex justify-between'>
            {edit ?
            <button onClick={() => setEdit(false)}>cancel</button> :
            <button onClick={() => setEdit(true)}>edit</button>
            }
            <button onClick={deleteComment}>delete</button>
          </div> : ''
        }
      </section>
    </div>
  )
}

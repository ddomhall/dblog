import {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import {SessionContext} from './SessionContext.jsx'
import formattedDate from '../utils/formattedDate.js'

export default function Comment() {
  const [comment, setComment] = useState({content: '', author: {username: ''}, date: ''})
  const [edit, setEdit] = useState(false)
  const {id} = useParams()
  const {session} = useContext(SessionContext)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${id}`).then(res => res.json()).then(res => setComment(res))
  })

  async function editComment(e) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${id}/edit`, {
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${id}/delete`, {method: 'DELETE'}).then(location.href= document.referrer)
  }

  if (!comment._id) return null

  return (
    <div className='w-96 m-auto ring ring-white rounded-xl p-2'>
      <section>
        {!edit ? 
          <div className='flex flex-col gap-2'>
            <p>{comment.content}</p>
            <div className='flex justify-between'>
            <Link to={'/users/' + comment.author._id} className='underline'>{comment.author.username}</Link>
            <p>{formattedDate(comment.date)}</p>
            </div>
          </div> :
          <form onSubmit={editComment} className='flex flex-col gap-2'>
            <input name='content' placeholder='content' className='rounded-xl px-2' />
            <input type='submit' value='comment' className='ring ring-white rounded-xl px-2' />
          </form>
        }
        {session == comment.author._id &&
          <div className='flex justify-between mt-2'>
            {edit ?
            <button onClick={() => setEdit(false)} className='ring ring-white rounded-xl px-2'>cancel</button> :
            <button onClick={() => setEdit(true)} className='ring ring-white rounded-xl px-2'>edit</button>
            }
            <button onClick={deleteComment} className='ring ring-white rounded-xl px-2'>delete</button>
          </div>}
      </section>
    </div>
  )
}

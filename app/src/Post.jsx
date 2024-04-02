import {useParams, Link} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import formattedDate from '../utils/formattedDate.js'

export default function Post() {
  const {session} = useContext(SessionContext)
  const [post, setPost] = useState({_id: '', content: '', author: {username: ''}, date: ''})
  const [comments, setComments] = useState([])
  const [edit, setEdit] = useState(false)
  const {id}= useParams()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`).then(res => res.json()).then(res => setPost(res))
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}/comments/`).then(res => res.json()).then(res => setComments(res))
  },[])

  async function commentApi(e) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}/comments/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
        author: session,
      })
    }).then(window.location.reload())
  }

  async function editPost(e) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
        published: e.target.elements.published.value == 'on' ? true : false,
      })
    }).then(window.location.reload())
  }

  async function deletePost() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}/delete`, {method: 'DELETE'}).then(document.location.replace('/'))
  }

  if (!post._id) return null

  return(
    <div className='w-96 m-auto ring ring-white rounded-xl p-2'>
      <div className='pb-2'>
        {!edit ?
          <section className='flex flex-col gap-2'>
            <p>{post.content}</p>
            <div className='flex justify-between'>
              <Link to={'/users/' + post.author._id} className='underline'>{post.author.username}</Link>
              <p>{formattedDate(post.date)}</p>
            </div>
          </section> :
          <form onSubmit={editPost} className='flex flex-col gap-2'>
            <input name='content' placeholder='content' defaultValue={post.content} className='rounded-xl px-2'/>
            <div className='flex justify-between'>
              <label htmlFor='published' className='px-2'>published 
                {post.published ?
                  <input name='published' id='published' type='checkbox' defaultChecked className='ml-2'/> :
                  <input name='published' id='published' type='checkbox' />
                }
              </label>
              <input type='submit' value='edit' className='ring ring-white rounded-xl px-2' />
            </div>
          </form>
        }
        {session == post.author._id &&
          <div className='flex justify-between my-2'>
            {edit ?
              <button onClick={() => setEdit(false)} className='ring ring-white rounded-xl px-2'>cancel</button> :
              <button onClick={() => setEdit(true)} className='ring ring-white rounded-xl px-2'>edit</button>
            }
            <button onClick={deletePost} className='ring ring-white rounded-xl px-2'>delete</button>
          </div>}
      </div>
      {session && 
        <form onSubmit={commentApi} className='flex flex-col gap-4 py-4 border-t'>
          <input name='content' placeholder='content' className='rounded-xl px-2' />
          <input type='submit' value='comment' className='ring ring-white rounded-xl' />
        </form>}
      <section className='flex flex-col'>
        {comments.map(c => {
          return (
            <div key={c._id} className='flex flex-col border-t py-2'>
              <Link to={'/comments/' + c._id}>{c.content}</Link>
              <div className='flex justify-between'>
                <Link to={'/users/' + c.author._id} className='underline'>{c.author.username}</Link>
                <p>{formattedDate(c.date)}</p>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}


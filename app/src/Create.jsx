import {useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'

export default function create() {
  const {session} = useContext(SessionContext)

  async function postApi(e) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
        published: e.target.elements.published.value == 'on' ? true : false,
        author: session,
      })
    }).then(res => res.json()).then(res => {
        if (res.status == 200) {
          window.location.replace('/')
        } else {
        }
      })
  }


  return (
    <form onSubmit={postApi} className='flex flex-col w-80 m-auto gap-2 ring ring-white p-2 rounded-xl'>
      <input name='content' placeholder='content' className='rounded-xl px-2'/>
      <div className='flex justify-between'>
      <label htmlFor='published' className='pl-2'>published
        <input name='published' id='published' type='checkbox' className='ml-2'/>
      </label>
      <input type='submit' value='post' className='ring ring-white rounded-xl px-2'/>
      </div>
    </form>
  )
}

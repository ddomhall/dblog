import {useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'

export default function create() {
  const {session} = useContext(SessionContext)

  async function postApi(e) {
    e.preventDefault()
    fetch('http://localhost:3000/posts', {
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
    <form onSubmit={postApi} className='flex flex-col w-96 m-auto'>
      <input name='content' placeholder='content' />
      <label htmlFor='published'>published
        <input name='published' id='published' type='checkbox'/>
      </label>
      <input type='submit' value='post' />
    </form>
  )
}

import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link, useParams} from 'react-router-dom'
import formattedDate from '../utils/formattedDate.js'

export default function Message() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const {session} = useContext(SessionContext)
  const {id} = useParams()

  useEffect(() => {
    async function getUserConversations() {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
        credentials: 'include',
      }).then(res => res.json()).then(res => {
        setConversations(res.map(c => c = {id: c._id, users: c.users.filter(u => u._id !== session).map(u => u.username).join(', ')}))
      })
    }
    getUserConversations()

    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/messages?id=${id}`).then(res => res.json()).then(res => setMessages(res))
    }
  }, [id])

  function sendMessage(e) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        content: e.target.elements.content.value,
        conversation: id,
      })
    }).then(window.location.reload())
  }

  return (
    <div className='grid grid-cols-4 h-full'>
      <aside className='flex flex-col border-r'>
        {conversations && conversations.map(c => <Link to={'/conversations/' + c.id} key={c.id} className='border-b mx-6 py-2'>{c.users}</Link>)}
      </aside>
      {id && 
        <section className='col-span-3 flex flex-col justify-between'>
          <div className='flex flex-col p-6 h-full max-h-[calc(100vh-64px-97.21px)] overflow-y-scroll'>
            {messages && messages.map(m => 
              <div key={m._id} className={`w-fit ${m.sender._id == session ? 'ml-auto' : 'mr-auto'} ring ring-white rounded-xl p-2 mt-6`}>
                <div>{m.content}</div>
                <div>{formattedDate(m.time)}</div>
              </div>)}
          </div>
          <form onSubmit={sendMessage} className='flex gap-6 m-6 pt-6 border-t'>
            <input name='content' placeholder='content' className='w-11/12 rounded-xl px-2' />
            <input type='submit' value='send' className='w-1/12 ring ring-white rounded-xl' />
          </form> 
        </section>}
    </div>
  )
}

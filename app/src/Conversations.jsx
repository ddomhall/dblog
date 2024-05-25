import { useState, useEffect, useContext } from 'react'
import { SessionContext } from './SessionContext.jsx'
import { Link, useParams } from 'react-router-dom'
import formattedDate from '../utils/formattedDate.js'

export default function Conversations() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const { session } = useContext(SessionContext)
  const { id } = useParams()

  useEffect(() => {
    async function getUserConversations() {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
        credentials: 'include',
      }).then(res => res.json()).then(res => {
        setConversations(res.map(c => c = { id: c._id, users: c.users.filter(u => u._id !== session).map(u => u.username).join(', ') }))
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
    <div className='h-full relative'>
      <aside className={'flex flex-col min-[750px]:border-r min-[750px]:w-[375px] max-[750px]:w-full h-full ' + (!id ? 'absolute' : 'max-[750px]:hidden min-[750px]:absolute')}>
        {conversations && conversations.map(c => <Link to={'/conversations/' + c.id} key={c.id} className='border-b mx-6 py-2'>{c.users}</Link>)}
      </aside>
      {id &&
        <section className='flex flex-col justify-between h-full min-[750px]:ml-[375px]'>
          <div className='flex flex-col p-6 h-full overflow-y-scroll max-h-[calc(100vh-106.42px-97.21px)] min-[750px]:max-h-[calc(100vh-72px-97.21px)]'>
            {messages && messages.map(m =>
              <div key={m._id} className={`w-fit ${m.sender._id == session ? 'ml-auto' : 'mr-auto'} ring ring-white rounded-xl p-2 mt-6`}>
                <div>{m.content}</div>
                <Link to={'/users/' + m.sender._id} className='underline'>{m.sender.username}</Link>
                <span> - {formattedDate(m.time)}</span>
              </div>)}
          </div>
          <form onSubmit={sendMessage} className='flex gap-6 m-6 pt-6 border-t'>
            <input name='content' placeholder='content' className='flex-grow rounded-xl px-2 ring ring-white' />
            <input type='submit' value='send' className='ring ring-white rounded-xl px-2' />
          </form>
        </section>}
    </div>
  )
}

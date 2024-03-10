import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link, useParams} from 'react-router-dom'

export default function Message() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const {session} = useContext(SessionContext)
  const {id} = useParams()

  useEffect(() => {
    async function getUserConversations() {
    await fetch('http://localhost:3000/conversations', {
      credentials: 'include',
    }).then(res => res.json()).then(res => {
        setConversations(res.map(c => c = {id: c._id, users: c.users.map(u => u.username).join(', ')}))
      })
    }
    getUserConversations()

    if (id) {
      fetch(`http://localhost:3000/messages?id=${id}`).then(res => res.json()).then(res => setMessages(res))
    }
  }, [id])

  function sendMessage(e) {
    e.preventDefault()
    fetch('http://localhost:3000/messages', {
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
    <div className='grid grid-cols-3'>
      <aside className='flex flex-col'>
        {conversations ? conversations.map(c => <Link to={'/conversations/' + c.id} key={c.id}>{c.users}</Link>) : ''}
      </aside>
        {id ? 
      <section className='col-span-2 flex flex-col justify-between'>
        <div className='flex flex-col'>
        {messages ? messages.map(m => 
            <div key={m._id} style={{textAlign: m.sender._id == session ? 'right' : 'left'}}>
              <div>{m.time}</div>
              <div>{m.sender.username}: {m.content}</div>
            </div>) : ''}
        </div>
        <form onSubmit={sendMessage}>
          <input name='content' placeholder='content' className='w-11/12' />
          <input type='submit' value='send' className='w-1/12' />
        </form> 
      </section> : ''}
    </div>
  )
}

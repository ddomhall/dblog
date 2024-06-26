import { useState } from 'react'
import Cookies from 'js-cookie'

export default function Signup() {
  const [error, setError] = useState([])

  async function signupApi(e) {
    e.preventDefault()
    if (e.target.password.value !== e.target.confirmation.value) {
      setError('passwords must match')
      setTimeout(() => {
        setError()
      }, 3000);
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          username: e.target.elements.username.value,
          password: e.target.elements.password.value,
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.msg) {
            setError('username taken')
            setTimeout(() => {
              setError()
            }, 3000);
          } else {
            Cookies.set('session', res)
            window.location.replace('/')
          }
        })
    }
  }

  return (
    <div className='w-80 m-auto ring ring-white rounded-xl p-6'>
      <form onSubmit={signupApi} className='flex flex-col gap-3'>
        <input name='username' placeholder='username' required autoFocus className='rounded-xl px-2 ring ring-white' />
        <input name='password' placeholder='password' type='password' required className='rounded-xl px-2 ring ring-white' />
        <input name='confirmation' placeholder='confirm password' type='password' required className='rounded-xl px-2 ring ring-white' />
        <input type='submit' value='log in' className='ring ring-white rounded-xl' />
      </form>
      {error}
    </div>
  )
}


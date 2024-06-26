import { useState, useEffect } from 'react'
import { redirect } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState()

  async function loginApi(e) {
    e.preventDefault()
    fetch('http://localhost:8080/api/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.m == 'success') {
          setError()
          window.location.replace('/')
        } else {
          setError('incorrect details')
          setTimeout(() => {
            setError()
          }, 3000);
        }
      })
  }

  return (
    <form onSubmit={loginApi} className='flex flex-col w-80 m-auto gap-3 ring ring-white rounded-xl p-6'>
      <input name='username' placeholder='username' required autoFocus className='rounded-xl px-2 ring ring-white' />
      <input name='password' placeholder='password' type='password' required className='rounded-xl px-2 ring ring-white' />
      <input type='submit' value='log in' className='ring ring-white rounded-xl' />
      {error}
    </form>
  )
}

import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { SessionContext } from './SessionContext.jsx'
import Cookies from 'js-cookie'
import logo from '../dh logo white.png'

function App() {
  const [session, setSession] = useState(Cookies.get('session'))
  const navigate = useNavigate()

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    window.location.replace('/')
  }

  async function searchUser(e) {
    e.preventDefault()
    const name = e.target.search.value
    const user = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?username=${name}`).then(res => res.json())
    if (user) {
      window.location.replace(`/users/${user._id}`)
    } else {
      window.alert(`no user named "${name}"`)
    }
  }

  return (
    <>
      <SessionContext.Provider value={{ session, setSession }}>
        <nav className='flex w-full justify-center min-[750px]:justify-between py-px mb-6 min-[750px]:h-12 items-center border-b-4 flex-wrap'>
          <div className='flex items-center justify-between px-2 min-w-[375px]'>
            <Link to={'/'}>
              <img src={logo} className='h-10' />
            </Link>
            <form onSubmit={searchUser}>
              <input name='search' placeholder='users' className='rounded-2xl px-2 ring ring-white' />
              <input type='submit' value='search' className='rounded-xl px-2 ml-2 ring ring-white' />
            </form>
          </div>
          <div className='min-w-[375px] flex justify-center py-2 border-t-4 min-[750px]:border-none min-[750px]:justify-end'>
            {session ?
              <>
                <Link to={'/create'} className='px-2'>create</Link>
                <Link to={'/conversations'} className='px-2 border-l'>conversations</Link>
                <Link to={'/users/' + session} className='px-2 border-l'>profile</Link>
                <button onClick={logout} className='px-2 border-l'>log out</button>
              </> : <>
                <Link to={'/signup'} className='px-2'>sign up</Link>
                <Link to={'/login'} className='px-2 border-l'>log in</Link>
              </>}
          </div>
        </nav>
        <main className='h-[calc(100vh-115.25px)] min-[750px]:h-[calc(100vh-72px)]'>
          <Outlet />
        </main>
      </SessionContext.Provider>
    </>
  )
}

export default App

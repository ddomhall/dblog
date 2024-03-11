import {Outlet, Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'
import logo from '../dh logo white.png'

function App() {
  const [session, setSession] = useState(Cookies.get('session'))

  function logout() {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    })
    window.location.replace('/')
  }

  async function searchUser(e) {
    e.preventDefault()
    const user = await fetch(`http://localhost:3000/search?username=${e.target.search.value}`).then(res => res.json())
    if (user) {
      window.location.replace(`/users/${user._id}`)
    }
  }

  return (
    <>
      <SessionContext.Provider value={{session, setSession}}>
        <nav className='flex w-full justify-between mb-6 h-10 items-center border-b'>
          <div className='flex items-center'>
            <Link to={'/'}>
              <img src={logo} className='h-10'/>
            </Link>
            <form onSubmit={searchUser}>
              <input name='search' placeholder='users' className='rounded-2xl px-2'/>
              <input type='submit' value='search' className='border rounded-xl px-2 ml-2'/>
            </form>
          </div>
          {session ? 
            <div>
              <Link to={'/create'} className='px-2 border-l'>create</Link>
              <Link to={'/conversations'} className='px-2 border-l'>conversations</Link>
              <Link to={'/users/' + session } className='px-2 border-l'>profile</Link>
              <button onClick={logout} className='px-2 border-l'>log out</button>
            </div> :
            <div>
              <Link to={'/signup'} className='px-2 border-l'>sign up</Link>
              <Link to={'/login'} className='px-2 border-l'>log in</Link>
            </div>
          }
        </nav>
        <main className='h-[calc(100vh-64px)]'>
          <Outlet />
        </main>
      </SessionContext.Provider>
    </>
  )
}

export default App

import {Link, useNavigate} from 'react-router-dom'

export default function PostListItem({post}) {
  const navigate = useNavigate() 

  function formattedDate(date) {
    date = new Date(date)
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    return  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${day}/${month}/${date.getFullYear()}`
  }

  return (
      <section onClick={() => navigate('/posts/' + post._id)} className='ring ring-white rounded-xl p-6 cursor-pointer'>
        <p>{post.content}</p>
        <hr />
        <div className='flex justify-between'>
          <Link to={'/users/' + post.author._id} className='underline'>{post.author.username}</Link>
          <span>{formattedDate(post.date)}</span>
        </div>
      </section>
  )
}

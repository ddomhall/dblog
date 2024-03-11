import {Link, useNavigate} from 'react-router-dom'
import formattedDate from '../utils/formattedDate.js'

export default function PostListItem({post}) {
  const navigate = useNavigate() 

  return (
    <section onClick={() => navigate('/posts/' + post._id)} className='ring ring-white rounded-xl p-6 cursor-pointer'>
      <p>{post.content}</p>
      <hr />
      <div className='flex justify-between'>
        <div onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          navigate('/users/' + post.author._id)
        }} className='underline' data-href={'/users/' + post.author._id} role='link'>{post.author.username}</div>
        <span>{formattedDate(post.date)}</span>
      </div>
    </section>
  )
}

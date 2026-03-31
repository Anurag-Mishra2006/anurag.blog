import { useContext, useState } from 'react'
import Header from '../components/Header'
import { UserContext } from '../context/User.context'
import Signin from '../components/Signin'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext)
  if (!user) {
    return (
      <div>
        <div className='text-xl text-center py-2'>
          For creating a blog, you should be logged in
        </div>
        <Signin />
      </div>
    )
  }
  async function handlePublish() {
    try {
      const token = localStorage.getItem("token");
      if (!title.trim() || !content.trim()) {
        alert("Title and Content are required!");
        return;
      }

      await axios.post("https://medium.formal-syntax.workers.dev/api/v1/blog", {
        title,
        content,
        published: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      );
      alert("Blog published successfully.")
      navigate("/");

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div >
      <Header id="publish" onPublish={handlePublish} />
      <div className="p-4">
        {/* Your blog creation UI goes here */}
        <h2 className="text-2xl font-bold text-center">Create Blog</h2>


        <div className='flex flex-col gap-6 py-6'>
          <div>
            <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
            <textarea onChange={(e) => setTitle(e.target.value)} id="message" rows={4} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-2/3 p-1.5 shadow-xs placeholder:text-body" placeholder="your title for the blog..."></textarea>
          </div>
          <div>
            <label htmlFor="content" className='block font-medium'>Content</label>
            <textarea onChange={(e) => setContent(e.target.value)} name="content" rows={10} id="content" className='bg-neutral-secondary-large border w-2/3 text-heading-sm text-sm rounded focus:ring-brand focus:border-brand block p-1.5 shadow-xs'></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
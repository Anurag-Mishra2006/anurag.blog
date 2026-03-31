import   { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBlog() {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetch = async () => {
      const blog = (await axios.get(`https://medium.formal-syntax.workers.dev/api/v1/blog/${id}`)).data;
      setBlogTitle(blog.title);
      setBlogContent(blog.content);
      setLoading(false);
    }
    fetch();
  }, [id]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`/api/v1/blog/${id}`, {
        id,
        content: blogContent,
        title: blogTitle,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );

      alert("Blog updated successfully.")
      navigate(`/blog/${id}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      {loading ?

        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-300 animate-spin fill-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>



        : <div> <Header id="publish" onPublish={handleEdit} />

          <div className="p-4">
            {/* Your blog creation UI goes here */}
            <h2 className="text-2xl font-bold text-center">Update Blog</h2>


            <div className='flex flex-col gap-6 py-6'>
              <div>
                <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
                <textarea value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} id="message" rows={4} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-2/3 p-1.5 shadow-xs placeholder:text-body" placeholder="your title for the blog..."></textarea>
              </div>
              <div>
                <label htmlFor="content" className='block font-medium'>Content</label>
                <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} name="content" rows={10} id="content" className='bg-neutral-secondary-large border w-2/3 text-heading-sm text-sm rounded focus:ring-brand focus:border-brand block p-1.5 shadow-xs'></textarea>
              </div>
            </div>
          </div></div>}
    </div>

  )
}

export default UpdateBlog
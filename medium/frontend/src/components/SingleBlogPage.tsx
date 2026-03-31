import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import { UserContext } from '../context/User.context';

type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};


function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<Blog>(`https://medium.formal-syntax.workers.dev/api/v1/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.log("Error fetching blog", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-center mt-10"><div>{Array.from({ length: 1 }).map((_, i) => (
      <div key={i} className='rounded-2xl bg-gray-500/6 border border-gray-800/10 animate-plus h-[400px]' />
    ))}</div></div>;
  }
  const { user } = useContext(UserContext);
  const canEdit = blog.authorId === user?.userId;
  const sentId = (canEdit ? "edit" : "");

  return (
    <div>
      <Header id={sentId} blogId={blog.id} />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          {blog.title}
        </h1>

        <p className="text-gray-500 mb-4">
          Author: {blog.authorId}
        </p>

        <p className="text-gray-800  leading-relaxed">
          {blog.content}
        </p>
      </div>
    </div>
  );
}

export default SingleBlogPage;
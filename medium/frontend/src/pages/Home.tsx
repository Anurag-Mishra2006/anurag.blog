import { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { Link, } from 'react-router-dom';

type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

function Home() {

  const [allPosts, setAllPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<Blog[]>("https://medium.formal-syntax.workers.dev/api/v1/blog");
        setAllPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching blogs ", error);
      }
    };

    fetchBlogs();
  }, [])

  function getPreview(text: string, words = 10) {
    // return text.split(" ").slice(0, words).join(" ");
    const description = text.split(" ");
    // slice for getting first words of count = words
    const des = description.slice(0, words);
    return des.join(" ");
  }

  // async function handleExpandedBlog(id: string){

  //     const response = (await axios.get(`/api/v1/blog/${id}`)).data;
  //     return <div>
  //       <h2>Title: {response.id}</h2>
  //       <p>{response.content}</p>
  //     </div>

  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header id="create-blog" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='rounded-2xl bg-gray-500/6 border border-gray-800/10 animate-plus h-[260px]' />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {allPosts.map((post:Blog) => {
              return (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-sm border"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    AuthorId: {post.authorId}
                  </p>

                  <h2 className="text-xl font-semibold mb-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-700 leading-relaxed">
                    {getPreview(post.content)}...
                  </p>

                  <Link to={`/blog/${post.id}`}>
                    <button className="mt-3 text-blue-600 hover:underline">
                      Read More
                    </button>
                  </Link>

                </div>
              )
            })}

          </div>
        )}
      </div>
    </div>
  )
}

export default Home
import { useState, useEffect, ChangeEvent } from 'react';
import { PostForm } from './components/PostForm'
import { PostItem } from './components/PostItem';
import { Post } from './types/Post'

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true)
    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let json = await response.json();
    setLoading(false)
    setPosts(json)
  }

  const handleAddPost = async (title: string, body: string) => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { 'content-type': 'application/json' }
    });
    let json = await response.json();

    if (json.id) {
      alert("POST adicionado com sucesso!");
    } else {
      alert("Ocorreu algun erro");
    }
  }

  return (
    <div className='p-6'>
      {loading &&
        <div>CARREGANDO....</div>
      }

      <PostForm onAdd={handleAddPost} />


      {!loading && posts.length > 0 &&
        <>
          Total de Posts: {posts.length}
          <div>
            {posts.map((item, index) => (
             <PostItem data={item} key={index} />
            ))}
          </div>
        </>
      }

    </div>
  );
}
export default App;
import { useState, useEffect, } from 'react';
import { PostForm } from './components/PostForm'
import { PostItem } from './components/PostItem';
import { Post } from './types/Post'
import { api } from './api';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true)
    let json = await api.getAllPost();
    setLoading(false)
    setPosts(json)
  }

  const handleAddPost = async (title: string, body: string) => {

    let json = await api.addNewPost(title, body, 1);
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
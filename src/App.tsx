import { useState, useEffect, ChangeEvent } from 'react';
import { Post } from './types/Post'

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const [addTitleText, setaddTitleText] = useState('');
  const [addBodyText, setaddBodyText] = useState('');

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

  const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setaddTitleText(e.target.value);
  }

  const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setaddBodyText(e.target.value);
  }

  const handleAddClick = async () => {
    if(addTitleText && addBodyText) {

      let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify({
          title: addTitleText,
          body: addBodyText,
          userId: 1
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
      let json = await response.json();

      if(json.id) {
        alert("POST adicionado com sucesso!");
      } else {
        alert("Ocorreu algun erro");
      }
      

    } else {
      alert("Preencha os dados!!");
    }
  }

  return (
    <div className='p-6'>
      {loading &&
        <div>CARREGANDO....</div>
      }

      <fieldset className='border-2 mb-3 p-3'>
        <legend>Adicionar Novo Post</legend>

        <input
          className='block border'
          value={addTitleText}
          onChange={handleAddTitleChange}
          type='text'
          placeholder='Digite seu título'
        />

        <textarea
          className='block border'
          value={addBodyText}
          onChange={handleAddBodyChange}
          ></textarea>

        <button className='block border' onClick={handleAddClick}>Adicionar</button>

      </fieldset>


      {!loading && posts.length > 0 &&
        <>
          Total de Posts: {posts.length}
          <div>
            {posts.map((item, index) => (
              <div key={index} className='my-4'>
                <h4 className='font-bold'>{item.title}</h4>
                <small>#{item.id} - Usuário: {item.userId}</small>
                <p className='my-2'>{item.body}</p>
              </div>
            ))}
          </div>
        </>
      }

    </div>
  );
}
export default App;
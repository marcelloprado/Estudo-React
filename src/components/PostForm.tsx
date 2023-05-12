import { useState, ChangeEvent } from 'react';

    type Props = {
        onAdd: (title:string, body:string) => void;
    }

export const PostForm = ({ onAdd }: Props) => {

    const [addTitleText, setaddTitleText] = useState('');
    const [addBodyText, setaddBodyText] = useState('');

    const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setaddTitleText(e.target.value);
    }

    const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setaddBodyText(e.target.value);
    }

    const handleAddClick = () => {
        if(addTitleText && addBodyText) {
           onAdd(addTitleText, addBodyText) 
        } else {
            alert('Preencha os campos')
        }
    }

    return (
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
    );
}
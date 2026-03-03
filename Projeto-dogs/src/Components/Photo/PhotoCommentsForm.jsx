import React from 'react'
import enviar from '../../assets/enviar.svg'
import useFetch from '../../Hooks/useFetch';
import Error from '../../Helper/Error'
import { COMMENT_POST } from '../../api';

const PhotoCommentsForm = ({id, setComments}) => {
    const [comment, setComment] = React.useState('');
    const {request, error} = useFetch();

    async function handleSubmit (event) {
        event.preventDefault();
        const {url, options} = COMMENT_POST(id, {comment});
        const {response, json} = await request(url, options);
        if (response.ok) {
            setComment('');
            setComments((comments) => [...comments, json])
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={({target}) => setComment(target.value)} name="comment" id="comment" placeholder='Comente...'></textarea>
        <button>
            <img src={enviar} alt="enviar" />
        </button>
        <Error error={error}/>
    </form>
  )
}

export default PhotoCommentsForm
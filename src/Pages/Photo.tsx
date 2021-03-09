import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import PageTitle from '../components/PageTitle'
import {photoDetail} from '../helpers/api'
import {useParams} from 'react-router-dom'

interface ParamTypes {
    photoId: string
}

const Photo = () => {
    const {photoId} = useParams<ParamTypes>()
    const [photo, setPhoto] = useState({title:'',albumId:0,id:0,url:'',thumbnailUrl:''})
    const [comments, setComments] = useState<
        Array<{
            postId: number,
            id: number,
            name:string,
            email:string,
            body:string
        }>
    >([])
    const [fetching, setFetching] = useState(true)
    const [forceRender, setForceRender] = useState(0)

    const fetchAlbum = (photoId: number) =>{
        setFetching(true)
        photoDetail(photoId).then((res:any) =>{
            setPhoto(res.info)
            setComments(res.comments)
            setFetching(false)
        }).catch(()=>{
            alert('failed to fetch data')
            setFetching(false)
        })
    }
    

    const addComments = (v:any) =>{
        v.preventDefault()
        const cmnts = sessionStorage.getItem('comments')
        let newComment = {postId:parseInt(photoId), id:0, name:'Me',email:'',body:v.target[0].value}
        let allComments = comments
        allComments.push(newComment)
        setComments(allComments)
        if(cmnts){
            let x = JSON.parse(cmnts)
            x.push(newComment)
            sessionStorage.setItem('comments',JSON.stringify(x))
        }else{
            sessionStorage.setItem('comments', JSON.stringify([newComment]))
        }
        setForceRender(forceRender+1)
        v.target[0].value=''
    }

    useEffect(() => {
        fetchAlbum(parseInt(photoId))
    }, [photoId]);
    return (
        <div className="content-container">
            <PageTitle title={photo.title} breadcrumbs={[['Album','/album/'+photo.albumId],['Photo']]}/>
            {
                (!fetching) ?
                    <>
                    <div className="photo-container">
                        <img src={photo.url} alt={photo.title}/>
                    </div>
                    <div className="comment-container">
                        {
                            comments.map((el:any, index) =>(
                                <div key={index} className={(el.name==='Me') ? 'comment-item-owner' : 'comment-item-default'}>
                                    <span>{el.name} </span>
                                    <p>{el.body}</p>
                                </div>
                            ))
                        }
                        <div style={{display:'inline-block', width:'100%', marginTop:'30px'}} >
                            <div className="comment-form">
                                <form onSubmit={(v) => addComments(v)}>
                                    <textarea style={{width:'90%', float:'left'}} rows={3}></textarea>
                                    <button type="submit" style={{float:'right', width:'8%', height:'50px'}}>&rarr;</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </>
                : <LoadingIndicator/>
            }
        </div>
    );
}

export default Photo;

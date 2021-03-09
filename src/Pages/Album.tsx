import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import PageTitle from '../components/PageTitle'
import {Link} from 'react-router-dom'
import {albumDetail} from '../helpers/api'
import {getUser} from '../helpers/storage'
import {useParams} from 'react-router-dom'

interface ParamTypes {
    albumId: string
}

const Album = () => {
    const {albumId} = useParams<ParamTypes>()
    const [album, setAlbum] = useState({title:'',userId:0,id:0})
    const [photos, setPhotos] = useState([])
    const [fetching, setFetching] = useState(true)
    const [forceRender, setForceRender] = useState(0)

    const fetchAlbum = (albumId:number) =>{
        setFetching(true)
        albumDetail(albumId).then((res:any) =>{
            setAlbum(res.info)
            setPhotos(res.photos)
            setFetching(false)
        }).catch(()=>{
            alert('failed to fetch data')
            setFetching(false)
        })
    }

    const isFavorite = (id:Number) => {
        const favorite = sessionStorage.getItem('favorites')
        if(!favorite){
            return false
        }else{
            let f = JSON.parse(favorite)
            let exist = f.find((el:any) =>{
                return el.id===id
            })
            return !!exist
        }
    }

    const addFavorite = (item:Object) =>{
        const favorite = sessionStorage.getItem('favorites')
        if(favorite){
            let x = JSON.parse(favorite)
            x.push({...item, albumName: album.title})
            sessionStorage.setItem('favorites',JSON.stringify(x))
        }else{
            sessionStorage.setItem('favorites', JSON.stringify([{...item, albumName: album.title}]))
        }
        setForceRender(forceRender+1)
    }
    
    const removeFavorite = (id:Number) =>{
        const favorite = sessionStorage.getItem('favorites')
        if(favorite){
            let f = JSON.parse(favorite)
            let index = f.findIndex((el:any) =>{
                return el.id===id
            })
            f.splice(index, 1);
            sessionStorage.setItem('favorites',JSON.stringify(f))
            setForceRender(forceRender+1)
        }
    }


    useEffect(() => {
        fetchAlbum(parseInt(albumId))
    }, [albumId]);
    return (
        <div className="content-container">
            <PageTitle title="Album List" breadcrumbs={[['Album']]}/>
            {
                (!fetching) ?
                    <>
                    <div style={{margin:'15px'}}>
                        <table className="table-collapse">
                            <tbody>
                                <tr>
                                    <th>Album Name</th><td>{album.title}</td>
                                </tr>
                                <tr>
                                    <th>Author</th>
                                    <td>
                                        <Link to={`/user/`+album.userId} style={{display:'block',marginBottom:'10px'}}>{getUser(album.userId).name}</Link>
                                        {getUser(album.userId).email}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width:'100%', maxHeight:'100vh', overflowY:'auto'}} >
                        <div className="album-container">
                        {
                            photos.map((el:any, key:number) => (
                                <div className="album-item" key={key} style={{backgroundImage:`url(${el.thumbnailUrl})`, backgroundSize:'cover'}}>
                                    {
                                        (isFavorite(el.id))?
                                        <div className="album-item-fav-button" onClick={() =>removeFavorite(el.id)}>
                                            <span style={{color:'#ff00a2'}}>&hearts;</span>
                                        </div> : 
                                        <div className="album-item-fav-button" onClick={() =>addFavorite(el)}>
                                            <span style={{color:'white'}}>&hearts;</span>
                                        </div>
                                    }
                                    <div className="album-item-info">
                                        <Link to={'/photo/'+el.id} className="album-item-title">{el.title}</Link>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    </>
                : <LoadingIndicator/>
            }
        </div>
    );
}

export default Album;

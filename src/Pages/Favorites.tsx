import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import PageTitle from '../components/PageTitle'
import {Link} from 'react-router-dom'
import {getFavorites} from '../helpers/favorit'

const Favorite = () => {
    const [photos, setPhotos] = useState<Array <{id:number,albumId:number,title:string, url:string, thumbnailUrl:string}>>([])
    const [forceRender, setForceRender] = useState(0)

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
        setPhotos(getFavorites())
    }, [forceRender]);
    
    return (
        <div className="content-container">
            <PageTitle title="Favorite Photos" breadcrumbs={[['Favorite']]}/>
            {
                (photos) ?
                    <>
                    <div style={{width:'100%', maxHeight:'100vh', overflowY:'auto'}} >
                        <div className="album-container">
                        {
                            photos.map((el:any, key:number) => (
                                <div className="album-item" key={key} style={{backgroundImage:`url(${el.thumbnailUrl})`, backgroundSize:'cover'}}>
                                    
                                    <div className="album-item-fav-button" onClick={() =>removeFavorite(el.id)}>
                                        <span style={{color:'#ff00a2'}}>&hearts;</span>
                                    </div>
                                    <div className="album-item-info">
                                        <Link to={'/photo/'+el.id} className="album-item-title">{el.title}</Link><hr/>
                                        Album : <Link to={'/album/'+el.albumId} className="album-item-album-name">{el.albumName}</Link>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            (photos.length===0) ? <span style={{color:'#808080'}}>Your favorite is empty</span> : null
                        }
                        </div>
                    </div>
                    </>
                : <LoadingIndicator/>
            }
        </div>
    );
}

export default Favorite;

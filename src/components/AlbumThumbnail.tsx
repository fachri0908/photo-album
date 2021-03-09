import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getAlbumThumbnail} from '../helpers/api'
import LoadingIndicator from './LoadingIndicator';

const AlbumThumbnail = (props:any) => {
    const [thumbnail, setThumbnail] = useState({thumbnailUrl:''})
    const [showHover, setShowHover] = useState(false)

    const fetchThumbnails =(albumId:number) =>{
        getAlbumThumbnail(albumId).then((res) =>{
            setThumbnail(res)
        })
    }

    useEffect(() => {
        fetchThumbnails(props.albumId)
    }, [props.albumId]);

    return (
        (thumbnail) ? 
            <div 
                style={{textAlign:'center',width:'100%',height:'100%',backgroundImage:`url('${thumbnail.thumbnailUrl}')`, backgroundSize:'cover'}} 
                onMouseEnter={()=> setShowHover(true)} 
                onMouseLeave={()=> setShowHover(false)}>
                {
                    (showHover) ? 
                    <div style={{position:'absolute',paddingTop:'40px',width:'100%',fontSize:'15px', height:'100%',backgroundColor:'rgba(0,0,0,0.3)'}}>
                        <Link to={'/album/'+props.albumId}>Show Album</Link>
                    </div>
                    : null
                }
            </div>
        :<LoadingIndicator/>
    );
}

export default AlbumThumbnail;

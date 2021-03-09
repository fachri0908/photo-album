import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import PageTitle from '../components/PageTitle'
import {Link} from 'react-router-dom'
import {albumList} from '../helpers/api'
import {getUser} from '../helpers/storage'
import AlbumThumbnail from '../components/AlbumThumbnail';

const Home = () => {
    const [albums, setAlbums] = useState([])
    const [filteredAlbums, setFilteredAlbums] = useState([])
    const [fetching, setFetching] = useState(true)

    const fetchAlbums = () =>{
        setFetching(true)
        albumList().then(res =>{
            let x:any=[];
            res.data.forEach((el:any) =>{
                x.push({...el,author:getUser(el.userId).name})
            })
            setAlbums(x)
            setFilteredAlbums(x)
            setFetching(false)
        }).catch(()=>{
            alert('failed to fetch data')
            setFetching(false)
        })
    }

    useEffect(() => {
        fetchAlbums()
    }, []);

    const filterAlbum = (v:any) =>{
        if(v.target.value){
            let filtered = albums.filter((el:any) =>{
                return el.title.includes(v.target.value) || el.author.includes(v.target.value)
            })
            setFilteredAlbums(filtered)
        }else{
            setFilteredAlbums(albums)
        }
        
    }
    return (
        <div className="content-container">
            <PageTitle title="Album List"/>
            <div style={{flex:'row', padding:'15px', margin:0}}>
                <div style={{display:'inline-block', marginRight:10}}>
                    <input placeholder="Search Album Name or Author" type="text" onChange={filterAlbum} style={{width:250, height:30}}/>
                </div>
            </div>
            {
                (!fetching) ? 
                    <div style={{width:'100%', maxHeight:'100vh', overflowY:'auto'}} >
                        <div className="album-container">
                        {
                            filteredAlbums.map((el:any, key:number) => (
                                <div className="album-item" key={key}>
                                    <AlbumThumbnail albumId={el.id}/>
                                    <div className="album-item-user">
                                        <Link to={'/user/'+el.userId} className="album-item-user-name">{el.author}</Link>
                                    </div>
                                    <div className="album-item-info">
                                        <Link to={'/album/'+el.id} className="album-item-title">{el.title}</Link>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                : <LoadingIndicator/>
            }
        </div>
    );
}

export default Home;

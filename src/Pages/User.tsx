import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import {Link, useParams} from 'react-router-dom'
import {getUser} from '../helpers/api'
import PageTitle from '../components/PageTitle';
import AlbumThumbnail from '../components/AlbumThumbnail'

interface ParamTypes {
    userId: string
}

const Home = () => {
    const {userId} = useParams<ParamTypes>()
    const [user, setUser] = useState({name:'', username:'', email:'',address:{street:'',suite:'',city:'',zipcode:''}, phone:'',website:'', company:{name:'',catchPhrase:'',bs:''}})
    const [albums, setAlbums] = useState([])
    const [fetching, setFetching] = useState(true)

    const fetchUser = (userId:number) =>{
        setFetching(true)
        getUser(userId).then((res:any) =>{
            setUser(res.info)
            setAlbums(res.albums)
            setFetching(false)
        }).catch(()=>{
            alert('failed to fetch data')
            setFetching(false)
        })
    }

    useEffect(() => {
        fetchUser(parseInt(userId))
    }, [userId]);
    return (
        <div className="content-container">
            <PageTitle title={user.name} breadcrumbs={[['User']]}/>
            {
                (!fetching) ?
                    <>
                    <div style={{margin:'15px'}}>
                        <table className="table-collapse">
                            <tbody>
                                <tr>
                                    <th>Name</th><td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>User Name</th><td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Email</th><td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Address</th><td>{user.address.suite+' '+user.address.street+'. '+user.address.city+' '+user.address.zipcode}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th><td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th>Website</th><td>{user.website}</td>
                                </tr>
                                <tr>
                                    <th>Company</th><td><b>{user.company.name}</b><br/>{user.company.catchPhrase}<br/>{user.company.bs}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width:'100%', maxHeight:'100vh', overflowY:'auto'}} >
                        <span style={{marginLeft:'15px'}}><b>Albums</b></span>
                        <div className="album-container">
                        {
                            albums.map((el:any, key:number) => (
                                <div className="album-item" key={key}>
                                    <AlbumThumbnail albumId={el.id}/>
                                    <div className="album-item-user">
                                        <Link to="/" className="album-item-user-name">{el.author}</Link>
                                    </div>
                                    <div className="album-item-info">
                                        <Link to={'/album/'+el.id} className="album-item-title">{el.title}</Link>
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

export default Home;

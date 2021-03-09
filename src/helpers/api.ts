import axios from 'axios';
const baseUrl= "https://jsonplaceholder.typicode.com/"
export const albumList = () =>{
    return axios.get(`${baseUrl}albums`)
}
export const albumDetail =async (albumId:number) =>{
    let albumDetail = await axios.get(`${baseUrl}albums/${albumId}`)
    let photos = await axios.get(`${baseUrl}albums/${albumId}/photos`)
    return {info:albumDetail.data, photos:photos.data}
}

export const photoDetail =async (photoId:number) =>{
    let comments = await axios.get(`${baseUrl}comments?postId=${photoId}`)
    let photo = await axios.get(`${baseUrl}photos/${photoId}`)

    let savedComments = sessionStorage.getItem('comments')
    let allComments = comments.data
    if(savedComments){
        let x = JSON.parse(savedComments)
        let filtered = x.filter((el:any)=>{
            return el.postId===photoId
        })
        allComments = allComments.concat(filtered)
    }
    return {info:photo.data, comments:allComments}
}

export const getUser = async (userId:Number) => {
    let albums = await axios.get(`${baseUrl}albums?userId=${userId}`)
    let user = await axios.get(`${baseUrl}users/${userId}`)
    return {info:user.data, albums:albums.data}
}

export const getAlbumThumbnail = async (albumId:Number) => {
    let photos = await axios.get(`${baseUrl}albums/${albumId}/photos`)
    return (photos.data) ? photos.data[0] : null
}

export const userList = () =>{
    return axios.get(`${baseUrl}users`)
}

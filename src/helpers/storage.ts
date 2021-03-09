const users = sessionStorage.getItem('users')
export const getUser = (id:number) =>{
    if(users){
        let u = JSON.parse(users)
        let x = u.find((el:any) =>(
            el.id===id
        ))
        return x 
    }
    return {name:''}
}
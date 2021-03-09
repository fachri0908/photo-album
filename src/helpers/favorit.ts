
export const getFavorites = () => {
    const favorite = sessionStorage.getItem('favorites')
    return (favorite) ? JSON.parse(favorite) : []
}
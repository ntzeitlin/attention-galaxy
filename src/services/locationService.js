export const getLocationsByUserId = async (userId) => {
    const response = await fetch(`http://localhost:8088/locations?userId=${userId}`)
    const data = await response.json()
    return data
} 
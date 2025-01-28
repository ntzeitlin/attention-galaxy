export const getLocationsByUserId = async (userId) => {
    const response = await fetch(`http://localhost:8088/locations?userId=${userId}`)
    const data = await response.json()
    return data
} 

export const createNewLocationByUserId = async (userId) => {
    const newLocationObject = {
        name: "",
        address: "",
        description: "",
        gpscoords: "",
        userId: parseInt(userId)
    }
    const response = await fetch("http://localhost:8088/locations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocationObject)
    })
    const data = await response.json()
    return data
}
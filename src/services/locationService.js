
// GETTERS

export const getLocationsByUserId = async (userId) => {
    const response = await fetch(`http://localhost:8088/locations?userId=${userId}`)
    const data = await response.json()
    return data
} 

export const getLocationByLocationId = async (locationId) => {
    const response = await fetch(`http://localhost:8088/locations/${locationId}`)
    const data = await response.json()
    return data
}

export const getLocationInfoByProjectId = async (projectId) => {
    const response = await fetch(`http://localhost:8088/projectlocations?projectId=${projectId}&_expand=location`)
    const data = await response.json()
    return data
}

export const getProjectsByLocationId = async (locationId) => {
    const response = await fetch(`http://localhost:8088/projectlocations?locationId=${locationId}&_expand=project`)
    const data = await response.json()
    return data 
}

export const getLocationsWithProjectsByUserId = async (userId) => {
    const response = await fetch(`http://localhost:8088/locations?userId=${userId}&_embed=projectlocations`)
    const data = response.json()
    return data
}
// SETTERS


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

export const updateLocationByLocationId = async (locationId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/locations/${locationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = await response.json()
    return data
}

export const deleteLocationByLocationId = async (locationId) => {
    const response = await fetch(`http://localhost:8088/locations/${locationId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
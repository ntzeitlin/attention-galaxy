export const getProjectInfoByProjectId = async (projectId) => {
    const response = await fetch(`http://localhost:8088/projects/${projectId}`)
    const data = await response.json()
    return data
}

export const getProjectInfoByLocationId = async (locationId) => {
    const response = await fetch(`http://localhost:8088/projectLocations?locationId=${locationId}&_expand=project`)
    const data = await response.json()
    return data

}

export const getProjectLocationByProjectId = async (projectId) => {
    const response = await fetch(`http://localhost:8088/projectlocations?projectId=${projectId}`)
    const data = await response.json()
    return data
}

export const getUserProjectByProjectId = async (projectId) => {
    const response = await fetch(`http://localhost:8088/userprojects?projectId=${projectId}`)
    const data = await response.json()
    return data 
}


export const createNewProject = async () => {
    const projectSubmissionObject = {
        name: "Default Project Name",
        startdate: "",
        enddate: "",
        ageSinceTouch: 0
    }
    const response = await fetch("http://localhost:8088/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectSubmissionObject)
    })

    const data = await response.json()
    return data

}

export const updateProjectByProjectId = async (projectId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const createProjectLocation = async (submissionObject) => {
    const response = await fetch(`http://localhost:8088/projectlocations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const updateProjectLocationById = async (Id, submissionObject) => {
    const response = await fetch(`http://localhost:8088/projectlocations/${Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const createUserProjects = async (submissionObject) => {
    const response = await fetch(`http://localhost:8088/userprojects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const updateUserProjectsById = async (Id, submissionObject) => {
    const response = await fetch(`http://localhost:8088/userprojects/${Id}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const deleteProjectByProjectId = async (projectId) => {
    const response = await fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
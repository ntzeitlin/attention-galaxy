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


export const createNewProject = async () => {
    const projectSubmissionObject = {
        name: "",
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
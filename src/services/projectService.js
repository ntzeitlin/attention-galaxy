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
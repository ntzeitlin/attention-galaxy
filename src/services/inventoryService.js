export const getInventoryItemsByLocationAndUserId = async (locationId, userId) => {
    const response = await fetch(`http://localhost:8088/items?locationId=${locationId}&userId=${userId}`)
    const data = await response.json()
    return data
}

export const getItemTaskInfoByItemId = async (itemId) => {
    const response = await fetch(`http://localhost:8088/taskitems?itemId=${itemId}&_expand=task`)
    const data = response.json()
    return data
}

export const getItemDataByItemId = async (itemId) => {
    const response = await fetch(`http://localhost:8088/taskitems/${itemId}?_expand=item&_expand=task`)
    const data = response.json()
    return data
}

export const createNewItem = async (submissionObject) => {
    const response = await fetch('http://localhost:8088/items', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const createNewTaskItem = async (submissionObject) => {
    const response = await fetch('http://localhost:8088/taskitems', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
} 

export const updateItemByItemId = async (itemId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = response.json()
    return data
}

export const deleteItemByItemId = async (itemId) => {
    const response = await fetch(`http://localhost:8088/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
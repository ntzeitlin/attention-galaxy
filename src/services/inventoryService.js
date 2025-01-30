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
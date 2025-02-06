export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const getUserDataByUserId = async (userId) => {
  const response = await fetch(`http://localhost:8088/users/${userId}?_embed=userprojects`)
  const data = await response.json()
  return data
}

export const getAllUserData = async () => {
  const response = await fetch('http://localhost:8088/users')
  const data = await response.json()
  return data
}

export const getUserProjectsAndUserInfoByProjectId = async (projectId) => {
  const response = await fetch(`http://localhost:8088/userprojects?projectId=${projectId}&_expand=user`)
  const data = await response.json()
  return data 
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

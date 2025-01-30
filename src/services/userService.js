export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
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

export const getUserProjectByProjectId = async (projectId) => {
  const response = await fetch(`http://localhost:8088/userprojects?projectId=${projectId}`)
  const data = await response.json()
  return data[0]
}
export const getTasksByProjectId = async (projectId) => {
    const response = await fetch(
        `http://localhost:8088/tasks?projectId=${projectId}`
    );
    const data = response.json();
    return data;
};

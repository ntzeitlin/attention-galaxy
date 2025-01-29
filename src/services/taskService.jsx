export const getTasksByProjectId = async (projectId) => {
    const response = await fetch(
        `http://localhost:8088/tasks?projectId=${projectId}`
    );
    const data = response.json();
    return data;
};

export const updateTaskByTaskId = async (taskId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionObject),
    });
    const data = response.json();
    return data;
};

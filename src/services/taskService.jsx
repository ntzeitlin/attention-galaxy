export const getTasksByProjectId = async (projectId) => {
    const response = await fetch(
        `http://localhost:8088/tasks?projectId=${projectId}`
    );
    const data = response.json();
    return data;
};

export const getTaskByTaskId = async (taskId) => {
    const response = await fetch(
        `http://localhost:8088/tasks/${taskId}?_expand=project&_expand=location`
    );
    const data = response.json();
    return data;
};

export const getTaskItemsByTaskId = async (taskId) => {
    const response = await fetch(
        `http://localhost:8088/taskitems?taskId=${taskId}&_expand=item`
    );
    const data = response.json();
    return data;
};

export const createNewTask = async (submissionObject) => {
    const response = await fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionObject),
    });
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

export const deleteTaskByTaskId = async (taskId) => {
    const response = await fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import Draggable from "react-draggable";
import {
    getProjectAndTasksByProjectId,
    getProjectsByUserId,
} from "../../services/projectService";
import { Link } from "react-router-dom";

const OrbitalPath = ({ distance }) => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        points.push(
            new THREE.Vector3(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            )
        );
    }
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={pathGeometry}>
            <lineBasicMaterial
                attach="material"
                color="white"
                linewidth={0.5}
            />
        </line>
    );
};

const TaskMoon = ({ task, planetPosition, index }) => {
    const distance = 2 + index * 0.5; // distance from center of planet
    const angleSpeed = 0.005; // orbital speed of moon around planet.
    const [angle, setAngle] = useState(Math.random() * Math.PI * 2); // initialize moon at random angle

    useFrame(() => {
        setAngle((prev) => prev + angleSpeed);
    });

    const position = [
        planetPosition[0] + Math.cos(angle) * distance,
        0,
        planetPosition[2] + Math.sin(angle) * distance,
    ];

    return (
        <mesh position={position}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={"#ececec"} />
        </mesh>
    );
};

const ProjectPlanet = ({ project, index, setSelectedProject }) => {
    const distance = Math.min((project.ageSinceTouch || 2) * 3, 50);
    const angleSpeed = 0.001;
    const [angle, setAngle] = useState((index / 6) * Math.PI * 2);

    useFrame(() => {
        setAngle((prev) => prev + angleSpeed);
    });

    const position = [
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance,
    ];

    return (
        <>
            <OrbitalPath distance={distance} />
            <motion.mesh
                position={position}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.5 }}
                animate={{ scale: 1 }}
            >
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color={project.planetColor} />
            </motion.mesh>
            {project.tasks &&
                project.tasks.map((task, taskIndex) => (
                    <TaskMoon
                        key={`moon-key-${task.id}`}
                        task={task}
                        planetPosition={position}
                        index={taskIndex}
                    />
                ))}
        </>
    );
};

const SolarSystem = ({ projects, setSelectedProject }) => {
    return (
        <Canvas
            camera={{ position: [0, 50, 0], rotation: [Math.PI / -2, 0, 0] }}
            style={{ background: "none" }}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[0, 10, 0]} intensity={80} />
            <OrbitControls enableRotate={true} enableZoom={false} />

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial color={"yellow"} emissive={"#ffcc00"} />
            </mesh>

            {projects.map((project, index) => (
                <ProjectPlanet
                    key={`planet-key-${project.id}`}
                    project={project}
                    index={index}
                    setSelectedProject={setSelectedProject}
                />
            ))}
        </Canvas>
    );
};

const HoverCard = ({ project, onClose }) => {
    return (
        <Draggable>
            <div
                className="hover-card"
                style={{
                    zIndex: 1000,
                    position: "fixed",
                    margin: "15% 10%",
                    backgroundColor: "rgba(100, 100, 100, 0.4",
                    borderRadius: "1em",
                    padding: "1em",
                }}
            >
                <button onClick={onClose} className="close-btn">
                    &times;
                </button>
                <h3>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                </h3>
                <p>
                    <strong>Last Touched:</strong> {project.ageSinceTouch} days
                    ago
                </p>
                <h4>Tasks:</h4>
                <ul>
                    {project.tasks.map((task) => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            </div>
        </Draggable>
    );
};

export default function SolarSystemView({ currentUser }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [userProjectArray, setUserProjectArray] = useState([]);
    const [userProjectsAndTasks, setUserProjectsAndTasks] = useState([]);
    const [finalPlanets, setFinalPlanets] = useState([]);

    useEffect(() => {
        getProjectsByUserId(currentUser.id).then((data) =>
            setUserProjectArray(data)
        );
    }, [currentUser]);

    // for each project in the user's project array,
    // return an object that matches the sampleProjects format

    // get projects by user id
    // get tasks by project id, expand project.
    // add task objects to project objects if task object does not have dateCompleted.
    useEffect(() => {
        if (userProjectArray.length) {
            userProjectArray.map((projectObject) =>
                getProjectAndTasksByProjectId(projectObject.projectId)
                    .then((data) => {
                        let taskArray = [];
                        if (data.tasks.length) {
                            for (const task of data.tasks) {
                                if (!task.dateCompleted) {
                                    taskArray.push({
                                        id: task.id,
                                        name: task.taskName,
                                    });
                                }
                            }
                        }

                        const newProjectData = {
                            id: data.id,
                            name: data.name,
                            ageSinceTouch: data.ageSinceTouch,
                            tasks: taskArray,
                            planetColor: data.planetColor || "#87CEFA",
                        };

                        return newProjectData;
                    })
                    .then((data) => {
                        setUserProjectsAndTasks((prevData) => [
                            ...(prevData || []),
                            data,
                        ]);
                    })
            );
        }
    }, [userProjectArray]);

    useEffect(() => {
        if (finalPlanets.length < userProjectArray.length) {
            setFinalPlanets(userProjectsAndTasks);
        }
    }, [userProjectsAndTasks]);

    const sampleProjects = [
        {
            id: 1,
            name: "Website Redesign",
            ageSinceTouch: 5,
            tasks: [
                { id: 101, name: "Create UI Design" },
                { id: 102, name: "Implement Frontend" },
            ],
        },
    ];

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                margin: "auto",
            }}
        >
            {selectedProject && (
                <HoverCard
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
            <SolarSystem
                projects={finalPlanets ? finalPlanets : sampleProjects}
                setSelectedProject={setSelectedProject}
            />
        </div>
    );
}

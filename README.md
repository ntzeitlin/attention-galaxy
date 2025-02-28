# Attention Galaxy

## Overview

Attention Galaxy is a React-based task and project management app that visualizes your projects as a cosmic system. Projects and Tasks are represented as celestial bodies, providing an intuitive way to track focus and productivity.

## Purpose and Motivation

As someone who balances multiple projects across different locations over long periods, I needed a tool that could quickly highlight neglected projects. Many of my projects require specific tools that are scattered across locations, making organization even more challenging. Attention Galaxy provides a visual approach to managing tasks, ensuring that no project drifts too far from focus. By integrating an item checklist tied to tasks, the app helps keep track of necessary tools and resources, making project management more seamless and efficient

## Features

-   **Galactic Project Visualization**: See your projects as planets and uncompleted tasks as moons.
-   **Dynamic Positioning**: Projects drift outward when ignored and return when checked in.
-   **Mise en Place**: Track task items to make sure you have everything on hand before beginning your task.

## Tech Stack

-   **Frontend**: React, Radix-Theme components
-   **Backend**: JSON Server (for development)
-   **Data Visualization**: framer-motion-3d and THREE (for rendering the celestial system). Draggable for draggable hovercards.

## ERD
![Front-End Capstone-3](https://github.com/user-attachments/assets/8b572231-f2e8-4894-8813-83f8e5849caf)


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ntzeitlin/attention-galaxy.git
    cd attention-galaxy
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```
4. Start the json-server:
   ```sh
   cd src
   cd api
   json-server database.json -p 8088
   ```

## Usage

-   Create a unique user account.
-   Create Locations to track projects. 
-   Add projects to the Location.
-   Assign Tasks to Projects.
-   Assign Items to Tasks.
-   Watch projects move based on engagement.
-   Drag and interact with celestial project planets and their uncomplete taskmoons.

### Orbital View

https://github.com/user-attachments/assets/6ea760c2-0089-42d7-bda4-7d9317c6c6d9

### Project Details

https://github.com/user-attachments/assets/58a3bf45-2776-4337-aac5-64603b8fd618

### Aging Projects

https://github.com/user-attachments/assets/c13a1c0b-0376-45c0-982e-1be3b750c6d8




## Future Enhancements

-   Subtasks

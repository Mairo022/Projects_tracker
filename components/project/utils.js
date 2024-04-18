export function categoriseTasks(tasks) {
    return {
        Tasks: tasks?.filter(task => task.type === "todo" && !task.completed),
        Bugs: tasks?.filter(task => task.type === "bug" && !task.completed),
        Ideas: tasks?.filter(task => task.type === "idea" && !task.completed),
        History: tasks?.filter(task => task.completed === true)
    }
}

export function getViewLabel(view) {
    return {
        Tasks: 'task',
        Bugs: 'bug',
        Ideas: 'idea',
        History: 'history'
    }[view]
}
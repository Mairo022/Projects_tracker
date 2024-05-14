import db from "../../db";

export default defineEventHandler(async (event) => {
    const projectID = event.context.params.id
    const body = await readBody(event)
    const task = body.task

    try {
        await db.query({
            text: 'UPDATE projects_data SET title=$1, description=$2, completed=$3 WHERE id=$4 AND project_id=$5',
            values: [task.title, task.description, task.completed, task.id, projectID],
        })
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request failed'
        })
    }
})
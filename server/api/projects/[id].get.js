import db from "../../db";

export default defineEventHandler(async (event) => {
    const projectID = event.context.params.id

    const res = await db.query({
        text: 'SELECT id, title, description, type, completed, created_at, updated_at FROM projects_data WHERE id=$1',
        values: [projectID],
        rowMode: 'object',
    })
    const projectsData = res.rows

    return projectsData
})
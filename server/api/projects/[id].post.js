import db from "../../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const projectID = body.id
    const title = body.title
    const description = body.description
    const type = body.type

    try {
        await db.query({
            text: 'INSERT INTO projects_data (title, description, type, project_id) VALUES ($1, $2, $3, $4)',
            values: [title, description, type, projectID],
        })
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: e,
        })
    }
})
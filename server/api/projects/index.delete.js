import db from "../../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const projectID = body.id

    try {
        await db.query({
            text: 'DELETE FROM projects WHERE id=$1',
            values: [projectID],
        })
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request failed'
        })
    }
})
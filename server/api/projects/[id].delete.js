import db from "../../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const taskID = body.taskID

    try {
        await db.query({
            text: 'DELETE FROM projects_data WHERE id=$1',
            values: [taskID],
        })
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request failed'
        })
    }
})
import db from "../../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const id = body.id
    const title = body.title
    const live = body.live
    const source = body.source

    try {
        await db.query({
            text: 'UPDATE projects SET name=$1, live=$2, source=$3 WHERE id=$4',
            values: [title, live, source, id],
        })
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request failed'
        })
    }
})
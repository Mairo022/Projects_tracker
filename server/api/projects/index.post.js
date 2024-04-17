import db from "../../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const res = await db.query({
            text: 'INSERT INTO projects (name, source, live) VALUES ($1, $2, $3)',
            values: [body.name, body.source, body.live],
            rowMode: 'object',
        })
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: e,
        })
    }
})
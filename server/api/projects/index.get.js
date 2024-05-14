import db from "../../db";

export default defineEventHandler(async () => {
    const res = await db.query({
        text: 'SELECT id, name FROM projects ORDER BY name ASC',
        rowMode: 'object',
    })
    const projects = res.rows

    return projects;
})
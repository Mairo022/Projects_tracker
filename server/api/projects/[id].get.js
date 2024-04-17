import db from "../../db";

export default defineEventHandler(async (event) => {
    const projectID = event.context.params.id

    try {
        const res = await db.query({
            text: `SELECT 
                id, name, live, source,
                (SELECT 
                    json_agg(
                        json_build_object(
                            'id', id, 
                            'title', title,
                            'description', description,
                            'type', type, 
                            'completed', completed, 
                            'created_at', created_at, 
                            'updated_at', updated_at 
                        )
                    )
                 FROM projects_data 
                 WHERE project_id=$1
                ) AS tasks
                FROM projects
                WHERE id=$1
                LIMIT 1`,
            values: [projectID]
        })
        const projectData = res.rows[0]

        return projectData

    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Request failed'
        })
    }
})
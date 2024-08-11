import vine from '@vinejs/vine'

export const storeTaskValidator = vine.compile(
    vine.object({
        project_id: vine.string(),
        user_id: vine.string(),
        name: vine.string(),
        start_date: vine.string(),
        end_date: vine.string()
    })
)

export const updateTaskValidator = vine.compile(
    vine.object({
        project_id: vine.string().optional(),
        user_id: vine.string().optional(),
        name: vine.string().optional(),
        start_date: vine.string().optional(),
        end_date: vine.string().optional()
    })
)
import vine from '@vinejs/vine'

export const storeProjectValidator  = vine.compile(
    vine.object({
        name: vine.string(),
        start_date: vine.string(),
        end_date: vine.string()
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        name: vine.string().optional(),
        start_date: vine.string().optional(),
        end_date: vine.string().optional()
    })
)
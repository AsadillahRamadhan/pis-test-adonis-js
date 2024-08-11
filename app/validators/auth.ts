import vine from '@vinejs/vine'

export const registerAuthValidator = vine.compile(vine.object({
    username: vine.string().unique(async (db, value) => {
        const match = await db.from('users').where('username', value).first();
        return !match;
    }),
    password: vine.string()
}))

export const loginAuthValidator = vine.compile(vine.object({
    username: vine.string(),
    password: vine.string()
}));
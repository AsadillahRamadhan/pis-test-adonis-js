import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
    vine.object({
        name: vine.string(),
        username: vine.string(),
        email: vine.string().email().normalizeEmail(),
        password: vine.string()
    })
)
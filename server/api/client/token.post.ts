import {defineEventHandler, readBody} from "h3";

const config = useRuntimeConfig()
import { setCookie} from "h3";
const appUrl = config.public.appUrl
const env=config.public.ENV
export default defineEventHandler(async (event) => {
    const method = event.method
    const body = method === "GET" ? undefined :  await readBody(event)
    setCookie(event, 'access_token', body.access_token,{
        httpOnly: true,
        path: '/',
        maxAge: body.expires_in*60,
        secure: env !== "dev"
    })
    setCookie(event, 'refresh_token', body.refresh_token,{
        httpOnly: true,
        path: '/',
        maxAge: body.refresh_token_expires_in*60,
        secure: env !== "dev"
    })



})
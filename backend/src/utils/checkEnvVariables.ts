import log from "./logger"

export default () => {
    [
        'PORT',
        'REFRESH_PUBLIC_KEY',
        'REFRESH_PRIVATE_KEY',
        'ACCESS_TOKEN_PUBLIC_KEY',
        'ACCESS_TOKEN_PRIVATE_KEY',
        'CLIENT_URL'
    ].forEach((variable) => {
        if(!process.env[variable]){
            log.error(`${variable} variable does not exist`);
            process.exit(-1);
        }
    })
}
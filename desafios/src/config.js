import dotenv from "dotenv"
dotenv.config();

const secret=process.env.SESSION_SECRET
const connectiondatabase=process.env.DB_URL
const config ={
    dbUrl: connectiondatabase,
    sessionSecret: secret,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL
}
export default config
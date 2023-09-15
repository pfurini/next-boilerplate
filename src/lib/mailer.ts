import "server-only"
import { createTransport } from "nodemailer"
import { env } from "env.mjs"
import { logger } from "./logger"

export const configOptions = {
  port: env.SMTP_PORT,
  host: env.SMTP_HOST,
  username: env.SMTP_USERNAME,
  password: env.SMTP_PASSWORD,
}

const transporter = createTransport({
  port: configOptions.port,
  host: configOptions.host,
  auth: {
    user: configOptions.username,
    pass: configOptions.password,
  },
})

export const sendMail = async (...params: Parameters<typeof transporter.sendMail>) => {
  if (!env.ENABLE_MAILING_SERVICE) return logger.info("Email service is disabled, sending email is skipped.", params)
  try {
    const res = await transporter.sendMail(...params)
    logger.info(`Email sent to ${res.envelope.to}`)
  } catch (error) {
    logger.error(`Error sending message: ${error}`)
    throw error
  }
}

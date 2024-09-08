import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;
// custom format for console logging with colors
const myFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),

  format.printf(({ level, message, label, timestamp }) => {
    return `${level}: ${message}`;
  })
);
// custom format for file logging
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: myFormat,
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
    new transports.File({ filename: "combined.log" }),
  ],
});
export default logger;

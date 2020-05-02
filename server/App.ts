import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import express, { Application } from 'express'
import { web } from './routes/index'
import CONFIG from './config/config'

class App {
  public express: Application

  constructor() {
    this.express = express()
    this.setMiddlewares()
    this.setRoutes()
  }

  private setMiddlewares(): void {
    this.setCors()
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(helmet())
    this.express.use(express.static(path.join(__dirname, '../web')))
  }

  private setCors(): void {
    this.express.use(cors({
      origin: (origin, callback) => {
        const whitelist = ['https://test.com']
        if (CONFIG.APP === 'development' || whitelist.includes(String(origin))) {
          return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"))
      }
    }))
  }

  private setRoutes(): void {
    this.express.use('/', web)
  }
}

export default new App().express
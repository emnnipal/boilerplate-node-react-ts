import cors from 'cors'
import path from 'path'
import { web } from './routes/index'
import express, { Application } from 'express'

class App {
  public express: Application

  constructor() {
    this.express = express()
    this.setMiddlewares()
    this.setRoutes()
  }

  private setMiddlewares(): void {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.static(path.join(__dirname, '../web')))
  }

  private setRoutes(): void {
    this.express.use('/', web)
  }
}

export default new App().express
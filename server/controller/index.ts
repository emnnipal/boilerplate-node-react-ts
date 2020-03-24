import { Request, Response } from 'express'
import path from 'path'

class Web {
  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      res.setHeader('Content-Type', 'text/html');
      res.sendFile(path.join(__dirname,'../../web/index.html'));
    } catch (err) {
      res.status(500).send({
        success: false,
        result: err.message
      })
    }
  }
}

export default Web
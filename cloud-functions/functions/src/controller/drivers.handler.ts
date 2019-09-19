import Driver from '../helpers/drivers.helper'
import { Request, Response } from 'express'

const drivers = new Driver()

export async function handleDriverFetch(request: Request, response: Response) {
  try {
    const fetch = await drivers.fetchAllDrivers()
    response.send(fetch)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}


export async function handleAddDriver(request: Request, response: Response) {
    try {
      const { data } = request.body
      const addDrvier = await drivers.addDrvier(data)
      response.send(addDrvier)
    } catch (error) {
      console.error(error)
      response.status(500).send(error)
    }
  }
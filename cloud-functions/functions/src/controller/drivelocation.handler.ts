import DriverLocation from '../helpers/driverlocation.helper'
import { Request, Response } from 'express'

const driverLocation = new DriverLocation()

export async function handleFetchNearByDrivers(
  request: Request,
  response: Response
) {
  try {
    const { lat, lng } = request.query
    const nearbyDrivers = await driverLocation.findNerbyDrivers(
      parseFloat(lat),
      parseFloat(lng)
    )
    response.send(nearbyDrivers)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleDriverWithKey(
  request: Request,
  response: Response
) {
  try {
    const { key } = request.params
    const nearbyDrivers = await driverLocation.findDriverWithKey(key)
    response.send(nearbyDrivers)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleAddGeoLocation(
  request: Request,
  response: Response
) {
  try {
    const { coordinates, driverId, fcmToken } = request.body
    const nearbyDrivers = await driverLocation.addGeoLocation(
      coordinates,
      driverId,
      fcmToken
    )
    response.send(nearbyDrivers)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleUpdateGeoLocation(
  request: Request,
  response: Response
) {
  try {
    const { coordinates } = request.body
    const { key } = request.params
    const nearbyDrivers = await driverLocation.updateGeoLocation(
      key,
      coordinates
    )
    response.send(nearbyDrivers)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
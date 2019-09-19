import BookingService from '../helpers/booking.helper'
import { Request, Response } from 'express'

const booking = new BookingService()

export async function handleFetchAllBooking(
  request: Request,
  response: Response
) {
  try {
    const fetchResult = await booking.fetchAllBookings()
    response.send(fetchResult)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleFetchBooking(request: Request, response: Response) {
  try {
    const fetchResult = await booking.fetchAllBookingWithId(
      request.params.bookingId
    )
    response.send(fetchResult)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleAddBooking(request: Request, response: Response) {
  try {
    const { data } = request.body
    const addbooking = await booking.addBookings(data)
    response.send(addbooking)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
export async function handleUpdateBooking(
  request: Request,
  response: Response
) {
  try {
    const { bookingId } = request.params
    const { data } = request.body
    const addbooking = await booking.updateBooking(bookingId, data)
    response.send(addbooking)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

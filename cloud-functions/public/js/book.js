document.querySelector('#submit').addEventListener('click', async e => {
  e.preventDefault()
  const bookingId = localStorage.getItem('queryId')
  console.log(bookingId)
  const updateBooking = await put(
    `${BOOKING_URL}/update/${bookingId}`,
    {
      data: {
        status: 'accepted',
      },
    }
  )
  console.log(updateBooking)
})

/* const put = async (url, body) => {
  try {
    const request = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
 */

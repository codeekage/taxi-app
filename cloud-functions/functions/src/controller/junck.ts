
/* export async function handleUpdateLocation(
  request: Request,
  response: Response
) {
  try {
    const { driverId } = request.params;
    const { coordinates } = request.body;
    const reqSocket = await driverLocation.updateDriverLocation(
      driverId,
      coordinates
    );
    response.send(reqSocket);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
} */

/* export async function handleSetToken(request: Request, response: Response) {
  try {
    const { driverId } = request.params
    const { fcmToken } = request.body
    const driverToken = await driverLocation.setMessagingToken(
      driverId,
      fcmToken
    )
    response.send(driverToken)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
} */
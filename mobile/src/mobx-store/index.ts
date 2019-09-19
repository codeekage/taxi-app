import LocationStore from "./LocationStore";
import InputStore from "./InputStore";
import ComponentStore from "./ComponentStore";
import BookingStore from "./BookingStore";

export default {
    locationStore : new LocationStore(),
    inputStore : new InputStore(),
    componentStore : new ComponentStore(),
    bookingStore : new BookingStore()
}
import * as APIUtil from '../util/guest_util';

export const RECEIVE_GUESTS = "RECEIVE_GUESTS";
export const RECEIVE_GUEST = 'RECEIVE_GUEST';
export const REMOVE_GUEST = "REMOVE_GUEST";


export const receiveGuests = guests => ({
  type: RECEIVE_GUESTS,
  guests
});

export const receiveGuest = guest => ({
  type: RECEIVE_GUEST,
  guest
})

export const removeGuest = guestId => ({
  type: REMOVE_GUEST,
  guestId
})


export const fetchGuests = () => dispatch => (
  APIUtil.getGuests()
    .then(guests => dispatch(receiveGuests(guests)))
    .catch(err => console.log(err))
);

export const fetchGuest = id => dispatch => (
  APIUtil.getGuest(id)
    .then(guest => dispatch(receiveGuest(guest)))
    .catch(err => console.log(err))
);

export const addGuest = data => dispatch => (
  APIUtil.createGuest(data)
    .then(guest => dispatch(receiveGuest(guest)))
    .catch(err => console.log(err))
);

export const destroyGuest = guestId => dispatch => (
  APIUtil.deleteGuest(guestId)
    .then(() => dispatch(removeGuest(guestId)))
    .catch(err => console.log(err))
);
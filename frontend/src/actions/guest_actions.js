import * as APIUtil from '../util/guest_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_GUESTS = "RECEIVE_GUESTS";
export const RECEIVE_GUEST = 'RECEIVE_GUEST';
export const REMOVE_GUEST = "REMOVE_GUEST";
export const RECEIVE_GUEST_ERRORS = "RECEIVE_GUEST_ERRORS";

export const receiveGuests = guests => ({
  type: RECEIVE_GUESTS,
  guests
});

export const receiveGuest = currentUser => ({
  type: RECEIVE_GUEST,
  currentUser
})

export const removeGuest = guestId => ({
  type: REMOVE_GUEST,
  guestId
})

export const receiveErrors = errors => ({
    type: RECEIVE_GUEST_ERRORS,
    errors
});


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

export const addGuest = user => dispatch => (
    APIUtil.signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveGuest(decoded))
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const destroyGuest = guestId => dispatch => (
  APIUtil.deleteGuest(guestId)
    .then(() => dispatch(removeGuest(guestId)))
    .catch(err => console.log(err))
);
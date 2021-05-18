import { 
  createRoom, 
  deleteRoom, 
  getRoom, 
  getRoomByCode,
  updateRoom 
} from '../util/room_util';

export const REMOVE_ROOM = "REMOVE_ROOM";
export const RECEIVE_ROOM = "RECEIVE_ROOM";
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS";

const removeRoom = roomId => ({
  type: REMOVE_ROOM,
  roomId
})

const receiveRoom = roomId => ({
  type: RECEIVE_ROOM,
  roomId
})

export const receiveErrors = errors => ({
  type: RECEIVE_ROOM_ERRORS,
  errors
})
  
export const addRoom = data => dispatch => (
  createRoom(data)
    .then(room => dispatch(receiveRoom(room)))
    .catch(err => console.log(err))
);

export const patchRoom = data => dispatch => (
  updateRoom(data)
    .then(roomId => dispatch(receiveRoom(roomId)))
    .catch(err => console.log(err))
);

export const destroyRoom = roomId => dispatch => (
  deleteRoom(roomId)
    .then(() => dispatch(removeRoom(roomId)))
    .catch(err => console.log(err))
);

export const fetchRoom = roomId => dispatch => (
  getRoom(roomId)
    .then(roomId => dispatch(receiveRoom(roomId)))
    .catch(err => console.log(err))
);

export const fetchRoomByCode = code => dispatch => (
  getRoomByCode(code)
    .then(
      room => dispatch(receiveRoom(room)),
      err => dispatch(receiveErrors(err))
    )
);
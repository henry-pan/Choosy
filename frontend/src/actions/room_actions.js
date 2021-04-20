import { createRoom, deleteRoom } from '../util/room_util';

export const RECEIVE_IDEAS = "RECEIVE_IDEAS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_ROOM = "REMOVE_ROOM";

export const receiveIdeas = roomId => ({
  type: RECEIVE_IDEAS,
  roomId
})

export const receiveUsers = roomId => ({
  type: RECEIVE_USERS,
  roomId
})

export const removeRoom = roomId => ({
  type: REMOVE_ROOM,
  roomId
})

export const addRoom = data => dispatch => (
  createRoom(data)
    .then(roomId => dispatch(receiveUsers(roomId)))
    .catch(err => console.log(err))
);

export const destroyRoom = roomId => dispatch => (
  deleteRoom(roomId)
    .then(() => dispatch(removeRoom(roomId)))
    .catch(err => console.log(err))
);

export const fetchUsers = roomId => dispatch => (
  getUsers(roomId)
    .then(roomId => dispatch(receiveUsers(roomId)))
    .catch(err => console.log(err))
)

export const fetchIdeas = roomId => dispatch => (
  getIdeas(roomId)
    .then(roomId => dispatch(receiveIdeas(roomId)))
    .catch(err => console.log(err))
)
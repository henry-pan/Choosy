import { createRoom, deleteRoom, getUsers, getIdeas, getRoom } from '../util/room_util';

export const RECEIVE_IDEAS = "RECEIVE_IDEAS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_ROOM = "REMOVE_ROOM";
export const RECEIVE_ROOM = "RECEIVE_ROOM";


const receiveIdeas = roomId => ({
  type: RECEIVE_IDEAS,
  roomId
})

const receiveUsers = roomId => ({
  type: RECEIVE_USERS,
  roomId
})

const removeRoom = roomId => ({
  type: REMOVE_ROOM,
  roomId
})

const receiveRoom = roomId => ({
  type: RECEIVE_ROOM,
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
);

export const fetchIdeas = roomId => dispatch => (
  getIdeas(roomId)
    .then(roomId => dispatch(receiveIdeas(roomId)))
    .catch(err => console.log(err))
);

export const fetchRoom = roomId => dispatch => (
  getRoom(roomId)
    .then(roomId => dispatch(receiveRoom(roomId)))
    .catch(err => console.log(err))
);

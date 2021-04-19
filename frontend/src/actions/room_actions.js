import { createRoom, deleteRoom } from '../util/room_util';

export const RECEIVE_IDEA = "RECEIVE_IDEA";
export const REMOVE_ROOM = "REMOVE_ROOM";

export const receiveIdea = room => ({
  type: RECEIVE_IDEA,
  room
})

export const removeIdea = roomId => ({
  type: RECEIVE_IDEA,
  roomId
})

export const addRoom = data => dispatch => (
  createRoom(data)
    .then(room => dispatch(receiveIdea(room)))
    .catch(err => console.log(err))
);

export const destroyIdea = roomId => dispatch => (
  deleteRoom(roomId)
    .then(() => dispatch(removeRoom(roomId)))
    .catch(err => console.log(err))
);
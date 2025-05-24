import { io } from 'socket.io-client';
import { host } from './urls';

const socket = io(host);

export default socket;
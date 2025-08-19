import { createAction } from "@reduxjs/toolkit";
import Tetromino from "./classes/Tetromino";

export const GAMETICKSPEED = 800;//600//1000;
export const SCALE = 2;
export const BLOCK_SIZE = 16; //IN_UNITS

export const BLOCK_PX_SIZE = BLOCK_SIZE * SCALE;

export const BOARD_BLOCK_WIDTH = 10;
export const BOARD_BLOCK_HEIGHT = 20;

export const INITIAL_TETROMINO_HEIGHT = 2;
export const INITIAL_TETROMINO_X = Math.floor(BOARD_BLOCK_WIDTH / 2);
export const GAMETICKS_TO_NEXT_TETROMINO = 1;//2; //Delay from when a piece landed to when the next block will drop.
export const COLORS = ['red', 'blue', 'yellow', 'green'];

export const gameActions = {
    reset: createAction('game/reset'),
    tetrominoLanded: createAction('game/tetrominoLanded')
}
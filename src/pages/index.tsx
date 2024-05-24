import { listenerCount } from 'process';
import styles from './index.module.css';
import { useState } from 'react';
import { on } from 'events';

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, -1],
  [-1, 0],
  [0, -1],
  [-1, 1],
];

const random_place = () => {
  const ry = Math.floor(Math.random() * 9);
  const rx = Math.floor(Math.random() * 9);
  return [ry, rx];
};

const setBombAtRandomPlace = (newBoard: number[][]) => {
  const [ry, rx] = random_place();
  if (newBoard[ry][rx] === 10) {
    setBombAtRandomPlace(newBoard);
  }
  newBoard[ry][rx] = 10;
  return newBoard;
};

const cellsnumber = (userBoard, x: number, y: number) => {
  const newuserBoard = structuredClone(userBoard);
  newuserBoard[y][x] = -4;
  return newuserBoard;
};

const around = (newBoard: number[][]) => {
  for (let n = 0; n < 9; n++) {
    for (let m = 0; m < 9; m++) {
      let i = -1;
      if (newBoard[m][n] !== 10) {
        newBoard[m][n] = -1;
      }
      for (const direction of directions) {
        const dx = direction[0];
        const dy = direction[1];
        if (
          newBoard[m + dy] !== undefined &&
          newBoard[m] !== undefined &&
          newBoard[m + dy][n + dx] === 10 &&
          newBoard[m][n] !== 10
        ) {
          i++;
          newBoard[m][n] = i;
        }
      }
    }
  }
  return newBoard;
};

const Home = () => {
  const [bombBoard, setBombBoard] = useState([
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
  ]);

  const [userBoard, setuserBoard] = useState([
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16],
  ]);

  const clickHandler = (x: number, y: number) => {
    const open = cellsnumber(userBoard, x, y);
    setuserBoard(open)
    if (bombBoard[y][x] === -2) {
      const newBoard = structuredClone(bombBoard);
      for (let n = 0; n < 10; n++) {
        const newnewnewBoard = setBombAtRandomPlace(newBoard);
        setBombBoard(newnewnewBoard);
      }
      const arouned = around(newBoard);
      setBombBoard(arouned);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flameLarge}>
        <div className={styles.flameSmall}>
          <div className={styles.bombs} />
          <div className={styles.faceBackground}>
            <div className={styles.face}>
              <div className={styles.images} style={{ backgroundPosition: `${-60 * 11}px 0px` }} />
            </div>
          </div>
          <div className={styles.times} />
        </div>
        <div className={styles.board}>
          <div className={styles.flameMedium}>
            {bombBoard.map((row, y) =>
              row.map((number, x) => (
                <div className={styles.cell} key={`${x}-${y}`} onClick={() => {clickHandler(x, y)}}>
                  <div
                  className={styles.images}
                  style={{ backgroundPosition: `${-60 * number}px 0px` }}
                  />
                  {userBoard.map((row, y) =>
                    row.map((number, x) => (
                    (userBoard[y][x]) === 16 &&
                      <div key={`${x}-${y}`}
                        className={styles.cover}
                        style={{
                        background: number === -4 ? '#0000000' : '#c6c6c6',
                        border: number === -4 ? '#0000000' : '#c6c6c6',
                        }}
                      />
                      ))
                  )}
                  </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

//CSSスプライト_画像を横異動で切り替える
//計算値=状態や計算値を加工_状態=>時間で変わり保存される値_ex.(Clicklog)
//状態はシステムを壊しやすい。デバックもしずらい
//再起関数_関数の中でその関数を動かす_周りに爆弾がない場合連続で開くための設定_if.elseを繰り返す

// {<div className={styles.sampleStyle} style={{backgroundPosition:`${-60 * samplePos}px 0px`}}/>
// <button onClick={()=>setSamplePos(P => (P + 1) % 16)}>sample</button>}

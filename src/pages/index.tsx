import styles from './index.module.css';
import { useState } from 'react';

function random_place (): [number, number] {
  const rx = Math.floor(Math.random() * 9);
  const ry = Math.floor(Math.random() * 9);
  return [rx, ry]
}

const setbomb (): {
}

const Home = () => {
  const [bombBoard, setbombBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // const [userBoard, setuserBoard] = useState([
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ]);
  }
  const clickHandler = (x: number, y: number) => {};

  return (
    <div className={styles.container}>
      <div className={styles.flame}>
        <div className={styles.board}>
          {bombBoard.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
                <div className={styles.images}
              style={{ backgroundPosition: `${-60 * color}px 0px` }} />
              </div>
              )),
            )}
          </div>
        </div>
      </div>
  );
}
export default Home;

//CSSスプライト_画像を横異動で切り替える
//計算値=状態や計算値を加工_状態=>時間で変わり保存される値_ex.(Clicklog)
//状態はシステムを壊しやすい。デバックもしずらい
//再起関数_関数の中でその関数を動かす_周りに爆弾がない場合連続で開くための設定_if.elseを繰り返す

// {<div className={styles.sampleStyle} style={{backgroundPosition:`${-60 * samplePos}px 0px`}}/>
// <button onClick={()=>setSamplePos(P => (P + 1) % 14)}>sample</button>}

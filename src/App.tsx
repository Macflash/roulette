import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface Stats {
  totalGames: number;
  totalSpins: number;
  totalMoneyWon: number;
  totalMoneyBet: number;
  totalBets: number;
  maxMoney: number;
  maxMoneyBet: number;
  maxWin: number;
}
const DEFAULT_STATS = {
  totalGames: 1,
  totalSpins: 0,
  totalMoneyWon: 0,
  totalMoneyBet: 0,
  totalBets: 0,
  maxMoney: 0,
  maxMoneyBet: 0,
  maxWin: 0,
};

type StatNames = {
  [Property in keyof Stats]: string;
};

const STAT_NAMES: StatNames = {
  totalGames: "Total games played",
  totalSpins: "Total spins",
  totalMoneyWon: "Total money won",
  totalMoneyBet: "Total money bet",
  totalBets: "Total bets",
  maxMoney: "Max money",
  maxMoneyBet: "Max money bet",
  maxWin: "Max money payed out",
};

function StatRow(props: { name: string; value: string | number }) {
  const isMoney = props.name.includes("money");
  return (
    <div>
      {props.name}: {isMoney ? "$" : undefined}
      {props.value}
    </div>
  );
}

function StatsView(props: { stats: Stats }) {
  return (
    <div>
      {Object.keys(props.stats).map((key: any) => (
        <StatRow
          name={STAT_NAMES[key as keyof Stats]}
          value={props.stats[key as keyof Stats]}
        />
      ))}
    </div>
  );
}

interface CurrentGame {
  stats: Stats;
  chips: number[];
  bets: PlacedBet[];
  vertical: boolean;
}

function GameView(props: { stats: CurrentGame }) {}

interface SaveFile {
  currentGame: CurrentGame;
  allTimeStats: Stats;
}

const StorageKey = "WowRoulette...Cheater";
function SaveGame(game: CurrentGame) {
  localStorage.setItem(StorageKey, JSON.stringify(game));
}

function LoadGame(): CurrentGame | null {
  const str = localStorage.getItem(StorageKey);
  if (!str) {
    return null;
  }
  return JSON.parse(str);
}

const LOADED_GAME = LoadGame();

const EVEN_NUMBERS = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];
const ODD_NUMBERS = [
  1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];

const RED_NUMBERS = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
const GOLD_NUMBERS = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

const FIRST_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SECOND_12 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const THIRD_12 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const ONE_TO_18 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];
const NINETEEN_TO_36 = [
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
];

const ROW_1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const ROW_2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const ROW_3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

function IsRed(n: number | string) {
  return RED_NUMBERS.indexOf(Number(n)) >= 0;
}

function GetColor(n: number | string) {
  return IsRed(n) ? "red" : "yellow";
}

function RollWheel(): number {
  const num = Math.floor(Math.random() * 37) - 1;
  if (num < 0 || num > 36) {
    console.error("WOAH!! What are the odds??");
    return RollWheel();
  }
  return num;
}

export const INSIDE_BET_PAYOUTS = {
  // Insides
  straight: 35, // 1 number
  split: 17, // 2 numbers
  street: 11, // 3 numbers (trio if at the top on a 0, basket is 0, 00, 2)
  square: 8, // 4 numbers (corner)
  six: 5, // ...really? its 6 numbers duh (double street)
  topline: 6, // 0, 00, 1, 2, 3. Only applies for 00 tables.
};

export const OUTSIDE_BET_PAYOUTS = {
  // Outsides
  Reds: 1,
  Blacks: 1,
  Evens: 1,
  Odds: 1,
  Lows: 1,
  Highs: 1,
  Dozens: 2,
  Columns: 2,
};

export type PAYOUTS = typeof INSIDE_BET_PAYOUTS & typeof OUTSIDE_BET_PAYOUTS;

export const BET_PAYOUTS: PAYOUTS = {
  ...INSIDE_BET_PAYOUTS,
  ...OUTSIDE_BET_PAYOUTS,
};

export type BetTypes = keyof PAYOUTS;

const CHIP_DATA_KEY = "text";

function UNORDERED_ARRAY_EQUAL(a: number[], b: number[]) {
  return (
    a.filter((ax) => b.includes(ax)).length == a.length &&
    b.filter((bx) => a.includes(bx)).length == b.length
  );
}

function Bet(props: {
  onClick?: () => void;
  name: string | number;
  color?: string;
  flex?: number | string;
  margin?: number;
  type?: BetTypes;
  winsOn?: number[];
  onDrop?: (index: number) => void;
  placedBets?: PlacedBet[];
  winningBets?: PlacedBet[];
  roll?: number;
}) {
  return (
    <div
      onDrop={
        props.onDrop
          ? (ev) => {
              ev.preventDefault();
              props.onDrop?.(Number(ev.dataTransfer.getData(CHIP_DATA_KEY)));
            }
          : undefined
      }
      onDragOver={
        props.onDrop
          ? (ev) => {
              ev.preventDefault();
            }
          : undefined
      }
      onClick={props.onClick}
      className={props.color || GetColor(props.name)}
      style={{
        cursor: props.onClick ? "pointer" : undefined,
        flex: props.flex,
        marginLeft: props.margin,
        textShadow: `1px 2px rgba(0,0,0,.7)`,
        border: "1px solid gold",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minWidth: 70,
        minHeight: 70,
        outline: props.roll == props.name ? "10px solid gold" : undefined,
        outlineOffset: -10,
      }}>
      {props.name}
      {/* This is for PLACED BETS, only straight and other types currently. all other smaller inside bets arent done... */}
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {props.placedBets
          ?.filter((b) => {
            return (
              b.type == "straight" && b.winsOn.includes(Number(props.name))
            );
          })
          .map((b) => (
            <Chip index={b.chipIndex} size={20} />
          ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {props.winsOn &&
          props.placedBets
            ?.filter((b) => {
              return (
                b.type == props.type &&
                UNORDERED_ARRAY_EQUAL(b.winsOn, props.winsOn!)
              );
            })
            .map((b) => <Chip index={b.chipIndex} size={20} />)}
      </div>

      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {props.winsOn &&
          props.winningBets
            ?.filter((wb) => {
              return (
                wb.type == props.type &&
                UNORDERED_ARRAY_EQUAL(wb.winsOn, props.winsOn!)
              );
            })
            .map((wb) => (
              <div style={{ color: CHIP_COLORS[wb.chipIndex], marginTop: -20 }}>
                +${CHIP_VALUES[wb.chipIndex] * (BET_PAYOUTS[wb.type] + 1)}
              </div>
            ))}
      </div>
    </div>
  );
}

function BetRow(props: {
  start: number;
  length: number;
  startColor?: string;
  onBet?: (betIndexes: number[], chipIndex: number) => void;
  placedBets?: PlacedBet[];
  winningBets?: PlacedBet[];
  roll?: number;
  vertical?: boolean;
}) {
  const content = [];
  const { placedBets, winningBets, roll, vertical } = props;
  const betProps = { placedBets, winningBets, roll };
  const column = vertical ? "row" : "column";
  const row = vertical ? "column" : "row";
  for (var i = 0; i < props.length; i++) {
    const num = props.start + i;
    content.push(
      <Bet
        {...betProps}
        name={num}
        onDrop={
          props.onBet
            ? (chipIndex) => {
                props.onBet?.([num], chipIndex);
              }
            : undefined
        }
      />
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: column }}>{content}</div>
  );
}

function InsideBets(props: {
  onBet: (winsOnIndexes: number[], chipIndex: number) => void;
  placedBets?: PlacedBet[];
  winningBets?: PlacedBet[];
  roll?: number;
  vertical?: boolean;
}) {
  const { placedBets, winningBets, roll, vertical } = props;
  const betProps = { placedBets, winningBets, roll };

  const column = vertical ? "row" : "column";
  const row = vertical ? "column" : "row";

  const rows = 3;
  const cols = 36 / rows;
  const content = [<Bet name='0' {...betProps} />];
  for (var i = 0; i < cols; i++) {
    if (i % 4 == 0) {
      content.push(<div style={{ width: 4 }}></div>);
    }
    content.push(
      <BetRow
        vertical={vertical}
        {...betProps}
        start={i * rows + 1}
        length={rows}
        onBet={props.onBet}
      />
    );
  }
  content.push(<div style={{ width: 4 }}></div>);
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: row,
        justifyContent: "center",
      }}>
      {content}
      <div style={{ display: "flex", flexDirection: column }}>
        <Bet
          {...betProps}
          name='2to1'
          type='Columns'
          winsOn={ROW_1}
          onDrop={
            props.onBet
              ? (chipIndex) => {
                  props.onBet(ROW_1, chipIndex);
                }
              : undefined
          }
        />
        <Bet
          {...betProps}
          name='2to1'
          type='Columns'
          winsOn={ROW_2}
          onDrop={
            props.onBet
              ? (chipIndex) => {
                  props.onBet(ROW_2, chipIndex);
                }
              : undefined
          }
        />
        <Bet
          {...betProps}
          name='2to1'
          type='Columns'
          winsOn={ROW_3}
          onDrop={
            props.onBet
              ? (chipIndex) => {
                  props.onBet(ROW_3, chipIndex);
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

const CHIP_VALUES = [1, 5, 25, 50, 100, 500, 1000];
const CHIP_COLORS = [
  "white",
  "red",
  "blue",
  "orange",
  "grey",
  "teal",
  "lightgreen",
];
const CHIP_TEXT_COLOR = [
  "black",
  "white",
  "white",
  "black",
  "white",
  "white",
  "black",
];

function Chip(props: {
  index: number;
  size?: number;
  onClick?: () => void;
  draggable?: boolean;
}) {
  const size = props.size || 50;
  return (
    <div
      draggable={props.draggable}
      onDragStart={
        props.draggable
          ? (ev) => {
              ev.dataTransfer.setData(CHIP_DATA_KEY, props.index.toString());
            }
          : undefined
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: CHIP_TEXT_COLOR[props.index],
        height: size,
        width: size,
        cursor: props.draggable ? "grab" : undefined,
        borderRadius: size,
        backgroundColor: CHIP_COLORS[props.index],
        marginBottom: -0.85 * size,
        border: `2px solid black`,
        boxShadow: "0px 3px 0px black",
      }}>
      {size > 30 ? CHIP_VALUES[props.index] : undefined}
    </div>
  );
}

function Or0(x?: number) {
  return x || 0;
}

function Equal0Undefined(a: number, b: number) {
  return Or0(a) == Or0(b);
}

function Minus0Undefined(a: number, b: number) {
  return Or0(a) - Or0(b);
}

// 0 and undefined are equivalent
function DIFF_ARRAYS(a: number[], b: number[]) {
  const length = Math.max(a.length, b.length);
  let diffs = 0;
  for (let i = 0; i < length; i++) {
    if (!Equal0Undefined(a[i], b[i])) {
      diffs += Math.abs(Minus0Undefined(a[i], b[i]));
    }
  }

  return diffs;
}

// This is gross lol
function ChipArea(props: {
  chips: number[];
  onClick?: (index: number) => void;
  setChips?: (newChips: number[]) => void;
}) {
  const [currentChips, setCurrentChips] = React.useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  console.log(props.chips, currentChips);

  const chipsChanging = DIFF_ARRAYS(currentChips, props.chips);
  React.useEffect(() => {
    if (chipsChanging) {
      console.log(`Updating chips ${chipsChanging}`);
      const newLocalChips = [...currentChips];

      let incSize = 1;
      if (chipsChanging > 10) {
        incSize = 5;
      }
      if (chipsChanging > 25) {
        incSize = 10;
      }
      if (chipsChanging > 50) {
        incSize = 25;
      }

      // go from bottom to top and add one at a time
      for (let i = 10; i >= 0; i--) {
        if (Or0(currentChips[i]) > Or0(props.chips[i])) {
          newLocalChips[i] = Or0(newLocalChips[i]);
          // min of the DIFF from
          // used to be --!
          newLocalChips[i] -= Math.min(
            incSize,
            Or0(newLocalChips[i]) - Or0(props.chips[i])
          );
          setTimeout(() => {
            setCurrentChips(newLocalChips);
          }, 100);
          return;
        } else if ((currentChips[i] || 0) < (props.chips[i] || 0)) {
          newLocalChips[i] = newLocalChips[i] || 0;
          //newLocalChips[i]++;
          newLocalChips[i] += Math.min(
            incSize,
            Or0(props.chips[i]) - Or0(newLocalChips[i])
          );
          setTimeout(() => {
            setCurrentChips(newLocalChips);
          }, 100);
          return;
        }
      }
    } else {
      console.log("DONE?");
    }
  }, [currentChips, props.chips, chipsChanging]);

  // only show co0;
  let maxIndex = 0;
  currentChips.forEach((v, i) => {
    if (v > 0) {
      maxIndex = i;
    }
  });
  console.log(maxIndex);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: 200,
        marginTop: 10,
      }}>
      {currentChips
        .filter((c, i) => i <= maxIndex + 1)
        .map((c, i) => {
          let columns = [];
          let curCol = [];
          const stackSize = 10;
          for (let x = 0; x < c; x++) {
            if (x % stackSize == 0 && curCol.length > 0) {
              columns.push(
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    margin: 2,
                  }}>
                  {curCol}
                </div>
              );
              curCol = [];
            }
            curCol.push(
              <Chip
                index={i}
                draggable={
                  !chipsChanging &&
                  (x == c - 1 || x % stackSize == stackSize - 1)
                }
              />
            );
          }
          if (curCol.length > 0) {
            columns.push(
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  margin: 2,
                }}>
                {curCol}
              </div>
            );
          }
          return (
            <>
              <div
                style={{
                  display: "flex",
                  minWidth: 80,
                  justifyContent: "center",
                  padding: 10,
                  paddingBottom: 50,
                  margin: 2,
                  borderLeft: "1px solid gold",
                  borderRight: "1px solid gold",
                  position: "relative",
                }}>
                <div
                  onDrop={(ev) => {
                    ev.preventDefault();
                    const chipIndex = Number(
                      ev.dataTransfer.getData(CHIP_DATA_KEY)
                    );
                    if (chipIndex != i) {
                      console.log(
                        `Trading chip ${chipIndex} ($${CHIP_VALUES[chipIndex]}) for ${i} ($${CHIP_VALUES[i]})`
                      );
                      if (chipIndex < i) {
                        // we are trading in for a bigger coin
                        if (
                          props.chips[chipIndex] * CHIP_VALUES[chipIndex] >=
                          CHIP_VALUES[i]
                        ) {
                          const newChips = [...props.chips];
                          newChips[i] = Or0(newChips[i]);
                          newChips[chipIndex] = Or0(newChips[chipIndex]);

                          newChips[chipIndex] -= Math.floor(
                            CHIP_VALUES[i] / CHIP_VALUES[chipIndex]
                          );
                          newChips[i]++;
                          props.setChips?.(newChips);
                        }
                      } else {
                        // we are trading for a lower coin
                        // this is probably OK, since we should be dragging it FROM the stack...
                        if (props.chips[chipIndex] > 0) {
                          const newChips = [...props.chips];
                          newChips[i] = Or0(newChips[i]);
                          newChips[chipIndex] = Or0(newChips[chipIndex]);

                          newChips[chipIndex]--;
                          newChips[i] += Math.floor(
                            CHIP_VALUES[chipIndex] / CHIP_VALUES[i]
                          );
                          props.setChips?.(newChips);
                        }
                      }
                    }
                  }}
                  onDragOver={(ev) => {
                    // could highlight the selected thing here!
                    // otherwise inside bets don't work well!
                    const chipIndex = Number(
                      ev.dataTransfer.getData(CHIP_DATA_KEY)
                    );
                    if (chipIndex != i) {
                      console.log(
                        `Trading chip ${chipIndex} ($${CHIP_VALUES[chipIndex]}) for ${i} ($${CHIP_VALUES[i]})`
                      );
                      if (chipIndex < i) {
                        // we are trading in for a bigger coin
                        if (
                          props.chips[chipIndex] * CHIP_VALUES[chipIndex] >=
                          CHIP_VALUES[i]
                        ) {
                          ev.preventDefault();
                          ev.dataTransfer.dropEffect = "copy";
                        }
                      } else {
                        // we are trading for a lower coin
                        // this is probably OK, since we should be dragging it FROM the stack...
                        if (props.chips[chipIndex] > 0) {
                          ev.preventDefault();
                          ev.dataTransfer.dropEffect = "copy";
                        }
                      }
                    }
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    textAlign: "center",
                    left: 0,
                    right: 0,
                  }}>
                  ${CHIP_VALUES[i]}
                </div>
                {columns}
              </div>
              {/* {props.setChips && props.chips[i + 1] != undefined ?
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: 10, }}>
            {props.chips[i + 1] > 0 ? <div>
              <button onClick={()=>{
                const newChips = [...props.chips];
                newChips[i+1]--;
                newChips[i] += Math.floor(CHIP_VALUES[i+1] / CHIP_VALUES[i]);
                props.setChips?.(newChips);
              }} style={{ fontSize: 14 }}>{"<--"}</button></div> : undefined}
            {(props.chips[i] * CHIP_VALUES[i] >= CHIP_VALUES[i + 1]) ? <div>
              <button  onClick={()=>{
                const newChips = [...props.chips];
                newChips[i] -= Math.floor(CHIP_VALUES[i+1] / CHIP_VALUES[i]);
                newChips[i+1]++;
                props.setChips?.(newChips);
              }} style={{ fontSize: 14 }}>{"-->"}</button></div>: undefined}
          </div> 
          : undefined} */}
            </>
          );
        })}
    </div>
  );
}

interface PlacedBet {
  type: BetTypes;
  chipIndex: number;
  winsOn: number[];
}

function WinsOnToType(winsOn: number[]): BetTypes {
  switch (winsOn.length) {
    // TODO: support these "inside" bets by allowing better bet placement and highlighting!
    case 1:
      return "straight";
    case 2:
      return "split";
    case 3:
      return "street";
    case 4:
      return "square";
    case 12:
      return "Columns";
    default:
      throw "HEY! bad type!";
  }
}

const DEFAULT_CHIPS = [10, 5, 1];

function GetBetPayout(bet: PlacedBet) {
  return CHIP_VALUES[bet.chipIndex] * (BET_PAYOUTS[bet.type] + 1);
}

function App() {
  const [vertical, setVertical] = React.useState(!!LOADED_GAME?.vertical);
  const column = vertical ? "row" : "column";
  const row = vertical ? "column" : "row";

  const [hasSpun, setHasSpun] = React.useState(false);
  const [hasBet, setHasBet] = React.useState(false);
  const [roll, setRoll] = React.useState(0);
  const [bets, setBets] = React.useState<PlacedBet[]>(LOADED_GAME?.bets || []);
  const [chips, setChips] = React.useState(
    LOADED_GAME?.chips || [...DEFAULT_CHIPS]
  );

  const [winningBets, setShowWinnings] = React.useState<PlacedBet[]>([]);

  const [gameStats, setGameStats] = React.useState<Stats>(
    LOADED_GAME?.stats || { ...DEFAULT_STATS }
  );

  const totalMoney = chips.reduce((p, c, i) => {
    return p + c * CHIP_VALUES[i];
  }, 0);

  // TODO: Show a graph of your money!
  const [moneyGraph, setMoneyGraph] = React.useState([totalMoney]);

  const currentWinnings = winningBets.reduce((p, bet, i) => {
    return p + GetBetPayout(bet);
  }, 0);

  React.useEffect(() => {
    SaveGame({
      bets,
      chips,
      stats: gameStats,
      vertical,
    });
  }, [chips, bets, winningBets, gameStats]);

  const addBet = React.useCallback(
    (bet: PlacedBet) => {
      setHasBet(true);
      const newBets = [...bets, bet];
      setBets(newBets);

      setGameStats((stats) => ({
        ...stats,
        totalBets: stats.totalBets + 1,
        totalMoneyBet: stats.totalMoneyBet + CHIP_VALUES[bet.chipIndex],
      }));

      // sum all bets (DO THNIS IN ADD BET)
      const moneyBet = newBets.reduce((p, c) => {
        return p + CHIP_VALUES[c.chipIndex];
      }, 0);

      if (moneyBet > gameStats.maxMoneyBet) {
        setGameStats((stats) => ({ ...stats, maxMoneyBet: moneyBet }));
      }
    },
    [bets, setBets, setGameStats]
  );

  const moveChip = (chipIndex: number) => {
    let c = [...chips];
    c[chipIndex] = Math.max(0, c[chipIndex] - 1);
    setChips(c);
  };

  function createBetProps(winsOn: number[], type: BetTypes) {
    return {
      winsOn,
      type,
      onDrop: (chipIndex: number) => {
        addBet({ chipIndex, winsOn, type });
        moveChip(chipIndex);
      },
      placedBets: bets,
      winningBets,
      roll,
    };
  }

  const gameOver = totalMoney == 0 && bets.length == 0;

  const Header = (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: row,
        alignItems: "center",
        justifyContent: "center",
        margin: "10px 50px",
      }}>
      <h1
        style={{
          marginRight: vertical ? undefined : "auto",
          position: vertical ? undefined : "absolute",
          left: 50,
        }}>
        Roulette
      </h1>

      <button
        title='Spin the wheel'
        style={{
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: 90,
          width: 90,
          color: GetColor(roll),
        }}
        onClick={() => {
          if (bets.length > 0) {
            setGameStats((stats) => ({
              ...stats,
              totalSpins: stats.totalSpins + 1,
            }));
          }
          setHasSpun(true);
          const rollResult = RollWheel();
          setRoll(rollResult);

          // check all bets
          const winningBets = bets.filter((b) => b.winsOn.includes(rollResult));
          setShowWinnings(winningBets);
          setBets([]);

          // do stats for winnings!
          const winnings = winningBets.reduce((p, c) => {
            return p + GetBetPayout(c);
          }, 0);

          // ok pay them out!
          const newChips = [...chips];
          for (const wonBet of winningBets) {
            newChips[wonBet.chipIndex] += BET_PAYOUTS[wonBet.type] + 1; // 1 is YOUR chip which you get back.
            // WOW, winning a bet pays a LOT for a number.
          }
          setChips(newChips);

          const newTotalMoney = chips.reduce((p, c, i) => {
            return p + c * CHIP_VALUES[i];
          }, 0);

          setGameStats((stats) => ({
            ...stats,
            totalMoneyWon: stats.totalMoneyWon + winnings,
            maxWin: Math.max(stats.maxWin, winnings),
            maxMoney: Math.max(stats.maxMoney, newTotalMoney),
          }));
        }}>
        {roll}
      </button>

      {!hasSpun ? (
        <div
          style={{
            color: "white",
            fontWeight: 300,
            fontSize: 18,
            marginLeft: 0,
            position: vertical ? undefined : "absolute",
            left: "calc(50% + 60px)",
          }}>
          {" "}
          {"Click to spin the wheel"}{" "}
        </div>
      ) : undefined}

      <div
        style={{
          fontSize: 24,
          padding: 10,
          color: "gold",
          marginLeft: vertical ? undefined : "auto",
          right: 50,
          position: vertical ? undefined : "absolute",
        }}>
        $
        <span style={{ textShadow: "1px 2px rgba(0,0,0,.5)" }}>
          {totalMoney}
        </span>
        {currentWinnings > 0 ? (
          <span style={{ color: "white" }}> +${currentWinnings}</span>
        ) : undefined}
      </div>
    </div>
  );

  return (
    <div className='App'>
      {gameOver ? (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 100,
            right: 100,
            bottom: 100,
            zIndex: 1000,
            border: "16px double gold",
          }}>
          <h2>Game over!</h2>

          <button
            onClick={() => {
              setGameStats((stats) => ({
                ...stats,
                totalGames: stats.totalGames + 1,
              }));
              setChips([...DEFAULT_CHIPS]);
              setBets([]);
              setShowWinnings([]);
              // TODO: update game stats
            }}>
            New Game?
          </button>
        </div>
      ) : null}

      {vertical ? null : Header}

      <div
        style={{
          display: "flex",
          flexDirection: column,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {/* All bets area */}
        <div
          style={{ display: "inline-flex", flexDirection: column, margin: 10 }}>
          <InsideBets
            vertical={vertical}
            placedBets={bets}
            roll={roll}
            winningBets={winningBets}
            onBet={(winsOn, chipIndex) => {
              moveChip(chipIndex);
              // OK we really need a way to IDENTIFY the different BETS. Like an ID or code.
              addBet({
                chipIndex,
                type: WinsOnToType(winsOn),
                winsOn,
              });
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: row,
              justifyContent: "end",
              marginTop: 4,
            }}>
            <div style={{ flex: 1 }}></div>
            <Bet
              name='1st 12'
              flex='4'
              margin={4}
              {...createBetProps(FIRST_12, "Dozens")}
            />
            <Bet
              name='2nd 12'
              flex='4'
              margin={4}
              {...createBetProps(SECOND_12, "Dozens")}
            />
            <Bet
              name='3rd 12'
              flex='4'
              margin={4}
              {...createBetProps(THIRD_12, "Dozens")}
            />
            <div style={{ width: 4 }}></div>
            <div style={{ flex: 1 }}></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: row,
              justifyContent: "end",
              marginTop: 4,
            }}>
            <div style={{ flex: 1 }}></div>
            <Bet
              name='1-18'
              flex={2}
              margin={4}
              {...createBetProps(ONE_TO_18, "Lows")}
            />
            <Bet
              name='EVEN'
              flex={2}
              margin={4}
              {...createBetProps(EVEN_NUMBERS, "Evens")}
            />
            <Bet
              name='RED'
              color='red'
              flex={2}
              margin={4}
              {...createBetProps(RED_NUMBERS, "Reds")}
            />
            <Bet
              name='GOLD'
              flex={2}
              margin={4}
              {...createBetProps(GOLD_NUMBERS, "Blacks")}
            />
            <Bet
              name='ODD'
              flex={2}
              margin={4}
              {...createBetProps(ODD_NUMBERS, "Odds")}
            />
            <Bet
              name='19-36'
              flex={2}
              margin={4}
              {...createBetProps(NINETEEN_TO_36, "Highs")}
            />
            <div style={{ width: 4 }}></div>
            <div style={{ flex: 1 }}></div>
          </div>
        </div>

        <div>
          {vertical ? Header : null}
          <ChipArea chips={chips} setChips={setChips} />
          <StatsView stats={gameStats} />
          {!hasBet ? (
            <div
              style={{
                color: "white",
                fontWeight: 300,
                fontSize: 18,
                maxWidth: 400,
              }}>
              {" "}
              {
                "Drag your chips to a square to place bets. Or drag between columns to exchange for different chips."
              }{" "}
            </div>
          ) : undefined}
          <button
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onClick={() => setVertical(!vertical)}>
            Rotate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

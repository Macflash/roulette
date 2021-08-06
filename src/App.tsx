import React from 'react';
import logo from './logo.svg';
import './App.css';

const EVEN_NUMBERS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
const ODD_NUMBERS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const GOLD_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

const FIRST_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SECOND_12 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const THIRD_12 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const ONE_TO_18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const NINETEEN_TO_36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const ROW_1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const ROW_2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const ROW_3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

function IsRed(n: number | string) {
  return RED_NUMBERS.indexOf(Number(n)) >= 0;
}

function GetColor(n: number | string) {
  return IsRed(n) ? "rgb(255,80,80)" : "gold"
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
  street: 11, // 3 numbers
  square: 8, // 4 numbers
  six: 5, // ...realy? its 6 numbers duh
}

export const OUTSIDE_BET_PAYOUTS = {
  // Outsides
  Reds: 1,
  Blacks: 1,
  Evens: 1,
  Odds: 1,
  Lows: 1,
  Highs: 1,
  Dozens: 2,
  Columns: 2
}

export type PAYOUTS = typeof INSIDE_BET_PAYOUTS & typeof OUTSIDE_BET_PAYOUTS;

export const BET_PAYOUTS: PAYOUTS = {
  ...INSIDE_BET_PAYOUTS,
  ...OUTSIDE_BET_PAYOUTS,
};

export type BetTypes = keyof PAYOUTS;

const CHIP_DATA_KEY = "text";

function ARRAY_EQUAL(a: number[], b: number[]) {
  return a.filter(ax => b.includes(ax)).length == a.length && b.filter(bx => a.includes(bx)).length == b.length;
}

function Bet(props: {
  onClick?: () => void,
  name: string | number,
  color?: string,
  flex?: number | string,
  margin?: number,
  type?: BetTypes,
  winsOn?: number[],
  onDrop?: (index: number) => void,
  placedBets?: PlacedBet[],
}) {
  return <div
    onDrop={props.onDrop ? (ev) => {
      ev.preventDefault();
      props.onDrop?.(Number(ev.dataTransfer.getData(CHIP_DATA_KEY)));
    } : undefined}
    onDragOver={props.onDrop ? (ev) => {
      ev.preventDefault();
    } : undefined}
    onClick={props.onClick}
    style={{
      cursor: props.onClick ? "pointer" : undefined,
      flex: props.flex,
      marginLeft: props.margin,
      color: props.color || GetColor(props.name),
      textShadow: `1px 2px rgba(0,0,0,.7)`,
      backgroundColor: "green",
      border: "1px solid gold",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      minWidth: 70,
      minHeight: 70,
    }}>
    {props.name}
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {props.placedBets?.filter(b => {
        return b.type == "straight" && b.winsOn.includes(Number(props.name));
      }).map(b => <Chip index={b.chipIndex} size={20} />)}
    </div>
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {props.winsOn && props.placedBets?.filter(b => {
        return b.type == props.type && ARRAY_EQUAL(b.winsOn, props.winsOn!);
      }).map(b => <Chip index={b.chipIndex} size={20} />)}
    </div>
  </div>
}

function BetRow(props: { start: number, length: number, startColor?: string, onBet?: (betIndexes: number[], chipIndex: number) => void, placedBets?: PlacedBet[], }) {
  const content = [];
  for (var i = 0; i < props.length; i++) {
    const num = props.start + i;
    content.push(<Bet
      placedBets={props.placedBets}
      name={num}
      onDrop={props.onBet ? (chipIndex) => { props.onBet?.([num], chipIndex); } : undefined}
    />)
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>
    {content}
  </div>
}

function InsideBets(props: { onBet: (winsOnIndexes: number[], chipIndex: number) => void, placedBets?: PlacedBet[], }) {
  const rows = 3;
  const cols = 36 / rows;
  const content = [<Bet name="0" />];
  for (var i = 0; i < cols; i++) {
    if (i % 4 == 0) {
      content.push(<div style={{ width: 4, backgroundColor: "green" }}></div>)
    }
    content.push(<BetRow placedBets={props.placedBets} start={i * rows + 1} length={rows} onBet={props.onBet} />)
  }
  content.push(<div style={{ width: 4, backgroundColor: "green" }}></div>)
  return <div style={{ display: "inline-flex", flexDirection: "row", justifyContent: "center" }}>
    {content}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Bet placedBets={props.placedBets} name="2to1" type="Columns" winsOn={ROW_1} onDrop={props.onBet ? (chipIndex) => { props.onBet(ROW_1, chipIndex) } : undefined} />
      <Bet placedBets={props.placedBets} name="2to1" type="Columns" winsOn={ROW_2} onDrop={props.onBet ? (chipIndex) => { props.onBet(ROW_2, chipIndex) } : undefined} />
      <Bet placedBets={props.placedBets} name="2to1" type="Columns" winsOn={ROW_3} onDrop={props.onBet ? (chipIndex) => { props.onBet(ROW_3, chipIndex) } : undefined} />
    </div>
  </div>
}

const CHIP_VALUES = [1, 5, 25, 50, 100, 500, 1000];
const CHIP_COLORS = ["white", "red", "blue", "orange", "grey"];

function Chip(props: {
  index: number,
  size?: number,
  onClick?: () => void,
  draggable?: boolean,
}) {
  const size = props.size || 50;
  return <div
    draggable={props.draggable}
    onDragStart={props.draggable ? (ev) => {
      ev.dataTransfer.setData(CHIP_DATA_KEY, props.index.toString());
    } : undefined}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      height: size,
      width: size,
      cursor: props.draggable ? "grab" : undefined,
      borderRadius: size,
      backgroundColor: CHIP_COLORS[props.index],
      marginBottom: -.85 * size,
      border: `2px solid black`,
      boxShadow: '0px 3px 0px black',
    }}>
    {size > 30 ? CHIP_VALUES[props.index] : undefined}
  </div>
}

// This is gross lol
function ChipArea(props: {
  chips: number[],
  onClick?: (index: number) => void,
  setChips?: (newChips: number[]) => void,
}) {
  return <div style={{ display: "flex", backgroundColor: "green", justifyContent: "center", height: 200, marginTop: 10 }}>
    {props.chips.map((c, i) => {
      let columns = [];
      let curCol = [];
      const stackSize = 10;
      for (let x = 0; x < c; x++) {
        if (x % stackSize == 0 && curCol.length > 0) {
          columns.push(<div style={{
            display: "flex",
            flexDirection: "column-reverse",
            margin: 2,
          }}>{curCol}</div>);
          curCol = [];
        }
        curCol.push(<Chip index={i} draggable={x == c - 1 || x % stackSize == stackSize - 1} />)
      }
      if (curCol.length > 0) {
        columns.push(<div style={{
          display: "flex",
          flexDirection: "column-reverse",
          margin: 2,
        }}>{curCol}</div>);
      }
      return <><div style={{
        display: "flex",
        minWidth: 80,
        justifyContent: "center",
        padding: 10,
        paddingBottom: 50,
        margin: 2,
        borderLeft: "1px solid gold",
        borderRight: "1px solid gold", position: "relative"
      }}>
        <div
          onDrop={ev => {
            ev.preventDefault();
            const chipIndex = Number(ev.dataTransfer.getData(CHIP_DATA_KEY));
            if (chipIndex != i) {
              console.log(`Trading chip ${chipIndex} ($${CHIP_VALUES[chipIndex]}) for ${i} ($${CHIP_VALUES[i]})`);
              if (chipIndex < i) {
                // we are trading in for a bigger coin
                if (props.chips[chipIndex] * CHIP_VALUES[chipIndex] >= CHIP_VALUES[i]) {
                  const newChips = [...props.chips];
                  newChips[chipIndex] -= Math.floor(CHIP_VALUES[i] / CHIP_VALUES[chipIndex]);
                  newChips[i]++;
                  props.setChips?.(newChips);
                }
              }
              else {
                // we are trading for a lower coin
                // this is probably OK, since we should be dragging it FROM the stack...
                if (props.chips[chipIndex] > 0) {
                  const newChips = [...props.chips];
                  newChips[chipIndex]--;
                  newChips[i] += Math.floor(CHIP_VALUES[chipIndex] / CHIP_VALUES[i]);
                  props.setChips?.(newChips);
                }
              }
            }
          }}
          onDragOver={ev => {
            const chipIndex = Number(ev.dataTransfer.getData(CHIP_DATA_KEY));
            if (chipIndex != i) {
              console.log(`Trading chip ${chipIndex} ($${CHIP_VALUES[chipIndex]}) for ${i} ($${CHIP_VALUES[i]})`);
              if (chipIndex < i) {
                // we are trading in for a bigger coin
                if (props.chips[chipIndex] * CHIP_VALUES[chipIndex] >= CHIP_VALUES[i]) {
                  ev.preventDefault();
                  ev.dataTransfer.dropEffect = "copy";
                }
              }
              else {
                // we are trading for a lower coin
                // this is probably OK, since we should be dragging it FROM the stack...
                if (props.chips[chipIndex] > 0) {
                  ev.preventDefault();
                  ev.dataTransfer.dropEffect = "copy";
                }
              }
            }
          }}
          style={{ position: "absolute", top: 0, textAlign: "center", left: 0, right: 0, }}>${CHIP_VALUES[i]}</div>
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
      </>;
    })}
  </div>
}

interface PlacedBet {
  type: BetTypes,
  chipIndex: number,
  winsOn: number[],
}

function WinsOnToType(winsOn: number[]): BetTypes {
  switch (winsOn.length) {
    case 1:
      return "straight";
    case 2:
      return "split";
    case 3:
      return "street";
    case 4: return "square";
    case 12: return "Columns";
    default:
      throw "HEY! bad type!";
  }
}

function App() {
  const [hasSpun, setHasSpun] = React.useState(false);
  const [hasBet, setHasBet] = React.useState(false);
  const [roll, setRoll] = React.useState(0);
  const [bets, setBets] = React.useState<PlacedBet[]>([]);

  const [chips, setChips] = React.useState([10, 5, 1, 0, 0]);
  const totalMoney = chips.reduce((p, c, i) => {
    return p + (c * CHIP_VALUES[i]);
  });

  const addBet = React.useCallback((bet: PlacedBet) => {
    setHasBet(true);
    setBets([...bets, bet]);
  }, [bets, setBets]);

  const moveChip = (chipIndex: number) => {
    let c = [...chips];
    c[chipIndex] = Math.max(0, c[chipIndex] - 1);
    setChips(c);
  }

  function createBetProps(winsOn: number[], type: BetTypes) {
    return {
      winsOn,
      type,
      onDrop: (chipIndex: number) => {
        addBet({ chipIndex, winsOn, type });
        moveChip(chipIndex);
      },
      placedBets: bets,
    }
  }

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 50px" }}>
        <h1 style={{ marginRight: "auto", position: "absolute", left: 50 }}>Roulette</h1>

        <button title="Spin the wheel" style={{ borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", height: 90, width: 90, color: GetColor(roll) }} onClick={() => {
          setHasSpun(true);
          const rollResult = RollWheel();
          setRoll(rollResult);

          // check all bets
          const winningBets = bets.filter(b => b.winsOn.includes(rollResult));
          setBets([]);

          // ok pay them out!
          const newChips = [...chips];
          for (const wonBet of winningBets) {
            newChips[wonBet.chipIndex] += BET_PAYOUTS[wonBet.type] + 1; // 1 is YOUR chip which you get back.
            // WOW, winning a bet pays a LOT for a number.
          }
          setChips(newChips);
        }}>{roll}</button>

        {!hasSpun ? <div style={{ color: "white", fontWeight: 300, fontSize: 18, marginLeft: 0, position: "absolute", right: 300 }}> {" <-- Click to spin the wheel"} </div> : undefined}

        <div style={{ backgroundColor: "green", fontSize: 24, padding: 10, color: "gold", marginLeft: "auto", right: 50, position: "absolute"  }}>
          $<span style={{ textShadow: "1px 2px rgba(0,0,0,.5)" }}>{totalMoney}</span>
        </div>
      </div>
      <div style={{ display: "inline-flex", flexDirection: "column" }}>
        <InsideBets placedBets={bets} onBet={(winsOn, chipIndex) => {
          moveChip(chipIndex);
          // OK we really need a way to IDENTIFY the different BETS. Like an ID or code.
          addBet({
            chipIndex,
            type: WinsOnToType(winsOn),
            winsOn,
          })
        }} />
        <div style={{ display: "flex", justifyContent: "end", marginTop: 4 }}>
          <div style={{ flex: 1 }}></div>
          <Bet name="1st 12" flex="4" margin={4} {...createBetProps(FIRST_12, "Dozens")} />
          <Bet name="2nd 12" flex="4" margin={4} {...createBetProps(SECOND_12, "Dozens")} />
          <Bet name="3rd 12" flex="4" margin={4}  {...createBetProps(THIRD_12, "Dozens")} />
          <div style={{ width: 4 }}></div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "end", marginTop: 4 }}>
          <div style={{ flex: 1 }}></div>
          <Bet name="1-18" flex={2} margin={4}  {...createBetProps(ONE_TO_18, "Lows")} />
          <Bet name="EVEN" flex={2} margin={4} {...createBetProps(EVEN_NUMBERS, "Evens")} />
          <Bet name="RED" color="red" flex={2} margin={4} {...createBetProps(RED_NUMBERS, "Reds")} />
          <Bet name="GOLD" flex={2} margin={4}  {...createBetProps(GOLD_NUMBERS, "Blacks")} />
          <Bet name="ODD" flex={2} margin={4}  {...createBetProps(ODD_NUMBERS, "Odds")} />
          <Bet name="19-36" flex={2} margin={4}  {...createBetProps(NINETEEN_TO_36, "Highs")} />
          <div style={{ width: 4 }}></div>
          <div style={{ flex: 1 }}></div>
        </div>
      </div>

      <ChipArea chips={chips} setChips={setChips} />
      {!hasBet ? <div style={{ color: "white", fontWeight: 300, fontSize: 18 }}> {"Drag your chips to a square to place bets. Or drag between columns to exchange for different chips."} </div> : undefined}
    </div >
  );
}

export default App;

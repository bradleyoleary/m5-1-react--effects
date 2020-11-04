import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook"
import useKeydown from "../hooks/useKeydown"
import useDocumentTitle from "../hooks/useDocumentTitle"

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "megacursor", name: "Megacursor", cost: 40, value: 5 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor:0,
    megacursor:0,
    grandma:0,
    farm:0,
  })

  const calculateCookiesPerTick = (purchasedItems) => {
    //console.log(purchasedItems)
    let totalCookies = 0;

    // itterate through items, add totalCookies to item, multiply by item value
    // cursor = 1 per tick, grandma = 10 per tick, farm = 80 per tick
    items.forEach((item) => {
      totalCookies += purchasedItems[item.id] * item.value;
    })
    return totalCookies;
  };

  //Imported code - Need to add a hook to update numCookies once every sec
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    //console.log(numOfGeneratedCookies)
    // Add this number of cookies to the total
    setNumCookies(numCookies + numOfGeneratedCookies)
  }, 1000);

  //new custom hook to add cookies by pressing spacebar
  const addCookie= () => {
    setNumCookies(numCookies + 1)
  }

  useDocumentTitle(`${numCookies} cookies - Cookie Clicker`)

  useKeydown('Space', addCookie)

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          Producing <strong> {calculateCookiesPerTick(purchasedItems)} </strong> cookies per second and
          <strong> {0 + purchasedItems.megacursor * 30} </strong> cookies per click
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1) }>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item, itemIndex) => {
          return (
            <Item
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              firstItem={item.id}
              itemIndex={itemIndex}
              handleClick={() => {
                //console.log('click')
                if (item.cost > numCookies) {
                  window.alert(`Sorry, you do not have enough cookies to buy ${item.name}!`)
                  return;
                } else {
                  setNumCookies(numCookies - item.cost);
                  setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 })
                }
              }}
            />
          )
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;

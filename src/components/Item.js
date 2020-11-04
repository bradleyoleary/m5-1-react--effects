import React from 'react'
import styled from 'styled-components'

const Item = ({ name, cost, value, numOwned, handleClick, itemIndex }) => {
    //new hook to focus on the first item (index of items)
    const firstItemRef = React.useRef();

    React.useEffect(() => {
        if (itemIndex === 0) {
            firstItemRef.current.focus()
        }
    }, [])

    return (
      <Wrapper ref={firstItemRef} onClick={handleClick}>
          <ItemWrap>
            <ItemName>{name}</ItemName>
            <ItemDescription>
                Cost: {cost} cookies, produces {value} cookies/sec.
            </ItemDescription>
          </ItemWrap>
        <ItemInventory>{numOwned}</ItemInventory>
      </Wrapper>
    )
}

const Wrapper = styled.button`
    display: flex;
    padding: 10px;
    border: none;
    background-color: inherit;
`

const ItemWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 10px 0px;
    align-items: flex-start;
    color: white;
    border-bottom: 1px solid grey
`

const ItemName = styled.h1`
`

const ItemDescription = styled.p`
    color: grey;
`

const ItemInventory = styled.h1`
    color: white;
    font-size: 2.5rem
`

export default Item;
import React, { useState, useEffect } from 'react'
import {
  View
} from "react-native";
import PaginationItem from "./paginationItem"
function Pagination(props) {
  const [pageNumber, setPageNumber] = useState({
    first: 0,
    second: 0,
    third: 0,
  })

  useEffect(() => {
    if (parseInt(props.activePage) == 1) {
      setPageNumber({
        first: parseInt(props.activePage),
        second: parseInt(props.activePage) + 1,
        third: parseInt(props.activePage) + 2,
      })
    } else if (props.activePage == props.lastPage) {
      setPageNumber({
        first: parseInt(props.activePage) - 2,
        second: parseInt(props.activePage) - 1,
        third: parseInt(props.activePage),
      })
    } else {
      setPageNumber({
        first: parseInt(props.activePage) - 1,
        second: parseInt(props.activePage),
        third: parseInt(props.activePage) + 1,
      })
    }
  }, [])


  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center", width: "100%", backgroundColor: props.Colors.primary_color }}>
      {parseInt(props.lastPage) > 3 ?
        <PaginationItem Context={props.Context} active={false} Colors={props.Colors} text={"ilk"} pageNumber={1} />
        : null
      }
      < PaginationItem Context={props.Context} active={pageNumber.first == props.activePage ? true : false} Colors={props.Colors} text={pageNumber.first} pageNumber={parseInt(pageNumber.first)} />
      <PaginationItem Context={props.Context} active={pageNumber.second == props.activePage ? true : false} Colors={props.Colors} text={pageNumber.second} pageNumber={parseInt(pageNumber.second)} />
      {parseInt(props.lastPage) > 2 ?
        <PaginationItem Context={props.Context} active={pageNumber.third == props.activePage ? true : false} Colors={props.Colors} text={pageNumber.third} pageNumber={parseInt(pageNumber.third)} />
        : null}
      {parseInt(props.lastPage) > 3 ?
        <PaginationItem Context={props.Context} active={false} Colors={props.Colors} text={"son"} pageNumber={parseInt(props.lastPage)} />
        : null}
    </View>
  )
}

export default Pagination

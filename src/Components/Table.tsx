import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Loader from "./UIKIT/Loader"

interface Props {
  historic: {
    [key: string]: any
  };
  loading:boolean;
  type:string;
}

const defaultProps: Props = {
  historic: [],
  loading:false,
  type:""
}

const TableData = (props:Props) => {

  const [historic, setHistoric] =useState(props.historic)

  useEffect(() => {
    setHistoric(props.historic)
  }, [props]);

  return (
    <TableStyled className="tablestyled">
      {props.loading &&  <Loader/> }

      {props.type === "historic" && 
        <div className="tableFixHead">
            <div className="tittle">Historic Prices</div>
            <table>
              <thead>
                <tr>
                <th className="subtittle">Date</th>
                <th className="subtittle subtittle-right">High</th>
                <th className="subtittle subtittle-right">Low</th>
                </tr>
              </thead>
              <tbody>
              {!props.loading && historic && Object.keys(historic).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td className="subtittle-right">{historic[key]["2. high"]} </td>
                    <td className="subtittle-right">{historic[key]["3. low"]}</td>
                  </tr>
                );
              })}
              {!props.loading &&  historic.length === 0 && 
                <>
                    {new Array(5).fill(1).map((element, i) => {
                      return <tr key={i}>
                                <td>0000-00-00</td>
                                <td className="subtittle-right">00.00000</td>
                                <td className={`subtittle-right`}>00.00000</td>
                              </tr>
                    })}
                </>
              }
              </tbody>
            </table>
         </div>
        }

        {props.type === "daily" &&
          <div className="tableFixHead">
            <div className="tittle">Daily Treend</div>
            <table>
              <thead>
                <tr>
                  <th className="subtittle">Date</th>
                  <th className="subtittle subtittle-right">Open</th>
                  <th className="subtittle subtittle-right">Close</th>
                  <th className="subtittle subtittle-right">Difference</th>
                </tr>
              </thead>
              <tbody>
              {!props.loading &&  historic && Object.keys(historic).map((key:any, index:any) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td className="subtittle-right">{historic[key]["1. open"]} </td>
                    <td className="subtittle-right">{historic[key]["4. close"]}</td>
                    <td className={`subtittle-right ${historic[key]["4. close"] - historic[key]["1. open"] > 0 ? "green" : "red"}`}>
                        {historic[key]["4. close"] - historic[key]["1. open"] > 0 ? "+" : ""}
                        {Number((historic[key]["4. close"] - historic[key]["1. open"]).toFixed(5))}
                    </td>
                  </tr>
                );
              })}
              {!props.loading &&  historic.length === 0 && 
                <>
                    {new Array(5).fill(1).map((element, i) => {
                      return <tr key={i}>
                                <td>0000-00-00</td>
                                <td className="subtittle-right">00.00000</td>
                                <td className="subtittle-right">00.00000</td>
                                <td className={`subtittle-right`}>00.00000</td>
                              </tr>
                    })}
                </>
              }
              </tbody>
            </table>
          </div>
          }
    </TableStyled>
  );
};

TableData.defaultProps =  defaultProps;


const TableStyled= styled.div`
width:100%;
margin-top:2em;
.tittle{
  width:100%;
  background-color:#202837;
  font-size:1.5em;
  padding: 0.5em 0.5em 0.5em 1em;
  text-align:left;
}

.subtittle-right{
  text-align:right;
}


.tableFixHead{ 
  overflow: auto; 
  height: 20em; 
}

.tableFixHead thead th { 
  position: sticky; 
  top: 0; 
  z-index: 1; 
}

table{ 
  
  border-collapse: collapse;
  width: 100%; 
  
}

th, td { 
  padding: 8px 16px; 
  background-color:black;
  border-bottom:2px solid gray;
}

tbody{
 padding:2em;
}

th{
  background:#2d3748; 
}

.green{
  color:#48bb78;
}

.red{
  color:#d75959;
}


@media (max-width: 992px) {

  /* .tittle{
    font-size:2.5em;
  }

  th, td { 
    font-size:1.8em;
  } */
}



`;

export default TableData;

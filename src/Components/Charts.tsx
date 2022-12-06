import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import Loader from "./UIKIT/Loader"

interface Props {
  historic: {
    [key: string]: any
  };
  loading:boolean;
}

[{clave:0,valores:0}]

const defaultProps: Props = {
  historic: [],
  loading:false,
}

const Charts = (props:Props) => {
  const [data, setData] = useState<{name:string,Close:string}[]>([])

  useEffect(() => {
    setData(()=>{
      if(Object.entries(props.historic).length > 0){
        return Object.keys(props?.historic).map((key:any, index:any) => {
          const _historic = []
          return _historic[index] = {
            name:key,
            Close:props.historic[key]["4. close"],
          }
  
        })
      } else {
        return new Array(100).fill(1).map((element, i) => {
          return {
            name:"0",
            Close:"0.0"
          }
        })
      }

    })
  }, [props.historic]);

  return (
    <ResponsiveContainer  width={"100%"} height={600}>
      {props.loading ? <Loader/> :
      
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="Close" stroke="#b19738" />
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      }
    </ResponsiveContainer>
  );
};


Charts.defaultProps =  defaultProps;

export default Charts;

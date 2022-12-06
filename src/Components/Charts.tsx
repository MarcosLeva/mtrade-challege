import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import Loader from "./UIKIT/Loader"
import { useRouter } from "next/router";

interface Props {
  historic: {
    [key: string]: any
  };
  loading:boolean;
  date: string;
  rate:number;
  type:string;
}

const defaultProps: Props = {
  historic: [],
  loading:false,
  date:"",
  rate:0,
  type:""
}

const Charts = (props:Props) => {
  const [data, setData] = useState<{name:string,Close:string}[]>([])
  const [current, setCurrent] = useState<{name:string,Close:string}[]>([])
  const router = useRouter();
  const { pid } = router.query;

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

  useEffect(() => {
    setCurrent((points:any)=>{
      return [...points,{name:props.date,Current:props.rate}]
    })
  }, [props.rate])
  

  useEffect(() => {
    setCurrent([])
    setData([])
  }, [pid])
  

  return (
    <>
      {props.type === "historic" ?
          <>
            <Title>
              Historic Data
            </Title>
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
          </> :
          <>
              <Title>
                Daily Data
              </Title>
              <ResponsiveContainer  width={"100%"} height={600}>
                {props.loading ? <Loader/> :
                <LineChart data={current} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="Current" stroke="#b19738" />
                  <CartesianGrid />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
                }
              </ResponsiveContainer>
          </>
      }
    </>

  );
};


Charts.defaultProps =  defaultProps;

const Title = styled.div`
  width:100%;
  margin-bottom:0.5em;
  font-size:2em;
`;

export default Charts;

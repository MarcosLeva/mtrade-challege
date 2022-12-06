import React,{useEffect,useState, useRef} from "react";
import {HistoricData} from "../src/api/history"
import { useRouter } from "next/router";
import useDataApi from "../src/hooks/useDataApi";
import Banner from "../src/Components/Banner";
import TableData from "../src/Components/Table";
import Charts from "../src/Components/Charts";
import styled from "styled-components";
import {useSocket} from "../src/context/socketContext"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';

function PairShow() {
  const {socket,socketState,connect} = useSocket();
  const router = useRouter();
  const { pid } = router.query;
  const [currency, setCurrency] = useState("")
  const [lowest, setLowest] = useState(0)
  const [highest, setHighest] = useState(0)
  const [points, setPoints] = useState([])
  const [date, setDate] = useState("")
  const [historic, setHistoric] = useState ({})
  const [currencyExchange, setCurrencyExchange] = useState ([])
  const toastID = useRef(null)

  const {
    data,
    isLoading,
    reload,
    error
  } = useDataApi(
    async () =>
      await HistoricData(pid),
    [],
    true
  );

  const clear = () => {
    setLowest(0)
    setHighest(0)
    setPoints([])
    setCurrency("")
    setDate("")
    setHistoric({})
  }


  const getDateUTC = (date) => {
    return date.toISOString().replace("T"," ").substring(0, 19);
  }

  useEffect(() => {
    clear()
    reload()
  }, [pid]);

  useEffect(() => {
    setHistoric(data["Time Series FX (Daily)"])
  }, [data]);

  useEffect(() => {
    if(!socketState){
      connect()
    }
    if(socket && socketState){
      socket.send(JSON.stringify({ action: "subscribe", pair: pid }))
      return () => {
        socket.send(JSON.stringify({ action: "unsubscribe", pair: pid }))
      };
    }
  }, [pid,socket]);

  useEffect(() => {
    if(error){
      toast.error(error.response.data, {
        toastId: toastID,
        theme:"colored",
      });
    }
  }, [error]);

  useEffect(() => {
    if(socket){
      socket.addEventListener("message", (event) => {
        try {
          let currency = JSON.parse(event.data);
          setPoints((points)=>{
            return [currency.point,...points]
          })
          setDate(getDateUTC(new Date()))
          setCurrency(currency.currency)
      } catch (error) {
        setCurrency("No currency Pair")
        setDate("0000-00-00 00:00:00")
      }
      });
    }
  }, [socket]);


  useEffect(() => {
    if(socketState){
      toast.success("Conectado al WebSocket", {
        toastId: toastID,
        theme:"colored"
      });
    } else {
      toast.error("Se ha perdido la conexión al WebSocket", {
        toastId: toastID,
        theme:"colored",
      });
    }
  }, [socketState]);


  useEffect(() => {
      setLowest(points.length > 0 ? Math.min.apply(Math, points) : 0)
      setHighest(points.length > 0 ? Math.max.apply(Math, points) : 0)
  }, [points]);

  return (
  <MainStyled>
    <ToastContainer success hideProgressBar={true}  ref={toastID}/>
    <BannerStyled fluid>
      <Row >
        <Col lg={12} sm={12}>
          <Banner currency={currency} highest={highest} lowest={lowest} rate={points[0]} date={date} loading={isLoading}/> 
        </Col>
      </Row>
    </BannerStyled>

    <TableStyled fluid>
      <Row>
        <Col lg={6} sm={12}>
          <TableData type={"historic"} historic={historic} loading={isLoading} error={error}/>
        </Col>
        <Col lg={6} sm={12}>
          <TableData type={"daily"} historic={historic} loading={isLoading}/>
        </Col>
      </Row>
    </TableStyled>

    <ChartStyled fluid>
      <Row >
        <Col lg={12} sm={12}>
          <Charts historic={historic} loading={isLoading} date={date} rate={points[0]} type={"historic"}></Charts>
        </Col>
      </Row>
    </ChartStyled>

    <ChartStyled fluid>
      <Row >
        <Col lg={12} sm={12}>
          <Charts historic={historic} loading={isLoading} date={date} rate={points[0]} type={"daily"}></Charts>
        </Col>
      </Row>
    </ChartStyled>
  </MainStyled>
  );
}

const TableStyled = styled(Container)`
 
`;

const ChartStyled = styled(Container)`
  margin-top:2em;
`;

const BannerStyled = styled(Container)`
  margin-top:2em;
`;

const MainStyled = styled.div`
  padding:0em 3em 3em 3em;
`;

export default PairShow;
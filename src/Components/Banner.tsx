import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from "./UIKIT/Loader"

interface Props {
  currency: string;
  highest: number;
  lowest: number;
  date: string;
  rate:number;
  loading:boolean;
}

const defaultProps: Props = {
  currency: 'No currency pair',
  highest: 0,
  lowest:0,
  date:'',
  rate:0,
  loading:false
}

const Banner = (props: Props) => {
  return (
    <BannerStyled fluid>
      <Row className="green-border">
        {
          props.loading ? <Loader/> :
          <>
            <Col >
              <div className="colums">
                
                <p className="subtittle under">Currency Pair</p>
                <p className="tittle">{props.currency}</p>
              </div>
            </Col>
            <Col>
              <div className="colums border-right">
                <p className="right-text subtittle">Current Exchange Rate Value</p>
                <p className="right-text green tittle">{props.rate?.toFixed(4)}</p>
              </div>
            </Col>
            <Col >
              <div className="colums border-right">
                <p className="right-text subtittle">Highest Exchange Rate Today</p>
                <p className="right-text tittle">{props.highest?.toFixed(4)}</p>
              </div>
            </Col>
            <Col >
              <div className="colums border-right">
                <p className="right-text subtittle">Lowest Exchange Rate Today</p>
                <p className="right-text tittle">{props.lowest?.toFixed(4)}</p>
              </div>
            </Col>
            <Col  className="right-text">
              <div className="colums">
                <p className="right-text subtittle">Last Update (UTC)</p>
                <p className="right-text tittle">{props.date}</p>
              </div>
            </Col>
          </>
        }

      </Row>
    </BannerStyled>
  );
};

const BannerStyled= styled(Container)`
  background-color:black;
  padding:0.7em;
  border: 1px solid gray;

  .green-border{
    border-left: 5px solid #48bb78;

  }

  .colums{
    display:inline-block;
    justify-content: space-between;
    
  }

  .border-right{
    border-right: 1px solid gray;
  }

  .right-text{
    text-align:right;
  }

  .subtittle{
    font-size:0.8em;
    opacity:0.4;
  }

  .tittle{
    font-size:1.3em;
  }

  .green{
    color:#48bb78;
  }

  .under{
    border-bottom: 2px solid white;
  }

  .border-right{
    border-right: 1px solid gray;
    padding-right:1em
  }


  @media (max-width: 992px) {
    .subtittle{
      font-size:1.2em;
      opacity:0.4;
    }
  
    .tittle{
      font-size:1.6em;
    }
  }

`;


Banner.defaultProps =  defaultProps;


export default Banner;

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <Container fluid style={{padding:"3em"}}>
      <Row>
        <Col lg={12}>
          <h3>Observaciones</h3>
          <p>Se agregó un toast notification para informar una vez que se ha perdido o se ha conectado al Socket.</p>
          <p>Se agregó una gráfica extra la cual muestra el Current Exchange en tiempo real con fines ilustrativos y para mejorar la experiencia del usuario.</p>
          <p>Cuando ocurra un error en una request, las tablas, banner y gráficas mostrarán Dummy data con fines ilustrativos, así como también, un toast notification informando el error.</p>
        </Col>
      </Row>
    </Container>
  )
}

const Main = styled(Container)`
  padding:3em
`;

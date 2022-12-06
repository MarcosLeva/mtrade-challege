import React from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import useDataApi from "../hooks/useDataApi";
import {Pairs} from "../api/history";
import  Button  from "../UIkit/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = () => {
  const router = useRouter();
  const {
    data:links,
    isLoading,
    reload,
  } = useDataApi(
    async () =>
      await Pairs(),
    [],
    true
  );

  return (
    <>
    {!isLoading &&       
      <Container fluid>
              <NavbarStyled expand="lg" >
                {!isLoading && links.map(
                        (link, i) =>
                          link && (
                            <div
                              className={`header-link ${
                                router.asPath === `/${link.id}` ? "active" : ""
                              }`}
                            
                              key={`${i}`}
                            >

                              <ButtonStyled  className={`${
                                router.asPath === `/${link.id}` ? "active" : ""
                              }`} onClick={()=>router.push(`/[pid]`,`/${link.id}`)}  borderRadius={"0px"} >
                                {link.label} 
                              </ButtonStyled>

                        
                            </div>
                          )
                      )}

              </NavbarStyled>
      </Container>
    }

{/*       <NavbarStyled bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {links.map(
                (link, i) =>
                  link && (
                    <div
                      className={`header-link ${
                        router.asPath === `/${link.id}` ? "active" : ""
                      }`}
                    
                      key={`${i}`}
                    >
                      <Button  className={`${
                        router.asPath === `/${link.id}` ? "active" : ""
                      }`} onClick={()=>router.push(`/[pid]`,`/${link.id}`)}  borderRadius={"0px"} >
                        {link.label} 
                      </Button>
                    </div>
                  )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </NavbarStyled> */}
{/*     <HeaderStyled linksLength={links.length}>
      <div className={"header-container"}>
        <div className={"header-links"}>
          {links.map(
            (link, i) =>
              link && (
                <div
                  className={`header-link ${
                    router.asPath === `/${link.id}` ? "active" : ""
                  }`}
                 
                  key={`${i}`}
                >
                  <ButtonStyled  className={`${
                    router.asPath === `/${link.id}` ? "active" : ""
                  }`} onClick={()=>router.push(`/[pid]`,`/${link.id}`)}  borderRadius={"0px"} >
                    {link.label} 
                  </ButtonStyled>
                </div>
              )
          )}
        </div>

      </div>
    </HeaderStyled> */}
    </>

  );
};

const NavbarStyled = styled(Navbar)`
  background-color: #1a202c !important;
  padding:1em 3em 0em 3em;
  color:#fff !important;


  .header-link {
    margin:10px
  }

  .active {
    border-top: 1px solid #2574d3;
  }

  .active > button {
    background-color: #2d3748;
  }

  .active a {
    margin-bottom: -4px;
  }

`;

const ButtonStyled = styled(Button)`
    background-color:#202837;
    cursor:pointer;
    width:100%;
    height:100%;
    font-size:1.5em;
    padding:0.5em;

`



export default Header;

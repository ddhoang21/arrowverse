import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ListGroup,
  Button,
} from 'react-bootstrap';

import './MainShow.css';

const MainShow = ({ showData, castData }) => {
  const downloadCSVFromJson = (filename, JSONdata) => {
    const replacer = (key, value) => (value === null ? 'null' : value);
    const header = Object.keys(JSONdata[0]);
    let csv = JSONdata.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    let link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv)
    );
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <img src={showData.image.original} alt='arrow' className='show_image' />
      <Container>
        <Row>
          <Col>
            <div className='mt-4'>
              <h1 className='mt-4'>{showData.name}</h1>
              <p>{showData.summary.slice(3, showData.summary.length - 4)}</p>
            </div>
          </Col>
          <Col>
            <div className='show_info mt-4'>
              <Card bg='dark' style={{ width: '21rem' }}>
                <Card.Header>Show Info</Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item variant='dark'>
                    <strong>Network: </strong>
                    <img
                      src='https://static.tvmaze.com/intvendor/flags/us.png'
                      alt='United States'
                    />
                    <a
                      href='https://www.cwtv.com/'
                      target='_blank'
                      rel='noreferrer'
                      className='network_link'
                    >
                      {showData.network.name}
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    <strong>Status: </strong>
                    {showData.status}
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    <strong>Show Type: </strong>
                    {showData.type}
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    <strong>Genres: </strong>
                    {showData.genres[0]} | {showData.genres[1]} |{' '}
                    {showData.genres[2]}
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    <strong>Premiered: </strong>
                    {showData.premiered}
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    {' '}
                    <strong>Ended: </strong>
                    {showData.ended}
                  </ListGroup.Item>
                  <ListGroup.Item variant='dark'>
                    {' '}
                    <strong>Rating: </strong>
                    {showData.rating.average}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className='mt-4'>
        <Row>
          <Col>
            <h3 className='mb-3 mt-3'>Cast Members</h3>
          </Col>
          <Col>
            <Button
              onClick={() => downloadCSVFromJson(`castMembers.csv`, castData)}
              variant='outline-light'
              size='sm'
              className='mb-4 mt-3'
            >
              Download CSV
            </Button>
          </Col>
        </Row>

        <Row>
          {castData.map((cast, index) => {
            return (
              <CardGroup>
                <img
                  src={cast.person.image.medium}
                  alt='cast'
                  style={{ width: '8rem', height: '10rem' }}
                />
                <Card key={index} bg='dark'>
                  <Card.Body>
                    <Card.Title>{cast.person.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      as
                    </Card.Subtitle>
                    <Card.Text>{cast.character.name}</Card.Text>
                    <Link
                      key={cast}
                      to={`/cast/${cast.person.id}`}
                      variant='link'
                      id='more_btn'
                    >
                      <strong>More info {'>'}</strong>
                    </Link>
                  </Card.Body>
                </Card>
              </CardGroup>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default MainShow;

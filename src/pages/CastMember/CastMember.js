import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';

import './CastMember.css';

const CastMember = ({ castData }) => {
  let { id } = useParams();
  let navigate = useNavigate();

  let member = '';
  for (let i = 0; i < castData.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (id == castData[i].person.id) {
      member = castData[i];
    }
  }

  let countryData = '';
  if (!member.person.country) {
    countryData = 'unknown';
  } else {
    countryData = member.person.country.name;
  }

  let birthdateData = '';
  if (!member.person.birthday) {
    birthdateData = 'unknown';
  } else {
    birthdateData = member.person.birthday;
  }

  let usFlag = 'https://static.tvmaze.com/intvendor/flags/us.png';
  let caFlag = 'https://static.tvmaze.com/intvendor/flags/ca.png';
  let gbFlag = 'https://static.tvmaze.com/intvendor/flags/gb.png';
  let nzFlag = 'https://static.tvmaze.com/intvendor/flags/nz.png';

  let countryFlag;
  if (!member.person.country) {
    countryFlag = null;
  } else if (member.person.country.name === 'Canada') {
    countryFlag = caFlag;
  } else if (member.person.country.name === 'New Zealand') {
    countryFlag = nzFlag;
  } else if (member.person.country.name === 'Great Britain') {
    countryFlag = gbFlag;
  } else {
    countryFlag = usFlag;
  }

  return (
    <div>
      <Container>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant='link'
          id='back_btn'
          className='mb-4 mt-3'
        >
          <strong>{'<'} Back</strong>
        </Button>
        <Card bg='dark' style={{ width: '21rem' }} className='member_card'>
          <Card.Img
            variant='top'
            src={member.person.image.original}
            alt='member'
          ></Card.Img>
          <Card.Header>
            <strong>{member.person.name}</strong>
          </Card.Header>
          <ListGroup variant='flush'>
            <ListGroup.Item variant='dark'>
              <strong>Born in:</strong> {countryData}{' '}
              <img src={countryFlag} alt='flag' />
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <strong>Birthdate:</strong> {birthdateData}
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <strong>Gender:</strong> {member.person.gender}
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <strong>Biography:</strong>{' '}
              <a
                href={member.person.url}
                target='_blank'
                rel='noreferrer'
                className='person bio'
              >
                TV Maze
              </a>
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <strong>Character:</strong>{' '}
              <a
                href={member.character.url}
                target='_blank'
                rel='noreferrer'
                className='character bio'
              >
                {member.character.name}
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
};

export default CastMember;

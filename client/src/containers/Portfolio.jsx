import React from 'react';
import { Segment } from 'semantic-ui-react';
import Blotter from '../components/Blotter';

const Portfolio = () => (
  <Segment.Group className="blotter">
    <Segment>
      <Blotter />
    </Segment>
    <Segment>Bovril</Segment>
    <Segment>Marmite</Segment>
  </Segment.Group>
);

export default Portfolio;
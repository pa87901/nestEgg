import React from 'react';
import { Segment } from 'semantic-ui-react';
import Blotter from '../components/Blotter';

const Portfolio = () => (
  <Segment.Group className="blotter">
    <Segment>
      <Blotter />
    </Segment>
    <Segment>Middle</Segment>
    <Segment>Bottom</Segment>
  </Segment.Group>
);

export default Portfolio;
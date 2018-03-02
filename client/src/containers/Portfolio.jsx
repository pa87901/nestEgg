import React from 'react';
import { Segment } from 'semantic-ui-react';
import Blotter from '../components/Blotter';
import Ticket from '../components/Ticket';

const Portfolio = () => (
  <Segment.Group className="blotter">
    <Segment>
      <Blotter />
    </Segment>
    <Segment>
      <Ticket />
    </Segment>
    <Segment>Marmite</Segment>
  </Segment.Group>
);

export default Portfolio;
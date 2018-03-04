import React from 'react';
import { Segment } from 'semantic-ui-react';
import Blotter from '../components/Blotter';
import Ticket from '../components/Ticket';

const Portfolio = () => (
  <div>
    <h1>Nest Egg World</h1>
    <div className="blotter-container">
      <Segment.Group className="blotter">
        <Segment>
          <Blotter />
        </Segment>
        <Segment>
          <Ticket />
        </Segment>
        <Segment>Marmite</Segment>
      </Segment.Group>
    </div>
  </div>
);

export default Portfolio;
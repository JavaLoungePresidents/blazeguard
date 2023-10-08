import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface CustomCardProps {
  content: ReactNode;
}

const CardContainer: React.FC<CustomCardProps> = ({ content }) => {
  return (
    <Card className="fluid">
      <div className="card-content">
        {content}
      </div>
    </Card>
  );
};

export default CardContainer;

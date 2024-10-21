import { Card, CardContent, CardHeader, Container } from '@mui/material';
import React, { ReactNode } from 'react';

type HomeCardSectionProps = {
  title: string;
  children: ReactNode;
};

// Home page card section component
const HomeCardSection = ({ title, children }: HomeCardSectionProps) => {
  return (
    <Container maxWidth="xl" className="my-4">
      <Card elevation={3}>
        <CardHeader title={title} />
        <CardContent>
          <div className="flex gap-3">{children}</div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomeCardSection;

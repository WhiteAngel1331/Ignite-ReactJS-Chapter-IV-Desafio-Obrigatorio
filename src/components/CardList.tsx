import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');

  function handleViewImage(url: string): void {
    setSelectedImage(url);
    onOpen();
  }

  return (
    <>
      <ModalViewImage
        imgUrl={selectedImage}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => {
          return <Card data={card} key={card.id} viewImage={handleViewImage} />;
        })}
      </SimpleGrid>
    </>
  );
}

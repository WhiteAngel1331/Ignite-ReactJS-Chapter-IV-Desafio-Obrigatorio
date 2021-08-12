import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="#1f1f1f" maxWidth="900px">
        <ModalBody>
          <Flex justify="center">
            <Image src={imgUrl} alt="ModalImage" />
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} target="_blank" alignSelf="flex-end">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

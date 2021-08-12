import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type DataType = {
  description: string;
  id: string;
  title: string;
  ts: number;
  url: string;
};

type RequisitionType = {
  after: string;
  data: Array<DataType>;
};

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<RequisitionType> {
    const { data } = await api.get<RequisitionType>(
      `/api/images${pageParam ? `?after=${pageParam}` : ''}`
    );

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: requisition => requisition.after || null,
  });

  const formattedData = useMemo(() => {
    const flated = data?.pages.map(page => page.data).flat();
    return flated || [];
  }, [data]);

  if (isLoading && !data) {
    return <Loading />;
  }
  if (isError && !data) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}

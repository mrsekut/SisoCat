import { BlitzPage } from 'blitz';
import Layout from 'app/layouts/Layout';
import { Reditors } from 'app/components/Reditors';
import { x } from '@xstyled/styled-components';
import React, { Suspense } from 'react';

const Home: BlitzPage = () => {
  const noteIds = [1, 2, 3];
  return (
    <x.main h='100vh'>
      <Suspense fallback='Loading...'>
        <Reditors noteIds={noteIds} />
      </Suspense>
    </x.main>
  );
};

Home.getLayout = page => <Layout title='Home'>{page}</Layout>;

export default Home;

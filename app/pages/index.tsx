import { BlitzPage } from 'blitz';
import Layout from 'app/layouts/Layout';
import { Reditors } from 'app/components/Reditor';
import { x } from '@xstyled/styled-components';
import React, { Suspense } from 'react';

const Home: BlitzPage = () => {
  const noteIds = [1, 2];
  return (
    <x.div className='container'>
      <x.main>
        <Suspense fallback='Loading...'>
          <Reditors noteIds={noteIds} />
        </Suspense>
      </x.main>
    </x.div>
  );
};

Home.getLayout = page => <Layout title='Home'>{page}</Layout>;

export default Home;

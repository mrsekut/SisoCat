import { BlitzPage } from 'blitz';
import Layout from 'app/layouts/Layout';
import { Reditor } from 'app/components/Reditor';
import { x } from '@xstyled/styled-components';
import React, { Suspense } from 'react';
import { Draggable } from 'app/components/Draggable';
import { Expand } from 'app/components/Expand';

const Home: BlitzPage = () => {
  const noteIds = [1, 1, 1, 1];
  return (
    <x.div className='container'>
      <x.main>
        <Suspense fallback='Loading...'>
          {noteIds.map(id => (
            <Draggable>
              <Expand init={false}>
                <Reditor noteId={id} />
              </Expand>
            </Draggable>
          ))}
        </Suspense>
      </x.main>
    </x.div>
  );
};

Home.getLayout = page => <Layout title='Home'>{page}</Layout>;

export default Home;

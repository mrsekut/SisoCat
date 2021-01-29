import { BlitzPage } from 'blitz';
import Layout from 'app/layouts/Layout';
import { Reditor } from 'app/components/Reditor';
import { x } from '@xstyled/styled-components';

const Home: BlitzPage = () => {
  return (
    <x.div className='container'>
      <x.main>
        <Reditor />
      </x.main>
    </x.div>
  );
};

Home.getLayout = page => <Layout title='Home'>{page}</Layout>;

export default Home;

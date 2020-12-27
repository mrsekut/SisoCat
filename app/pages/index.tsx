import { BlitzPage } from 'blitz';
import Layout from 'app/layouts/Layout';
import { Reditor } from 'app/components/Reditor';

const Home: BlitzPage = () => {
  return (
    <div className='container'>
      <main>
        <Reditor text='私は[Haskell]が好きです' />
      </main>
    </div>
  );
};

Home.getLayout = page => <Layout title='Home'>{page}</Layout>;

export default Home;

import type { NextPage } from 'next';
import BroadwayWidget from '../src/client/components/BroadwayWidget';

const Home: NextPage = () => {
  return (
    <div className='home-page'>
      <BroadwayWidget />
    </div>
  );
};

export default Home;

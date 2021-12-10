import type { NextPage } from 'next';
import Visualization from '../src/client/components/Visualization';

const Home: NextPage = () => {
  return (
    <div className='home-page'>
      <Visualization />
    </div>
  );
};

export default Home;

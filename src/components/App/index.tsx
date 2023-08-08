
import { ErrorAlert } from '../ErrorAlert';
import { Identity } from '../Identity';
import Map from '../Map';
import VideoModal from '../VideoModal';

const App = () => {
  return (
    <>
      <Map>
      </Map>
      <ErrorAlert></ErrorAlert>
      <Identity></Identity>
      <VideoModal></VideoModal>
    </>
  );
};

export default App;

import * as styles from './VideoModal.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import { CalciteAction } from '@esri/calcite-components-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { setVideoModeEnabled } from '../../store/services/videoMode';
import { useState } from 'react';

const VideoModal = () => {
  const isOpen = useSelector((state: RootState) => state.videoMode.enabled);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const dispatch = useAppDispatch();
  return (
    <div className={isOpen ? styles.show : styles.hide}>
      <div className={styles.modalContainer}>
        <div>
          <div className={styles.close}>
            <CalciteAction
              appearance='transparent'
              icon='x'
              onClick={() => {
                dispatch(setVideoModeEnabled({ enabled: false }));
              }}
              scale='m'
              text={'Close modal window'}
            ></CalciteAction>
          </div>
          <input type='range' min={0} max={1} step={0.1} value={videoOpacity} onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setVideoOpacity(+evt.target.value);
          }} />

          <video onTimeUpdate={evt => console.log(evt)} controls className={styles.video} style={{ opacity: videoOpacity }}>
            <source src="./data/videoBerlin.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

import * as styles from './Map.module.css';
import { Children, FC, ReactElement, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import { mapConfig } from '../../config';
import { setGlobalView } from '../../store/globals';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setViewLoaded } from '../../store/services/app-loading/loadingSlice';
import PortalItem from '@arcgis/core/portal/PortalItem';
import WebScene from '@arcgis/core/WebScene';
import { setError } from '../../store/services/error-messaging/errorSlice';
import { CalciteLabel } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-action';

interface MapProps {
  children?: ReactNode;
}

const Map: FC<MapProps> = ({ children }: MapProps) => {
  const [view, setView] = useState<SceneView | null>(null);
  const [cameraFOV, setCameraFOV] = useState(85);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (view) {
      const camera = view.camera.clone();
      camera.fov = cameraFOV;
      view.camera = camera;
    }
  }, [view, cameraFOV]);

  const initializeMapView = async () => {
    try {
      const portalItem = new PortalItem({
        id: mapConfig['web-map-id']
      });

      await portalItem.load();
      const webmap = new WebScene({
        portalItem: portalItem
      });
      await webmap.load();
      const mapView = new SceneView({
        container: mapDivRef.current,
        map: webmap,
        padding: {
          top: 50,
          bottom: 0
        },
        ui: {
          components: []
        },
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          },
          highlightEnabled: false,
          defaultPopupTemplateEnabled: false,
          autoOpenEnabled: false
        }
      });

      await mapView.when(() => {
        setView(mapView);
        setGlobalView(mapView);
        dispatch(setViewLoaded(true));
        // @ts-ignore
        window.view = mapView;
      });
    } catch (error) {
      const { message } = error;
      dispatch(setError({ name: 'Error on map', message: message }));
    }
  };

  // initialize view
  useEffect(() => {
    initializeMapView();
  }, []);

  return (
    <>
      <CalciteLabel className={styles.fov}>Camera field of view: <input type='range' min={5} max={100} step={1} value={cameraFOV} onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
        setCameraFOV(+evt.target.value);
      }} /></CalciteLabel>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
      {Children.map(children, (child: ReactNode) => {
        return cloneElement(child as ReactElement, {
          view
        });
      })}

    </>
  );
};

export default Map;

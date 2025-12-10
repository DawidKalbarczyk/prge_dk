import {React, useRef, useEffect} from 'react';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import {useGeographic} from "ol/proj";
import "ol/ol.css";

function MapComponent(props) {
    const mapRef = useRef(null);
    useGeographic();
    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
              new TileLayer({
                  source: new OSM(),
              })
            ],
            view: new View({
                center: [21, 52],
                zoom: 6
            })
        });
        return () => map.setTarget(null);
    }, [] ) ;  // Referencja która odświeża po zmianie wartości w [user]


    return (


        <div className="mapComponent" ref={mapRef}>
            TO JEST DZIAŁAJĄCA MAPA
        </div>
    );
}

export default MapComponent;
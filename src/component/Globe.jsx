import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

// const COUNTRY = 'Romania';
const MAP_CENTER = { lat: 51, lng: 0, altitude: 2 };
const OPACITY = 0.9;

const GlobeGl = () => {
  const globeEl = useRef();
  const [arcsData, setArcsData] = useState([]);
  const [startupsData, setStartupsData] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [hoverArc] = useState();

  const budapestCoord = { lat: 44.219123, lng: 28.6628 };
  const ukCoord = { lat: 51.373173, lng: -0.03596 };
  const ottawaCoord = { lat: 45.386636, lng: -75.573843 };
  const caracasCoord = { lat: 10.078389, lng: -66.710837 };
  // const missouriCoord = { lat: 10.078389, lng: -92.55716 };
  const stockholmCoord = { lat: 59.252807, lng: 18.248257 };
  const lisabonaCoord = { lat: 38.653444, lng: -9.102586 };

  useEffect(() => {
    // load data
    const arcsData = [
      {
        startLat: budapestCoord.lat,
        startLng: budapestCoord.lng,
        endLat: ukCoord.lat,
        endLng: ukCoord.lng,
        name: 'Contributor1',
        paycheck: '2000 Usdt',
        // color: [['red', 'white', 'white', 'green'][1], ['red', 'white', 'blue', 'green'][2]],51.50841658073374, -0.12360681741863422
      },
      {
        startLat: ottawaCoord.lat,
        startLng: ottawaCoord.lng,
        endLat: ukCoord.lat,
        endLng: ukCoord.lng,
        name: 'Contributor2',
        paycheck: '4500 Usdt',
        startup: 'startup 1',
      },
      {
        startLat: caracasCoord.lat,
        startLng: caracasCoord.lng,
        endLat: ukCoord.lat,
        endLng: ukCoord.lng,
        name: 'Contributor3',
        paycheck: '54300 Ada',
        startup: 'startup 1',
      },

      {
        startLat: budapestCoord.lat,
        startLng: budapestCoord.lng,
        endLat: stockholmCoord.lat,
        endLng: stockholmCoord.lng,
        name: 'Contributor1',
        paycheck: '34400 Usdt',
      },
      {
        startLat: lisabonaCoord.lat,
        startLng: lisabonaCoord.lng,
        endLat: stockholmCoord.lat,
        endLng: stockholmCoord.lng,
        name: 'Contributor4',
        paycheck: '23563 Usdt',
      },
    ];
    const startupsData = [
      {
        lat: ukCoord.lat,
        lng: ukCoord.lng,
        name: 'startup 1',
        pop_max: 2395472,
        labelColor: 'rgba(255, 165, 0, 0.75)',
        pointSize: '0.07',
        pointCcolor: 'rgba(83, 104, 36, 0.75)',
      },
      {
        lat: stockholmCoord.lat,
        lng: stockholmCoord.lng,
        name: 'startup 2',
        pop_max: 2395479,
        labelColor: 'rgba(255, 165, 0, 0.75)',
        pointSize: '0.002',
        pointCcolor: 'rgba(185, 228, 85, 0.75)',
      },
    ];
    const constributorsData = [
      {
        lat: budapestCoord.lat,
        lng: budapestCoord.lng,
        name: 'Contributor1',
        pop_max: 1195401,
        labelColor: 'green',
      },
      {
        lat: ottawaCoord.lat,
        lng: ottawaCoord.lng,
        name: 'Contributor2',
        pop_max: 1195401,
        labelColor: 'green',
      },
      {
        lat: caracasCoord.lat,
        lng: caracasCoord.lng,
        name: 'Contributor3',
        pop_max: 1195401,
        labelColor: 'green',
      },
      {
        lat: caracasCoord.lat,
        lng: caracasCoord.lng,
        name: 'Contributor3',
        pop_max: 1195401,
        labelColor: 'green',
      },
      {
        lat: lisabonaCoord.lat,
        lng: lisabonaCoord.lng,
        name: 'Contributor4',
        pop_max: 1195401,
        labelColor: 'green',
      },
    ];
    setArcsData(arcsData);
    setStartupsData(startupsData);
    setContributors(constributorsData);
    globeEl.current.pointOfView(MAP_CENTER, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArcTooltip = (d) => `
  <div style="text-align: center">
    <div><b>${d.name}</b>---> ${d.paycheck}</div>
    <div>Arc extra info ?</div>
  </div>
`;
  const getLabelTooltip = (d) => `
  <div style="text-align: center">
    <div><b>Deposit</b>: 234432 Usdt</div>
    <div>Point extra info ?</div>
  </div>
`;

  const getAlt = (d) => 0 * 5e-5;

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // dash config
      arcsData={arcsData}
      arcLabel={getArcTooltip}
      arcColor={(d) => {
        const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;
        return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
      }}
      arcDashLength={0.4}
      arcDashGap={0.2}
      arcDashAnimateTime={1500}
      arcsTransitionDuration={0}
      //points config
      pointsData={startupsData}
      pointAltitude={(d) => d.pointSize}
      pointColor={(d) => d.pointCcolor}
      pointLabel={getLabelTooltip}
      pointRadius={0.12}
      // label config
      labelsData={startupsData.concat(contributors)}
      labelLat={(d) => d.lat}
      labelLng={(d) => d.lng}
      labelText={(d) => d.name}
      labelSize={(d) => Math.sqrt(d.pop_max) * 4e-4}
      labelDotRadius={(d) => Math.sqrt(d.pop_max) * 4e-4}
      labelAltitude={(d) => getAlt(d) + 1e-6}
      labelColor={(d) => d.labelColor}
      labelResolution={1}
      labelLabel={getLabelTooltip}
    />
  );
};

export default GlobeGl;

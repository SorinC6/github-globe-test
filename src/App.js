import './App.css';
import { useState } from 'react';
import Globe from './component/Globe';
import image1 from './component/image.png';
import image2 from './component/image2.png';

function App() {
  // console.log(window);
  const [image, setImage] = useState(
    'https://res.cloudinary.com/dhsegkn40/image/upload/v1635443785/o7fxg3031ooffaf7j2ox.png',
  );
  // const initDapp = () => {
  //   window.cardano_check_read_access().then((access_granted) => {
  //     console.log('access_granted', access_granted);
  //   });
  // };
  // useEffect(() => {
  //   initDapp();
  // });

  return (
    <div className="App">
      <header className="App-header">
        <p1>Test Github Globe</p1>
        <label for="cars">Choose a Image:</label>
        <select name="cars" id="cars" value={image} onChange={(e) => setImage(e.target.value)}>
          <option value="https://res.cloudinary.com/dhsegkn40/image/upload/v1635443785/o7fxg3031ooffaf7j2ox.png">
            first
          </option>
          <option value="https://res.cloudinary.com/dhsegkn40/image/upload/v1635443800/niikpdwvy0ekwzkk8paq.png">
            second
          </option>
        </select>
        <Globe imageSelected={image} />
      </header>
    </div>
  );
}

export default App;

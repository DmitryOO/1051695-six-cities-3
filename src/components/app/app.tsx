import MainPage from '../../pages/main-page/main-page';
import { Settings } from '../../consts';


function App(): JSX.Element {
  return (
    <MainPage rentOffersCount={Settings.rentOffersCount} isSignedIn = {Settings.isSignedIn}/>
  );
}

export default App;

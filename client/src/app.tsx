import { MainScreen } from "./screens/main";
import { BrowseScreen } from "./screens/browse";
import { AboutScreen } from "./screens/about";
import { ProfileScreen } from "./screens/profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppAppBar from "./modules/views/AppAppBar";

import withRoot from "./modules/withRoot";

const etherum = {
  id : 1,
  name : "etherum",
  logo: "https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456_new.svg"
}
const profile = {
  id : 1,
  nickname : 'kingalgo',
  avatar: "https://www.microstockposts.com/storage/2019/10/000074.jpg",
  address: "0x51A5DAFFF0BC0CB3380DD3FB253F2CC10C39E89D",
  description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in elementum urna. Sed imperdiet, sem dapibus scelerisque accumsan, nunc erat dignissim arcu, at finibus tellus magna ac erat. Morbi finibus laoreet lectus, nec luctus dui rhoncus id." ,
  collection : [
    {
      id : 1,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: etherum,
      name : 'Monkey tool belt',
      status: 'sale'
    },
    {
      id : 2,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: etherum,
      name : 'Cool jesus',
      status: 'new'

    },
    {
      id: 3,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: etherum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 4,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: etherum,
      name : 'Cool cats',
      status: ''
    },
    {
      id: 5,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: etherum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id: 6,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: etherum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 7,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: etherum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 8,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: etherum,
      name : 'Cool cats',
      status: ''
    },
    {
      id: 9,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: etherum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id: 10,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: etherum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 11,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: etherum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 12,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: etherum,
      name : 'Cool cats',
      status: ''
    }

  ]
};
export default withRoot(() => {
  return (
    <BrowserRouter>
      <AppAppBar/>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/browse" element={<BrowseScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/profile/:id" element={<ProfileScreen  {...profile}/>} />
        </Routes>
    </BrowserRouter>
  );
});

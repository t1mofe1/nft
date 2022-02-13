import { MainScreen } from "./screens/main";
import { BrowseScreen } from "./screens/browse";
import { AboutScreen } from "./screens/about";
import { ProfileScreen } from "./screens/profile";
import { MainNavigation } from "./comps/navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ethereum = {
  id : 1,
  name : "Ethereum",
  logo: "https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456_new.svg"

}
const tron = {
  id : 2,
  name : "Tron",
  logo : "/tron-logo.png"
}

const profile = {
  id: 1,
  nickname: "kingalgo",
  created: "2019-01-01",
  cover:
    "https://newevolutiondesigns.com/images/freebies/hd-facebook-cover-5.jpg  ",
  avatar: "https://www.microstockposts.com/storage/2019/10/000074.jpg",
  addresses: [
    {
      id : 1,
      blockchain : ethereum,
      address :"0xE5D69BF3140F5A46826DBD55E930C5AD2EF9D955"
    },
    {
      id : 2,
      blockchain : tron,
      address :"0x51A5DAFFF0BC0CB3380DD3FB253F2CC10C39E89D"
    },

  ],
  description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in elementum urna. Sed imperdiet, sem dapibus scelerisque accumsan, nunc erat dignissim arcu, at finibus tellus magna ac erat. Morbi finibus laoreet lectus, nec luctus dui rhoncus id." ,
  collection : [
    {
      id : 1,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: ethereum,
      name : 'Monkey tool belt',
      status: 'sale'
    },
    {
      id : 2,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool jesus',
      status: 'new'

    },
    {
      id: 3,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 1740,
      blockchain: tron,
      name : 'It\'s melisa',
      status: 'new'
    },
    {
      id: 4,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: 'sale'
    },
    {
      id: 5,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 4400,
      blockchain: tron,
      name : 'Monkey tool belt',
      status: 'fook'
    },
    {
      id: 6,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 7,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: ethereum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 8,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: ''
    },
    {
      id: 9,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: ethereum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id: 10,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 11,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: ethereum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 12,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: ''
    }

  ],
  favourite : [
    {
      id : 1,
      cover: "https://static.euronews.com/articles/stories/06/31/78/50/1440x810_cmsv2_01a070e6-3194-5587-8267-772c9ace8dce-6317850.jpg",
      price : 0.0044,
      blockchain: ethereum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id : 2,
      cover: "https://lh3.googleusercontent.com/anz79oXQf9jSTRghT-aMZ4h4aoUW6ohTGoarWjW9Thr4GzvrZI57Cu4C_VzLu_MAWROwQxPVyEbrqgbt7uHX3pp69vqTNxXzOlLc",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool camel ',
      status: ''

    },
    {
      id: 3,
      cover: "https://lh3.googleusercontent.com/e4MQoxUe7UVFrxKDMi-qDv9P5h6Aben_2qzOQoObNGpn5M0bK3S9blvWuFzb7yo5Cegm5p3f6HnNvKePsfbuvOREE50AAR-OTCcjmQ=w600",
      price : 0.0074,
      blockchain: ethereum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 4,
      cover: "https://lh3.googleusercontent.com/3m6rjtJ_mDMVnHA6pmqhBB2OFTTZtHb-ulXCPhjdegn0t_a17D9RCPy485c8k8qKD8ILaTdGzOqoPlk59nibgA7LTd3ClI9Y_czpwJI",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: ''
    },
    {
      id: 5,
      cover: "https://www.mon-livret.fr/wp-content/uploads/2022/01/Capture-de%CC%81cran-2022-01-01-a%CC%80-09.05.23-696x485.png",
      price : 0.44,
      blockchain: ethereum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id: 6,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 7,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: ethereum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 8,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: ''
    },
    {
      id: 9,
      cover: "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
      price : 0.0044,
      blockchain: ethereum,
      name : 'Monkey tool belt',
      status: ''
    },
    {
      id: 10,
      cover: "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
      price : 0.0054,
      blockchain: ethereum,
      name : 'Cool jesus',
      status: ''
    },
    {
      id: 11,
      cover: "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
      price : 0.0074,
      blockchain: ethereum,
      name : 'It\'s melisa',
      status: ''
    },
    {
      id: 12,
      cover: "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
      price : 0.0087,
      blockchain: ethereum,
      name : 'Cool cats',
      status: ''
    }

  ],
  stats : [
    {
      id: 1,
      name : 'Sold',
      value : 1000
    },
    {
      id: 2,
      name : 'Bought',
      value : 800
    }
  ]
};
export default () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/profile/:id" element={<ProfileScreen {...profile} />} />
      </Routes>
    </BrowserRouter>
  );
};

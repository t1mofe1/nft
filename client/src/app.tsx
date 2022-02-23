import React, { useState } from "react";

import { MainScreen } from "./screens/main";
import { BrowseScreen } from "./screens/browse";
import { AboutScreen } from "./screens/about";
import { ProfileScreen } from "./screens/profile";
import { MainNavigation } from "./comps/navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  IBlockChain,
  INft,
  INftFilterProps,
  IRenderer,
  IRenderLanguage,
  IRenderLibrary,
  INftFilter,
  INftCategory,
} from "./models/nft";
import { IProfile, IProfileStats } from "./models/profile";

const ethereum: IBlockChain = {
  key: 1,
  name: "Ethereum",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png",
};
const tron: IBlockChain = {
  key: 2,
  name: "Tron",
  logo: "/images/tron-logo.png",
};

const js: IRenderLanguage = {
  name: "JavaScript",
  logo: "/images/js-logo.jpg",
};
const jsLibrary: IRenderLibrary = {
  name: "P5",
  logo: "/images/p5-logo.png",
  url: "https://p5js.org/",
};
const jsRender: IRenderer = {
  language: js,
  library: jsLibrary,
};
const categories: Array<INftCategory> = [
  {
    name: "polymorphous",
    uri: "polymorphous",
    color: "#9AD0EC",
    description: "Everyday new and unique NFT",
  },
  {
    name: "animations",
    color: "#9AD0EC",
    uri: "animations",
    description: "Animated NFT",
  },
];
const boostedCaegories: Array<INftCategory> = [
  {
    name: "staff recommend",
    uri: "staff-recommend",
    color: "#9D5353",
    description: "precisely handpicked by our NFTs enjoyers",
  },
  {
    name: "polymorphous",
    uri: "polymorphous",
    color: "#876445",
    description: "everyday freshly added NFTs",
  },
  {
    name: "users recommend",
    uri: "users-recommend",
    color: "#1572A1",
    description: "NFTs recommended by community",
  },
  {
    name: "trending today",
    uri: "trending-today",
    color: "#7C9473",
    description: "today's trending items from all around the world",
  },
];

const py: IRenderLanguage = {
  name: "Python",
  logo: "/images/py-logo.png",
};
const pyRender: IRenderer = {
  language: py,
};
const ts: IRenderLanguage = {
  name: "TypeScript",
  logo: "/images/ts-logo.png",
};
const tsRender: IRenderer = {
  language: ts,
};
let nftItemsSource: Array<INft> = [
  {
    key: 1,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0044,
    priceSale: 0.004,
    blockchain: ethereum,
    name: "Monkey tool belt",
    status: "sale",
    favourite: {
      count: 3,
      isFavourite: true,
    },
    category: "polymorphous",
    renderer: pyRender,
  },
  {
    key: 2,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    status: "trending",
    favourite: {
      count: 999,
      isFavourite: false,
    },
    category: "polymorphous",
    renderer: pyRender,
  },
  {
    key: 3,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 1740,
    blockchain: tron,
    name: "It's melisa",
    status: "new",
    favourite: {
      count: 10,
      isFavourite: false,
    },
    owner: true,
    category: "polymorphous",
    renderer: tsRender,
  },
  {
    key: 4,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    priceSale: 0.0085,
    blockchain: ethereum,
    name: "Cool cats fave",
    status: "sale",
    favourite: {
      count: 3,
      isFavourite: true,
      countLast7D: 2,
    },
    category: "polymorphous",
    renderer: pyRender,
  },
  {
    key: 5,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 4400,
    blockchain: tron,
    name: "Monkey tool belt",
    category: "polymorphous",
    renderer: tsRender,
  },
  {
    key: 6,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    category: "animated",
    renderer: jsRender,
  },
  {
    key: 7,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    category: "animated",
    renderer: jsRender,
  },
  {
    key: 8,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    blockchain: ethereum,
    name: "Cool cats",
    category: "animated",
    renderer: jsRender,
  },
  {
    key: 9,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    category: "polymorphous",
    renderer: pyRender,
  },
  {
    key: 10,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    category: "animated",
    status: "new",
    renderer: jsRender,
  },
  {
    key: 11,
    cover:
      "https://backend.esquire.de/sites/esquire.de/files/styles/og_image/public/images/2021-03/animierte-gif-nyan-cat-nft.png?h=1e942333&itok=09QkFeyT",
    price: 0.0054,
    blockchain: ethereum,
    name: "Nyan Cat",
    category: "animated",
    status: "new",
    renderer: jsRender,
  },
  {
    key: 12,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    category: "polymorphous",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
  },
  {
    key: 13,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    blockchain: ethereum,
    name: "Cool cats",
    category: "polymorphous",
    status: "new",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
  },
  {
    key: 14,
    cover:
      "https://static.euronews.com/articles/stories/06/31/78/50/1440x810_cmsv2_01a070e6-3194-5587-8267-772c9ace8dce-6317850.jpg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    category: "polymorphous",
    status: "trending",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
  },
  {
    key: 15,
    cover:
      "https://lh3.googleusercontent.com/anz79oXQf9jSTRghT-aMZ4h4aoUW6ohTGoarWjW9Thr4GzvrZI57Cu4C_VzLu_MAWROwQxPVyEbrqgbt7uHX3pp69vqTNxXzOlLc",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool camel ",
    category: "animated",
    status: "trending",
    renderer: pyRender,
  },
  {
    key: 16,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0187,
    priceSale: 0.177,
    blockchain: ethereum,
    name: "Cool cats",
    category: "animated",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "trending-today" },
  },
  {
    key: 17,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0064,
    blockchain: ethereum,
    name: "Monkey tool belt",
    category: "polymorphous",
    renderer: jsRender,
    boosted: { category: "trending-today" },
  },
  {
    key: 18,
    cover:
      "https://www.mon-livret.fr/wp-content/uploads/2022/01/Capture-de%CC%81cran-2022-01-01-a%CC%80-09.05.23-696x485.png",
    price: 0.44,
    blockchain: ethereum,
    name: "Monkey tool belt",
    category: "polymorphous",
    renderer: pyRender,
    boosted: { category: "trending-today" },
  },
  {
    key: 19,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    priceSale: 0.0044,
    blockchain: ethereum,
    name: "Cool jesus",
    category: "polymorphous",
    status: "sale",
    renderer: jsRender,
  },
  {
    key: 20,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    category: "polymorphous",
    status: "new",
    renderer: jsRender,
  },
  {
    key: 21,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    priceSale: 0.008,
    blockchain: ethereum,
    name: "Cool cats",
    category: "animated",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "polymorphous" },
  },
  {
    key: 22,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    category: "polymorphous",
    status: "trending",
    renderer: tsRender,
    boosted: { category: "polymorphous" },
  },
  {
    key: 23,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    category: "animated",
    status: "new",
    renderer: jsRender,
    boosted: { category: "polymorphous" },
  },
  {
    key: 24,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: tron,
    name: "It's melisa",
    category: "animated",
    status: "new",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
  },
  {
    key: 25,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    blockchain: ethereum,
    name: "Cool cats",
    category: "animated",
    status: "sale",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
  },
  {
    key: 26,
    cover:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fbored-ape-yacht-club-nft-3-4-million-record-sothebys-metaverse-tw.jpg?w=960&cbr=1&q=90&fit=max",
    price: 2000,
    priceSale: 1800,
    blockchain: tron,
    name: "Cool cats",
    category: "polymorphous",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "staff-recommend" },
  },
  {
    key: 27,
    cover: "https://cdn.mos.cms.futurecdn.net/M3nWWndkz6QXcZ4ueCfESH.jpg",
    price: 1000,
    priceSale: 800,
    blockchain: tron,
    name: "Aye pirate",
    category: "trending",
    status: "sale",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
  },
];

const profileStats: Array<IProfileStats> = [
  {
    key: 1,
    name: "Sold",
    value: 1000,
  },
  {
    key: 2,
    name: "Bought",
    value: 800,
  },
];

const profile: IProfile = {
  key: 1,
  nickname: "kingalgo",
  created: "2019-01-01",
  cover:
    "https://newevolutiondesigns.com/images/freebies/hd-facebook-cover-5.jpg  ",
  avatar: "https://www.microstockposts.com/storage/2019/10/000074.jpg",
  addresses: [
    {
      key: 1,
      blockchain: ethereum,
      address: "0xE5D69BF3140F5A46826DBD55E930C5AD2EF9D955",
    },
    {
      key: 2,
      blockchain: tron,
      address: "0x51A5DAFFF0BC0CB3380DD3FB253F2CC10C39E89D",
    },
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in elementum urna. Sed imperdiet, sem dapibus scelerisque accumsan, nunc erat dignissim arcu, at finibus tellus magna ac erat. Morbi finibus laoreet lectus, nec luctus dui rhoncus key.",
  stats: profileStats,
};

const filterProps: INftFilterProps = {
  blockchains: [ethereum, tron],
  languages: [js, ts, py],
  categories: categories,
};
const nftFilterDefault: INftFilter = {
  blockchains: [],
  languages: [],
  categories: [],
};
// interface IAppProps {
//   nftItems : Array<INft>;
//   profile : IProfile;
//   filterProps : INftFilterProps;
// }

// const App = ({nftItems, profile, filterProps}:IAppProps) => {

interface AppContextInterface {
  nftItems: Array<INft>;
  boostedCategories: Array<INftCategory>;
  profile: IProfile;
  nftFilterProps: INftFilterProps;
  updateNftItems: Function;
  updateNftFilter: Function;
}

export const AppCtx = React.createContext<AppContextInterface | null>(null);

const App = () => {
  //const [profileData, setProfileData ] = useState(profile);
  const [nftItems, setNftItems] = useState(nftItemsSource);
  const [nftFilter, setNftFilter] = useState(nftFilterDefault);

  const updateNftItems = (nft: INft) => {
    setNftItems(
      nftItems.map((item: INft) => (nft.key === item.key ? nft : item))
    );
  };
  const updateNftFilter = (filter: INftFilter) => {
    console.log(filter);
    setNftFilter(filter);
  };
  const AppContext: AppContextInterface = {
    nftItems: nftItems,
    profile: profile,
    boostedCategories: boostedCaegories,
    nftFilterProps: filterProps,
    updateNftItems: updateNftItems,
    updateNftFilter: updateNftFilter,
  };
  return (
    <AppCtx.Provider value={AppContext}>
      <BrowserRouter>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/browse" element={<BrowseScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/profile/:key" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </AppCtx.Provider>
  );
};
export default App;

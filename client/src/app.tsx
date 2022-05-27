import React, { useState } from "react";

import { NftScreen } from "./screens/nft";
import { MainScreen } from "./screens/main-landing";
import { AboutScreen } from "./screens/about";
import { BrowseScreen } from "./screens/browse";
import { ProfileScreen } from "./screens/profile";
import { MainNavigation } from "./comps/navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import {
  INft,
  IRenderer,
  INftFilter,
  INftCategory,
  IRenderLibrary,
  INftCollection,
  INftFilterProps,
  IRenderLanguage,
  INftType,
} from "./models/nft";

import { IProfile, IProfileAddress, IProfileStats } from "./models/profile";
import { NftCollectionScreen } from "./screens/nft-collection";
import { CreateAssetScreen } from "./screens/assets/create";
import { SignInScreen } from "./screens/sign-in";
import { IBlockChain } from "./models/blockchain";
import { Footer } from "./comps/footer";

const ethereum: IBlockChain = {
  name: "ethereum",
  label: "Ethereum",
  logo: "/images/ethereum-logo.png",
  symbol: "eth",
};
const solana: IBlockChain = {
  name: "solana",
  label: "Solana",
  logo: "/images/solana-logo.png",
  symbol: "sol",
};
const tron: IBlockChain = {
  name: "tron",
  label: "Tron",
  logo: "/images/tron-logo.png",
  symbol: "trx",
};

const jsP5: IRenderLibrary = {
  language: "JavaScript",
  name: "P5",
  logo: "/images/p5-logo.png",
  url: "https://p5js.org/",
};
const js: IRenderLanguage = {
  name: "JavaScript",
  logo: "/images/js-logo.jpg",
};
const jsRender: IRenderer = {
  language: js,
  library: jsP5,
};
const types: Array<INftType> = [
  {
    key: 1,
    name: "animation",
  },
  {
    key: 2,
    name: "image",
  },
];
const categories: Array<INftCategory> = [
  {
    key: 1,
    name: "polymorphous",
    uri: "polymorphous",
    color: "#9AD0EC",
    description: "Everyday new and unique NFT",
  },
  {
    key: 2,
    name: "animated",
    color: "#9AD0EC",
    uri: "animated",
    description: "Animated NFT",
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
const addresses: Array<IProfileAddress> = [
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
];

const profiles: Array<IProfile> = [
  {
    key: 1,
    nickname: "kingalgo",
    created: new Date("2019-01-01 00:09:00"),
    cover:
      "https://newevolutiondesigns.com/images/freebies/hd-facebook-cover-5.jpg",
    avatar: "https://www.microstockposts.com/storage/2019/10/000074.jpg",
    addresses: addresses,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in elementum urna. Sed imperdiet, sem dapibus scelerisque accumsan, nunc erat dignissim arcu, at finibus tellus magna ac erat. Morbi finibus laoreet lectus, nec luctus dui rhoncus key.",
    stats: profileStats,
  },
  {
    key: 2,
    nickname: "kingalgo2",
    created: new Date("2019-01-01 00:09:00"),
    cover:
      "https://img.freepik.com/free-photo/machine-learning-algorithms-background_34629-825.jpg?size=1080&ext=jpg",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc0AIXf1I-SpwKBHmvnGv3rIlwJQiLfZ3oRg&usqp=CAU",
    addresses: [
      {
        key: 1,
        blockchain: ethereum,
        address: "0xE5D69BF3140F5A46826DBD55E930C5AD2EF9D955",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in elementum urna. Sed imperdiet, sem dapibus scelerisque accumsan, nunc erat dignissim arcu, at finibus tellus magna ac erat. Morbi finibus laoreet lectus, nec luctus dui rhoncus key.",
    stats: profileStats,
  },
];

const collections: Array<INftCollection> = [
  {
    key: 1,
    createdAt: new Date("2022-01-01 08:00:20"),
    name: "AmazingCollection",
    url: "www.mazing-collection.com",
    avatar:
      "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX10557177.jpg",
    cover:
      "https://static.news.bitcoin.com/wp-content/uploads/2021/08/cryptopunks-nft-collection-joins-axie-infinity-and-opensea-by-hitting-1-billion-in-sales.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique condimentum augue a posuere. Etiam vestibulum commodo est vitae pretium.",
    author: profiles[1],
    blockchains: [tron, ethereum],
    renderer: jsRender,
    stats: [
      {
        name: "minted / total",
        value: [9080, 1000],
      },
      {
        name: "sold in week / total",
        value: [1000, 5000],
      },
      {
        name: "avg. / max. price",
        value: [0.002, 0.13],
      },
    ],
  },
];

const boostedCategories: Array<INftCategory> = [
  {
    key: 1,
    name: "staff recommend",
    uri: "staff-recommend",
    color: "#9D5353",
    description: "precisely handpicked by our NFTs enjoyers",
  },
  {
    key: 2,
    name: "polymorphous",
    uri: "polymorphous",
    color: "#876445",
    description: "everyday freshly added NFTs",
  },
  {
    key: 3,
    name: "users recommend",
    uri: "users-recommend",
    color: "#1572A1",
    description: "NFTs recommended by our community",
  },
  {
    key: 4,
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
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: ethereum,
    name: "Monkey tool belt",
    creator: profiles[1],
    owner: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",

    status: "sale",
    favourite: {
      count: 3,
      isFavourite: true,
    },
    category: "polymorphous",
    renderer: pyRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Monkey tool belt" }],
    lastOffers: [
      {
        key: 1,
        to: addresses[0],
        from: addresses[1],
        date: new Date(),
        endDate: new Date("2022-04-02 00:08:00"),
        blockchain: ethereum,
        price: 0.003,
        type: "offer",
      },
    ],
    lastTransactions: [
      {
        key: 1,
        to: addresses[0],
        from: addresses[1],
        date: new Date("2022-01-20 00:10:00"),
        blockchain: ethereum,
        price: 0.0044,
        type: "mint",
      },
      {
        key: 2,
        to: addresses[0],
        from: addresses[0],
        date: new Date("2022-01-01 00:08:00"),
        blockchain: ethereum,
        price: 0.003,
        type: "mint",
      },
    ],
  },
  {
    key: 2,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    creator: profiles[1],
    owner: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    status: "trending",
    favourite: {
      count: 999,
      isFavourite: false,
    },
    category: "polymorphous",
    renderer: pyRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
    lastOffers: [
      {
        key: 1,
        to: addresses[0],
        from: addresses[1],
        date: new Date(),
        endDate: new Date("2022-04-02 00:08:00"),
        blockchain: ethereum,
        price: 0.003,
        type: "offer",
      },
    ],
    lastTransactions: [
      {
        key: 1,
        to: addresses[0],
        from: addresses[1],
        date: new Date("2022-01-20 00:10:00"),
        blockchain: ethereum,
        price: 0.0044,
        type: "mint",
      },
      {
        key: 2,
        to: addresses[0],
        from: addresses[0],
        date: new Date("2022-01-01 00:08:00"),
        blockchain: ethereum,
        price: 0.003,
        type: "mint",
      },
    ],
  },
  {
    key: 3,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 1740,
    blockchain: tron,
    name: "It's melisa",
    creator: profiles[1],
    owner: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",

    status: "new",
    favourite: {
      count: 10,
      isFavourite: false,
    },
    category: "polymorphous",
    renderer: tsRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 4,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    priceSale: 0.0085,
    saleEnds: new Date("2022-04-10 22:14:10"),
    blockchain: ethereum,
    name: "Cool cats fave",
    owner: profiles[1],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    status: "sale",
    favourite: {
      count: 3,
      isFavourite: true,
      countLast7D: 2,
    },
    category: "polymorphous",
    renderer: pyRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 5,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 4400,
    blockchain: tron,
    name: "Monkey tool belt",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",

    category: "polymorphous",
    renderer: tsRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: ts.name },
    ],
  },
  {
    key: 6,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",

    category: "animated",
    renderer: jsRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
    ],
  },
  {
    key: 7,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    renderer: jsRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 8,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    blockchain: ethereum,
    name: "Cool cats",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    renderer: jsRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 9,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    category: "polymorphous",
    renderer: pyRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
    ],
  },
  {
    key: 10,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "new",
    renderer: jsRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
    ],
  },
  {
    key: 11,
    cover:
      "https://backend.esquire.de/sites/esquire.de/files/styles/og_image/public/images/2021-03/animierte-gif-nyan-cat-nft.png?h=1e942333&itok=09QkFeyT",
    price: 0.0054,
    blockchain: ethereum,
    name: "Nyan Cat",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "new",
    renderer: jsRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
    ],
  },
  {
    key: 12,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
    ],
  },
  {
    key: 13,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    blockchain: ethereum,
    name: "Cool cats",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "new",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
      { name: "Library", value: jsP5.name },
    ],
  },
  {
    key: 14,
    cover:
      "https://static.euronews.com/articles/stories/06/31/78/50/1440x810_cmsv2_01a070e6-3194-5587-8267-772c9ace8dce-6317850.jpg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "trending",
    renderer: jsRender,
    boosted: { category: "users-recommend" },
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
      { name: "Library", value: jsP5.name },
    ],
  },
  {
    key: 15,
    cover:
      "https://lh3.googleusercontent.com/anz79oXQf9jSTRghT-aMZ4h4aoUW6ohTGoarWjW9Thr4GzvrZI57Cu4C_VzLu_MAWROwQxPVyEbrqgbt7uHX3pp69vqTNxXzOlLc",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool camel ",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "trending",
    renderer: pyRender,
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
      { name: "Library", value: jsP5.name },
    ],
  },
  {
    key: 16,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0187,
    priceSale: 0.177,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: ethereum,
    name: "Cool cats",
    owner: profiles[1],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "trending-today" },
    collection: collections[0],
    metaData: [
      { name: "Name", value: "Cool jesus" },
      { name: "Language", value: js.name },
      { name: "Library", value: jsP5.name },
    ],
  },
  {
    key: 17,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0064,
    blockchain: ethereum,
    name: "Monkey tool belt",
    owner: profiles[1],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    renderer: jsRender,
    boosted: { category: "trending-today" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },

  {
    key: 18,
    cover:
      "https://www.mon-livret.fr/wp-content/uploads/2022/01/Capture-de%CC%81cran-2022-01-01-a%CC%80-09.05.23-696x485.png",
    price: 0.44,
    blockchain: ethereum,
    name: "Monkey tool belt",
    owner: profiles[0],
    creator: profiles[1],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    renderer: pyRender,
    boosted: { category: "trending-today" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },

  {
    key: 19,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    priceSale: 0.0044,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: ethereum,
    name: "Cool jesus",
    owner: profiles[0],
    creator: profiles[1],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "sale",
    renderer: jsRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 20,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: ethereum,
    name: "It's melisa",
    owner: profiles[0],
    creator: profiles[1],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "new",
    renderer: jsRender,
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 21,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    priceSale: 0.008,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: ethereum,
    name: "Cool cats",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "polymorphous" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 22,
    cover:
      "https://newsline.news/wp-content/uploads/2021/05/NFT-10-pictures-that-sold-for-hundreds-of-millions-of.jpeg",
    price: 0.0044,
    blockchain: ethereum,
    name: "Monkey tool belt",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "trending",
    renderer: tsRender,
    boosted: { category: "polymorphous" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 23,
    cover:
      "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png",
    price: 0.0054,
    blockchain: ethereum,
    name: "Cool jesus",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "new",
    renderer: jsRender,
    boosted: { category: "polymorphous" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 24,
    cover:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg",
    price: 0.0074,
    blockchain: tron,
    name: "It's melisa",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "new",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 25,
    cover:
      "https://cdn.vox-cdn.com/thumbor/bouCIhEhMramGHZAiQGaa3q43vo=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22341171/Screen_Shot_2021_03_02_at_3.21.50_PM.png",
    price: 0.0087,
    priceSale: 0.007,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: ethereum,
    name: "Cool cats",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "animated",
    status: "sale",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 26,
    cover:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fbored-ape-yacht-club-nft-3-4-million-record-sothebys-metaverse-tw.jpg?w=960&cbr=1&q=90&fit=max",
    price: 2000,
    priceSale: 1800,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: tron,
    name: "Cool cats",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "polymorphous",
    status: "sale",
    renderer: jsRender,
    boosted: { category: "staff-recommend" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
  {
    key: 27,
    cover: "https://cdn.mos.cms.futurecdn.net/M3nWWndkz6QXcZ4ueCfESH.jpg",
    price: 1000,
    priceSale: 800,
    saleEnds: new Date("2022-03-14 16:00:00"),
    blockchain: tron,
    name: "Aye pirate",
    owner: profiles[0],
    creator: profiles[0],
    createdAt: new Date("2022-01-01 08:00:20"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor quam sit amet tempor. Cras eget molestie ligula, vel fringilla enim. Nam sollicitudin aliquet velit feugiat pretium. Sed vel sapien id odio ornare pulvinar vitae suscipit ipsum.",
    category: "trending",
    status: "sale",
    renderer: tsRender,
    boosted: { category: "staff-recommend" },
    collection: collections[0],
    metaData: [{ name: "Name", value: "Cool jesus" }],
  },
];
const filterProps: INftFilterProps = {
  blockchains: [ethereum, tron, solana],
  languages: [js, ts, py],
  libraries: [jsP5],
  categories: categories,
  types: types,
};
const nftFilterDefault: INftFilter = {
  blockchains: [],
  languages: [],
  categories: [],
  libraries: [],
  types: [],
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
  categories: Array<INftCategory>;
  profiles: Array<IProfile>;
  nftFilterProps: INftFilterProps;
  nftCollections: Array<INftCollection>;
  updateNftItems: Function;
  updateNftFilter: Function;
  enqueueSnackbar: (message: any, variant?: any | undefined) => any;
}

export const AppCtx = React.createContext<AppContextInterface | null>(null);

const AppInner = () => {
  //const [profileData, setProfileData ] = useState(profile);
  const [nftItems, setNftItems] = useState(nftItemsSource);
  const [nftFilter, setNftFilter] = useState(nftFilterDefault);
  const { enqueueSnackbar } = useSnackbar();
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
    profiles: profiles,
    boostedCategories: boostedCategories,
    categories: categories,
    nftFilterProps: filterProps,
    nftCollections: collections,
    updateNftItems: updateNftItems,
    updateNftFilter: updateNftFilter,
    enqueueSnackbar: enqueueSnackbar,
  };

  return (
    <AppCtx.Provider value={AppContext}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <MainNavigation />
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/browse" element={<BrowseScreen />} />
            <Route path="/assets/create" element={<CreateAssetScreen />} />
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route path="/nft/view/:key" element={<NftScreen />} />
            <Route path="/account/:key" element={<ProfileScreen />} />
            <Route
              path="/collection/view/:key"
              element={<NftCollectionScreen />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SnackbarProvider>
    </AppCtx.Provider>
  );
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppInner />
    </SnackbarProvider>
  );
};
export default App;

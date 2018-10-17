// exampleData.js

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const newBid = () => {
  let pVol = Math.random().toFixed(8);
  let bVol = Math.random().toFixed(8);
  let aggVolume = Number(pVol) + Number(bVol);
  let aggVol = aggVolume.toFixed(8);

  return {
    pVol,
    bVol,
    aggVol,
    price: getRandomInt(0, 60),
    orderType: 'bid',
  };
};

const newAsk = () => {
  let pVol = Math.random().toFixed(8);
  let bVol = Math.random().toFixed(8);
  let aggVolume = Number(pVol) + Number(bVol);
  let aggVol = aggVolume.toFixed(8);
  return {
    pVol,
    bVol,
    aggVol,
    price: getRandomInt(50, 100),
    orderType: 'ask',
  };
};

export function makeOrderbookData() {
  let highestBid = 0;
  const newBidArr = range(10).map(() => {
    const bidGenerated = newBid();
    if (bidGenerated.price > highestBid) highestBid = bidGenerated.price;
    return bidGenerated;
  });

  return {children: [...newBidArr, ...range(10).map(newAsk)], highestBid};
}



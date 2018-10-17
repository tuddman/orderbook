# Orderbook

displays combined orderbooks from popular cryptocurrency exchanges

presents data streamed from [this aggregator](https://github.com/tuddman/orderbook-server)

### Usage

```bash
## Do once, first:

yarn install 

## then,

yarn start

 ## a browser window should automatically open
```

### Pushing updates

```bash
cd orderbook && \
yarn build && \
cd build && \
surge . sc-orderbook.surge.sh
```


## License

2018 (c) tuddman 

All Rights Reserved

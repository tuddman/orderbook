# Orderbook

displays combined orderbooks from popular cryptocurrency exchanges

### Leans on

* [websockets](https://github.com/faye/faye-websocket-node)

### Libraries considered

The following libraries were looked at and mostly ignored as options for being broken in various ways as of 2018-10-15:

* [bittrex](https://github.com/dparlevliet/node.bittrex.api)  : abandoned. does not compile properly.
* [bittrex OFFICIAL](https://github.com/Bittrex/bittrex.github.io/issues) : numerous open issues. 
* [poloniex](https://github.com/dutu/poloniex-api-node) : uses autobahn, which poloniex has abandoned
* [signalR websockets](https://github.com/mwwhited/signalr-client-nodejs) : used by bittrex client library.
* [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node) : dependency of signal-R.  
* [crypto-socket](https://github.com/redcap3000/crypto-socket) : abandoned? still riddled with console.logs and broken/incomplete implemntations.

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

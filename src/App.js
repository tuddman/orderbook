import React, {Component} from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';
import Websocket from 'react-websocket';

import 'react-table/react-table.css';
import './App.css';

import {makeOrderbookData} from './exampleTable';

const orderbookServerUrl = 'ws://localhost:8000';

const orderbook = makeOrderbookData();

const columns = [
  // header: Bid/Ask
  // headerClassname: 'my-header'
  {
    Header: 'Poloniex Vol.',
    accessor: 'pVol',
    className: 'column-data',
    Cell: props => (
      <span className="number">
        {props.original.orderType === 'bid' ? props.value : '-'}
      </span>
    ),
  },
  {
    Header: 'Bittrex Vol.',
    accessor: 'bVol',
    className: 'column-data',
    Cell: props => (
      <span className="number">
        {props.original.orderType === 'bid' ? props.value : '-'}
      </span>
    ),
  },
  {
    Header: props => <span>Aggregated Vol.</span>,
    accessor: 'aggVol',
    className: 'column-data',
    Cell: props => (
      <span className="number">
        {props.original.orderType === 'bid' ? props.value : '-'}
      </span>
    ),
  },
  {
    Header: 'Price',
    accessor: 'price',
    className: 'price-column-data',
  },
  {
    Header: props => <span>Aggregated Vol.</span>,
    accessor: 'aggVol',
    className: 'column-data',
    Cell: props => (
      <span
        className={`number ${
          props.value < orderbook.highestBid ? 'number-crossed' : ''
        }`}>
        {props.original.orderType === 'ask' ? props.value : '-'}
      </span>
    ),
  },
  {
    Header: 'Poloniex Vol.',
    accessor: 'pVol',
    className: 'column-data',
    Cell: props => (
      <span className="number">
        {props.original.orderType === 'ask' ? props.value : '-'}
      </span>
    ),
  },
  {
    Header: 'Bittrex Vol.',
    accessor: 'bVol',
    className: 'column-data',
    Cell: props => (
      <span className="number">
        {props.original.orderType === 'ask' ? props.value : '-'}
      </span>
    ),
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      dataToShow: [],
    };
  }

  async componentDidMount() {
    let sortedBook = _.orderBy(
      orderbook.children,
      [
        o => {
          return o.price;
        },
      ],
      ['desc'],
    );
    this.setState({dataToShow: sortedBook});
  }

  handleData(data) {
    // console.log('data', data);
    let result = JSON.parse(data);
    // console.log('data', data);
    let sortedBook = _.orderBy(
      result.children,
      [
        o => {
          return o.price;
        },
      ],
      ['desc'],
    );

    this.setState({book: sortedBook});
  }

  render() {
    return (
      <div className="App">
        <h3>Aggregated Orderbook</h3>
        <header className="App-header">
          <div>
            <Websocket
              url={orderbookServerUrl}
              onMessage={this.handleData.bind(this)}
            />
          </div>
          <div className="sides-banner">
            <div className="sides">bids</div>
            <div className="sides">asks</div>
          </div>

          <ReactTable
            getTrGroupProps={(state, rowInfo, column) => {
              if (rowInfo) {
                return {
                  style: {
                    borderTop:
                      rowInfo.row.price === orderbook.highestBid &&
                      rowInfo.original.orderType === 'bid'
                        ? '1px solid white'
                        : '0px',
                    background:
                      rowInfo.row.price < orderbook.highestBid &&
                      rowInfo.original.orderType === 'ask'
                        ? 'green'
                        : 'transparent',
                  },
                };
              }
            }}
            data={this.state.book}
            columns={columns}
            showPagination={false}
            // defaultPageSize={10}
            resizable={true}
          />

          <a
            className="App-link"
            href="https://github.com/tuddman/orderbook"
            target="_blank"
            rel="noopener noreferrer">
            site source
          </a>
        </header>
      </div>
    );
  }
}

export default App;

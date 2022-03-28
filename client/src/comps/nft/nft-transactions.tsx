import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

import { INftTransaction } from "../../models/nft";

interface INftTransactions {
  transactions: Array<INftTransaction>;
}

const Nftransactions = ({ transactions }: INftTransactions) => {
  return transactions ? (
    <TableContainer component={Box}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow
              key={transaction.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {transaction.date.toLocaleString("en-GB", {
                  timeZone: "CET",
                })}
              </TableCell>
              <TableCell align="center">{`${transaction.to.address.substr(
                0,
                6
              )}...${transaction.to.address.substr(-4)}`}</TableCell>
              <TableCell align="center">{`${transaction.from.address.substr(
                0,
                6
              )}...${transaction.from.address.substr(-4)}`}</TableCell>
              <TableCell align="center">{transaction.type}</TableCell>
              <TableCell align="center">{transaction.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <></>
  );
};

export default Nftransactions;

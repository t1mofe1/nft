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

import { INftOffer } from "../../models/nft";
import NftCountdown from "../nft-count-down";

interface INftOffers {
  offers: Array<INftOffer>;
}

const NftOffers = ({ offers }: INftOffers) => {
  return offers ? (
    <TableContainer component={Box}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Offer ends</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers?.map((offer) => (
            <TableRow
              key={offer.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {/* <NftCountdown concise end={offer.endDate} /> */}
              </TableCell>
              <TableCell align="center">{`${offer.from.address.substr(
                0,
                6
              )}...${offer.from.address.substr(-4)}`}</TableCell>
              <TableCell align="center">{offer.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <></>
  );
};

export default NftOffers;

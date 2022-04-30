import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { INft, INftCollection, INftMetaData } from "../../models/nft";
import { Box } from "@mui/material";
import NftOffers from "./nft-offers";
import Nftransactions from "./nft-transactions";

interface INftMetaDataTable {
  metaData: Array<INftMetaData>;
}
const NftMetaDataTable = ({ metaData }: INftMetaDataTable) => {
  return (
    <TableContainer component={Box}>
      <Table sx={{ width: "100%" }} size="small" aria-label="Meta data">
        <TableBody>
          {metaData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
interface INftDescriptionBox {
  nft: INft;
  collection: INftCollection;
}
const NftDescriptionBox = ({ nft, collection }: INftDescriptionBox) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ mt: 4 }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{nft.description}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Meta data
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <NftMetaDataTable metaData={nft.metaData} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Offers</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <NftOffers offers={nft?.lastOffers!} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Transactions
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Nftransactions transactions={nft?.lastTransactions!} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default NftDescriptionBox;

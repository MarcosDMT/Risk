import React from 'react';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProbabilityImpactKey = props => {
  const { data } = props;
  return (
    <>
      <TableContainer sx={{ p: 2 }}>
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Residual Risk</TableCell>
              <TableCell>Risk Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((datum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{datum.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={datum?.residualrisk ?? '-'}
                      sx={{ color: 'white', backgroundColor: datum?.residualrisk_color }}
                    />
                  </TableCell>
                  <TableCell>{datum.riskscore}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProbabilityImpactKey;

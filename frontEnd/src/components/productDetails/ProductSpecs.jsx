import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'

const ProductSpecs = (Pspecs, review) => {
  return (
    <>
      <Accordion>
        <AccordionSummary>
          <Typography>
            Specifications
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>Specs will be displayed here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>Customer reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2"> Reviews will be displayed here</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ProductSpecs
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type SelectCountRowType = {
  callBackChange: (countRow: string) => void
  pageCount: string
}

export const SelectCountRow = (props: SelectCountRowType) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.callBackChange(event.target.value)
  }
  const pageValue = +props.pageCount < 5 ? '5' : props.pageCount

  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl size="small">
        <Select
          labelId="Count-row-labelId"
          id="Count-row-id"
          value={pageValue}
          label="Count row"
          variant={'standard'}
          onChange={handleChange}
        >
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'10'}>10</MenuItem>
          <MenuItem value={'25'}>25</MenuItem>
          <MenuItem value={'50'}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

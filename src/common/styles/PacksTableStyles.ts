import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme, _params, classes) => ({
  tableHead: {
    backgroundColor: '#EFEFEF',
  },
  tableBodyCell: {
    display: 'flex',
    overflowWrap: 'anywhere',
    alignItems: 'center',
  },
  tableBodyCellSkeleton: {
    width: '100%',
    margin: '.5rem 0',
  },
  tableDebugSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem 0',
  },
  tablePagination: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    margin: '36px 0',
  },
}))

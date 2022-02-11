import { MenuItem } from "@mui/material";

const categories = ['Art', 'Animals', 'Food', 'Holidays', 'Miscellaneous', 'Mythical', 'Nature', 'People', 'Structures', 'Travel'];
const missingPieces = ['1', '2', '3', '4', '5+'];
const conditions = ['Poor', 'Fair', 'Good', 'Excellent']
const pieceCount = ['500', '1000', '2000', '3000', '4000']

export const categoryOptions = categories.map(category => {
  return (
    <MenuItem value={category} key={category}>{category}</MenuItem>
  )
})

export const piecesOptions = missingPieces.map(missingPiece => {
  return (
    <MenuItem value={missingPiece} key={missingPiece}>{missingPiece}</MenuItem>
  )
})

export const qualityOptions = conditions.map(quality => {
  return (
    <MenuItem value={quality} key={quality}>{quality}</MenuItem>
  )
})

export const pieceCountOptions = pieceCount.map(pieceCount => {
  return (
    <MenuItem value={pieceCount} key={pieceCount}>{pieceCount}</MenuItem>
  )
})
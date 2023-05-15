import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { GAME_DIFFICULTY } from '../../config'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { setDifficulty } from '../../store/slices/gameSlice'

export default function Difficulty() {
  const difficulty: GAME_DIFFICULTY = useSelector((state: RootState) => state.game.difficulty)
  const dispatch = useDispatch()

  const [value, setValue] = React.useState<GAME_DIFFICULTY>(difficulty)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value
    const newDifficulty = GAME_DIFFICULTY[selectedValue as keyof typeof GAME_DIFFICULTY]
    setValue(newDifficulty)
    dispatch(setDifficulty(newDifficulty))
  }
  return (
    <FormControl>
      <FormLabel id="difficulty-label">Difficulty</FormLabel>
      <RadioGroup
        row={true}
        aria-labelledby="difficulty-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={GAME_DIFFICULTY.EASY}
          control={<Radio />}
          //   onChange={(e) => console.log(e)}
          label="Easy"
        />
        <FormControlLabel value={GAME_DIFFICULTY.NORMAL} control={<Radio />} label="Normal" />
        <FormControlLabel value={GAME_DIFFICULTY.HARD} control={<Radio />} label="Hard" />
      </RadioGroup>
    </FormControl>
  )
}

import { connectSearchBox } from 'react-instantsearch/connectors'


const MySearchBox = ({ currentRefinement, refine }) => {
  const value = currentRefinement ? currentRefinement : 'LEG'

  return <input
    type="text"
    value={value}
    onChange={e => refine(e.target.value)}
  />
}

export const ConnectedSearchBox = connectSearchBox(MySearchBox)
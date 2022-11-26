import { Chip } from '@material-tailwind/react';
import React, { useState } from 'react'
import { BiMoveVertical } from 'react-icons/bi';

const ChipIcon = ({text}:{text?:string | undefined}) => {
    const [show, setShow] = useState(true);
  return (
    <>
<Chip
        variant="filled"
        show={show}
        icon={<BiMoveVertical size={25}/>}
      color="gray"
        animate={{
          mount: { y: 0 },
          unmount: { y:50 },
        }}
        dismissible={{
          onClose: () => setShow(false),
        }}
        value={`${text}`}
        className='chips w-70 my-1 bg-lightGray'
      />
    </>
  )
}

export default ChipIcon
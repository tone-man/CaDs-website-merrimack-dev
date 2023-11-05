import React, { useState } from 'react'


interface editableComponentProps {
    data: string
}

function EditableComponent(myProps: editableComponentProps) {

    const [data, setData] = useState('');

    const handleTextAreaChange = (event) => {
        setData(event.target.value);
    };


  return (
    <div>
      
    </div>
  )
}

export default EditableComponent

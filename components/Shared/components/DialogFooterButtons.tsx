import { Button } from 'primereact/button'
import React from 'react'

interface Props{
    hideDialog: () => void;
}

const DialogFooterButtons = ({hideDialog}: Props) => {

  return (
    <div className="flex justify-content-end">
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Guardar" icon="pi pi-check" type="submit" />
        </div>
  )
}

export default DialogFooterButtons
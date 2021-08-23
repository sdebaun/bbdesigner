import { Button } from "antd"

export const DeleteButton: React.FC<{onClick: () => void}> =
    ({onClick}) => <Button danger size='small' {...{onClick}}>X</Button>


import { Button } from "antd"
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'

export const DeleteButton: React.FC<{onClick: () => void}> =
    ({onClick}) => <Button type='text' size='small' icon={<DeleteOutlined/>} {...{onClick}}/>

export const CloneButton: React.FC<{onClick: () => void}> =
    ({onClick}) => <Button type='text' size='small' icon={<CopyOutlined/>} {...{onClick}}/>


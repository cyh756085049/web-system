import useBoolean from "../../components/useBoolean";
import {Button, Space} from "antd";

const BooleanDemo = () => {
    const [ state, { toggle, set, setTrue, setFalse } ] = useBoolean();

    return (
        <div>
            <h1>当前状态：{`${state}`}</h1>
            <Space>
                <Button type="primary" onClick={toggle}>toggle</Button>
                <Button type="primary" onClick={setTrue}>toggle true</Button>
                <Button type="primary" onClick={setFalse}>toggle false</Button>
                <Button type="primary" onClick={() => { set(true); }}>true</Button>
                <Button type="primary" onClick={() => { set(false); }}>false</Button>
            </Space>
        </div>
    )
}

export default BooleanDemo;
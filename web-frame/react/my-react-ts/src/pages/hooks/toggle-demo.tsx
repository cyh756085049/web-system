import useToggle from "../../components/useToggle";
import {Button, Space} from "antd";

const ToggleDemo = () => {
    const [state, { toggle, set, setLeft, setRight } ] = useToggle('hello', 'world');

    console.log('state', state);
    return (
      <div>
          <h1>当前状态：{`${state}`}</h1>
          <Space>
              <Button type="primary" onClick={toggle}>toggle</Button>
              <Button type="primary" onClick={setRight}>toggle true</Button>
              <Button type="primary" onClick={setLeft}>toggle false</Button>
              <Button type="primary" onClick={() => { set('hello'); }}>Set Hello</Button>
              <Button type="primary" onClick={() => { set('world'); }}>Set World</Button>
          </Space>
      </div>
    );
}

export default ToggleDemo;
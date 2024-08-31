import {Button, message, Space} from "antd";
import {useState} from "react";
import useThrottleFn from "../../components/useThrottleFn";

const ThrottleFnDemo = () => {
    const [count, setCount] = useState(0);

    const { run } = useThrottleFn(() => {
        setCount(count + 1);
    }, {
        wait: 500, // 500s调用一次
    })

    return (
      <div>
          <h1>click count: {count}</h1>
          <Space>
              <Button type={"primary"} onClick={run}>click fast</Button>
          </Space>
      </div>
    );
}

export default ThrottleFnDemo;
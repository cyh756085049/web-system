import {Button, message, Space} from "antd";
import {useState} from "react";
import { Input } from "antd";
import useThrottle from "../../components/useThrottle";

const ThrottleDemo = () => {
    const [value, setValue] = useState<string>();
    const throttledValue = useThrottle(value, { wait: 500 });


    return (
      <div>
          <h1>节流：throttle</h1>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="typed value"
            style={{ width: 250 }}
          />
          <h3>throttledValue: { throttledValue }</h3>
      </div>
    );
}

export default ThrottleDemo;
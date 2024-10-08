import {Button, message} from "antd";
import useBoolean from "../../components/useBoolean";
import useUnmount from "../../components/useUnmount";

const MyComponent = () => {
    useUnmount(() => {
        message.info('unmount');
    })

    return (
        <div>hello world</div>
    );
}

const UnmountRefDemo = () => {
    const [state, { toggle }] = useBoolean(true);

    console.log('state', state);

    return (
        <div>
            <Button type={'primary'} onClick={toggle}>
                {state ? 'unmount' : 'mount'}
            </Button>
            {/* state 为 false 卸载组件 */}
            {state && <MyComponent />}
        </div>
    );
}

export default UnmountRefDemo;
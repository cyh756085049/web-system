import {Button, message} from "antd";
import useToggle from "../../components/useToggle";
import useUnmountedRef from "../../components/useUnmountedRef";
import {useEffect} from "react";
import useBoolean from "../../components/useBoolean";

const MyComponent = () => {
    const unmountRef = useUnmountedRef();

    useEffect(() => {
        console.log('第几次', unmountRef.current);
        setTimeout(() => {
            if (!unmountRef.current) {
                message.info('component is alive');
            }
        }, 3000);
    }, []);


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
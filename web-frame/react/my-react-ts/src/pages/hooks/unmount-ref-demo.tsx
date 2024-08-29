import {Button, message} from "antd";
import useToggle from "../../components/useToggle";
import useUnmountedRef from "../../components/useUnmountedRef";
import {useEffect} from "react";

const MyComponent = () => {
    const unmountRef = useUnmountedRef();

    useEffect(() => {
        console.log(unmountRef.current);
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
    const [state, { toggle }] = useToggle();

    return (
        <div>
            <Button onClick={toggle}>
                {state ? 'unmount' : 'mount'}
            </Button>
            {state && <MyComponent />}
        </div>
    );
}

export default UnmountRefDemo;
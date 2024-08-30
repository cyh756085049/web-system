import Emitter from "../emitter";
import Request from "../request";
import ToggleDemo from "../hooks/toggle-demo";
import UnmountRefDemo from "../hooks/unmount-ref-demo";
import BooleanDemo from "../hooks/boolean-demo";
import SafeStateDemo from "../hooks/safe-state-demo";
import LockFnDemo from "../hooks/lock-fn-demo";

export const hooksRouter = [
    {
        label: 'useEventEmitter',
        key: '/emitter',
        element: <Emitter />,
    },
    {
        label: 'useRequest',
        key: '/request',
        element: <Request />,
    },
    {
        label: 'useToggle',
        key: '/toggle',
        element: <ToggleDemo />,
    },
    {
        label: 'useUnmountRef',
        key: '/unmount-ref',
        element: <UnmountRefDemo />
    },
    {
        label: 'useBoolean',
        key: '/boolean',
        element: <BooleanDemo />
    },
    {
        label: 'useSafeState',
        key: '/safe-state',
        element: <SafeStateDemo />
    },
    {
        label: 'useLockFn',
        key: '/lock-fn-demo',
        element: <LockFnDemo />
    }
]
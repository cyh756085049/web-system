import Emitter from "../emitter";
import Request from "../request";
import ToggleDemo from "../hooks/toggle-demo";
import UnmountRefDemo from "../hooks/unmount-ref-demo";

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
        key: '/ummount-ref',
        element: <UnmountRefDemo />
    }
]
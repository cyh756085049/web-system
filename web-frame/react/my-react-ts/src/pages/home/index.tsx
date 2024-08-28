import React, {FC, useRef} from "react";
import useEventEmitter, {EventEmitter} from "../../conponents/useEventEmitter";

const MessageBox: FC<{
    // @ts-ignore
    focus$: EventEmitter<void>;
}> = function (props) {
    return (
        <div style={{paddingBottom: 24}}>
            <p>You received a message</p>
            <button
                type="button"
                onClick={() => {
                    props.focus$.emit();
                }}
            >
                Reply
            </button>
        </div>
    );
}

const InputBox: FC<{
    // @ts-ignore
    focus$: EventEmitter<void>;
}> = function (props) {
    const inputRef = useRef<any>();
    props.focus$.useSubscription(() => {
        inputRef.current.focus();
    });

    return (
        <input
            ref={inputRef}
            placeholder="Enter reply"
            style={{ width: '100%', padding: '4px' }}
        />
    );
};

const Home: React.FC = () => {
    const focus$ = useEventEmitter();

    return (
        <React.Fragment>
            <MessageBox focus$={focus$} />
            <InputBox focus$={focus$} />
        </React.Fragment>
    );
}

export default Home;
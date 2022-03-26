import React from 'react';

export function State<T = any>(initialState: T) {
    const [value, setState] = React.useState<T>(initialState);

    return {
        get value () {
            return value;
        },
        set value (newValue: any) {
            setState(newValue) 
        }
    }
}

export function useState<T = any>(initialState: T) {
    const reference = React.useRef(initialState);
    const [{value, cb}, setState] = React.useState<{
        value: T,
        cb?: (value: T) => void
    }>({value: initialState});
    const [prevState, setPrevState] = React.useState<T>(initialState);

    const stateReference = () => reference.current || value;

    const updateState = (newValue: {[key:string]:any}, cb?: (value: T) => void) => {
        setPrevState(value);

        const val = {
            ...reference.current,
            ...newValue
        };

        setState({
            value: val, cb});
        reference.current = val;
    }

    const defaultState = () => {
        setState({
            cb: undefined,
            value: initialState
        });
        
        reference.current = initialState;
    }

    React.useEffect(function () {
        if(cb) {
            cb(value);
        }
    }, 
    [value]);

    return {
        prevState,
        updateState,
        defaultState,
        state: value,
        stateReference
    };
}
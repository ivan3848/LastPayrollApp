interface Props<T> {
    valueOrDefault: string;
}

function GenericFieldValue<T>({ valueOrDefault }: Props<T>) {
    return (
        <>
            <div>{valueOrDefault}</div>
        </>
    );
}

export default GenericFieldValue;

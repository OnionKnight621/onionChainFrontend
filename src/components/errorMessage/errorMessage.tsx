const ErrorMessage = ({ error }: { error: Error | string }) => {
    if (!error || !Object.keys(error).length) {
        return <h3 className="error-msg">Error: Smth went wrong 😿</h3>
    }

    return <h3 className="error-msg">Error: {JSON.stringify(error)}</h3>;
}

export default ErrorMessage;

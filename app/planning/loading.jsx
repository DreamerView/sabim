const Loading = () => {
    return(
        <div className="text-center">
            <div className="spinner-border m-5" style={{width: "6rem", height: "6rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
};

export default Loading;
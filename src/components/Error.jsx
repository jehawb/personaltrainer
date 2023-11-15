import { useRouteError } from "react-router-dom";

export default function Error() {

    const error = useRouteError();
    console.log(error);

    return (
        <>
            <h1>&#128128; Error! &#128128;</h1>
            <p>{error.data}</p>
        </>
    );
}
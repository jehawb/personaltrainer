import Reset from "./Reset";

export default function Home() {
    return (
        <>
            <h1>Welcome to Personal Trainer site! &#129318;</h1>
            <p>The application uses more or less public database with multiple users, if you want to reset the database, press the button below</p>
            <Reset />
        </>
    );
}
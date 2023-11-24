import Reset from "./Reset";

export default function Home() {
    return (
        <>
            <h1>Welcome to Personal Trainer application! &#129318;</h1>
            <p>The application uses more or less public database with multiple users and may become mangled.</p>
            <p> If you want to reset the database, press the button below &#128071;</p>
            <Reset />
        </>
    );
}
"use client"

import { Main } from "../page";

const About = () => {
    return (
        <Main>
            <h1 className="text-4xl font-bold">About Trainer App</h1>
            <br />
            <h2 className="text-2xl font-medium">What can this app help you with?</h2>
            <br />
            <p>This app will help you figure out how to progress faster and more effectively in muscle growth and strength gains. You can find the best training program that suits you. You can also choose from muscle displays such as a table, graph, and more.</p>
            <br />
            <h2 className="text-2xl font-medium">How can you help this app grow?</h2>
            <br />
            <p>I would be glad if you could share this application with colleagues, friends, relatives and so on. You can also send me donations if you want to contribute to the development of this application (the card number is attached in my github, see below)</p>
            <br />
            <h2 className="text-2xl font-medium">Who is working on the website development?</h2>
            <br />
            <p>My <a href="https://github.com/rodionspi" className="text-sky-400">github</a>.
            I am a developer with two years of experience. I have experience with JavaScript and TypeScript languages. If you want to ask me something or you are interested in something, write to me at my e-mail below
            </p>
            <p>e-mail: rodionspirik48@gmail.com</p>
        </Main>
    )
}

export default About;
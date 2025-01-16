

import React from 'react';
import Head from 'next/head';
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const About = () => {
    return (
        <PageWrapper>
            <div className="p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">About Trainer App</h1>
                <h2 className="text-2xl font-medium mb-4 text-gray-700">What can this app help you with?</h2>
                <p className="mb-6 text-gray-600">
                    This app will help you figure out how to progress faster and more effectively in muscle growth and strength gains. You can find the best training program that suits you. You can also choose from muscle displays such as a table, graph, and more.
                </p>
                <h2 className="text-2xl font-medium mb-4 text-gray-700">How can you help this app grow?</h2>
                <p className="mb-6 text-gray-600">
                    I would be glad if you could share this application with colleagues, friends, relatives and so on. You can also send me donations if you want to contribute to the development of this application (the card number is attached in my github, see below)
                </p>
                <h2 className="text-2xl font-medium mb-4 text-gray-700">Who is working on the website development?</h2>
                <p className="mb-6 text-gray-600">
                    My <a href="https://github.com/rodionspi" className="text-sky-400 underline">github</a>. I am a developer with two years of experience. I have experience with JavaScript and TypeScript languages. If you want to ask me something or you are interested in something, write to me at my e-mail below
                </p>
                <p className="text-center text-gray-600">
                </p>
            </div> 
        </PageWrapper>  
    )
}

export default About;
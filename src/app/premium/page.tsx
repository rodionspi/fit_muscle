"use client"

import { queryModel } from "@/api/huggingFaceApi";
import Main from "../page";
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Premium = () => {
    const [context, setContext] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchContext = async () => {
            const response = await fetch('/context.txt');
            const text = await response.text();
            setContext(text);
        };

        fetchContext();
    }, []);

    const initialValues = {
        frequency: '',
        sport: '',
        age: 0,
        weight: 0
    };

    const validationSchema = Yup.object({
        frequency: Yup.string().required('Required'),
        sport: Yup.string().required('Required'),
        age: Yup.number().required('Required').positive('Must be a positive number').integer('Must be an integer'),
        weight: Yup.number().required('Required').positive('Must be a positive number')
    });

    const onSubmit = (values: { frequency: string; sport: string; age: number; weight: number }) => {
        console.log(values);
    };

    const handleClick = async () => {
        const response = await queryModel({
            question: 'What are the three main exercises that powerlifting focuses on?',
            context: context
        });
        setAnswer(response.answer);
    };

    return (
        <Main>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="form-container border-2 border-gray-300 p-5 rounded-lg bg-gray-500">
                    <div className="form-group mb-4">
                        <label htmlFor="frequency" className="block mb-2">Frequency (times per week)</label>
                        <Field type="number" id="frequency" name="frequency" className="form-field w-full p-2 rounded-md border border-gray-300" />
                        <ErrorMessage name="frequency" component="div" className="error-message text-red-500 mt-1" />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="sport" className="block mb-2">Preferred Sport</label>
                        <Field type="text" id="sport" name="sport" className="form-field w-full p-2 rounded-md border border-gray-300" />
                        <ErrorMessage name="sport" component="div" className="error-message text-red-500 mt-1" />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="age" className="block mb-2">Age</label>
                        <Field type="number" id="age" name="age" className="form-field w-full p-2 rounded-md border border-gray-300" />
                        <ErrorMessage name="age" component="div" className="error-message text-red-500 mt-1" />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="weight" className="block mb-2">Weight</label>
                        <Field type="number" id="weight" name="weight" className="form-field w-full p-2 rounded-md border border-gray-300" />
                        <ErrorMessage name="weight" component="div" className="error-message text-red-500 mt-1" />
                    </div>
                    <button type="submit" className="submit-button p-2 rounded-md border-none bg-blue-500 text-white cursor-pointer">Submit</button>
                </Form>
            </Formik>
            <p>{answer}</p>
        </Main>
    )
}

export default Premium;
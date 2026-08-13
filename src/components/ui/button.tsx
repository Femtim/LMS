import React from 'react'; 
import {Link} from 'react-router-dom';


interface ButtonProps {
    text?: string;
    link?: string;

 }


export function Button({ text,  link }: ButtonProps) {
    return <>
    {link ? (
        <Link to={link}>
            <button className='bg-blue-500 text-white px-4 py-2 rounded' >
                {text}
            </button>
        </Link>
    ) : (
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
            {text}
        </button>
    )}
    </>
}
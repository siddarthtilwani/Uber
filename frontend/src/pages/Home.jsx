import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-center h-screen pt-8 w-full  flex justify-between flex-col">
                <img className='w-16 ml-8 invert' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                <div className='bg-white pb-7 px-4 py-4'>
                    <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                    <Link to={"/login"} className='flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>

            </div>
         
        </div>
    );
};

export default Home;
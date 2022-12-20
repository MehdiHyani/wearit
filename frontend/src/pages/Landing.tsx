import React from 'react';
import Claquette from '../assets/1-removebg-preview.png';
import Card from '../components/Card';

const Landing = () => {
    const sample = {
        title: 'Nike Claquettes Lifestyle',
        desc: 'The Nike Benassi JDI tap dance offers optimal comfort in a classic and lightweight design.',
        price: 250.15,
        images: [Claquette]
    };
    return (
        <div className="text-tertiary bg-primary w-screen h-screen">
            <div className="grid gap-4 grid-cols-2 grid-rows-2">
                < Card sample={sample} style='row-span-2'/>
                <div className="col-span-1">2</div>
                <div className="col-span-1">3</div>
            </div>
            <div></div>
        </div>
    );
};

export default Landing;

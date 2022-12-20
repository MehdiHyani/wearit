import React from 'react';
import Claquette from '../assets/1-removebg-preview.png';
import Card from '../components/Card';

// TODO Erase the sample end get the real data from the backend using reduxtoolkit

const Landing = () => {
    const sample = {
        title: 'Nike Claquettes Lifestyle',
        desc: 'The Nike Benassi JDI tap dance offers optimal comfort in a classic and lightweight design.',
        price: 250.15,
        images: [Claquette]
    };
    return (
        <div className="text-tertiary bg-primary min-w-screen min-h-screen">
            <div className="grid grid-cols-[40rem] gap-y-4 gap-x-16 grid-cols-2 grid-rows-2 justify-center items-center">
                <Card
                    product={sample}
                    titleStyle={'text-3xl'}
                    generalStyle={'w-[40rem] h-[25rem] w-full row-span-2'}
                    descColor={'opacity-50'}
                    priceStyle={'text-[2rem]'}
                    btnStyle={
                        'text-3xl h-2/3 w-2/3 rounded-3xl from-[#43CBFF] to-[#9708CC]'
                    }
                />
                <Card
                    product={sample}
                    titleStyle={''}
                    generalStyle={
                        'w-[20rem] h-[12rem] from-[#5EFCE8] to-[#736EFE] col-start-2 col-span-1'
                    }
                    descColor={'text-[0.5rem] opacity-100 text-white'}
                    priceStyle={'text-[1rem]'}
                    btnStyle={'text-md h-2/3 w-2/3 rounded-xl from-[#FFE143] to-[#9708CC]'}
                />
                <Card
                    product={sample}
                    titleStyle={''}
                    generalStyle={
                        'w-[20rem] h-[12rem] from-[#EEAD92] to-[#6018DC] col-start-2 col-span-1'
                    }
                    descColor={'text-[0.5rem] opacity-100 text-white'}
                    priceStyle={'text-[1rem]'}
                    btnStyle={'text-md h-2/3 w-2/3 rounded-xl from-[#FFE143] to-[#9708CC]'}
                />
            </div>
            <div></div>
        </div>
    );
};

export default Landing;

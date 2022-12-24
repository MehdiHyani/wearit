import React from 'react';
import Card from '../components/Card';
import { useGetFeaturedProductsQuery } from '../app/product/productApiSlice';
// TODO Erase the sample end get the real data from the backend using reduxtoolkit

const Landing = () => {
    const { data, isLoading, error } = useGetFeaturedProductsQuery({});
    if (isLoading || !data) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Something went wrong</h1>;
    }
    return (
        <div className="p-[10rem] text-tertiary bg-primary min-w-screen min-h-screen">
            <div className="grid grid-cols-[40rem] gap-y-4 gap-x-16 grid-cols-2 grid-rows-2 justify-center items-center">
                <Card
                    product={data[0]}
                    titleStyle={'text-3xl'}
                    generalStyle={'bg-white w-[40rem] h-[25rem] w-full row-span-2'}
                    priceStyle={'text-[2rem]'}
                    btnStyle={
                        'text-3xl h-2/3 w-2/3 rounded-3xl from-[#43CBFF] to-[#9708CC]'
                    }
                    ImgStyle={'w-[20rem] h-[16em]'}
                />
                <Card
                    product={data[1]}
                    titleStyle={''}
                    generalStyle={
                        'w-[20rem] h-[12rem] bg-gradient-to-r from-[#5EFCE8] to-[#736EFE] col-start-2 col-span-1'
                    }
                    priceStyle={'text-[1rem]'}
                    btnStyle={
                        'text-md h-2/3 w-2/3 rounded-xl from-[#FFE143] to-[#9708CC]'
                    }
                    ImgStyle={'w-[8rem] h-[11rem]'}
                />
                <Card
                    product={data[2]}
                    titleStyle={''}
                    generalStyle={
                        'w-[20rem] h-[12rem] bg-gradient-to-r from-[#EEAD92] to-[#6018DC] col-start-2 col-span-1'
                    }
                    priceStyle={'text-[1rem]'}
                    btnStyle={
                        'text-md h-2/3 w-2/3 rounded-xl from-[#FFE143] to-[#9708CC]'
                    }
                    ImgStyle={'w-[8rem] h-[11rem]'}
                />
            </div>
            <div className='p-5 mt-14 rounded-lg bg-gradient-to-r from-[#FCFF00] via-[#E5AE5C] to-[#12A4C3]'>
                <h1 className='pb-1 pl-3 text-primary text-2xl font-bold'>Our Top Sellers Items</h1>
                <div className="grid gap-x-2 grid-cols-5 pl-3">
                    {data.slice(3, 8).map((product, index) => (
                        <Card
                            key={product.PRO_NAME}
                            product={product}
                            titleStyle={'text-sm overflow-hidden text-secondary'}
                            generalStyle={
                                'bg-white w-[14rem] h-[12rem]'
                            }
                            priceStyle={'pt-2 text-secondary text-[1rem]'}
                            btnStyle={
                                'text-[0.8rem] h-2/3 w-2/3 rounded-md from-[#5ee09f] to-[#12A4C3]'
                            }
                            ImgStyle={'w-[6rem] h-[10rem]'}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Landing;

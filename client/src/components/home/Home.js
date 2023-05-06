import React, { useEffect } from 'react';
import Banner from '../banner/Banner';
import Main from './../main/Main';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const { loadUser } = useContext(AuthContext);
    useEffect(() => {
        try {
            loadUser();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div>
            <Banner></Banner>
            <Main></Main>
        </div>
    );
};

export default Home;

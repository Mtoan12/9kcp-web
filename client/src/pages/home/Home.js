import { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import Main from '../../components/main/Main';

const Home = () => {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div>
            <Banner></Banner>
            <Main></Main>
        </div>
    );
};

export default Home;

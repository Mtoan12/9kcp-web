import Banner from 'components/banner/Banner';
import Main from 'components/main/Main';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div>
            <Banner />
            <Main />
        </div>
    );
};

export default Home;

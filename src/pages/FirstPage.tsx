import { Link } from 'react-router-dom';

const FirstPage = () => {
    return (
        <div>
            <h1>Test Router</h1>
            <Link to="/products">
                <button className='bg-yellow-200 p-4 m-4 rounded-lg'>Productos</button>
            </Link>
        </div>
    );
};

export default FirstPage;

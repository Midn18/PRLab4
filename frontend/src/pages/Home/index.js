import React from 'react';

import CategoryService from '../../services/api';

import CategoryList from '../../components/CategoryList';
import Search from '../../components/Search';
import EditButton from '../../components/EditButton';
import ProductsList from '../../components/ProductsList';

const Home = () => {
    const [categories, setCategories] = React.useState([]);
    const [showEditButtons, setShowEditButtons] = React.useState(false);
    const [showProducts, setShowProducts] = React.useState({
        show: false,
        categoryId: null,
    });

    const getCategories = React.useCallback(async () => {
        const response = await CategoryService.getAllCategories();
        setCategories(response);
    }, []);

    React.useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <Search setCategories={setCategories} />
                <EditButton
                    showEditButtons={showEditButtons}
                    setShowEditButtons={setShowEditButtons}
                />
            </div>
            <CategoryList
                categories={categories}
                showEditButtons={showEditButtons}
                setCategories={setCategories}
                showProducts={showProducts}
                setShowProducts={setShowProducts}
            />
            {showProducts.show && (
                <ProductsList categoryId={showProducts.categoryId} />
            )}
        </div>
    );
};

export default Home;

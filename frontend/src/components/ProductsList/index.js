import React from 'react';

import CategoryService from '../../services/api';

const ProductsList = ({ categoryId }) => {
    const [products, setProducts] = React.useState([]);
    const [showAddProduct, setShowAddProduct] = React.useState(false);

    const handleAddProductClick = () => {
        setShowAddProduct(!showAddProduct);
    };

    const getProducts = React.useCallback(async () => {
        const response = await CategoryService.getProductsByCategoryId(
            categoryId
        );
        setProducts(response);
    }, [categoryId]);

    React.useEffect(() => {
        if (!showAddProduct) {
            getProducts();
        }
    }, [showAddProduct, getProducts]);

    return (
        <div>
            {products.length ? (
                <div className='d-flex gap-3'>
                    {products.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className='d-flex flex-column text-center'>
                                <span>Product {product.id}</span>
                                <span>Title: {product.title}</span>
                                <span>Price: {product.price}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='d-flex justify-content-center pb-3'>
                    <span className='fs-2'>No products</span>
                </div>
            )}
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <button
                    className='btn btn-success d-flex align-self-center'
                    onClick={handleAddProductClick}>
                    <span className='material-symbols-outlined'>add</span>
                </button>
            </div>
            {showAddProduct && (
                <Modal
                    setShowAddProduct={setShowAddProduct}
                    categoryId={categoryId}
                />
            )}
        </div>
    );
};

const Modal = ({ setShowAddProduct, categoryId }) => {
    const [productName, setProductName] = React.useState('');
    const [productPrice, setProductPrice] = React.useState('');

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

    const handleAddProduct = async () => {
        if (!productName || !productPrice) return;
        await CategoryService.createProductByCategoryId(categoryId, {
            title: productName,
            price: productPrice,
        });

        setShowAddProduct(false);
    };

    return (
        <div
            style={{ left: '0' }}
            className='w-100 h-100 position-fixed d-flex justify-content-center py-4 top-0 bg-secondary bg-opacity-75'>
            <div
                style={{ height: 'fit-content' }}
                className='bg-light w-25 rounded'>
                <div className='border-bottom'>
                    <p className='px-3 pt-3'>Add product</p>
                </div>
                <div className='border-bottom d-flex flex-column gap-2 align-items-center py-4'>
                    <input
                        type='text'
                        className='form-control w-50'
                        placeholder='product name'
                        onChange={handleProductNameChange}
                    />
                    <input
                        type='number'
                        className='form-control w-50'
                        placeholder='product price'
                        onChange={handleProductPriceChange}
                    />
                </div>
                <div className='d-flex justify-content-end gap-2 py-3 px-3'>
                    <button
                        className='btn btn-success'
                        onClick={handleAddProduct}>
                        Add
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() => setShowAddProduct(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;

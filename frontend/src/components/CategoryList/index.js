import React from 'react';

import CategoryService from '../../services/api';

const CategoryList = ({
    categories,
    showEditButtons,
    setCategories,
    showProducts,
    setShowProducts,
}) => {
    const [showModal, setShowModal] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState(null);
    const [isEdit, setIsEdit] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isAdd, setIsAdd] = React.useState(false);

    const handleEditClick = (categoryId) => {
        setIsEdit(!isEdit);
        setCategoryId(categoryId);
    };

    const handleEdit = async () => {
        if (inputValue !== '') {
            setIsEdit(false);
            console.log(inputValue);
            await CategoryService.updateCategory(categoryId, {
                title: inputValue,
            });

            const categories = await CategoryService.getAllCategories();
            setCategories(categories);

            setInputValue('');
        }
    };

    const handleDelete = (categoryId) => {
        setShowModal(true);
        setCategoryId(categoryId);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        event.stopPropagation();
    };

    const handleAddClick = () => {
        setIsAdd(!isAdd);
    };

    const handleAdd = async () => {
        setIsAdd(false);
        await CategoryService.createCategory({
            title: inputValue,
        });

        const categories = await CategoryService.getAllCategories();
        setCategories(categories);

        setInputValue('');
    };

    return (
        <>
            <table className='table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th
                            scope='col'
                            className='col-1'></th>
                        <th scope='col'>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr
                            key={category.id}
                            onClick={() =>
                                setShowProducts({
                                    show:
                                        showProducts.categoryId === category.id
                                            ? !showProducts.show
                                            : true,
                                    categoryId: category.id,
                                })
                            }>
                            <th
                                scope='row'
                                className='text-center align-middle'>
                                {index + 1}
                            </th>
                            <td className='d-flex justify-content-between align-items-center'>
                                <div onClick={(e) => e.stopPropagation()}>
                                    {isEdit && categoryId === category.id ? (
                                        <div className='d-flex gap-2'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={inputValue}
                                                placeholder={category.name}
                                                onChange={handleInputChange}
                                            />
                                            <button
                                                className='btn btn-success d-flex'
                                                onClick={handleEdit}>
                                                <span className='material-symbols-outlined'>
                                                    check
                                                </span>
                                            </button>
                                            <button
                                                className='btn btn-danger d-flex'
                                                onClick={handleEditClick}>
                                                <span className='material-symbols-outlined'>
                                                    cancel
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        <span>{category.name}</span>
                                    )}
                                </div>
                                <div
                                    className={`d-flex gap-3 ${
                                        showEditButtons
                                            ? 'visible'
                                            : 'invisible'
                                    }`}>
                                    <button
                                        className='btn btn-primary d-flex'
                                        onClick={(e) => {
                                            handleEditClick(category.id);
                                            e.stopPropagation();
                                        }}>
                                        <span className='material-symbols-outlined'>
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        className='btn btn-danger d-flex'
                                        onClick={(e) => {
                                            handleDelete(category.id);
                                            e.stopPropagation();
                                        }}>
                                        <span className='material-symbols-outlined'>
                                            {' '}
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {isAdd ? (
                        <tr>
                            <th></th>
                            <td>
                                <div className='d-flex gap-2 w-25'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={inputValue}
                                        placeholder='category name'
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className='btn btn-success d-flex'
                                        onClick={handleAdd}>
                                        <span className='material-symbols-outlined'>
                                            check
                                        </span>
                                    </button>
                                    <button
                                        className='btn btn-danger d-flex'
                                        onClick={handleAddClick}>
                                        <span className='material-symbols-outlined'>
                                            cancel
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <th></th>
                            <td className='d-flex justify-content-center'>
                                <button
                                    className='btn btn-success d-flex'
                                    onClick={handleAddClick}>
                                    <span className='material-symbols-outlined'>
                                        add
                                    </span>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && categoryId && (
                <Modal
                    setShowModal={setShowModal}
                    categoryId={categoryId}
                    setCategories={setCategories}
                />
            )}
        </>
    );
};

const Modal = ({ setShowModal, categoryId, setCategories }) => {
    const handleCancel = () => {
        setShowModal(false);
    };

    const handleDelete = async () => {
        await CategoryService.deleteCategory(categoryId);
        const categories = await CategoryService.getAllCategories();
        setShowModal(false);
        setCategories(categories);
    };

    return (
        <div
            style={{ left: '0' }}
            className='w-100 h-100 position-fixed d-flex justify-content-center py-4 top-0 bg-secondary bg-opacity-75'>
            <div
                style={{ height: 'fit-content' }}
                className='bg-light w-25 rounded'>
                <div className='border-bottom'>
                    <p className='px-3 pt-3'>Confirm action</p>
                </div>
                <div className='border-bottom'>
                    <p className='px-3 pt-3'>
                        Are you sure you want to delete this item?
                    </p>
                </div>
                <div className='d-flex justify-content-end gap-2 py-3 px-3'>
                    <button
                        className='btn btn-danger'
                        onClick={handleDelete}>
                        Delete
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

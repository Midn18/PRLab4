import React from 'react';
import debounce from 'lodash.debounce';

import CategoryService from '../../services/api';

const Search = ({ setCategories }) => {
    const [inputValue, setInputValue] = React.useState('');

    const getCategories = React.useCallback(async () => {
        const response = await CategoryService.getAllCategories();
        setCategories(response);
    }, [setCategories]);

    const onChangeInput = (event) => {
        setInputValue(event.target.value);
        updateSearchValue(event.target.value);

        if (event.target.value === '') {
            getCategories();
        }
    };

    const clearInput = () => {
        setInputValue('');
        getCategories();
    };

    const updateSearchValue = React.useCallback(
        debounce(async (value) => {
            const categoryId = await CategoryService.searchCategory(
                value.trim()
            );
            if (categoryId) {
                const category = await CategoryService.getCategoryById(
                    categoryId
                );
                setCategories(category);
            }
        }, 400),
        []
    );

    return (
        <div
            style={{ width: '250px' }}
            className='position-relative'>
            <input
                type='text'
                placeholder='category'
                className='form-control my-3'
                value={inputValue}
                onChange={onChangeInput}
            />
            {inputValue && (
                <span
                    style={{ right: '10px', top: '23px' }}
                    className='material-symbols-outlined position-absolute'
                    role='button'
                    onClick={clearInput}>
                    close
                </span>
            )}
        </div>
    );
};

export default Search;

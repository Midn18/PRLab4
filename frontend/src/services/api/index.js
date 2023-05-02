import axios from '../axios';

class CategoryService {
    static async getAllCategories() {
        try {
            const response = await axios.get('/categories');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async createCategory(category) {
        try {
            const response = await axios.post('/categories', category);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategoryById(id) {
        try {
            const response = await axios.get(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteCategory(id) {
        try {
            const response = await axios.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getProductsByCategoryId(id) {
        try {
            const response = await axios.get(`/categories/${id}/products`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async createProductByCategoryId(id, product) {
        try {
            const response = await axios.post(
                `/categories/${id}/products`,
                product
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async searchCategory(name) {
        try {
            const response = await axios.get(
                `/categories/search?categoryName=${name}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateCategory(id, category) {
        try {
            const response = await axios.put(`/${id}`, category);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CategoryService;

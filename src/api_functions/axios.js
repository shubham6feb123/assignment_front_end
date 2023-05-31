import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL,
})

export const register_user_to_db = async(name,email,mobile,dob,password) => {
    console.log(import.meta.env.VITE_REACT_API_URL)
    console.log(name, email, mobile, dob, password)
    return await axiosInstance.post('/register_user',{name,email,mobile,dob,password,"confirmpassword":password})
}

export const login_user = async (email, password) => {
    return await axiosInstance.post('/login_user',{email,password})
}

export const register_product = async (user_id, product_id, product_name, purchase_date, email, under_warranty, category, company, description = "No Description Available", image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfXyP5m-PLcLQ76H3YMjjhBWXlqfuv5V9ZjJfyT601A&s") => {
    return await axiosInstance.post('/register_product', {
        user_id,product_id,email,product_name,company,category,under_warranty,purchase_date,description,image
    })
}

export const get_products = async (user_id,email) => {
    return await axiosInstance.get(`/get_products?email=${email}&user_id=${user_id}`)
}

export const delete_product = async (user_id, product_id, email) => {
    return await axiosInstance.delete(`/delete_product?email=${email}&user_id=${user_id}&product_id=${product_id}`)  
}
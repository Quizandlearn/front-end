import FormError from "../FormError/FormError";
import PropTypes from "prop-types";
import axios from '../../../config/axios';
import { api } from '../../../config/api';
import React, { useEffect, useState} from 'react';
import { useAuth } from "../../../hooks/useAuth";

const getCategoryError=(formik) => {
    let touched = false;
    if(formik.touched && formik.touched.category) {
        touched = true;
    }
    if(touched && formik.errors && formik.errors.category) {
        return formik.errors.category;
    }
};

const SelectCategory = ({
    formik
}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    const {user} = useAuth();

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            const {data: response} = await axios.get(api.categories,
                {
                    headers: {"Authorization" : `Bearer ${user.token}`, 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            setData(response);
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
    
        fetchData();
      }, []);
    
    const { handleChange, handleBlur, values } = formik;
    const { category } = values;
    const categoryError = getCategoryError(formik);
    return(
        <>
            {loading && <div>Loading</div>}

            {!loading && <div className="select is-warning" id="select-categories-container">
                <select
                    id="select-categories" 
                    name="category"
                    value= {category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >

                <option value="" disabled>Thématique</option>
                {data.categories.map((category, index)=>{
                    return(
                        <option key={index} value={category}>{category}</option>
                    );
                })}
            </select>
            {categoryError ? 
                <FormError errorContent={categoryError} />
                : null}
            </div>}
        </>
    );
};

SelectCategory.propTypes = {
    formik: PropTypes.object
}

export default SelectCategory;
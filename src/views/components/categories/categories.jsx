import React, { useEffect, useState } from 'react';
import CategoryActions from '../../../services/CategoryActions'
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from '@coreui/react';
import { DocsLink } from 'src/reusable'
import { Link } from 'react-router-dom';

const Categories = (props) => {

    const itemsPerPage = 15;
    const fields = ['name', ' '];
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryActions.findAll()
            .then(response => setCategories(response))
            .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalCategories = [...categories];
        setCategories(categories.filter(category => category.id !== id));
        console.log("Supprimé");
        // CategoryActions.delete(id)
        //                .catch(error => {
        //                     setCategories(originalCategories);
        //                     console.log(error.response);
        //                });
    }

    return (
        <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
                Liste des catégories
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={ categories }
              fields={ fields }
              bordered
              itemsPerPage={ itemsPerPage }
              pagination
              scopedSlots = {{
                'name':
                  item => <td><Link to="/">{ item.name }</Link></td>
                ,
                ' ':
                  item => <td><CButton block color="danger" onClick={ () => handleDelete(item.id) }>Supprimer</CButton></td>
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    );
}
 
export default Categories;
import React, { useEffect, useState } from 'react'
import InternalLayout from '../Layouts/InternalLayout'
import { useParams } from 'react-router-dom'
import { getDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../../Components/Notifications/Toastify';
import { Typography } from '@mui/material';

function AttributeGroupDetailPage() {
    const params = useParams();
    const [attributeGroupData, SetAttributeGroupData] = useState();

    useEffect(() => {
        const getAttributeGroupData = async () => {
            try {
                const response = await getDataRequest(`/Attribute/getAttributeGroup?_id=${params.id}`);
                if (response) {
                    SetAttributeGroupData(response)
                }
            } catch (error) {
                ShowMessage('error', 'rer')
            }
        }
        getAttributeGroupData();
    }, [params])

    return (
        <InternalLayout>
            <Typography>
                Attribute Group
            </Typography>
            {attributeGroupData?.Name}
            {attributeGroupData?.Code}

            <Typography>
                Overview
            </Typography>
        </InternalLayout>
    )
}

export default AttributeGroupDetailPage
import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';

import DepartmentService from "../services/department.service";

const initialDepartmentListState = [
    {
        "idDepartment": 0,
        "name": ""
    }
];

const Department = (props) => {
    const [DepartmentList, setDepartmentList] = useState(initialDepartmentListState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllPrioritiesMethod();
        // eslint-disable-next-line 
    },[]);

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        DepartmentService.getAll()
            .then(response => {
                setDepartmentList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'Department',
            render: (Department) => Department.name
        }
    ];

    return (
        <div>
            <Table rowKey={Department => DepartmentList.idDepartment} columns={columns} dataSource={DepartmentList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Department;
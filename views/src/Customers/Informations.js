//Import Regions
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Header from '../Header/Header.js';
import { ThemeProvider } from 'styled-components';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {  CssBaseline, makeStyles } from '@material-ui/core';
import { createTheme }         from '@mui/material/styles';

import axios from 'axios'
import ApproverNavBar from './CustomersNavbar.js'


/**
 * THemes
 */
const theme = createTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126'
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526'
        },
        background: { default: '#f4f5fd' },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translatez(0)'
            }
        }
    },

    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})

/**
 * Themes
 */
const useStyles = makeStyles({
    appMain: {
        paddingLeft: '100px',
        width: '100%'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)

    },

});


/**
 * View Documents Attached
 * @param {*} data 
 */
const HandleDocumentView = (data) => {
    const downloadID = data._id;
    axios.get(`http://10.10.13.175:2045/APILoan/sv1//viewFile/${downloadID}`, { responseType: 'arraybuffer' })
        .then((response) => {
            let blob = new Blob([response.data], { type: 'application/pdf' || 'image/png' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.scrollIntoView = response.data;
            // link = window.open(blob)
            link.click();
        })
        .catch((err) => { console.log("Errors ", err.message) });
}


/**
 * Handle Export Row Data Report
 * @param {*} data 
 */
const HandleLetter = (data) => {
    const downloadID = data._id;
    axios.get(`http://10.10.13.175:2045/APILoan/sv1/viewLetter/${downloadID}`, { responseType: 'arraybuffer' })
        .then((response) => {
            let blob = new Blob([response.data], { type: 'application/pdf' || 'image/png' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.scrollIntoView = response.data;
            link.target = '_blank'
            link.click();
        })
        .catch((err) => { console.log("Errors ", err.message) });
}

export default function Informations() {
    const classes = useStyles()
    const [, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState(null);
    // const [status, setStatus] = useState({})

    const Columns = [
        // {title:"ID",field:"id" },
        { title: "RequestedDate", field: "createdAt", type: 'date' },
        { title: "RejectedDate", field: "approvedDate", type: 'date' },
        { title: 'LafNumber', field: 'lafNumber', editable: false, defaultGroupOrder: 0 },
        { title: "Branch", field: "branch", editable: false },
        { title: "BorrowerName", field: "lafs[nameOfBorrower]" },
        { title: "LoanAmount", field: "loanAmount", editable: false },
        { title: "DurationOfLoan", field: "durationOfLoan", editable: false },
        { title: "TypeOfLoan", field: "typeOfLoan", editable: false },
        { title: "LAFAttachement", field: "lafs[document][filename]", editable: false },
        { title: 'LetterAttachement', field: 'registrationLetter[filename]', editable: false },
        // {title:"Total",field:"total" , editable:false},
        { title: "Status", field: "status"},
        { title: "Remark", field: "remark" }
    ];

    /**
     * Use Effect React Hook class
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(`http://10.10.13.175:2045/APILoan/sv1/disbursed/head-office/`);
                setData(response);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }

            // const status = {}
            // GetRemark.Status().map(row => status[row.title] = row.title)
            // setStatus(status);

            setLoading(true);
        }
        fetchData();
    }, []);


    return <>
        <ApproverNavBar />
        <ThemeProvider theme={theme}>

            <div className={classes.appMain}>
                <Header
                    title="Rejected Load Request"
                    subTitle="Head Office or Reagional Office Rejectecs Loan Request"
                    icon={<AssignmentIndIcon fontSize='large' />}
                />
            </div>
            <CssBaseline />
        </ThemeProvider>
        <MaterialTable columns={Columns} data={data}
            title="Requests Rejected"
            editable={{
                isDeletable: (rowData) => rowData.status !== "Accepted",
                onRowUpdate: (newData, oldData, selectedRow) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            // const id = Array[0];   
                            const updatedID = dataUpdate[index]._id;
                            axios.patch(`http://10.10.13.175:2045/APILoan/sv1/${updatedID}`, dataUpdate[index])
                                .then((response) => {
                                    window.alert("Data Updated Successfully")
                                })
                                .then(() => window.location.reload(true))
                                .catch((err) => { window.alert(err.message) });
                            resolve();
                        }, 3000)
                    }),

                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            const deletedID = dataDelete[index]._id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            axios.delete(`http://10.10.13.175:2045/APILoan/sv1/${deletedID}`, dataDelete[index])
                                .then((response) => { window.alert("data Deleted") })
                                .catch((err) => { window.alert(err.message) });

                            resolve();
                        }, 1000)
                    }),

            }}
            actions={[
                {
                    icon: 'download',
                    tooltip: 'View document',
                    iconProps: { style: { fontSize: '18px', color: "green" } },
                    onClick: (event, rowData) => {
                        // Do save operation
                        HandleDocumentView(rowData);
                    }
                },
                {
                    icon: 'download',
                    tooltrip: 'View Letter',
                    iconProps: { style: { fontSize: '18px', color: "cyan" } },
                    onClick: (event, rowData) => {
                        HandleLetter(rowData)
                    }

                }
            ]}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
                // selection: true,
                paging: true,
                pageSizeOptions: [5, 10, 25, 50, 100, { value: data.length > 0 ? data.length : 1, label: 'All' }],
                paginationPosition: 'both',
                exportAllData: true,
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF',
                    fontFamily: 'Noto Serif',
                    fontSize: '12px',
                    fontStyle: 'Times New Roman'
                },
                actionsColumnIndex: -1,
                addRowPosition: "first",
                exportButton: true,
                grouping: true,
                // selection:true,
                columnsButton: true,
                defaultExpanded: true,

                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                    fontSize: '12px',
                    fontFamily: 'Noto Serif'
                })
            }}
        />
    </>
}

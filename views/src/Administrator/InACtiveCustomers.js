
//Import Regions
import React, { useState, useEffect ,forwardRef}              from 'react'
import AddDruForms                                            from '../Forms/AddDrugForms'
// import GroupAddIcon                                           from '@material-ui/icons/GroupAdd';
import PendingActionsIcon                                     from '@mui/icons-material/PendingActions';
import Header                                                 from '../Header/Header.js';
import Popup                                                  from '../Common/Popup'
import Notification                                           from '../Common/Notification'
import axios                                                  from 'axios';
import MaterialTable                                          from 'material-table';
import {CssBaseline,makeStyles,Paper,Toolbar}                 from '@material-ui/core';
import HOMakerNavbar                                          from './AdminNavBar';
import { createMuiTheme, createTheme, MuiThemeProvider }      from '@material-ui/core/styles';


import * as GetRemark                                         from '../Common/GetRespectiveUnits';
// import { isAuthenticated }                                    from '../../Helper/Auth';


// Import Material Icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

//table Icons
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

/**
 * Materila UI Theme
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
 * Use Styles Matarial UI Style
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
    
    newButton: {
        position: 'absolute',
        right: '10px',
        fontSize:'10px',
        borderRadius: '25px'
    },
    letterStyle: {
        position: 'absolute',
        right: '20px'
    }
});



/**
 * Automobile for Branch Manager Controller Function
 * @returns 
 */
export default function InActiveCustomers() {
    const classes = useStyles();
    const [ ,setLoading]                                = useState(false);
    const [openPopup, setOpenPopup]                     = useState(false);
    const [selectedRow, setSelectedRow]                 = useState(null);
    const [notify, setNotify]                           = useState({isOpen:false,message:'',type:''});
    const [data, setData]                               = useState([])
    const [status, setStatus]                           = useState({})
    const tableRef                                      = React.createRef()

   /**
    * Table Data Columns
    */
    const Columns = [
        { title: "UserID", field: "userID",editable:false},
        { title: "Email", field: "email",editable:false},
        { title: "Full Name", field: "fullName",editable:false},
        // { title: "ProductImage", field: "productImage" },
        { title: "City", field: "city",editable:false},
        { title: "Login Status", field: "loginStatus",editable:false},
        { title: "Phone Number", field: "phoneNumber",editable:false},
        // { title: "Document", field: "authorizationDocument[data]",editable:false},
        { title: "Status", field: "status", lookup: status },
        { title: "Login Try", field: "loginTryCount",editable:false},
        { title: "remark", field: "remark"},

        //{ title: "LetterAttachement", field: "letter[0][registrationLetter][filename]"},
    ];

    /**
     * Use Effect...
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(`http://localhost:9020/api/users/v1/inactive-users/`);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(true);
        }
        const status = {}
        GetRemark.Status().map(row => status[row.title] = row.title)
        setStatus(status);
       
        fetchData();
    }, []);


    return (
        <>
        <HOMakerNavbar />
            <MuiThemeProvider theme={theme}>
                <div className={classes.appMain}>
                    <Header
                        title="Admins Template In active Customers"
                        subTitle="Admins Controller to handle all users in active user status "
                        icon={<PendingActionsIcon fontSize='medium' />}
                    />
                </div>
                <CssBaseline />
            </MuiThemeProvider> 
            <Paper className={classes.pageContent}>
                <Toolbar>
                </Toolbar>
            </Paper>
            <MaterialTable columns={Columns} data={data}  icons={tableIcons} tableRef={tableRef}
                title="In Active Customers "   
                    editable={{
                    isEditable:(row)=>row.status!=="Accepted",
                    isDeletable:(row)=>row.status!=="Accepted",
                    onRowUpdate: (newData, oldData, selectedRow) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                               
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]); 
                                const updatedID = dataUpdate[index].userID;
                                console.log('data to update : ' + dataUpdate[index]);
                                axios.patch(`http://localhost:9020/api/users/v1/update-users/${updatedID}`, dataUpdate[index])
                                    .then((response) => {
                                        window.alert(response.msg)                                     
                                    })
                                    .then(()=> window.location.reload(true))
                                    .catch((err) => { window.alert(err.message) });   
                                resolve();
                            }, 3000)
                        }),

                    onRowDelete: oldData => 
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                const deletedID = dataDelete[index].userID;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                axios.delete(`http://localhost:9020/api/users/v1/delete-users/${deletedID}`, dataDelete[index])
                                    .then((response) => { window.alert("Deleted successfully")})
                                    .then(()=> window.location.reload(true))
                                    .catch((err) => { window.alert(err.message) });

                                resolve();
                            }, 1000)
                        }),

                }}
                actions={[
                
                ]}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                localization={{
                    toolbar: {
                      exportCSVName: "Export as Csv",
                      exportPDFName: "Export as pdf"
                    },
                  }}
                options={{
                    // selection: true,
                    columnResizable: true,
                    paging: true,
                    pageSizeOptions: [5, 10, 25, 50, 100, 200, 500, 1000, { value: data.length > 0 ? data.length : 1, label: 'All' }],
                    paginationPosition: 'both',
                    exportAllData: true,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF',
                        fontFamily:'Noto Serif',
                        fontSize: '12px',
                        fontStyle:'Times New Roman',
                        whiteSpace: 'nowrap'
                    },
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    exportButton: true,
                    defaultExpanded:true,
                    // selection:true,
                    grouping:true,
                    columnsButton:true,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#f5f5f5' : '#FFF',
                        fontSize:'12px',
                        fontFamily:'Noto Serif'
                    }),
                }}
            />
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title='Add Drug Informations'
            >
                <AddDruForms/>
            </Popup>
            <Notification
             notify     = {notify}
             setNotify  = {setNotify}
             />
        </>
    )
}

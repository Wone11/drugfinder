
//Import Regions
import React, { useState, useEffect ,forwardRef}              from 'react'
import AddDruForms                                            from '../Forms/AddDrugForms'
import GroupAddIcon                                           from '@material-ui/icons/GroupAdd';
// import { MuiThemeProvider }                                      from 'styled-components';
import Header                                                 from '../Header/Header.js';
import AddIcon                                                from '@material-ui/icons/Add';
import Controlls                                              from '../Common/Controlls'
import Popup                                                  from '../Common/Popup'
import Notification                                           from '../Common/Notification'
import axios                                                  from 'axios';
import MaterialTable                                          from 'material-table';
import { CssBaseline,makeStyles,Paper,Toolbar}                from '@material-ui/core';
import { ThemeProvider }                                      from "@mui/styles";
import { createTheme }                                        from '@mui/material/styles';
import HOMakerNavbar                                          from './CustomersNavbar';

import jwt_decode                                             from "jwt-decode";

// import { createMuiTheme, MuiThemeProvider }                   from '@material-ui/core/styles';


// import * as GetRemark                                         from '../../Components/Services/GetRespectiveUnit';
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
const theme = createTheme();

/**
 * Materila UI Theme
 */
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#333996',
//             light: '#3c44b126'
//         },
//         secondary: {
//             main: '#f83245',
//             light: '#f8324526'
//         },
//         background: { default: '#f4f5fd' },
//     },
//     overrides: {
//         MuiAppBar: {
//             root: {
//                 transform: 'translatez(0)'
//             }
//         }
//     },

//     props: {
//         MuiIconButton: {
//             disableRipple: true
//         }
//     }
// })
// theme = responsiveFontSizes(theme);

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
 * Handle Export Row Data Report
 * @param {*} data 
 
/**
 * Handle Document To View and Download and Print
 * @param {*} data 
 */
const HandleDocumentView =(data)=>{
    const downloadID = data._id;
    axios.get(`http://10.10.13.175:2045/APILoan/sv1/viewFile/${downloadID}`,{responseType: 'arraybuffer'})
        .then((response) => { 
            let blob = new Blob([response.data], { type: 'application/pdf'||'image/png' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.scrollIntoView = response.data;
            link.target='_blank'
            link.tagName='View Attached Document'
            link.click();           
       })
        .catch((err) => { console.log("Errors ", err.message) });
}


/**
 * Automobile for Branch Manager Controller Function
 * @returns 
 */
export default function Customers() {
    let [user,setUser] =useState(()=>localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) :null)
    const classes = useStyles();
    const [ ,setLoading]                                = useState(false);
    const [openPopup, setOpenPopup]                     = useState(false);
    const [selectedRow, setSelectedRow]                 = useState(null);
    const [notify, setNotify]                           = useState({isOpen:false,message:'',type:''});
    const [data, setData]                               = useState([])
    const tableRef                                      = React.createRef()

   /**
    * Table Data Columns
    */
    const Columns = [
        { title: "ProductID", field:"productID",editable:false},
        { title: "UserID", field: "userID",editable:false},
        { title: "BusinessName", field: "businessName"},
        { title: "DrugName", field: "drugName"},
        { title: "City", field: "city"},
        { title: "Price", field: "price",currencySetting:{currencyCode:'ETB'}},
        { title: "AmountAvailable", field: "amount"},
        { title: "Sold Amount", field: "soldOut"},
        { title: "Descriptions", field: "description"},
        { title: "Image", field: "productImage[data]",editable:false},
        { title: "Latitude", field: "latitude",editable:false},
        { title: "Longitude", field: "longitude",editable:false},
    ];

    /**
     * Use Effect...
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let userID = user.userID
                console.log('user ID : ' + userID);
                const { data: response } = await axios.get(`http://localhost:9020/api/products/v2/${userID}`);

                setData(response);
                console.log('response : ' + response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(true);
        }
       
       
        fetchData();
    }, []);

    return (
        <>
        <HOMakerNavbar />
            <ThemeProvider theme={theme}>
                <div className={classes.appMain}>
                    <Header
                        title="Customers Template To Handle all the products"
                        subTitle="All customers through this template add, update, delete and export all his own stores data!"
                        icon={<GroupAddIcon fontSize='medium' />}
                    />
                </div>
                <CssBaseline />
            </ThemeProvider> 
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controlls.Button
                        text="Record Products"
                        startIcon={<AddIcon fontSize='sm'/>}
                        className={classes.newButton}
                        onClick={() => setOpenPopup(true)}
                    />
                </Toolbar>
            </Paper>
            <MaterialTable columns={Columns} data={data}  icons={tableIcons} tableRef={tableRef}
                title="Customers Drug stores "   
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
                                const updatedID = dataUpdate[index].productID;
                                axios.patch(`http://localhost:9020/api/products/v2/update-products/${updatedID}`, dataUpdate[index])
                                    .then((response) => {
                                        window.alert("Updated successfully!")                                     
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
                                const deletedID = dataDelete[index].productID;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                axios.delete(`http://localhost:9020/api/products/v2/delete-products/${deletedID}`, dataDelete[index])
                                    .then((response) => { window.alert("Deleted successfully")})
                                    .catch((err) => { window.alert(err.message) });

                                resolve();
                            }, 1000)
                        }),

                }}
                actions={[
                    {
                      icon: 'download',
                      tooltip: 'View document',     
                      iconProps: { style: {fontSize:'18px' , color: "green" } },
                      onClick: (event, rowData) => {
                        // Do save operation
                        HandleDocumentView(rowData);
                      }
                    }
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

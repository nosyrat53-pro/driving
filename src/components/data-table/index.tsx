import React, { useState, useEffect } from "react";
import { useDataTable } from "./useDataTable";
import { Button, Card, CardHeader, Grid, Menu, Tooltip, MenuItem, IconButton, Typography } from '@mui/material'
import Icon from '/src/@core/components/icon'
import { Box } from '@mui/system'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomTextField from '/src/@core/components/mui/text-field'
import OptionsMenu from '/src/@core/components/option-menu'
import DeleteModal from "../delete-model";
import UpdateCreateModel from "../update-create-model";
import toast from 'react-hot-toast'
import IconifyIcon from "../../@core/components/icon";
import { useRouter } from "next/router";
import { randomUUID } from "crypto";

// import useGetCommonEditTextFieldProps from "./useGetCommonEditTextFieldProps";



const DataTable = ({noActions = false, viewRoute = null, isInstructorStudents = false, noCreate,noEdit = false , noDelete = false , endPoint, columns, title, paramsTable, extraActions = [], ExtraCreate = <></>, isContainSwitchForStatus = false }) => {

  const router = useRouter();

  const { data, create, update, deleteTable, loading, working, updateStatus, setData } = useDataTable(endPoint, { ...paramsTable });

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [rowId, setRowId] = useState<number>(-1)
  const [search, setSearch] = useState('');

  const [typeCrud, setTypeCrud] = useState("Create");
  const [idRow, setIdRow] = useState();
  const [idRowForChangingStatus, setIdRowForChangingStatus] = useState(null)
  const [filteredData, setFilterdData] = useState(() => data || []);
  const [form, setForm] = useState({});
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (data) {
      setFilterdData(data);
    }
  }, [data]);

  useEffect(() => {


      // filter data based on search query
      if (data) {
        const filterData =
          data?.filter(element =>

            element?.name?.toLowerCase().includes(search.toLowerCase()) ||
            element?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            element?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
            `${element?.firstName.toLowerCase()  + element?.lastName?.toLowerCase()}`.includes(search.toLowerCase()) ||
            `${element?.firstName.toLowerCase() + " " +element?.lastName?.toLowerCase()}`.includes(search.toLowerCase())

          )

        setFilterdData([...filterData])
      }



  },[search])


  const defaultAction = () => {
    if (noActions) {
      return []
    } else {


    return [
      {
        flex: 0.1,
        minWidth: 130,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: any) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionsMenu
              iconButtonProps={{ size: 'small' }}
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              options={[
                noEdit ? {} :{
                  text: isInstructorStudents ? 'View' : 'Update',
                  icon: isInstructorStudents ?  <IconifyIcon icon='lets-icons:view' /> : <Icon icon='typcn:edit' />,
                  menuItemProps: {
                    onClick: () => {
                        if(isInstructorStudents){
                            router.push(`/student-profile/${row?.id}`)
                        }else {
                          setIdRow(row?.id)
                          setTypeCrud('Update');

                          const formObj = {};

                          columns?.map((col , idx) => {
                            // check if the column is depending on selectFormInput or not
                            if(col.accessorKey && !col.isSelect){
                              // ensure form value is not undefinded
                              if(row[col.accessorKey]){
                                formObj[col.formToSendKey || col.accessorKey] = row[col.accessorKey];
                              }
                            }else {
                              // ensure select item id is not undefinded
                              if(row[col.accessorKey]?.id){
                                formObj[col.formToSendKey || col.accessorKey] = row[col.accessorKey]?.id;
                              }
                            }
                          })

                          setForm({...formObj})
                          setOpen(true) }
                        }
                  }
                },
                noDelete ? {} :
                {
                  text: 'Delete',
                  menuItemProps: {
                    onClick: () => {
                      console.log(row, "row")
                      setOpenDeleteModal(true)
                      setTypeCrud('Delete')
                      setRowId(row?.id)
                    }
                  },

                  // href: `/apps/invoice/edit/${row.id}`,
                  icon: <Icon icon='uiw:delete' onClick={() => console.log("test test")} />
                },
                ...extraActions(row)
              ]}
            />
          </Box>
        )
      }
    ]

    }
  }

  const handleCreateNewRow = (values) => {
    if (idRow && typeCrud == 'Update') {

      update(idRow, values).then(() => {
        setOpen(false)
      });
    } else create(values).then((res) => {
      // console.log(res, "res")
      toast.success('Created Successfully')
      setOpen(false)
    }).catch(error => {
      toast.error( error.message)
      console.log()
    })
  };


  if (data)
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* <DialogCustomized /> */}
          <Card>
            <CardHeader sx={{ p: 3 }} title={title || 'Dev Table'} action={
              <Box sx={{display: 'flex'}}>

                  <CustomTextField onChange={(e) => setSearch(e.target.value)} placeholder='search' sx={{ mx: 4, mt: 0.5 }} />


                {
                  !noCreate ? (<Button onClick={() => { setTypeCrud('Create'); setOpen(true) , setForm({})}} sx={{ mb: 2 }} variant='contained'>
                    <Icon icon='tabler:plus' /> Add {title || 'Dev Table'}
                  </Button>) : ExtraCreate
                }

              </Box>
            }
            />
            <Box sx={{ height: 500 }}>

              <DataGrid
                disableRowSelectionOnClick
                sx={{
                  // pointer cursor on Row when it has a click action
                  '& .MuiDataGrid-row:hover': {
                    cursor: viewRoute ? 'pointer' : 'auto'
                  }
                }}

                onRowClick={(mainRow) => {
                  if (viewRoute) {

                    viewRoute.withId && router.push(viewRoute.route + mainRow.row.id)
                    !viewRoute.withId && router.push(viewRoute.route)
                  }
                }}

                loading={loading}
                columns={[...columns.filter(item => item?.field),  ...defaultAction()]}
                rows={ search != '' ? filteredData : data}
              />

            </Box>
          </Card>
        </Grid>
        <DeleteModal working={working} rowId={rowId} deleteTable={deleteTable} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
        <UpdateCreateModel typeCrud={typeCrud} working={working} open={open} setOpen={setOpen} form={form} setForm={setForm} columns={columns} setIdRow={setIdRow} onSubmit={handleCreateNewRow} />
      </Grid>
    );
  else {
    return <div></div>;
  }
};

export default DataTable;


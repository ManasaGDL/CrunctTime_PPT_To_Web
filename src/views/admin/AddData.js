import { Button, Grid, Link ,TextField,Typography , Stack, } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useState ,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { useForm , Controller} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import dayjs from 'dayjs';
import { baseURL } from 'views/pages/axios';
// ==============================|| TYPOGRAPHY ||============================== //
const fields =[
  
  {type:"number",
  field:"UATPatching"
 },
 {type:"number",
 field:"ProdPatching"
},
{type:"number",
field:"DevOSPatching"
},
{type:"number",
field:"DiskAlerts"
},
{type:"number",
field:"ServerReboot"
},
{type:"number",
field:"SiteJVMreloadsrestarts"
},
{type:"number",
field:"iserverservicerestart"
},

]
const AddData = () => 
  {const [ date , setDate] = useState(dayjs(new Date()))
    const [ data, setData] = useState({})
    const navigate = useNavigate()
    const {register,
    handleSubmit,control,setValue,
    watch,
    formState:{errors}}= useForm()
    const headers = {
      'Content-type': 'application/json',
     
    }
    useEffect(()=>{
      fetchTasks()
      
      
    },[])


    const fetchTasks =async()=>{
      
        try{
         const res= await axios.get(`${baseURL}/tasks`)
         console.log(res)
        }catch(e){
         console.log(e)
        }
    }
    const onSubmit = async(data) => {  
    
     setData({...data,"Date":moment(new Date(date)).format('YYYY-MM-DD')})

     try{
      const res = await axios.post("http://localhost:8081/add",{...data,"Date":moment(new Date(date)).format('YYYY-MM-DD')},
      {
        headers: headers
      })
    navigate("/dashboard/default")
     }catch(e)
     {
  console.log(e)
     }
     };
useEffect(()=>{
console.log("data",data)
},[data])
  
    
 return (

  <LocalizationProvider dateAdapter={AdapterDayjs}>
 <Stack direction="row" spacing={2}><MainCard title="CrunchTime-Data" >  

    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={gridSpacing}>
   
    <Grid item md={6} container>
        <Grid item md={6}>
        <Typography>Date</Typography> 
        </Grid>
        <Grid item md={6}> 
         <DatePicker  
         name="date"
  views={['year', 'month', 'day']} 
  onChange={(e)=>{setDate(e)

}}
  defaultValue={dayjs(new Date())}></DatePicker >                       
   {/* <Controller
          name="date"
          control={control}
          defaultValue={date}
          render={() => (
            <DatePicker
         
             selected={date}
           
              placeholderText="Select date"
             onChange={(e)=>{setValue("date",dayjs(e))
            setDate(e)
          console.log(new Date(e.target.value).toLocaleDateString("en-US"))
          }
            }
            />
          )}
        /> */}
        </Grid>
    </Grid>
    {/* <Grid item md={6} container>
        <Grid item md={6}>
        <Typography>Month</Typography> 
        </Grid>
        <Grid item md={6}>  
        <DatePicker label={'"month"'}  openTo="month" {...register("month")}  
        views={['year', 'month', 'day']}></DatePicker >   
        </Grid>
    </Grid>                     */}
                     
    
      
    {fields.map(field=>{
      return <><Grid item md={6} container>
        <Grid item md={6}>
        <Typography>{field.field}</Typography> 
        </Grid>
        <Grid item md={6}>
        
      <TextField {...register(field.field)} type="number" inputProps={{min:0}} ></TextField>
          
        </Grid>
                           
      </Grid>
     
         
       
    </>
    })}
    
      </Grid>
&nbsp;
      <Grid item md={12} textAlign="center">
      <Button variant="contained" type="submit" size='large'>
    Submit
  </Button> 
  </Grid>
      </form>
  </MainCard>

  </Stack>
  </LocalizationProvider>
  // </Suspense>
 )}

export default AddData;

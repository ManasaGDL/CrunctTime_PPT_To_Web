import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import Card from '@mui/material/Card';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useContext } from 'react';
import { weekContext ,Context} from 'context/Context';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
//  const [ data , setData]= useState(JSON.parse(localStorage.getItem('data')))
 const { data,setData}= useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null);
  const [ dataValues , setDataValues] = useState([])
  const [ highestWorkingTasks, setHighestWorkingTasks]= useState([])
   const { week ,setWeek} = useContext(weekContext)
   const [ allMetrics , setAllMetrics] = useState({})
 let matchObj ={}
// useEffect(()=>{
// console.log("high",(highestWorkingTasks))
// setWeekSelected(localStorage.getItem("week"))
// },[highestWorkingTasks,localStorage.getItem("week")])

  useEffect(()=>{
  
    let maxValue =0
    let maxkey=''
    
if(data?.length>0)
{
  data.map(row=>{
    Object.keys(row).map(key=>{
      if(key.trim()==="Week")
      {
        if(row[key]===week)
        {setAllMetrics(row)
          for(const[key,value] of Object.entries(row))
          {if(key.trim().toLowerCase()!=="week" && key.trim().toLowerCase()!=="month")
            if(value>maxValue)
            {
              maxValue=value
              maxkey=key
            }
          }
        }
      }
    })
  })
 
console.log("test")
setHighestWorkingTasks( [{[maxkey]:maxValue}])
}
},[data,week])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4"  >Majorly Worked</Typography>
                  </Grid>
                  <Grid item>
                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                {/* <BajajAreaChartCard /> */}
              </Grid>
              <Grid item xs={12}>
                {highestWorkingTasks.length>0 && Object.keys(highestWorkingTasks[0]).length>0 && Object.keys(highestWorkingTasks[0])?.map(key=>{
                  
                  return <Grid container direction="column" xs={12} md={6}>
                        <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      
                      <Grid item >
                        <Chip label={key} color='primary'></Chip>
                        {/* <Typography variant="subtitle1" color={'#d4526e'}>
                          {key}
                        </Typography> */}
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#69d2e7">
                            {highestWorkingTasks[0][key]}
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 
                
                
                </Grid>})}
              
               
                <Divider sx={{ my: 1.5 }} />
                {Object.keys(allMetrics).map((key)=>
                {if(key.trim().toLowerCase()!=="week" && key.trim().toLowerCase()!=="month")
                  return <><Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                        {key}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                            {allMetrics[key]}
                            </Typography>
                          </Grid>
                         
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />

                </>})}
                 
                 
                
              </Grid>
            </Grid>
          </CardContent>
         
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
